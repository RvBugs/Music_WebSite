import { Button } from "@/components/ui/button"
import { Plus,MoreVertical } from "lucide-react"

export default function CreatePlaylistContainer() {
  return (
    <div className={"flex flex-box flex-row  max-h-100 "}>
      <span className={"justify-start"}>Your Playlist</span>
      <Button className={"justify-end"}>
        <Plus />
        New Playlist
      </Button>
    </div>
  )
}