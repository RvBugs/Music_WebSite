import { UserRound } from "lucide-react"

import { cn } from "@/lib/utils"

type AvatarProps = {
  src: string | null
  className?: string
}

export function Avatar({ src, className }: AvatarProps) {
  const frame = cn(
    "relative z-10 size-24 shrink-0 rounded-full border-4 border-card bg-muted shadow-md sm:size-28",
    className
  )

  if (!src) {
    return (
      <div className={cn(frame, "flex items-center justify-center")}>
        <UserRound className="size-10 text-muted-foreground" />
      </div>
    )
  }

  return (
    // eslint-disable-next-line @next/next/no-img-element
    <img src={src} alt="Profile picture" className={cn(frame, "object-cover")} />
  )
}
