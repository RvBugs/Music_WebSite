"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "uploadError",
  error?: string,
  id?: string,
  name?: string,
  cover?: string,
}

export default async function createNewSong(name: string, timesig: string, scale: string ,cover: File) : Promise<RegisterResult> {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()

  const fileName = `public/songs/${cover.name}-${name}-${Date.now()}`

  const uploadResults = await supabase.storage
    .from("band")
    .upload(
      fileName,
      cover
    )

  if (uploadResults.error) {
    console.error(uploadResults.error)

    return {
      type: "uploadError",
      error: uploadResults.error.message,
    }
  }

  const publicUrl = supabase.storage.from("band").getPublicUrl(fileName)


  const { data, error } = await supabase
    .from("song")
    .insert([{ name: name, timesig: timesig, scale: scale, band: user.data.user?.id }])
    .select("id ,name")
    .single()

  if (error) {
    console.error(error)

    return {
      type: "error",
      error: error.message,
    }
  }

  return {
    type: "success",
    id: data.id as string,
    name: data.name as string,
    cover: publicUrl.data.publicUrl,
  }
}