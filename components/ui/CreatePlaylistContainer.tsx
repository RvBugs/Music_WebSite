import { Button } from "@/components/ui/button"
import { Plus,MoreVertical } from "lucide-react"

export default function CreatePlaylistContainer() {
  return (
    <Button className={"max-w-20px "}>
      <Plus />
      New Playlist
    </Button>
  )
}