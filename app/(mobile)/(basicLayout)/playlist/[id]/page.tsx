import getPlaylistFromId from "@/app/(mobile)/(basicLayout)/playlist/[id]/getPlaylist"
import { Button } from "@/components/ui/button"
import { ArrowLeft, Plus } from "lucide-react"
import Link from "next/link"

function getCover(cover: string | null) {
  if (!cover) return "/img.png"

  try {
    return JSON.parse(cover).data.publicUrl as string
  } catch {
    return cover
  }
}

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const playlistId = await params
  const results = await getPlaylistFromId(playlistId.id)

  if (results.type === "error" || !results.data) {
    return (
      <div className="flex h-[60vh] flex-col items-center justify-center gap-4 px-4 text-center">
        <p className="text-lg font-semibold">Playlist not found</p>
        <Link href="/playlist">
          <Button variant="outline">Back to playlists</Button>
        </Link>
      </div>
    )
  }

  const playlist = results.data

  return (
    <div>
      <div className="relative flex max-h-30 w-full items-center justify-center overflow-hidden">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={getCover(playlist.cover)}
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

      <div className="flex flex-col gap-2 px-4 py-2">
        <div className="flex w-full items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold">{playlist.name}</h1>
            <p className="text-sm text-muted-foreground">
              {new Date(playlist.created_at).toLocaleString("en-GB", {
                day: "numeric",
                month: "short",
                year: "numeric",
                hour: "2-digit",
                minute: "2-digit",
                hour12: true,
              })}
            </p>
          </div>
        </div>

        {playlist.description && (
          <div className="flex w-full flex-col rounded-md bg-muted/50 p-2">
            <p className="text-xs text-muted-foreground">Description</p>
            <p className="text-sm font-medium">{playlist.description}</p>
          </div>
        )}

        <div className="flex flex-row items-center justify-between pt-4">
          <p className="text-sm font-medium text-muted-foreground">
            Songs ({playlist.songs.length})
          </p>
          <Link href="/songs">
            <Button size="icon" variant="ghost" aria-label="Add songs">
              <Plus className="size-4" />
            </Button>
          </Link>
        </div>

        <div className="flex flex-col gap-4 pt-2">
          {playlist.songs.length === 0 && (
            <p className="py-10 text-center text-sm text-muted-foreground">
              No songs in this playlist yet.
            </p>
          )}

          {playlist.songs.map((song) => (
            <Link
              key={song.id}
              href={`/songs/${song.id}`}
              className="flex flex-row items-center gap-4"
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={getCover(song.cover)}
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
          ))}
        </div>
      </div>
    </div>
  )
}
