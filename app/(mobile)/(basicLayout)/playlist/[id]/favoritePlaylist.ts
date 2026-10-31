"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error"
  error?: string
}

export default async function favoritePlaylist(
  id: string,
  fav: boolean
): Promise<RegisterResult> {
  const supabase = await createClient()

  const { error } = await supabase
    .from("playlist")
    .update({ favorite: fav })
    .eq("id", id)
    .select("*")

  return error ? { type: "error", error: error.message } : { type: "success" }
}
