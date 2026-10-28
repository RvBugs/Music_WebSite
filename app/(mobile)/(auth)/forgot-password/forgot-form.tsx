"use client"

import Link from "next/link"
import { ArrowLeft, Mail } from "lucide-react"

import { Input } from "@/components/ui/input"

import AuthCard from "../_components/auth-card"
import AuthField from "../_components/auth-field"
import FormAlert from "../_components/form-alert"
import SubmitButton from "../_components/submit-button"
import { useForgotPassword } from "./use-forgot-password"

export default function ForgotForm() {
  const { email, setEmail, error, sent, loading, handleSubmit } =
    useForgotPassword()

  return (
    <AuthCard
      title="Forgot password?"
      description="We'll email you a link to set a new one."
      footer={
        <Link
          href="/login"
          className="inline-flex items-center gap-1.5 font-medium text-foreground underline-offset-4 hover:underline"
        >
          <ArrowLeft className="size-3.5" />
          Back to sign in
        </Link>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5">
        <AuthField id="email" label="Email">
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. mybandname@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            aria-invalid={!!error}
            className="h-11 rounded-xl bg-muted/40"
            disabled={loading}
            required
          />
        </AuthField>

        <FormAlert message={error} />
        {sent && (
          <FormAlert
            tone="success"
            message="Check your inbox. If an account exists for that email, a reset link is on its way."
          />
        )}

        <SubmitButton
          loading={loading}
          label="Send reset link"
          loadingLabel="Sending"
          icon={<Mail />}
        />
      </form>
    </AuthCard>
  )
}
