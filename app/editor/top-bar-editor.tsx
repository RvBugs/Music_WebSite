"use client"

import { useState } from "react"
import { Loader2, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TopBarEditor({
  songName,
  cover,
  createSongsAction,
}: {
  songName: string
  cover: string
  createSongsAction: () => void | Promise<void>
}) {
  const [loading, setLoading] = useState(false)

  const handleClick = async () => {
    if (loading) return
    setLoading(true)
    try {
      await createSongsAction()
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="z-10 flex h-12 w-full items-center justify-between bg-muted/40 px-4">
      <div className="flex flex-row items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt="cover" className="size-8 rounded-md" />
        <span className="text-sm font-medium">{songName}</span>
      </div>

      <Button
        className="h-8 rounded-md text-xs"
        onClick={handleClick}
        disabled={loading}
        aria-busy={loading}
      >
        {loading ? (
          <Loader2 className="size-4 animate-spin" />
        ) : (
          <Plus className="size-4" />
        )}
        {loading ? "Adding..." : "Add Chords"}
      </Button>
    </div>
  )
}
