import Empty from "./empty"
import { load } from "@/app/(mobile)/(basicLayout)/playlist/load"
import HeaderPlaylist from "@/app/(mobile)/(basicLayout)/playlist/header"
import PlaylistCards from "@/app/(mobile)/(basicLayout)/playlist/playlistCards"

export default async function Page() {
  const data = await load()

  const renderData = () => {
    switch (data.type) {
      case "success": {
        if (!data.data || data.data.length === 0) return <Empty />
        return <PlaylistCards playlists={data.data} />
      }

      case "playlistNotFound": {
        return <Empty />
      }

      default: {
        return <Empty />
      }
    }
  }

  return (
    <div className="h-screen">
      <HeaderPlaylist />
      {renderData()}
    </div>
  )
}
