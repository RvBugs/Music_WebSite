"use client"

import { useState, type FormEvent } from "react"

import forgotPasswordAction from "./forgotPasswordAction"

export function useForgotPassword() {
  const [email, setEmail] = useState("")
  const [error, setError] = useState("")
  const [sent, setSent] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    setError("")
    setSent(false)
    setLoading(true)

    try {
      const result = await forgotPasswordAction(email.trim())

      if (result.error) setError(result.error)
      else setSent(true)
    } catch (err) {
      console.error("Forgot password failed:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return { email, setEmail, error, sent, loading, handleSubmit }
}
