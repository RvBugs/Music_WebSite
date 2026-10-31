"use client"

import Link from "next/link"
import { useState } from "react"
import { ChevronDown, MoreVertical, Rows3 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Playlist } from "@/app/(mobile)/(basicLayout)/playlist/load"

type Layout = "grid" | "list"

const DEFAULT_COVER = "/img.png"
const NO_DESCRIPTION = "No description"

function resolveCoverUrl(cover: string | null): string {
  if (!cover) return DEFAULT_COVER

  try {
    return JSON.parse(cover).data.publicUrl as string
  } catch {
    return cover
  }
}

function PlaylistText({ playlist }: { playlist: Playlist }) {
  return (
    <>
      <p className="line-clamp-1 text-base font-medium">{playlist.name}</p>
      <p className="line-clamp-1 text-xs text-muted-foreground">
        {playlist.description || NO_DESCRIPTION}
      </p>
    </>
  )
}

function GridItem({ playlist }: { playlist: Playlist }) {
  return (
    <Link href={`/playlist/${playlist.id}`} className="col-span-1 block">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveCoverUrl(playlist.cover)}
        alt="playlist"
        className="aspect-square size-full max-h-35 rounded-md object-cover"
      />
      <div className="py-1">
        <PlaylistText playlist={playlist} />
      </div>
    </Link>
  )
}

function ListItem({ playlist }: { playlist: Playlist }) {
  return (
    <Link
      href={`/playlist/${playlist.id}`}
      className="col-span-full flex flex-row items-center justify-between"
    >
      <div className="flex flex-row items-center gap-4">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={resolveCoverUrl(playlist.cover)}
          alt="playlist"
          className="aspect-square size-full max-h-15 max-w-15 rounded-md object-cover"
        />
        <div>
          <PlaylistText playlist={playlist} />
        </div>
      </div>
      <Button variant="ghost" size="icon" aria-label="More options">
        <MoreVertical className="size-4" />
      </Button>
    </Link>
  )
}

function SectionHeader({ onToggleLayout }: { onToggleLayout: () => void }) {
  return (
    <div className="flex flex-row items-center">
      <span className="flex flex-row items-center gap-1 text-sm font-medium text-muted-foreground">
        Recent Playlists <ChevronDown className="size-4" />
      </span>
      <Button
        variant="ghost"
        size="icon"
        className="ml-auto"
        aria-label="Change layout"
        onClick={onToggleLayout}
      >
        <Rows3 />
      </Button>
    </div>
  )
}

const ITEM_BY_LAYOUT = {
  grid: GridItem,
  list: ListItem,
} satisfies Record<Layout, typeof GridItem>

export default function PlaylistCards({ playlists }: { playlists: Playlist[] }) {
  const [layout, setLayout] = useState<Layout>("grid")
  const Item = ITEM_BY_LAYOUT[layout]

  const toggleLayout = () =>
    setLayout((current) => (current === "grid" ? "list" : "grid"))

  return (
    <div className="px-4 pt-4 ">
      <SectionHeader onToggleLayout={toggleLayout} />
      <div className="grid grid-cols-2 gap-4 pt-4 lg:grid-cols-4">
        {playlists.map((playlist) => (
          <Item key={playlist.id} playlist={playlist} />
        ))}
      </div>
    </div>
  )
}
