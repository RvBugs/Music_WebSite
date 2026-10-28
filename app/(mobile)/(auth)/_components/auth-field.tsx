import type { ReactNode } from "react"

import { Label } from "@/components/ui/label"

type AuthFieldProps = {
  id: string
  label: string
  error?: string
  action?: ReactNode
  children: ReactNode
}

export default function AuthField({
  id,
  label,
  error,
  action,
  children,
}: AuthFieldProps) {
  return (
    <div className="space-y-1.5">
      <div className="flex items-center justify-between">
        <Label htmlFor={id} className="text-sm font-medium">
          {label}
        </Label>
        {action}
      </div>

      {children}

      {error && (
        <p id={`${id}-error`} className="text-xs text-destructive">
          {error}
        </p>
      )}
    </div>
  )
}
