import { Button } from "@/components/ui/button"
import { Plus } from "lucide-react"

export default function CreatePlaylistContainerBottom () {
  return (
    <div className="fixed right-6 bottom-6 z-50 flex h-74 w-34 items-center text-white shadow-lg transition-transform sm:hidden">
      <div className="flex">
        <Button className="h-16 w-33">
          <div className="flex w-full flex-row items-center justify-center">
            <Plus className=" size-7"  />
            New Playlist
          </div>
        </Button>
      </div>
    </div>
  )
}