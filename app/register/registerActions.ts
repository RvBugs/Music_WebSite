"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { validateName, validateEmail, validatePassword } from "@/lib/validate"

export type RegisterResult = { error?: string }

export default async function registerActions(
  email: string,
  password: string,
  userName: string
): Promise<RegisterResult> {
  const invalid =
    validateName(userName) ?? validateEmail(email) ?? validatePassword(password)
  if (invalid) return { error: invalid }

  const supabase = await createClient()

  const { error } = await supabase.auth.signUp({
    email: email.trim(),
    password,
    options: {
      data: { userName: userName.trim() },
    },
  })

  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return {}
}
