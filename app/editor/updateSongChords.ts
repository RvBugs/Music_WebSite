"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "uploadError"
  error?: string
}

export default async function updateSongChords(songId: string, chords: string): Promise<RegisterResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from("song")
    .update({ chords: JSON.parse(chords) })
    .eq('id', songId)
    .select()

  if (error) {
    console.error(error)

    return {
      type: "error",
      error: error.message,
    }
  }

  return {
    type: "success"
  }
}
