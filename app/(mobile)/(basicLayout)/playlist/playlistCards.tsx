"use client"

import { Playlist } from "@/app/(mobile)/(basicLayout)/playlist/load"
import { ChevronDown, MoreVertical, Rows3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { useRouter } from "next/navigation"

function getCover(cover: string | null) {
  if (!cover) return "/img.png"

  try {
    return JSON.parse(cover).data.publicUrl as string
  } catch {
    return cover
  }
}

export default function PlaylistCards({ playlists }: { playlists: Playlist[] }) {
  const router = useRouter()
  const [card, setCard] = useState<boolean>(false)

  return (
    <div className="px-4 pt-4 ">
      <div className="flex flex-row items-center">
        <span className="flex flex-row items-center gap-1 text-sm font-medium text-muted-foreground">
          Recent Playlists <ChevronDown className="size-4" />
        </span>
        <Button
          variant="ghost"
          size="icon"
          className="ml-auto"
          aria-label="Change layout"
          onClick={() => setCard(!card)}
        >
          <Rows3 />
        </Button>
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-5 ">
        {playlists.map((playlist) => {
          if (!card) {
            return (
              <div
                key={playlist.id}
                className="col-span-1"
                onClick={() => router.push(`/playlist/${playlist.id}`)}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={getCover(playlist.cover)}
                  alt="playlist"
                  className="aspect-square size-full max-h-35 rounded-md object-cover"
                />
                <div className="py-1">
                  <p className="line-clamp-1 text-base font-medium">
                    {playlist.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    {playlist.description || "No description"}
                  </p>
                </div>
              </div>
            )
          } else {
            return (
              <div
                key={playlist.id}
                className="col-span-full flex flex-row items-center justify-between"
                onClick={() => router.push(`/playlist/${playlist.id}`)}
              >
                <div className="flex flex-row items-center gap-4">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={getCover(playlist.cover)}
                    alt="playlist"
                    className="aspect-square size-full max-h-15 max-w-15 rounded-md object-cover"
                  />
                  <div>
                    <p className="line-clamp-1 text-base font-medium">
                      {playlist.name}
                    </p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      {playlist.description || "No description"}
                    </p>
                  </div>
                </div>
                <Button variant="ghost" size="icon" aria-label="More options">
                  <MoreVertical className="size-4" />
                </Button>
              </div>
            )
          }
        })}
      </div>
    </div>
  )
}
