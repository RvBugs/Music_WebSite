import HeaderHome from "../../header-home"
import { Shimmer } from "./Shimmer"

const DETAIL_ROWS = ["w-28", "w-48", "w-32", "w-full"]


export function AccountSkeleton() {
  return (
    <div className="flex min-h-screen flex-col gap-4 py-1">
      <HeaderHome img="/cover.jpg" logout={false} />

      <div
        className="w-full space-y-6 px-4"
        role="status"
        aria-busy="true"
        aria-label="Loading account"
      >
        <span className="sr-only">Loading your account...</span>

        {/* hero card */}
        <div className="overflow-hidden rounded-2xl border">
          <Shimmer className="h-36 w-full rounded-none" />

          <div className="flex items-end gap-4 px-5 pb-5">
            <Shimmer className="-mt-10 size-24 shrink-0 rounded-full border-4 border-background" />

            <div className="flex-1 space-y-2 pb-1">
              <Shimmer className="h-5 w-40 rounded" />
              <Shimmer className="h-3 w-56 rounded" />
            </div>
          </div>
        </div>

        {/* detail rows */}
        <div className="space-y-3">
          {DETAIL_ROWS.map((width, index) => (
            <div key={index} className="flex items-center gap-3">
              <Shimmer className="size-9 shrink-0 rounded-lg" />

              <div className="flex-1 space-y-2">
                <Shimmer className="h-3 w-16 rounded" />
                <Shimmer className={`h-4 rounded ${width}`} />
              </div>
            </div>
          ))}
        </div>


        <Shimmer className="h-72 w-full rounded-2xl" />
      </div>
    </div>
  )
}
