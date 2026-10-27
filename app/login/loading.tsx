import HeaderHome from "@/app/(mobile)/(basicLayout)/header-home"

export default function Loading() {
  return (
    <div className="flex min-h-screen flex-col gap-4 py-1">
      <HeaderHome img="/cover.jpg" logout={false} />

      <div
        className="w-full"
        role="status"
        aria-busy="true"
        aria-label="Loading songs"
      >
        <span className="sr-only">Loading songs...</span>

        {/* page title and subtitle */}
        <div className="space-y-2 px-4 pt-2">
          <div className="before:animate-shimmer relative h-7 w-36 overflow-hidden rounded-md bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none" />
          <div className="before:animate-shimmer relative h-3 w-52 overflow-hidden rounded bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none" />
        </div>

        {/* search bar */}
        <div className="px-4 pt-4">
          <div className="before:animate-shimmer relative h-11 w-full overflow-hidden rounded-xl bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none" />
        </div>

        {/* filter chips */}
        <div className="flex gap-2 overflow-hidden px-4 pt-4">
          {["w-16", "w-24", "w-20", "w-24"].map((width, i) => (
            <div
              key={i}
              className={`before:animate-shimmer relative h-8 shrink-0 overflow-hidden rounded-full bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none ${width}`}
            />
          ))}
        </div>

        {/* song rows: [title width, subtitle width] */}
        <ul className="space-y-1 px-2 pt-4">
          {[
            ["w-3/4", "w-1/2"],
            ["w-2/3", "w-2/5"],
            ["w-4/5", "w-3/5"],
            ["w-1/2", "w-1/3"],
            ["w-3/5", "w-1/2"],
            ["w-2/3", "w-2/5"],
          ].map(([titleWidth, subWidth], i) => (
            <li
              key={i}
              className="flex items-center gap-3 rounded-xl p-2"
              style={{ opacity: 1 - i * 0.1 }} // fades toward the bottom
            >
              <div className="before:animate-shimmer relative size-16 shrink-0 overflow-hidden rounded-lg bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none" />

              <div className="min-w-0 flex-1 space-y-2">
                <div
                  className={`before:animate-shimmer relative h-4 overflow-hidden rounded bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none ${titleWidth}`}
                />
                <div
                  className={`before:animate-shimmer relative h-3 overflow-hidden rounded bg-muted before:absolute before:inset-0 before:-translate-x-full before:bg-linear-to-r before:from-transparent before:via-foreground/10 before:to-transparent motion-reduce:before:animate-none ${subWidth}`}
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
