import Link from "next/link"
import { ArrowLeft, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import getPlaylistFromId, {
  type PlaylistSong,
  type PlaylistWithSongs,
} from "@/app/(mobile)/(basicLayout)/playlist/[id]/getPlaylist"
import FavoritePlayListButton from "@/app/(mobile)/(basicLayout)/playlist/[id]/FavoritePlaylist"
import { resolveCoverUrl } from "@/app/(mobile)/(basicLayout)/playlist/coverUrl"

const CREATED_AT_FORMAT: Intl.DateTimeFormatOptions = {
  day: "numeric",
  month: "short",
  year: "numeric",
  hour: "2-digit",
  minute: "2-digit",
  hour12: true,
}

function formatCreatedAt(createdAt: string): string {
  return new Date(createdAt).toLocaleString("en-GB", CREATED_AT_FORMAT)
}

function PlaylistNotFound() {
  return (
    <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
      <p className="text-lg font-semibold">Playlist not found</p>
      <Link href="/playlist">
        <Button variant="outline">Back to playlists</Button>
      </Link>
    </div>
  )
}

function CoverBanner({ cover }: { cover: string | null }) {
  return (
    <div className="relative flex max-h-30 w-full items-center justify-center overflow-hidden">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveCoverUrl(cover)}
        alt="cover"
        className="object-cover blur-xs grayscale-10"
      />

      <Button
        variant="secondary"
        size="icon"
        className="absolute top-3 left-3 z-10 rounded-full bg-background/80 shadow-md backdrop-blur-sm"
      >
        <Link href="/playlist" aria-label="Go back to playlists">
          <ArrowLeft className="size-5" />
        </Link>
      </Button>
    </div>
  )
}

function TitleRow({ playlist }: { playlist: PlaylistWithSongs }) {
  return (
    <div className="flex w-full items-center justify-between">
      <div>
        <h1 className="text-2xl font-semibold">{playlist.name}</h1>
        <p className="text-sm text-muted-foreground">
          {formatCreatedAt(playlist.created_at)}
        </p>
      </div>
      <FavoritePlayListButton
        id={String(playlist.id)}
        fav={!playlist.favorite}
      />
    </div>
  )
}

function DescriptionBox({ description }: { description: string }) {
  return (
    <div className="flex w-full flex-col rounded-md bg-muted/50 p-2">
      <p className="text-xs text-muted-foreground">Description</p>
      <p className="text-sm font-medium">{description}</p>
    </div>
  )
}

function SongsHeader({ count }: { count: number }) {
  return (
    <div className="flex flex-row items-center justify-between">
      <p className="text-sm font-medium text-muted-foreground">
        Songs ({count})
      </p>
      <Link href="/songs">
        <Button size="icon" variant="ghost" aria-label="Add songs">
          <Plus className="size-4" />
        </Button>
      </Link>
    </div>
  )
}

function SongRow({ song }: { song: PlaylistSong }) {
  return (
    <Link href={`/songs/${song.id}`} className="flex flex-row items-center gap-4">
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={resolveCoverUrl(song.cover)}
        alt="song"
        className="aspect-square size-full max-h-15 max-w-15 rounded-md object-cover"
      />
      <div>
        <p className="line-clamp-1 text-base font-medium">{song.name}</p>
        <p className="line-clamp-1 text-xs text-muted-foreground">
          Scale - {song.scale} And Time Signature {song.timesig}
        </p>
      </div>
    </Link>
  )
}

function SongList({ songs }: { songs: PlaylistSong[] }) {
  return (
    <div className="flex flex-col gap-4 pt-2">
      {songs.length === 0 && (
        <p className="py-10 text-center text-sm text-muted-foreground">
          No songs in this playlist yet.
        </p>
      )}

      {songs.map((song) => (
        <SongRow key={song.id} song={song} />
      ))}
    </div>
  )
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const results = await getPlaylistFromId(id)

  if (results.type === "error" || !results.data) {
    return <PlaylistNotFound />
  }

  const playlist = results.data

  return (
    <div>
      <CoverBanner cover={playlist.cover} />

      <div className="flex flex-col gap-2 px-4 py-2">
        <TitleRow playlist={playlist} />

        {playlist.description && (
          <DescriptionBox description={playlist.description} />
        )}

        <SongsHeader count={playlist.songs.length} />
        <SongList songs={playlist.songs} />
      </div>
    </div>
  )
}
