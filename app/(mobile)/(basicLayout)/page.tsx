import { createClient } from "@/lib/supabase/server"
import HeaderHome from "@/app/(mobile)/(basicLayout)/header-home"
import FavoriteSection from "./FavoriteSection"
import Empty from "./empty"

type CoverData = {
  data?: {
    publicUrl?: string
  }
}

function getCoverUrl(cover: string | null): string {
  if (!cover) return ""

  try {
    return (JSON.parse(cover) as CoverData).data?.publicUrl ?? ""
  } catch {
    return ""
  }
}

export default async function Page() {
  const supabase = await createClient()
  const { data: authData } = await supabase.auth.getUser()
  const userId = authData.user?.id

  if (!userId) {
    return <div>Please log in to view your favorites.</div>
  }

  const { data: user, error: userError } = await supabase
    .from("band")
    .select("*")
    .eq("id", userId)
    .single()

  if (userError || !user) {
    return <div>User not found</div>
  }

  const [
    { data: songs, error: songsError },
    { data: playlists, error: playlistsError },
  ] = await Promise.all([
    supabase.from("song").select("*").eq("band", userId).eq("favourite", true),

    supabase
      .from("playlist")
      .select("*")
      .eq("band", userId)
      .eq("favorite", true),
  ])

  if (songsError || playlistsError) {
    return <div>Could not load your favorites.</div>
  }

  const avatarPath = (user.avatar as string | null)
    ?.split("/")
    .slice(1)
    .join("/")

  const avatarUrl = avatarPath
    ? supabase.storage.from("band").getPublicUrl(avatarPath).data.publicUrl
    : ""

  const favoriteSongs = (songs ?? []).map((song) => ({
    id: song.id,
    name: song.name,
    cover: getCoverUrl(song.cover),
  }))

  const favoritePlaylists = (playlists ?? []).map((playlist) => ({
    id: playlist.id,
    name: playlist.name,
    cover: playlist.cover,
  }))

  const hasFavorites = favoriteSongs.length > 0 || favoritePlaylists.length > 0

  return (
    <div className="flex flex-col gap-4 py-1 h-screen">
      <HeaderHome img={avatarUrl} logout={true} />

      {hasFavorites ? (
        <>
          <FavoriteSection title="Favorite Songs" items={favoriteSongs} />

          <FavoriteSection
            title="Favorite Playlists"
            items={favoritePlaylists}
          />
        </>
      ) : (
        <Empty />
      )}
    </div>
  )
}
