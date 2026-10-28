"use client"

import { KeyRound } from "lucide-react"

import AuthCard from "../_components/auth-card"
import AuthField from "../_components/auth-field"
import FormAlert from "../_components/form-alert"
import PasswordInput from "../_components/password-input"
import SubmitButton from "../_components/submit-button"
import { useResetPassword } from "./use-reset-password"

export default function ResetForm() {
  const {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    done,
    loading,
    handleSubmit,
  } = useResetPassword()

  const disabled = loading || done

  return (
    <AuthCard
      title="Set a new password"
      description="Choose something you'll remember this time."
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField id="password" label="New password">
          <PasswordInput
            id="password"
            autoComplete="new-password"
            placeholder="Enter a new password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            aria-invalid={!!error}
            disabled={disabled}
            required
          />
        </AuthField>

        <AuthField id="confirm-password" label="Confirm password">
          <PasswordInput
            id="confirm-password"
            autoComplete="new-password"
            placeholder="Repeat the new password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            aria-invalid={!!error}
            disabled={disabled}
            required
          />
        </AuthField>

        <FormAlert message={error} />
        {done && (
          <FormAlert tone="success" message="Password updated. Redirecting..." />
        )}

        <SubmitButton
          loading={loading}
          label="Update password"
          loadingLabel="Updating"
          icon={<KeyRound />}
        />
      </form>
    </AuthCard>
  )
}
