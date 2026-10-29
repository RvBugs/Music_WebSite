import { Eye, EyeOff } from "lucide-react"
import type { ReactNode } from "react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

type PasswordFieldProps = {
  id: string
  label: string
  toggleNoun: string
  value: string
  visible: boolean
  placeholder: string
  autoComplete: "current-password" | "new-password"
  disabled: boolean
  onChange: (value: string) => void
  onToggle: () => void
  minLength?: number
  inputLabel?: string
  hint?: ReactNode
}

export function PasswordField({
  id,
  label,
  toggleNoun,
  value,
  visible,
  placeholder,
  autoComplete,
  disabled,
  onChange,
  onToggle,
  minLength,
  inputLabel,
  hint,
}: PasswordFieldProps) {
  return (
    <div className="space-y-1.5">
      <Label htmlFor={id}>{label}</Label>

      <div className="relative">
        <Input
          id={id}
          type={visible ? "text" : "password"}
          value={value}
          onChange={(event) => onChange(event.target.value)}
          placeholder={placeholder}
          autoComplete={autoComplete}
          minLength={minLength}
          required
          disabled={disabled}
          aria-label={inputLabel}
          className="h-12 rounded-xl pr-11"
        />

        <button
          type="button"
          onClick={onToggle}
          aria-label={`${visible ? "Hide" : "Show"} ${toggleNoun}`}
          aria-pressed={visible}
          className="absolute inset-y-0 right-0 flex w-11 items-center justify-center rounded-r-xl text-muted-foreground transition-colors hover:text-foreground"
        >
          {visible ? <EyeOff className="size-4" /> : <Eye className="size-4" />}
        </button>
      </div>

      {hint && <p className="text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
