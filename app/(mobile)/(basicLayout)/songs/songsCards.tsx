"use client"

import { Song } from "@/app/(mobile)/(basicLayout)/songs/load"
import { ChevronDown, MoreVertical, Rows3 } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useState } from "react"
import { useRouter } from "next/navigation"

export default function SongsCards({ songs }: {songs: Song[]}) {

  const router = useRouter()
  const [card ,setCard] = useState<boolean>(false)

  return (
    <div className="px-4 pt-4">
      <div className="flex flex-row items-center">
        <span className="flex flex-row items-center gap-1 text-sm font-medium text-muted-foreground">
          Recent Songs <ChevronDown className="size-4" />
        </span>
        <Button variant="ghost" size="icon" className="ml-auto" aria-label="More options" onClick={() => setCard(!card)}>
          <Rows3 />
        </Button>
      </div>
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
        {songs.map((song) => {
          if (!card) {
            return (
              <div key={song.id} className="col-span-1" onClick={() => router.push(`/songs/${song.id}`)}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={JSON.parse(song.cover as string).data.publicUrl}
                  alt="songs"
                  className="aspect-square size-full max-h-35 rounded-md object-cover"
                />
                <div className="py-1">
                  <p className="line-clamp-1 text-base font-medium">
                    {song.name}
                  </p>
                  <p className="line-clamp-1 text-xs text-muted-foreground">
                    Scale - {song.scale} And Time Signature {song.timesig}
                  </p>
                </div>
              </div>
            )
          } else {
            return (
              <div key={song.id} className="col-span-full flex flex-row items-center justify-between" onClick={() => router.push(`/songs/${song.id}`)}>
                <div className="flex flex-row gap-4 items-center">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src={JSON.parse(song.cover as string).data.publicUrl}
                    alt="songs"
                    className="aspect-square size-full max-h-15 max-w-15 rounded-md object-cover"
                  />
                  <div>
                    <p className="line-clamp-1 text-base font-medium">
                      {song.name}
                    </p>
                    <p className="line-clamp-1 text-xs text-muted-foreground">
                      Scale - {song.scale} And Time Signature {song.timesig}
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