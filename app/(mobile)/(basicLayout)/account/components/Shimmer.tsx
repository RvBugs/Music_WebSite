import { cn } from "@/lib/utils"

const SHIMMER =
  "before:animate-shimmer relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none"

type ShimmerProps = {
  className?: string
}

export function Shimmer({ className }: ShimmerProps) {
  return <div aria-hidden="true" className={cn(SHIMMER, className)} />
}
