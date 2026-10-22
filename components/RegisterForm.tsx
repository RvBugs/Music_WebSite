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
import registerActions from "@/app/register/registerActions"
import { validateName, validateEmail, validatePassword } from "@/lib/validate"

type Field = "name" | "email" | "password"

export function RegisterForm({
  className,
  ...props
}: React.ComponentProps<"div">) {
  const router = useRouter()

  const [values, setValues] = useState({ name: "", email: "", password: "" })
  const [touched, setTouched] = useState<Record<Field, boolean>>({
    name: false,
    email: false,
    password: false,
  })
  const [submitting, setSubmitting] = useState(false)
  const [formError, setFormError] = useState<string | null>(null)

  const errors: Record<Field, string | null> = {
    name: validateName(values.name),
    email: validateEmail(values.email),
    password: validatePassword(values.password),
  }

  const set = (field: Field) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setValues((v) => ({ ...v, [field]: e.target.value }))

  const blur = (field: Field) => () =>
    setTouched((t) => ({ ...t, [field]: true }))

  const shown = (field: Field) => (touched[field] ? errors[field] : null)

  const handleRegister = async () => {
    if (submitting) return

    setTouched({ name: true, email: true, password: true })
    if (errors.name || errors.email || errors.password) return

    setSubmitting(true)
    setFormError(null)

    try {
      const res = await registerActions(
        values.email,
        values.password,
        values.name
      )

      if (res.error) {
        setFormError(res.error)
        return
      }

      router.push("/login")
    } catch {
      setFormError("Something went wrong. Please try again.")
    } finally {
      setSubmitting(false)
    }
  }

  // there is no form, so Enter has to be wired up by hand
  const onEnter = (e: KeyboardEvent<HTMLDivElement>) => {
    if (e.key === "Enter") {
      e.preventDefault()
      handleRegister()
    }
  }

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Register your account</CardTitle>
          <CardDescription>
            Enter your details below to create your account
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div onKeyDown={onEnter}>
            <FieldGroup>
              <Field data-invalid={!!shown("name")}>
                <FieldLabel htmlFor="name">Username</FieldLabel>
                <Input
                  id="name"
                  type="text"
                  autoComplete="username"
                  placeholder="John Doe"
                  value={values.name}
                  aria-invalid={!!shown("name")}
                  onChange={set("name")}
                  onBlur={blur("name")}
                  aria-label="name"
                />
                {shown("name") && <FieldError>{shown("name")}</FieldError>}
              </Field>

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
                <FieldLabel htmlFor="password">Password</FieldLabel>
                <Input
                  id="password"
                  type="password"
                  autoComplete="new-password"
                  value={values.password}
                  aria-invalid={!!shown("password")}
                  onChange={set("password")}
                  onBlur={blur("password")}
                  aria-label="password"
                />
                {shown("password") ? (
                  <FieldError>{shown("password")}</FieldError>
                ) : (
                  <FieldDescription>
                    At least 8 characters, with a letter and a number.
                  </FieldDescription>
                )}
              </Field>

              <Field>
                {formError && <FieldError>{formError}</FieldError>}
                <Button
                  type="button"
                  onClick={handleRegister}
                  disabled={submitting}
                >
                  {submitting ? "Registering..." : "Register To Music Chord"}
                </Button>
                <FieldDescription className="text-center">
                  Have an account? <a href="/login">Login</a>
                </FieldDescription>
              </Field>
            </FieldGroup>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
