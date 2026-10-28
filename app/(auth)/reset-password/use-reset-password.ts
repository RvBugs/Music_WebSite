"use client"

import { useState, type FormEvent } from "react"
import { useRouter } from "next/navigation"

import resetPasswordAction from "./resetPasswordAction"

export function useResetPassword() {
  const router = useRouter()

  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [error, setError] = useState("")
  const [done, setDone] = useState(false)
  const [loading, setLoading] = useState(false)

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault()
    if (loading) return

    setError("")
    setLoading(true)

    try {
      const result = await resetPasswordAction(password, confirmPassword)

      if (result.error) {
        setError(result.error)
        return
      }

      setDone(true)
      setTimeout(() => router.replace("/"), 1200)
    } catch (err) {
      console.error("Reset password failed:", err)
      setError("Something went wrong. Please try again.")
    } finally {
      setLoading(false)
    }
  }

  return {
    password,
    setPassword,
    confirmPassword,
    setConfirmPassword,
    error,
    done,
    loading,
    handleSubmit,
  }
}
