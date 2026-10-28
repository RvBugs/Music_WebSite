"use server"

import { headers } from "next/headers"

import { createClient } from "@/lib/supabase/server"
import { validateEmail } from "@/lib/validate"

import type { ActionResult } from "../_lib/types"

export default async function forgotPasswordAction(
  email: string
): Promise<ActionResult> {
  const validationError = validateEmail(email)
  if (validationError) return { error: validationError }

  const origin = (await headers()).get("origin") ?? ""
  const supabase = await createClient()

  const { error } = await supabase.auth.resetPasswordForEmail(email, {
    redirectTo: `${origin}/reset-password`,
  })
  if (error) return { error: error.message }

  return { error: null }
}
