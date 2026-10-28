import { useState, type FormEvent } from "react"

import { createClient } from "@/lib/supabase/client"
import { validatePasswordForm } from "../lib/passwordRules"
import type { FieldKey, FieldVisibility, PasswordFields } from "../types"

const EMPTY_FIELDS: PasswordFields = { current: "", next: "", confirm: "" }
const ALL_HIDDEN: FieldVisibility = {
  current: false,
  next: false,
  confirm: false,
}

export function usePasswordReset(email: string | null) {
  const [fields, setFields] = useState<PasswordFields>(EMPTY_FIELDS)
  const [visible, setVisible] = useState<FieldVisibility>(ALL_HIDDEN)

  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [saving, setSaving] = useState(false)

  function setField(key: FieldKey, value: string) {
    setFields((previous) => ({ ...previous, [key]: value }))
  }

  function toggleVisible(key: FieldKey) {
    setVisible((previous) => ({ ...previous, [key]: !previous[key] }))
  }

  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    setError("")
    setSuccess("")

    const problem = validatePasswordForm(fields)

    if (problem) {
      setError(problem)
      return
    }

    if (!email) {
      setError("Your account email could not be found.")
      return
    }

    setSaving(true)

    try {
      const supabase = createClient()

      // Step 1: prove the person knows the current password.
      const { error: signInError } = await supabase.auth.signInWithPassword({
        email,
        password: fields.current,
      })

      if (signInError) {
        setError("Your current password is incorrect.")
        return
      }

      // Step 2: store the new one.
      const { error: updateError } = await supabase.auth.updateUser({
        password: fields.next,
      })

      if (updateError) {
        setError(updateError.message)
        return
      }

      setSuccess("Your password has been updated successfully.")
      setFields(EMPTY_FIELDS)
      setVisible(ALL_HIDDEN)
    } catch {
      setError("Something went wrong. Please try again.")
    } finally {
      setSaving(false)
    }
  }

  return {
    fields,
    visible,
    error,
    success,
    saving,
    setField,
    toggleVisible,
    submit,
  }
}
