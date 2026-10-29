import { Check, Circle } from "lucide-react"

import { cn } from "@/lib/utils"
import type { PasswordCheck } from "../lib/passwordRules"

type PasswordChecklistProps = {
  checks: PasswordCheck[]
}

export function PasswordChecklist({ checks }: PasswordChecklistProps) {
  return (
    <ul className="space-y-1.5 rounded-xl bg-muted/50 p-3" aria-label="Password requirements">
      {checks.map(({ id, label, met }) => (
        <li
          key={id}
          className={cn(
            "flex items-center gap-2 text-xs transition-colors",
            met ? "text-green-600" : "text-muted-foreground"
          )}
        >
          {met ? (
            <Check className="size-3.5" aria-hidden="true" />
          ) : (
            <Circle className="size-3.5" aria-hidden="true" />
          )}

          <span>{label}</span>
          <span className="sr-only">{met ? "(done)" : "(not yet)"}</span>
        </li>
      ))}
    </ul>
  )
}
