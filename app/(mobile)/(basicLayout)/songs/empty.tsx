"use client"

import { Plus, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Empty() {
  const router = useRouter()

  return (
    <div>
      <div className="h-[70vh] w-full">
        <main className="flex h-[65vh] w-full flex-col items-center justify-center gap-6 px-12 text-center">
          <div className="flex size-40 items-center justify-center rounded-full bg-muted">
            <h1 className="text-6xl font-semibold tracking-tight">404</h1>
          </div>

          <div className="space-y-2">
            <h2 className="pb-2 text-2xl font-semibold tracking-tight">
              No Songs Found
            </h2>
            <p className="max-w-sm pb-4 text-sm text-muted-foreground">
              No songs found for this band. Please try again to add new songs.
            </p>
            <Button
              className="h-10 w-1/2 rounded-md"
              onClick={() => router.push("/songs/new")}
            >
              <Plus className="size-4" /> Create New Song
            </Button>
          </div>
        </main>
      </div>

      {/*<SongList />*/}
      {/*<FavouriteSongs />*/}
      {/*<CreatePlaylistContainerBottom containerType={"Songs"} />*/}
    </div>
  )
}
