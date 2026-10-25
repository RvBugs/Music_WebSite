"use client"

import {Mic, Plus, Search} from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"

export default function HeaderSearch() {

  const router = useRouter()

  return (
    <div className="flex w-full flex-row items-center justify-between p-2 px-4 pt-4 pb-2">
      <p className="text-2xl font-black">Search</p>
      <div className="flex flex-row items-center gap-2">
        <Button
          size="icon"
          variant="ghost"
          aria-label="Search"
          onClick={() => router.push("/songs/new")}
        >
          <Mic className="size-5" />
        </Button>
      </div>
    </div>
  )
}