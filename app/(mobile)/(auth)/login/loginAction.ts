"use server"

import { revalidatePath } from "next/cache"

import { createClient } from "@/lib/supabase/server"
import { validateEmail, validatePassword } from "@/lib/validate"

import type { ActionResult } from "../_lib/types"

export default async function loginAction(
  email: string,
  password: string
): Promise<ActionResult> {
  const validationError = validateEmail(email) ?? validatePassword(password)
  if (validationError) return { error: validationError }

  const supabase = await createClient()
  const { error } = await supabase.auth.signInWithPassword({ email, password })
  if (error) return { error: error.message }

  revalidatePath("/", "layout")
  return { error: null }
}
