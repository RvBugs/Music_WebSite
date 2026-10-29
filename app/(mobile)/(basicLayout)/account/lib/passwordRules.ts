import type { PasswordFields } from "../types"

export const MIN_PASSWORD_LENGTH = 8

export type PasswordCheck = {
  id: "length" | "number" | "match"
  label: string
  met: boolean
}

export function validatePasswordForm({
  current,
  next,
  confirm,
}: PasswordFields): string | null {
  if (!current || !next || !confirm) {
    return "Please fill in all password fields."
  }

  if (next.length < MIN_PASSWORD_LENGTH) {
    return `Your new password must be at least ${MIN_PASSWORD_LENGTH} characters.`
  }

  if (!/\d/.test(next)) {
    return "Your new password must include at least one number."
  }

  if (next !== confirm) {
    return "Your new passwords do not match."
  }

  if (current === next) {
    return "Your new password must differ from your current password."
  }

  return null
}


export function getPasswordChecks(next: string, confirm: string): PasswordCheck[] {
  return [
    {
      id: "length",
      label: `At least ${MIN_PASSWORD_LENGTH} characters`,
      met: next.length >= MIN_PASSWORD_LENGTH,
    },
    {
      id: "number",
      label: "Includes a number",
      met: /\d/.test(next),
    },
    {
      id: "match",
      label: "Both passwords match",
      met: confirm.length > 0 && next === confirm,
    },
  ]
}
