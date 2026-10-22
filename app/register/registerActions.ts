"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"

export type RegisterResult = {
  type: "success" | "error" | "uploadError"
  error?: string
}

export default async function registerActions(
  email: string,
  password: string,
  bandName: string,
  bandDescription: string,
  bandImage: File,
): Promise<RegisterResult> {
  const supabase = await createClient()

  const uploadResults = await supabase.storage.from("band").upload(
    `public/avatar/${bandImage.name}-${bandName}-${Date.now()}`,
    bandImage,
  )

  if (uploadResults.error) {

    console.error(uploadResults.error)

    return {
      type: "uploadError",
      error: uploadResults.error.message,
    }
  }

  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: {
        name: bandName.trim(),
        description: bandDescription.trim(),
        avatar: uploadResults.data.fullPath,
      },
    },
  })

  if (error) {

    console.error(error)

    return {
      type: "error",
      error: error.message
    }
  }

  revalidatePath("/", "layout")

  return {
    type: "success",
  }
}
