"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import favoritePlaylist from "./favoritePlaylist"
import { StarIcon } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { cn } from "cn"

export default function FavoritePlayListButton({ id ,fav }: { id: string ,fav: boolean }) {
  const router = useRouter()

  return (
    <Button
      aria-label="star"
      variant="ghost"
      size="icon"
      onClick={async () => {
        const result = await favoritePlaylist(id, fav)

        if (result.type === "success") {
          toast.add({
            type: "success",
            title: "Action is successful",
            description: `Playlist is ${!fav ? "remove from" : "add to"} favorite`,
          })

          router.refresh()
        } else {
          toast.add({
            type: "error",
            title: "Song couldn't be favorite",
            description: result.error,
          })
        }
      }}
    >
      <StarIcon
        className={cn("size-5 text-yellow-300", !fav && "fill-yellow-300")}
      />
    </Button>
  )
}
