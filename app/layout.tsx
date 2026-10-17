"use client"
import { Geist, Geist_Mono } from "next/font/google"

import "./globals.css"
import { ThemeProvider } from "@/components/theme-provider"
import { cn } from "@/lib/utils"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  AudioLines,
  CircleUserRound,
  Disc3,
  House,
  Moon,
  Search,
  Sun,
  type LucideIcon,
} from "lucide-react"
import { useTheme } from "next-themes"

const geist = Geist({ subsets: ["latin"], variable: "--font-sans" })

const fontMono = Geist_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
})

const NAV_ITEMS: { href: string; label: string; icon: LucideIcon }[] = [
  { href: "/", label: "Home", icon: House },
  { href: "/playlist", label: "Playlist", icon: Disc3 },
  { href: "/search", label: "Search", icon: Search },
  { href: "/songs", label: "Songs", icon: AudioLines },
  { href: "/account", label: "Account", icon: CircleUserRound },
]

const isActivePath = (pathname: string, href: string) =>
  href === "/" ? pathname === "/" : pathname.startsWith(href)

// Material 3 icon button: 40px circle with a hover/focus state layer
function IconButton({
  label,
  onClick,
  children,
}: {
  label: string
  onClick?: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      aria-label={label}
      onClick={onClick}
      className="flex size-12 cursor-pointer items-center justify-center rounded-full outline-none"
    >
      <span className="flex size-10 items-center justify-center rounded-full text-muted-foreground transition-colors hover:bg-muted hover:text-foreground active:bg-secondary [button:focus-visible_&]:ring-2 [button:focus-visible_&]:ring-ring">
        {children}
      </span>
    </button>
  )
}

function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()

  return (
    <IconButton
      label="Toggle theme"
      onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
    >
      <Sun size={24} className="hidden dark:block" />
      <Moon size={24} className="block dark:hidden" />
    </IconButton>
  )
}

function TopBar() {
  return (
    <header className="sticky top-0 z-50 border-b bg-card pt-[env(safe-area-inset-top)]">
      <div className="mx-auto flex h-16 max-w-xl items-center justify-between gap-1 px-1">
        <Link
          href="/"
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

function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      aria-label="Main navigation"
      className="fixed inset-x-0 bottom-0 z-50 border-t bg-card pb-[env(safe-area-inset-bottom)]"
    >
      <ul className="mx-auto flex h-20 max-w-xl items-stretch">
        {NAV_ITEMS.map(({ href, label, icon: Icon }) => {
          const active = isActivePath(pathname, href)

          return (
            <li key={href} className="flex-1">
              <Link
                href={href}
                aria-current={active ? "page" : undefined}
                className="group flex h-full flex-col items-center justify-center gap-1 outline-none"
              >
                <span className="relative flex h-8 w-16 items-center justify-center">
                  <span
                    aria-hidden
                    className={cn(
                      "absolute inset-0 rounded-full transition-all duration-200",
                      active
                        ? "scale-x-100 bg-secondary opacity-100"
                        : "scale-x-50 opacity-0 group-hover:scale-x-100 group-hover:bg-muted group-hover:opacity-100",
                      "group-focus-visible:ring-2 group-focus-visible:ring-ring"
                    )}
                  />
                  <Icon
                    size={24}
                    strokeWidth={active ? 2.5 : 2}
                    className={cn(
                      "relative transition-colors",
                      active
                        ? "text-secondary-foreground"
                        : "text-muted-foreground"
                    )}
                  />
                </span>
                <span
                  className={cn(
                    "text-xs leading-4 transition-colors",
                    active
                      ? "font-semibold text-foreground"
                      : "font-medium text-muted-foreground"
                  )}
                >
                  {label}
                </span>
              </Link>
            </li>
          )
        })}
      </ul>
    </nav>
  )
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning
      className={cn(
        "antialiased",
        fontMono.variable,
        "font-sans",
        geist.variable
      )}
    >
      <body>
        <ThemeProvider>
          <TopBar />
          <div className="pb-24">{children}</div>
          <BottomNav />
        </ThemeProvider>
      </body>
    </html>
  )
}
