"use client"

import { Check, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { Song } from "@/app/(mobile)/(basicLayout)/songs/load"

function getCover(cover: string | null) {
  if (!cover) return "/img.png"

  try {
    return JSON.parse(cover).data.publicUrl as string
  } catch {
    return cover
  }
}

export default function SongPicker({
  songs,
  selected,
  onChange,
  onDone,
}: {
  songs: Song[]
  selected: number[]
  onChange: (ids: number[]) => void
  onDone: () => void
}) {
  const allSelected = songs.length > 0 && selected.length === songs.length

  function toggle(id: number) {
    onChange(
      selected.includes(id)
        ? selected.filter((item) => item !== id)
        : [...selected, id]
    )
  }

  return (
    <div className="flex min-h-full flex-col">
      <div className="sticky top-0 z-10 flex items-center justify-between border-b bg-background px-4 py-3">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            aria-label="Back"
            onClick={onDone}
          >
            <ArrowLeft className="size-5" />
          </Button>
          <div>
            <p className="text-lg font-semibold leading-tight">Select songs</p>
            <p className="text-xs text-muted-foreground">
              {selected.length} selected
            </p>
          </div>
        </div>

        {songs.length > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={() =>
              onChange(allSelected ? [] : songs.map((song) => song.id))
            }
          >
            {allSelected ? "Clear all" : "Select all"}
          </Button>
        )}
      </div>


      <div className="flex flex-1 flex-col gap-1 px-4 py-3">
        {songs.length === 0 && (
          <p className="py-16 text-center text-sm text-muted-foreground">
            No songs found. Create a song first.
          </p>
        )}

        {songs.map((song) => {
          const checked = selected.includes(song.id)

          return (
            <button
              key={song.id}
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => toggle(song.id)}
              className="flex flex-row items-center gap-4 rounded-md p-2 text-left transition-colors hover:bg-muted/50"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getCover(song.cover)}
                alt="song"
                className="aspect-square size-full max-h-15 max-w-15 rounded-md object-cover"
              />
              <div className="min-w-0 flex-1">
                <p className="line-clamp-1 text-base font-medium">{song.name}</p>
                <p className="line-clamp-1 text-xs text-muted-foreground">
                  Scale - {song.scale} And Time Signature {song.timesig}
                </p>
              </div>
              <span
                className={cn(
                  "flex size-6 shrink-0 items-center justify-center rounded-md border transition-colors",
                  checked
                    ? "border-primary bg-primary text-primary-foreground"
                    : "border-muted-foreground/40"
                )}
              >
                {checked && <Check className="size-4" />}
              </span>
            </button>
          )
        })}
      </div>

      {/* Done */}
      <div className="sticky bottom-0 border-t bg-background p-4">
        <Button className="h-11 w-full rounded-xl" onClick={onDone}>
          Done{selected.length > 0 ? ` (${selected.length})` : ""}
        </Button>
      </div>
    </div>
  )
}
