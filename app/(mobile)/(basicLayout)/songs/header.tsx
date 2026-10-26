"use client"

import { Plus, Search } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function HeaderSongs() {

  const router = useRouter()

  return (
    <div className="flex w-full flex-row items-center justify-between p-2 px-4 pt-4 pb-2">
      <p className="text-2xl font-black">Songs</p>
      <div className="flex flex-row items-center gap-2">
        <Button size="icon" variant="ghost" aria-label="Search">
          <Search className="size-5" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          aria-label="Search"
          onClick={() => router.push("/songs/new")}
        >
          <Plus className="size-5" />
        </Button>
        <div className="rounded-full bg-muted/50 p-2">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src="/img.png" alt="img" className="size-5 object-cover" />
        </div>
      </div>
    </div>
  )
}