import { Plus } from "lucide-react"
import Playlist from "@/components/PlayListContainer"
import FavouritePlayList from "@/components/FavouritePlaylist"
import CreatePlaylistContainerBottom from "@/components/CreateNewButtonBottom"
import CreateNewButtonTop from "@/components/CreateNewButtonTop"


export default function Elements() {
  return (
    <div >
      <Playlist />
      <FavouritePlayList />
      <CreatePlaylistContainerBottom containerType={"Playlist"} />
    </div>
  )
}

