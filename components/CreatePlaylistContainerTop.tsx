import { Button } from "@/components/ui/button"
import { Plus, MoreVertical } from "lucide-react"

export default function CreatePlaylistContainerTop() {
  return (
    <>
      {/* Desktop version: visible on screens 640px and larger */}
      <div className="mt-5 mr-10 ml-3 hidden flex-row items-center justify-between sm:flex">
        <span>Your Playlist</span>
        <Button className="h-16 w-33">
          <Plus className="size-7" />
          New Playlist
        </Button>
      </div>
    </>
  )
}