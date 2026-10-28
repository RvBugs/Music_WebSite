"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import { validateEmail, validatePassword } from "@/lib/validate"

import type { FieldErrors } from "../_lib/types"
import loginAction from "./loginAction"

type Field = "email" | "password"

const GENERIC_ERROR = "Something went wrong. Please try again."

export function useLogin() {
  const router = useRouter()

  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors<Field>>({})
  const [loading, setLoading] = useState(false)

  function validateField(field: Field) {
    const message =
      field === "email" ? validateEmail(email.trim()) : validatePassword(password)

    setFieldErrors((prev) => ({ ...prev, [field]: message ?? undefined }))
    return !message
  }

  function clearFieldError(field: Field) {
    setFieldErrors((prev) => ({ ...prev, [field]: undefined }))
  }

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    setError("")
    if (![validateField("email"), validateField("password")].every(Boolean)) {
      return
    }

    setLoading(true)

    try {
      const result = await loginAction(email.trim(), password)

      if (result.error) {
        setError(result.error)
        setLoading(false)
        return
      }


      router.replace("/")
      router.refresh()
    } catch (err) {
      console.error("Login failed:", err)
      setError(GENERIC_ERROR)
      setLoading(false)
    }
  }

  return {
    email,
    password,
    error,
    fieldErrors,
    loading,
    setEmail: (value: string) => {
      setEmail(value)
      clearFieldError("email")
    },
    setPassword: (value: string) => {
      setPassword(value)
      clearFieldError("password")
    },
    validateField,
    handleSubmit,
  }
}
