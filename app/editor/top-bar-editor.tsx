"use client"

import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react"

export default function TopBarEditor({songName ,cover}: {songName: string , cover: string}) {
  return (
    <div className="z-10 flex h-12 w-full items-center justify-between bg-muted/40 px-4">
      <div className="flex flex-row items-center gap-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={cover} alt="cover" className="size-8 rounded-md" />
        <span className="text-sm font-medium">{songName}</span>
      </div>
      <Button className="h-8 text-xs rounded-md">
        <Plus className="size-4" />
        Add Chords
      </Button>
    </div>
  )
}
