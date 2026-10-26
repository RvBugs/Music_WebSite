"use client"

import { useRef } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"

type FavoriteItem = {
  id: string | number
  name: string
  cover: string
}

type FavoriteSectionProps = {
  title: string
  items: FavoriteItem[]
}

export default function FavoriteSection({
  title,
  items,
}: FavoriteSectionProps) {
  const scrollRef = useRef<HTMLDivElement>(null)
  const router = useRouter()

  function scroll(direction: "left" | "right") {
    scrollRef.current?.scrollBy({
      left: direction === "left" ? -400 : 400,
      behavior: "smooth",
    })
  }

  if (items.length === 0) return null

  return (
    <section className="flex flex-col gap-4 px-4 lg:px-16">
      <div className="flex items-center justify-between gap-4">
        <h2 className="text-sm font-semibold tracking-tight">{title}</h2>

        <div className="flex items-center gap-2">
          <Button
            onClick={() => scroll("left")}
            aria-label={`Scroll ${title} left`}
            variant="ghost"
            size="icon"
          >
            <ChevronLeft className="size-4" />
          </Button>
          <Button
            onClick={() => scroll("right")}
            aria-label={`Scroll ${title} right`}
            variant="ghost"
            size="icon"
          >
            <ChevronRight className="size-4" />
          </Button>
        </div>
      </div>

      <div
        ref={scrollRef}
        className="grid auto-cols-35 grid-flow-col grid-rows-1 gap-3 overflow-x-auto scroll-smooth pb-2 sm:auto-cols-40"
      >
        {items.map((item) => (
          <div
            key={item.id}
            className="relative aspect-square overflow-hidden rounded-md bg-muted"
            onClick={() => router.push(`/songs/${item.id}`)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              src={item.cover}
              alt={item.name}
              loading="lazy"
              className="size-full object-cover transition-transform duration-300 hover:scale-105"
            />

            <div className="absolute inset-x-0 bottom-0 bg-linear-to-t from-black/80 to-transparent px-3 pt-10 pb-2">
              <p className="truncate text-sm font-semibold text-white">
                {item.name}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}
