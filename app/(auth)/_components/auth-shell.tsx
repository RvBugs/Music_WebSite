import type { ReactNode } from "react"

import AuthHero from "./auth-hero"

type AuthShellProps = {
  heroTitle: string
  heroSubtitle: string
  children: ReactNode
}

export default function AuthShell({
  heroTitle,
  heroSubtitle,
  children,
}: AuthShellProps) {
  return (
    <main className="grid min-h-dvh w-full lg:grid-cols-2">
      <AuthHero title={heroTitle} subtitle={heroSubtitle} />

      <section className="relative -mt-6 flex flex-1 items-start justify-center rounded-t-3xl bg-background px-6 py-10 sm:items-center lg:mt-0 lg:rounded-none lg:py-0">
        {children}
      </section>
    </main>
  )
}
