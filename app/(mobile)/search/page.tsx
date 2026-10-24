"use client"

import { useState } from "react"
import {
  ArrowLeft,
  Mic,
  History,
  ArrowUpLeft,
  Music2,
  Heart,
  ListMusic,
  Cast,
  Play,
  Pause,
} from "lucide-react"

const recentSearchCards = [
  {
    id: 1,
    title: "Acoustic Pop Hits",
    subtitle: "Popular Playlist",
    image:
      "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 2,
    title: "Chill Lofi Beats",
    subtitle: "Study & Relax",
    image:
      "https://images.unsplash.com/photo-1470225620780-dba8ba36b745?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 3,
    title: "Top Sinhala Classics",
    subtitle: "Golden Hits",
    image:
      "https://images.unsplash.com/photo-1459749411175-04bf5292ceea?w=300&auto=format&fit=crop&q=80",
  },
  {
    id: 4,
    title: "English Pop 2026",
    subtitle: "Top Charts",
    image:
      "https://images.unsplash.com/photo-1514525253161-7a46d19cd819?w=300&auto=format&fit=crop&q=80",
  },
]

const recentSearchTextList = [
  "Classical instrumentals",
  "Acoustic guitar cover",
  "Relaxing rain sounds",
  "Workout motivation mix",
  "Top 50 global tracks",
  "Lofi hip hop radio",
]

export default function SearchPage() {
  const [isPlaying, setIsPlaying] = useState(false)

  return (
    <main className="min-h-screen w-full bg-black px-4 pb-40 text-white">
      {/* SEARCH BAR */}
      <section className="sticky top-0 z-40 flex items-center justify-between gap-3 bg-black/90 py-3 backdrop-blur-md">
        <button
          type="button"
          aria-label="Go back"
          onClick={() => window.history.back()}
          className="p-1 text-zinc-400 transition-colors hover:text-white"
        >
          <ArrowLeft className="h-6 w-6" />
        </button>

        <div className="flex flex-1 items-center rounded-full bg-[#282828] px-4 py-2.5">
          <input
            type="text"
            placeholder="Search songs, albums, artists"
            className="w-full bg-transparent text-sm text-white placeholder-zinc-400 outline-none"
          />
        </div>

        <button
          type="button"
          aria-label="Microphone"
          className="p-1 text-zinc-400 transition-colors hover:text-white"
        >
          <Mic className="h-6 w-6" />
        </button>
      </section>

      {/* RECENT SEARCH CARDS */}
      <section className="mt-5 flex flex-col gap-3">
        <h2 className="text-sm font-medium text-zinc-400">Recent searches</h2>

        <div className="flex gap-4 overflow-x-auto pb-2">
          {recentSearchCards.map((card) => (
            <div
              key={card.id}
              className="flex max-w-[150px] min-w-[150px] cursor-pointer flex-col gap-2"
            >
              <div className="h-28 w-full overflow-hidden rounded-lg bg-zinc-800">
                <img
                  src={card.image}
                  alt={card.title}
                  className="h-full w-full object-cover transition-transform duration-300 hover:scale-105"
                />
              </div>

              <div>
                <p className="truncate text-sm font-semibold text-zinc-100">
                  {card.title}
                </p>
                <p className="truncate text-xs text-zinc-400">
                  {card.subtitle}
                </p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RECENT SEARCH HISTORY */}
      <section className="mt-4 flex flex-col gap-1">
        {recentSearchTextList.map((text) => (
          <div
            key={text}
            className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-3 transition-colors hover:bg-zinc-900"
          >
            <div className="flex items-center gap-4">
              <History className="h-5 w-5 shrink-0 text-zinc-400" />
              <span className="text-sm font-medium text-zinc-200">{text}</span>
            </div>

            <ArrowUpLeft className="h-5 w-5 shrink-0 text-zinc-400" />
          </div>
        ))}
      </section>

      {/* THREE CATEGORY CARDS */}
      <section className="mt-8 grid grid-cols-3 gap-3">
        <button
          type="button"
          className="flex h-32 min-w-0 flex-col justify-between rounded-[30px] bg-[#202020] p-3 text-left transition-colors hover:bg-[#303030] sm:h-36 sm:p-5"
        >
          <Music2 className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="text-sm leading-tight font-semibold sm:text-base">
            New releases
          </span>
        </button>

        <button
          type="button"
          className="flex h-32 min-w-0 flex-col justify-between rounded-[30px] bg-[#202020] p-3 text-left transition-colors hover:bg-[#303030] sm:h-36 sm:p-5"
        >
          <Heart className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="text-sm leading-tight font-semibold sm:text-base">
            Favorites
          </span>
        </button>

        <button
          type="button"
          className="flex h-32 min-w-0 flex-col justify-between rounded-[30px] bg-[#202020] p-3 text-left transition-colors hover:bg-[#303030] sm:h-36 sm:p-5"
        >
          <ListMusic className="h-7 w-7 shrink-0 sm:h-8 sm:w-8" />
          <span className="text-sm leading-tight font-semibold sm:text-base">
            Playlists
          </span>
        </button>
      </section>

      {/* MINI MUSIC PLAYER - ABOVE BOTTOM NAVIGATION */}
      <div className="fixed inset-x-0 bottom-[64px] z-[100] bg-[#202020] shadow-[0_-4px_20px_rgba(0,0,0,0.3)]">
        <div className="flex min-h-[76px] items-center gap-3 px-3 py-2 sm:gap-4 sm:px-5">
          {/* SONG COVER */}
          <img
            src="https://images.unsplash.com/photo-1516280440614-37939bbacd81?w=160&auto=format&fit=crop&q=80"
            alt="Song cover"
            className="h-14 w-14 shrink-0 rounded-sm object-cover"
          />

          {/* SONG DETAILS */}
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-semibold text-white">
              Original Song - Milton Malla
            </p>
            <p className="mt-1 truncate text-sm text-zinc-400">2FORTY2</p>
          </div>

          {/* CAST BUTTON */}
          <button
            type="button"
            aria-label="Cast"
            className="shrink-0 p-1 text-white transition-colors hover:text-zinc-400"
          >
            <Cast className="h-7 w-7 sm:h-8 sm:w-8" />
          </button>

          {/* PLAY / PAUSE BUTTON */}
          <button
            type="button"
            aria-label={isPlaying ? "Pause" : "Play"}
            onClick={() => setIsPlaying((previous) => !previous)}
            className="shrink-0 p-1 text-white transition-transform hover:scale-110"
          >
            {isPlaying ? (
              <Pause className="h-8 w-8 fill-white sm:h-9 sm:w-9" />
            ) : (
              <Play className="h-8 w-8 fill-white sm:h-9 sm:w-9" />
            )}
          </button>
        </div>
      </div>
    </main>
  )
}
