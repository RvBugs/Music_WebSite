"use server"

import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error"
  error?: string
}


export default async function favoriteSong(id: string ,fav: boolean) : Promise<RegisterResult> {
  const supabase = await createClient()

  const {error} = await supabase
    .from("song")
    .update({favourite: fav})
    .eq("id", id)
    .select("*")

  if (error) {
    return {
      type: "error",
      error: error.message
    }
  }

  return {
    type: "success"
  }
}