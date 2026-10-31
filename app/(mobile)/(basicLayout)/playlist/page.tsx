import Empty from "./empty"
import { load } from "@/app/(mobile)/(basicLayout)/playlist/load"
import HeaderPlaylist from "@/app/(mobile)/(basicLayout)/playlist/header"
import PlaylistCards from "@/app/(mobile)/(basicLayout)/playlist/playlistCards"

export default async function Page() {
  const result = await load()

  // Any non-success result is shown the same way as "no playlists".
  const playlists = result.type === "success" ? (result.data ?? []) : []

  return (
    <div className="h-screen lg:px-16 lg:py-4">
      <HeaderPlaylist />
      {playlists.length > 0 ? (
        <PlaylistCards playlists={playlists} />
      ) : (
        <Empty />
      )}
    </div>
  )
}
