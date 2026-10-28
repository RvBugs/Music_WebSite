"use client"

import { Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function HeaderPlaylist() {
  const router = useRouter()

  return (
    <div className="flex w-full flex-row items-center justify-between p-2 px-4 pt-4 pb-2">
      <p className="text-2xl font-black">Playlists</p>
      <div className="flex flex-row items-center gap-2">
        <Button size="icon" variant="ghost" aria-label="Search">
          <Search className="size-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Create playlist"
          onClick={() => router.push("/playlist/new")}
        >
          <Plus className="size-5" />
        </Button>
      </div>
    </div>
  )
}
