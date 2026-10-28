"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type Chord = {
  id: string
  chord: string
  repeat?: boolean
}

export type Section = {
  id: string
  name: string
  description: string
  chords: Chord[]
}

export type UpdateResult = {
  type: "success" | "error"
  error?: string
}

/**
 * Saves changes to an EXISTING song's notation (used by the editor's "Update" button).
 * Only the owner (band = current user) can update the song.
 */
export default async function updateSong(
  id: string,
  chords: Section[],
  details?: { name?: string; timesig?: string; scale?: string }
): Promise<UpdateResult> {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()

  if (!user.data.user) {
    return { type: "error", error: "User not found" }
  }

  const { error } = await supabase
    .from("song")
    .update({ chords, ...details })
    .eq("id", id)
    .eq("band", user.data.user.id)
    .select("id")
    .single()

  if (error) {
    console.error(error)

    return { type: "error", error: error.message }
  }

  revalidatePath(`/songs/${id}`)
  revalidatePath("/songs")

  return { type: "success" }
}
