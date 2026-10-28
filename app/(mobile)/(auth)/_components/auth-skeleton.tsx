import { cn } from "@/lib/utils"

function Shimmer({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative overflow-hidden bg-muted before:absolute before:inset-0 before:-translate-x-full before:animate-shimmer before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none",
        className
      )}
    />
  )
}

export default function AuthSkeleton({ fields = 2 }: { fields?: number }) {
  return (
    <div
      className="grid min-h-dvh w-full lg:grid-cols-2"
      role="status"
      aria-busy="true"
      aria-label="Loading"
    >
      <span className="sr-only">Loading...</span>

      <Shimmer className="h-[34dvh] lg:h-auto" />

      <div className="-mt-6 flex flex-1 justify-center rounded-t-3xl bg-background px-6 py-10 lg:mt-0 lg:items-center lg:rounded-none">
        <div className="w-full max-w-sm space-y-6">
          <div className="space-y-2">
            <Shimmer className="h-7 w-32 rounded-md" />
            <Shimmer className="h-3 w-56 rounded" />
          </div>
          {Array.from({ length: fields }).map((_, i) => (
            <Shimmer key={i} className="h-11 w-full rounded-xl" />
          ))}
          <Shimmer className="h-11 w-full rounded-xl" />
        </div>
      </div>
    </div>
  )
}
