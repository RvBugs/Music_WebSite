"use client"

import { motion } from "motion/react"

type FormAlertProps = {
  message: string
  tone?: "error" | "success"
}

const TONES = {
  error: "border-destructive/30 bg-destructive/10 text-destructive",
  success: "border-primary/30 bg-primary/10 text-primary",
} as const

export default function FormAlert({ message, tone = "error" }: FormAlertProps) {
  if (!message) return null

  return (
    <motion.p
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      role={tone === "error" ? "alert" : "status"}
      className={`rounded-xl border px-3 py-2.5 text-xs ${TONES[tone]}`}
    >
      {message}
    </motion.p>
  )
}
