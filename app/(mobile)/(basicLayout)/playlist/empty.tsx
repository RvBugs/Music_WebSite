"use client"

import { Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

export default function Empty() {
  const router = useRouter()

  return (
    <div>
      <div className="h-[70vh] w-full">
        <main className="flex h-[65vh] w-full flex-col items-center justify-center gap-6 px-12 text-center">
          <div className="flex size-40 items-center justify-center rounded-full bg-muted">
            <section className="text-6xl text-green-800 font-semibold tracking-tight">CREATE PLAYLIST!</section>
          </div>

          <div className="space-y-2">
            <h2 className="pb-2 text-2xl font-semibold tracking-tight">
              No Playlists Found
            </h2>
            <p className="max-w-sm pb-4 text-sm text-muted-foreground">
              No playlists found for this band. Please try again to add a new playlist.
            </p>
            <Button
              className="h-10 w-1/2 rounded-md"
              onClick={() => router.push("/playlist/new")}
            >
              <Plus className="size-4" /> Create New Playlist
            </Button>
          </div>
        </main>
      </div>
    </div>
  )
}
