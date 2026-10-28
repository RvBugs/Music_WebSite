"use client"

import Link from "next/link"
import { LogIn } from "lucide-react"

import { Input } from "@/components/ui/input"

import AuthCard from "../_components/auth-card"
import AuthField from "../_components/auth-field"
import FormAlert from "../_components/form-alert"
import PasswordInput from "../_components/password-input"
import SubmitButton from "../_components/submit-button"
import { useLogin } from "./use-login"

export default function LoginForm() {
  const {
    email,
    password,
    error,
    fieldErrors,
    loading,
    setEmail,
    setPassword,
    validateField,
    handleSubmit,
  } = useLogin()

  return (
    <AuthCard
      title="Sign in"
      description="Enter your details to pick up where you left off."
      footer={
        <>
          New here?{" "}
          <Link
            href="/register"
            className="font-semibold text-primary underline-offset-4 hover:underline"
          >
            Create an account
          </Link>
        </>
      }
    >
      <form onSubmit={handleSubmit} className="space-y-5" noValidate>
        <AuthField id="email" label="Email" error={fieldErrors.email}>
          <Input
            id="email"
            type="email"
            autoComplete="email"
            placeholder="e.g. mybandname@gmail.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            onBlur={() => email && validateField("email")}
            aria-invalid={!!fieldErrors.email || !!error}
            aria-describedby={fieldErrors.email ? "email-error" : undefined}
            className="h-11 rounded-xl"
            disabled={loading}
            required
          />
        </AuthField>

        <AuthField
          id="password"
          label="Password"
          error={fieldErrors.password}
          action={
            <Link
              href="/forgot-password"
              className="text-xs text-muted-foreground underline-offset-4 hover:text-foreground hover:underline"
            >
              Forgot password?
            </Link>
          }
        >
          <PasswordInput
            id="password"
            autoComplete="current-password"
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            onBlur={() => password && validateField("password")}
            aria-invalid={!!fieldErrors.password || !!error}
            aria-describedby={fieldErrors.password ? "password-error" : undefined}
            disabled={loading}
            required
          />
        </AuthField>

        <FormAlert message={error} />

        <SubmitButton
          loading={loading}
          label="Sign in"
          loadingLabel="Signing in"
          icon={<LogIn />}
        />
      </form>
    </AuthCard>
  )
}
