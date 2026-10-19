import { Plus } from "lucide-react"
import SongList from "@/components/SongListContainer"
import FavouriteSongs from "@/components/FavouriteSongs"
import CreatePlaylistContainerBottom from "@/components/CreateNewButtonBottom"
import CreateNewButtonTop from "@/components/CreateNewButtonTop"

export default function Elements() {
  return (
    <div>
      <SongList />
      <FavouriteSongs />
      <CreatePlaylistContainerBottom containerType={"Songs"} />
    </div>
  )
}
