"use client"

export default function Empty() {
  return (
    <div>
      <div className="h-[70vh] w-full">
        <main className="flex h-[65vh] w-full flex-col items-center justify-center gap-6 px-12 text-center">
          <div className="flex size-40 items-center justify-center rounded-full bg-muted">
            <h1 className="text-6xl font-semibold tracking-tight">404</h1>
          </div>

          <div className="space-y-2">
            <h2 className="pb-2 text-2xl font-semibold tracking-tight">
              No Favorites Yet
            </h2>
            <p className="max-w-sm pb-4 text-sm text-muted-foreground">
              Your favorite songs and playlists will appear here when you add them.
            </p>
          </div>
        </main>
      </div>
    </div>
  )
}
