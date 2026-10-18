import { Button } from "@/components/ui/button";
import { MoreVertical } from "lucide-react"

export default function QuickPickContainers() {
  return (
    <div className="flex w-full flex-row items-center justify-between">
      <div className="flex flex-row items-center gap-2 p-2">
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/cover.jpg" alt="cover" className="size-16" />
        <div className="flex flex-col">
          <span className="text-sm font-medium">Playlist Name</span>
          <span className="text-sm text-muted-foreground">
            12 songs and three more
          </span>
        </div>
      </div>
      <Button variant="ghost" size="icon" aria-label="More options">
        <MoreVertical className="size-5" />
      </Button>
    </div>
  )
}
