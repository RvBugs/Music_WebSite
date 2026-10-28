import type { ReactNode } from "react"

// Auth pages live outside (basicLayout), so the bottom bar is not rendered here.
export default function AuthLayout({ children }: { children: ReactNode }) {
  return <div className="min-h-dvh w-full bg-background">{children}</div>
}
