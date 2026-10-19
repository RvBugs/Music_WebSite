"use client"

import Link from "next/link"
import Image from "next/image"
import { useTheme } from "next-themes"
import { Moon, Sun } from "lucide-react"

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <button
      type="button"
      aria-label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
      className="flex size-12 cursor-pointer items-center justify-center rounded-full outline-none"
    >
      <span className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-secondary [button:focus-visible_&]:ring-2 [button:focus-visible_&]:ring-ring">
        <Sun size={24} className="hidden dark:block" />
        <Moon size={24} className="block dark:hidden" />
      </span>
    </button>
  )
}

function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card pt-[env(safe-area-inset-top)] md:hidden">
      <div className="mx-auto flex h-16 max-w-xl items-center justify-between gap-1 px-1">
        <Link
          href="/public"
          aria-label="Home"
          className="flex size-12 shrink-0 items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-ring"
        >
          <Image src="/icon.png" alt="logo" width={24} height={24} />
        </Link>

        <ThemeToggle />
      </div>
    </header>
  )
}

export default function BasicAppLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <section>
      {/*<TopBar />*/}
      {children}
    </section>
  )
}
