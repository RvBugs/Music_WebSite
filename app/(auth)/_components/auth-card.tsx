"use client"

import type { ReactNode } from "react"
import { motion } from "motion/react"

type AuthCardProps = {
  title: string
  description: string
  footer?: ReactNode
  children: ReactNode
}

export default function AuthCard({
  title,
  description,
  footer,
  children,
}: AuthCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="w-full max-w-sm"
    >
      <header className="mb-8 space-y-1">
        <h2 className="text-2xl font-semibold tracking-tight">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </header>

      {children}

      {footer && (
        <div className="mt-6 text-center text-sm text-muted-foreground">
          {footer}
        </div>
      )}
    </motion.div>
  )
}
