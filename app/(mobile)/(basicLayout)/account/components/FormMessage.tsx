import { cn } from "@/lib/utils"

type FormMessageProps = {
  tone: "error" | "success"
  children: string
}

const TONES = {
  error: "bg-destructive/10 text-destructive",
  success: "bg-green-500/10 text-green-600",
} as const

export function FormMessage({ tone, children }: FormMessageProps) {
  return (
    <p
      role={tone === "error" ? "alert" : "status"}
      className={cn("rounded-xl p-3 text-sm", TONES[tone])}
    >
      {children}
    </p>
  )
}
