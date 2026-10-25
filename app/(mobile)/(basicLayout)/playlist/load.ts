"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "userNotFound" | "playlistNotFound"
  error?: string
  data?: Playlist[]
}

export type Playlist = {
  id: number
  created_at: string
  name: string
  description: string | null
  band: string
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

  const { data, error } = await supabase
    .from("playlist")
    .select("*")
    .eq("band", user.data.user.id)
    .order("created_at", { ascending: false })

  if (error !== null) {
    console.error(error)

    return {
      type: "playlistNotFound",
      error: "Playlist not found",
    }
  }

  return {
    type: "success",
    data: (data as Playlist[] | null) ?? [],
  }
}
