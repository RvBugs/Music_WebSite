"use client"

import { useState, type ComponentProps } from "react"
import { Eye, EyeOff } from "lucide-react"

import { Input } from "@/components/ui/input"

type PasswordInputProps = Omit<ComponentProps<typeof Input>, "type">

export default function PasswordInput({
  className,
  ...props
}: PasswordInputProps) {
  const [visible, setVisible] = useState(false)
  const Icon = visible ? EyeOff : Eye

  return (
    <div className="relative">
      <Input
        {...props}
        type={visible ? "text" : "password"}
        className={`h-11 rounded-xl bg-muted/40 pr-11 ${className ?? ""}`}
      />
      <button
        type="button"
        onClick={() => setVisible((v) => !v)}
        aria-label={visible ? "Hide password" : "Show password"}
        aria-pressed={visible}
        className="absolute inset-y-0 right-0 flex w-11 items-center justify-center text-muted-foreground transition-colors hover:text-foreground"
      >
        <Icon className="size-4" />
      </button>
    </div>
  )
}
