import { Plus } from "lucide-react"
import Playlist from "@/components/PlayListContainer"
import FavouritePlayList from "@/components/FavouritePlaylist"
import CreatePlaylistContainerBottom from "@/components/CreatePlaylistContainerBottom"
import CreatePlaylistContainerTop from "@/components/CreatePlaylistContainerTop"

export default function Elements() {
  return (
    <div >
      <Playlist />
      <FavouritePlayList />
      <CreatePlaylistContainerBottom />
    </div>
  )
}

