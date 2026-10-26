"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "uploadError"
  error?: string
  data?: Song
}

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

export type Song = {
  id: number
  created_at: string
  name: string
  timesig: string
  scale: string
  favourite: boolean
  chords: Section[] | null
  band: string
  playlist: number | null
  cover: string | null
}

export default async function getSongFromId(id: string): Promise<RegisterResult> {
  const supabase = await createClient()

  const { data, error } = await supabase
    .from("song")
    .select("*")
    .eq("id", id)
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
    data: data as Song,
  }
}
