"use client"

import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import favoritePlaylist from "./favoritePlaylist"
import { StarIcon } from "lucide-react"
import { toast } from "@/components/ui/toast"
import { cn } from "cn"

type Props = { id: string; fav: boolean }

export default function FavoritePlayListButton({ id, fav }: Props) {
  const router = useRouter()

  async function handleClick() {
    const result = await favoritePlaylist(id, fav)

    if (result.type !== "success") {
      toast.add({
        type: "error",
        title: "Song couldn't be favorite",
        description: result.error,
      })
      return
    }

    toast.add({
      type: "success",
      title: "Action is successful",
      description: `Playlist is ${fav ? "add to" : "remove from"} favorite`,
    })

    router.refresh()
  }

  return (
    <Button aria-label="star" variant="ghost" size="icon" onClick={handleClick}>
      <StarIcon
        className={cn("size-5 text-yellow-300", !fav && "fill-yellow-300")}
      />
    </Button>
  )
}
