"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error"
  error?: string
  data?: PlaylistWithSongs
}

export type PlaylistSong = {
  id: number
  name: string
  timesig: string
  scale: string
  favourite: boolean
  cover: string | null
}

export type PlaylistWithSongs = {
  id: number
  created_at: string
  name: string
  description: string | null
  band: string
  cover: string | null
  songs: PlaylistSong[]
}

export default async function getPlaylistFromId(id: string): Promise<RegisterResult> {
  const supabase = await createClient()

  const { data: playlist, error } = await supabase
    .from("playlist")
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

  // songs belonging to this playlist (song.playlist = playlist.id)
  const { data: songs, error: songsError } = await supabase
    .from("song")
    .select("id, name, timesig, scale, favourite, cover")
    .eq("playlist", id)

  if (songsError) {
    console.error(songsError)

    return {
      type: "error",
      error: songsError.message,
    }
  }

  return {
    type: "success",
    data: {
      ...(playlist as Omit<PlaylistWithSongs, "songs">),
      songs: (songs as PlaylistSong[] | null) ?? [],
    },
  }
}
