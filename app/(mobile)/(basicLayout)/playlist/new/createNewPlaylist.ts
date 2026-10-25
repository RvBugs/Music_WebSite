"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "uploadError" | "songsError" | "userNotFound"
  error?: string
  id?: number
  name?: string
  cover?: string
}

const MAX_IMAGE_SIZE = 5 * 1024 * 1024
const EXTENSIONS: Record<string, string> = {
  "image/png": "png",
  "image/jpeg": "jpg",
  "image/webp": "webp",
}


export default async function createNewPlaylist(
  formData: FormData
): Promise<RegisterResult> {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    return { type: "userNotFound", error: "You must be signed in." }
  }

  const name = String(formData.get("name") ?? "").trim()
  const cover = formData.get("cover")
  const songIds: number[] = JSON.parse(String(formData.get("songIds") ?? "[]"))

  if (!name) return { type: "error", error: "Playlist name is required." }

  if (!(cover instanceof File) || cover.size === 0) {
    return { type: "uploadError", error: "Cover image is required." }
  }

  const ext = EXTENSIONS[cover.type]
  if (!ext || cover.size > MAX_IMAGE_SIZE) {
    return { type: "uploadError", error: "Invalid cover image." }
  }


  const filePath = `public/playlists/${user.id}-${Date.now()}.${ext}`

  const { error: uploadError } = await supabase.storage
    .from("band")
    .upload(filePath, cover, { contentType: cover.type, upsert: false })

  if (uploadError) {
    console.error(uploadError)
    return { type: "uploadError", error: uploadError.message }
  }

  const { data: urlData } = supabase.storage.from("band").getPublicUrl(filePath)
  const coverUrl = urlData.publicUrl


  const { data, error } = await supabase
    .from("playlist")
    .insert({
      name,
      favorite: false,
      band: user.id,
      cover: coverUrl,
    })
    .select("id, name")
    .single()

  if (error || !data) {
    console.error(error)
    // don't leave an orphan image behind
    await supabase.storage.from("band").remove([filePath])
    return { type: "error", error: error?.message ?? "Insert failed." }
  }


  if (songIds.length > 0) {
    const { error: songsError } = await supabase
      .from("song")
      .update({ playlist: data.id })
      .in("id", songIds)
      .eq("band", user.id)

    if (songsError) {
      console.error(songsError)
      return {
        type: "songsError",
        error: songsError.message,
        id: data.id,
        name: data.name,
        cover: coverUrl,
      }
    }
  }

  return { type: "success", id: data.id, name: data.name, cover: coverUrl }
}
