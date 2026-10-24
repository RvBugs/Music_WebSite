"use server"

import { createClient } from "@/lib/supabase/server"

interface Chord {
  id: string
  chord: string
  repeat?: boolean
}

interface Section {
  id: string
  name: string
  description: string
  chords: Chord[]
}

export type RegisterResult = {
  type: "success" | "error"
  error?: string
  data?: Section[] | null
}

export default async function loadEditor(
  band: string,
  songName: string,
): Promise<RegisterResult> {
  const supabase = await createClient()
  const { data, error } = await supabase
    .from("song")
    .select("chords")
    .eq("band", band)
    .eq("name", songName)

  if (error) {
    return { type: "error", error: error.message }
  }

  const sections = (data ?? []).flatMap((song) => song.chords ?? [])

  return {
    type: "success",
    data: sections,
  }
}