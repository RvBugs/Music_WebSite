"use client"

import * as React from "react"
import {
  ChevronRightIcon,
  CopyIcon,
  Disc,
  FolderInputIcon,
  ListMusicIcon,
  MoreVerticalIcon,
  MusicIcon,
  PlusIcon,
  Trash2Icon,
} from "lucide-react"

import { Button } from "@/components/ui/button"
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

type Song = { id: string; name: string }
type Playlist = { id: string; name: string; songs: Song[] }
type Mode = "copy" | "move"

const uid = () => `${Date.now()}-${Math.random().toString(36).slice(2)}`

const DRAG_TYPE = "application/x-song"

const initialPlaylists: Playlist[] = []

const menuTriggerClass =
  "size-7 shrink-0 opacity-100 md:opacity-0 md:group-hover/row:opacity-100 md:focus-visible:opacity-100 data-popup-open:opacity-100"

function SongRow({
  song,
  playlist,
  playlists,
  selected,
  onSelect,
  onTransfer,
  onDelete,
}: {
  song: Song
  playlist: Playlist
  playlists: Playlist[]
  selected: boolean
  onSelect: () => void
  onTransfer: (toId: string, mode: Mode) => void
  onDelete: () => void
}) {
  return (
    <div
      className="group/row flex items-center"
      draggable
      onDragStart={(e) => {
        e.dataTransfer.setData(
          DRAG_TYPE,
          JSON.stringify({ songId: song.id, fromId: playlist.id })
        )
        e.dataTransfer.effectAllowed = "copyMove"
      }}
    >
      <Button
        variant="ghost"
        size="sm"
        className={cn(
          "min-w-0 flex-1 justify-start font-normal",
          selected && "bg-accent text-accent-foreground"
        )}
        aria-current={selected ? "true" : undefined}
        onClick={onSelect}
      >
        <MusicIcon />
        <span className="truncate">{song.name}</span>
      </Button>

      <DropdownMenu>
        <DropdownMenuTrigger
          render={
            <Button
              variant="ghost"
              size="icon"
              aria-label={`Options for ${song.name}`}
              className={menuTriggerClass}
            />
          }
        >
          <MoreVerticalIcon className="size-4" />
        </DropdownMenuTrigger>

        <DropdownMenuContent align="end">
          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <CopyIcon /> Copy to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {playlists.map((p) => (
                <DropdownMenuItem
                  key={p.id}
                  onClick={() => onTransfer(p.id, "copy")}
                >
                  {p.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSub>
            <DropdownMenuSubTrigger>
              <FolderInputIcon /> Move to
            </DropdownMenuSubTrigger>
            <DropdownMenuSubContent>
              {playlists.map((p) => (
                <DropdownMenuItem
                  key={p.id}
                  disabled={p.id === playlist.id}
                  onClick={() => onTransfer(p.id, "move")}
                >
                  {p.name}
                </DropdownMenuItem>
              ))}
            </DropdownMenuSubContent>
          </DropdownMenuSub>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={onDelete}>
            <Trash2Icon /> Delete song
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}

function PlaylistNode({
  playlist,
  playlists,
  selected,
  isDropTarget,
  onSelect,
  onTransfer,
  onDeleteSong,
  onAddSong,
  onDeletePlaylist,
  setDropTarget,
}: {
  playlist: Playlist
  playlists: Playlist[]
  selected: string
  isDropTarget: boolean
  onSelect: (songId: string) => void
  onTransfer: (songId: string, fromId: string, toId: string, mode: Mode) => void
  onDeleteSong: (playlistId: string, songId: string) => void
  onAddSong: (playlistId: string) => void
  onDeletePlaylist: (playlistId: string) => void
  setDropTarget: (id: string | null) => void
}) {
  return (
    <Collapsible defaultOpen>
      <div
        className={cn(
          "group/row flex items-center rounded-md",
          isDropTarget && "bg-accent ring-1 ring-ring"
        )}
        onDragOver={(e) => {
          if (!e.dataTransfer.types.includes(DRAG_TYPE)) return
          e.preventDefault()
          e.dataTransfer.dropEffect = e.altKey || e.ctrlKey ? "copy" : "move"
          setDropTarget(playlist.id)
        }}
        onDragLeave={(e) => {
          if (!e.currentTarget.contains(e.relatedTarget as Node)) {
            setDropTarget(null)
          }
        }}
        onDrop={(e) => {
          e.preventDefault()
          setDropTarget(null)
          const raw = e.dataTransfer.getData(DRAG_TYPE)
          if (!raw) return
          const { songId, fromId } = JSON.parse(raw)
          onTransfer(
            songId,
            fromId,
            playlist.id,
            e.altKey || e.ctrlKey ? "copy" : "move"
          )
        }}
      >
        <CollapsibleTrigger
          render={
            <Button
              variant="ghost"
              size="sm"
              className="min-w-0 flex-1 justify-start font-normal aria-expanded:bg-transparent aria-expanded:hover:bg-muted dark:aria-expanded:hover:bg-muted/50"
            >
              <ChevronRightIcon className="transition-transform group-data-panel-open/button:rotate-90" />
              <ListMusicIcon />
              <span className="truncate">{playlist.name}</span>
              <span className="ml-auto text-xs text-muted-foreground">
                {playlist.songs.length}
              </span>
            </Button>
          }
        />

        <DropdownMenu>
          <DropdownMenuTrigger
            render={
              <Button
                variant="ghost"
                size="icon"
                aria-label={`Options for ${playlist.name}`}
                className={menuTriggerClass}
              />
            }
          >
            <MoreVerticalIcon className="size-4" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onAddSong(playlist.id)}>
              <PlusIcon /> Add song
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={() => onDeletePlaylist(playlist.id)}>
              <Trash2Icon /> Delete playlist
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>

      <CollapsibleContent>
        <div className="ml-4 flex flex-col">
          {playlist.songs.map((song) => (
            <SongRow
              key={song.id}
              song={song}
              playlist={playlist}
              playlists={playlists}
              selected={selected === song.id}
              onSelect={() => onSelect(song.id)}
              onTransfer={(toId, mode) =>
                onTransfer(song.id, playlist.id, toId, mode)
              }
              onDelete={() => onDeleteSong(playlist.id, song.id)}
            />
          ))}

          {playlist.songs.length === 0 && (
            <p className="px-3 py-1.5 text-xs text-muted-foreground">
              No songs yet
            </p>
          )}
        </div>
      </CollapsibleContent>
    </Collapsible>
  )
}

export default function EditorSidebar({ onSelectSongAction, }: { onSelectSongAction?: (songId: string) => void }) {
  const [playlists, setPlaylists] = React.useState(initialPlaylists)
  const [selected, setSelected] = React.useState("s1")
  const [dropTarget, setDropTarget] = React.useState<string | null>(null)

  const select = (songId: string) => {
    setSelected(songId)
    onSelectSongAction?.(songId)
  }

  const transfer = (songId: string, fromId: string, toId: string, mode: Mode) =>
    setPlaylists((ps) => {
      const song = ps
        .find((p) => p.id === fromId)
        ?.songs.find((s) => s.id === songId)
      if (!song || (mode === "move" && fromId === toId)) return ps

      return ps.map((p) => {
        if (mode === "move" && p.id === fromId) {
          return { ...p, songs: p.songs.filter((s) => s.id !== songId) }
        }
        if (p.id === toId) {
          const added: Song =
            mode === "move"
              ? song
              : {
                  id: uid(),
                  name: fromId === toId ? `${song.name} copy` : song.name,
                }
          return { ...p, songs: [...p.songs, added] }
        }
        return p
      })
    })

  const deleteSong = (playlistId: string, songId: string) =>
    setPlaylists((ps) =>
      ps.map((p) =>
        p.id === playlistId
          ? { ...p, songs: p.songs.filter((s) => s.id !== songId) }
          : p
      )
    )

  const addSong = (playlistId: string) =>
    setPlaylists((ps) =>
      ps.map((p) =>
        p.id === playlistId
          ? {
              ...p,
              songs: [
                ...p.songs,
                { id: uid(), name: `New song ${p.songs.length + 1}` },
              ],
            }
          : p
      )
    )

  const addPlaylist = () =>
    setPlaylists((ps) => [
      ...ps,
      { id: uid(), name: `Playlist ${ps.length + 1}`, songs: [] },
    ])

  const deletePlaylist = (id: string) =>
    setPlaylists((ps) => ps.filter((p) => p.id !== id))

  return (
    <aside className="flex h-screen w-1/5 flex-col gap-4 overflow-y-auto bg-muted/5">
      <div className="flex flex-row items-center justify-start gap-2 px-4 py-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src="https://cdn.jsdelivr.net/gh/homarr-labs/dashboard-icons/png/beekeeper-studio.png"
          alt="icon"
          className="h-12 w-12"
        />
        <div>
          <p className="text-sm">Music Studio</p>
          <p className="text-xs text-muted-foreground">
            Build your notations and chords
          </p>
        </div>
      </div>

      <div className="px-2 pb-4">
        <div className="flex items-center justify-between px-2 pb-1">
          <p className="text-xs font-light text-muted-foreground">Playlists</p>
          <Button
            variant="ghost"
            size="icon"
            aria-label="New playlist"
            className="size-6"
            onClick={addPlaylist}
          >
            <PlusIcon className="size-4" />
          </Button>
        </div>

        <div className="flex flex-col text-sm">
          {playlists.map((playlist) => (
            <PlaylistNode
              key={playlist.id}
              playlist={playlist}
              playlists={playlists}
              selected={selected}
              isDropTarget={dropTarget === playlist.id}
              onSelect={select}
              onTransfer={transfer}
              onDeleteSong={deleteSong}
              onAddSong={addSong}
              onDeletePlaylist={deletePlaylist}
              setDropTarget={setDropTarget}
            />
          ))}

          {playlists.length === 0 && (
            <p className="px-2 py-4 text-center text-xs text-muted-foreground">
              No playlists yet. Use + to create one.
            </p>
          )}
        </div>
      </div>
    </aside>
  )
}
