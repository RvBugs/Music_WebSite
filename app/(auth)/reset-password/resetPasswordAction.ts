"use server"

import { createClient } from "@/lib/supabase/server"
import { validatePassword } from "@/lib/validate"

import type { ActionResult } from "../_lib/types"

export default async function resetPasswordAction(
  password: string,
  confirmPassword: string
): Promise<ActionResult> {
  const validationError = validatePassword(password)
  if (validationError) return { error: validationError }

  if (password !== confirmPassword) {
    return { error: "Passwords do not match." }
  }

  const supabase = await createClient()
  const { error } = await supabase.auth.updateUser({ password })
  if (error) return { error: error.message }

  return { error: null }
}
