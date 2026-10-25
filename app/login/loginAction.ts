"use server"

import { revalidatePath } from "next/cache"
import { validateEmail, validatePassword } from "@/lib/validate"

import { createClient } from "@/lib/supabase/server"

export default async function loginAction(email: string, password: string) {
  const supabase = await createClient()

  const invalid = validateEmail(email) ?? validatePassword(password)

  if (invalid) return { error: invalid }

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) return { error: error.message }

  revalidatePath("/", "layout")

  console.log("login success")

  return {
    error: null,
  }
}