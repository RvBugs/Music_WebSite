"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "userNotFound" | "uploadError" | "songNotFound"
  error?: string
  data?: Song[]
}

export type Song = {
  id: number
  created_at: string
  name: string
  timesig: string
  scale: string
  favourite: boolean
  chords: {
    [key: string]: unknown
  }[]
  band: string
  playlist: number | null
  cover: string | null
}

export async function load(): Promise<RegisterResult> {
  const supabase = await createClient()
  const user = await supabase.auth.getUser()

  if (!user.data.user) {
    console.error("user not found")

    return {
      type: "userNotFound",
      error: "User not found",
    }
  }

  console.log(user.data.user.id)

  const { data, error } = await supabase
    .from("song")
    .select("*")
    .eq("band", user.data.user.id)

  const allSongs = data as Song[] | null

  if (error !== null) {
    console.error("error is null, songs not found")

    return {
      type: "songNotFound",
      error: "Song not found",
    }
  } else {
    return {
      type: "success",
      data: allSongs ?? [],
    }
  }
}
