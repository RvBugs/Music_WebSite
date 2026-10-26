"use client"

import { useState, type KeyboardEvent } from "react"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"

import { Button } from "@/components/ui/button"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field"
import { Input } from "@/components/ui/input"
import { validateEmail } from "@/lib/validate"
import loginAction from "@/app/login/loginAction"

type Field = "email" | "password"

export function LoginForm({
  className,
  registered = false,
  ...props
}: React.ComponentProps<"div"> & { registered?: boolean }) {
  const router = useRouter()

  const [values, setValues] = useState({ email: "", password: "" })
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    email: false,
    password: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const errors: Record<Field, string | null> = {
    email: validateEmail(values.email),
    password: values.password ? null : "Password is required",
  }

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) => {
    setValues((v) => ({ ...v, [field]: e.target.value }))
    setFormError(null) // clear the server error as soon as they edit
  }

  const blur = (field: Field) => () =>
    setTouched((t) => ({ ...t, [field]: true }))

  const shown = (field: Field) => (touched[field] ? errors[field] : null)

  const handleLogin = async () => {
    if (submitting) return

    setTouched({ email: true, password: true })
    if (errors.email || errors.password) return

    setSubmitting(true)
    setFormError(null)

    try {
      const res = await loginAction(values.email, values.password)

      if (res.error) {
        setFormError(res.error)
        return
      }

      router.replace("/")
      router.refresh()
    } catch {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  const onEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleLogin().then(r => {})
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Login to your account</CardTitle>
          <CardDescription>
            {registered
              ? "Account created. Check your email to confirm it, then log in."
              : "Enter your email below to login to your account"}
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div onKeyDown={onEnter}>
            <FieldGroup>
              <Field data-invalid={!!shown("email")}>
                <FieldLabel htmlFor="email">Email</FieldLabel>
                <Input
                  id="email"
                  type="email"
                  autoComplete="email"
                  placeholder="m@example.com"
                  value={values.email}
                  aria-invalid={!!shown("email")}
                  onChange={set("email")}
                  onBlur={blur("email")}
                  aria-label="email"
                />
                {shown("email") && <FieldError>{shown("email")}</FieldError>}
              </Field>

              <Field data-invalid={!!shown("password")}>
                <div className="flex items-center">
                  <FieldLabel htmlFor="password">Password</FieldLabel>
                  <a
                    href="/forgot-password"
                    className="ml-auto inline-block text-sm underline-offset-4 hover:underline"
                  >
                    Forgot your password?
                  </a>
                </div>
                <Input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  value={values.password}
                  aria-invalid={!!shown("password")}
                  onChange={set("password")}
                  onBlur={blur("password")}
                  aria-label="password"
                />
                {shown("password") && (
                  <FieldError>{shown("password")}</FieldError>
                )}
              </Field>

              <Field>
                {formError && <FieldError>{formError}</FieldError>}
                <Button
                  type="button"
                  onClick={handleLogin}
                  disabled={submitting}
                >
                  {submitting ? "Logging in..." : "Login To Music Chord"}
                </Button>
                <FieldDescription className="text-center">
                  Don&apos;t have an account? <a href="/register">Sign up</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
