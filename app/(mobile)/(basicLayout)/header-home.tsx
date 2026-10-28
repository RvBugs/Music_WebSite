"use client"

import { LogOut } from "lucide-react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import logoutAction from "@/app/(mobile)/(basicLayout)/logout-action"

export default function HeaderHome({img ,logout}: {img: string, logout: boolean}) {

  const router = useRouter()

  return (
    <div className="flex w-full flex-row items-center justify-between pt-4 pb-2">
      <p className="text-2xl font-black">Music Chords</p>
      <div className="flex flex-row items-center gap-2">
        {logout && (
          <Button
            size="icon"
            variant="ghost"
            aria-label="Search"
            onClick={() => logoutAction()}
          >
            <LogOut size={6} />
          </Button>
        )}
        <div
          className="size-8 shrink-0 overflow-hidden rounded-full bg-muted"
          onClick={() => router.push("/profile")}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={img}
            alt="Profile picture"
            className="size-full object-cover"
          />
        </div>
      </div>
    </div>
  )
}