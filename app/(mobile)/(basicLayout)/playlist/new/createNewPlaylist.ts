"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "uploadError" | "songsError" | "userNotFound"
  error?: string
  id?: number
  name?: string
  cover?: string
}

type Supabase = Awaited<ReturnType<typeof createClient>>

type UploadResult =
  | { ok: true; filePath: string; url: string }
  | { ok: false; error: string }

const BUCKET = "band"
const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
}

function fail(type: RegisterResult["type"], error: string): RegisterResult {
  return { type, error }
}

function parseSongIds(raw: FormDataEntryValue | null): number[] {
  return JSON.parse(String(raw ?? "[]"))
}

async function uploadCover(
  supabase: Supabase,
  userId: string,
  cover: File,
  ext: string
): Promise<UploadResult> {
  const filePath = `public/playlists/${userId}-${Date.now()}.${ext}`

  const { error } = await supabase.storage
    .from(BUCKET)
    .upload(filePath, cover, { contentType: cover.type, upsert: false })

  if (error) {
    console.error(error)
    return { ok: false, error: error.message }
  }

  const { data } = supabase.storage.from(BUCKET).getPublicUrl(filePath)

  return { ok: true, filePath, url: data.publicUrl }
}

async function attachSongs(
  supabase: Supabase,
  userId: string,
  playlistId: number,
  songIds: number[]
): Promise<string | null> {
  const { error } = await supabase
    .from("song")
    .update({ playlist: playlistId })
    .in("id", songIds)
    .eq("band", userId)

  if (error) {
    console.error(error)
    return error.message
  }

  return null
}

export default async function createNewPlaylist(
  formData: FormData
): Promise<RegisterResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) return fail("userNotFound", "You must be signed in.")

  const name = String(formData.get("name") ?? "").trim()
  const cover = formData.get("cover")
  const songIds = parseSongIds(formData.get("songIds"))

  if (!name) return fail("error", "Playlist name is required.")

  if (!(cover instanceof File) || cover.size === 0) {
    return fail("uploadError", "Cover image is required.")
  }

  const ext = EXTENSIONS[cover.type]
  if (!ext || cover.size > MAX_IMAGE_SIZE) {
    return fail("uploadError", "Invalid cover image.")
  }

  const upload = await uploadCover(supabase, user.id, cover, ext)
  if (!upload.ok) return fail("uploadError", upload.error)

  const { data, error } = await supabase
    .from("playlist")
    .insert({
      name,
      favorite: false,
      band: user.id,
      cover: upload.url,
    })
    .select("id, name")
    .single()

  if (error || !data) {
    console.error(error)
    // don't leave an orphan image behind
    await supabase.storage.from(BUCKET).remove([upload.filePath])
    return fail("error", error?.message ?? "Insert failed.")
  }

  const created = { id: data.id, name: data.name, cover: upload.url }

  if (songIds.length > 0) {
    const songsError = await attachSongs(supabase, user.id, data.id, songIds)

    if (songsError) {
      return { type: "songsError", error: songsError, ...created }
    }
  }

  return { type: "success", ...created }
}
