"use client"

import { useEffect, useState } from "react"
import {
    ArrowUpLeft,
    ChevronRight,
    Heart,
    History,
    ListMusic,
    LoaderCircle,
    Music2,
    Search,
} from "lucide-react"
import Link from "next/link"
import HeaderSearch from "@/app/(mobile)/search/header-search"
import RealTimeSearch, {
    type SearchResult,
} from "./real-time-search"

const SEARCH_HISTORY_KEY = "recent-searches"
const MAX_SEARCH_HISTORY = 10

export default function SearchPage() {
    const [query, setQuery] = useState("")
    const [results, setResults] = useState<SearchResult[]>([])
    const [loading, setLoading] = useState(false)
    const [error, setError] = useState("")
    const [recentSearches, setRecentSearches] = useState<string[]>([])

    // Load search history from browser storage
    useEffect(() => {
        try {
            const saved = localStorage.getItem(SEARCH_HISTORY_KEY)

            if (saved) {
                const parsed: unknown = JSON.parse(saved)

                if (
                    Array.isArray(parsed) &&
                    parsed.every((item) => typeof item === "string")
                ) {
                    // eslint-disable-next-line react-hooks/set-state-in-effect
                    setRecentSearches(parsed)
                }
            }
        } catch {
            setRecentSearches([])
        }
    }, [])

    // Real-time search for songs and playlists
    useEffect(() => {
        const searchQuery = query.trim()

        if (!searchQuery) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setResults([])
            setError("")
            setLoading(false)
            return
        }

        let cancelled = false

        const timer = setTimeout(async () => {
            setLoading(true)
            setError("")

            try {
                const result = await RealTimeSearch(searchQuery)

                if (cancelled) return

                if (result.success) {
                    setResults(result.data)
                } else {
                    setResults([])
                    setError(result.error ?? "Search failed.")
                }
            } catch {
                if (!cancelled) {
                    setResults([])
                    setError("Something went wrong while searching.")
                }
            } finally {
                if (!cancelled) {
                    setLoading(false)
                }
            }
        }, 300)

        return () => {
            cancelled = true
            clearTimeout(timer)
        }
    }, [query])

    // Save a search query to browser history
    function saveSearch(value: string) {
        const search = value.trim()

        if (!search) return

        const updated = [
            search,
            ...recentSearches.filter(
                (item) => item.toLowerCase() !== search.toLowerCase(),
            ),
        ].slice(0, MAX_SEARCH_HISTORY)

        try {
            localStorage.setItem(
                SEARCH_HISTORY_KEY,
                JSON.stringify(updated),
            )
            setRecentSearches(updated)
        } catch {
            // Ignore browser storage errors
        }
    }

    // Clear saved search history
    function clearSearchHistory() {
        try {
            localStorage.removeItem(SEARCH_HISTORY_KEY)
        } catch {
            // Ignore browser storage errors
        }

        setRecentSearches([])
    }

    // Get public cover image URL
    function getCoverUrl(cover: string | null) {
        if (!cover) return ""

        try {
            return JSON.parse(cover)?.data?.publicUrl ?? ""
        } catch {
            return ""
        }
    }

    return (
        <>
            <div className="sticky top-0 z-50 bg-background lg:px-16 ">
                <HeaderSearch />

                {/* SEARCH INPUT */}
                <section className="flex items-center gap-3 px-4 py-3 backdrop-blur-md ">
                    <Search className="size-6 shrink-0 " />

                    <div className="flex flex-1 items-center rounded-full bg-[#dddedf]  px-4 py-2.5 dark:bg-[#22292B]">
                        <input
                            type="text"
                            value={query}
                            onChange={(event) => setQuery(event.target.value)}
                            onKeyDown={(event) => {
                                if (event.key === "Enter") {
                                    saveSearch(query)
                                }
                            }}
                            placeholder="Search songs and playlists"
                            aria-label="Search songs and playlists"
                            className="w-full bg-transparent text-sm outline-none placeholder:text-zinc-400"
                        />

                        {loading && (
                            <LoaderCircle className="ml-2 size-4 shrink-0 animate-spin text-zinc-400" />
                        )}
                    </div>

                    <ChevronRight className="size-6 shrink-0" />
                </section>

                {/* SEARCH RESULTS DROPDOWN */}
                {query.trim() && (
                    <div className="absolute inset-x-4 top-full z-50 max-h-80 overflow-y-auto rounded-xl border bg-background shadow-lg">
                        {error ? (
                            <p className="p-4 text-sm text-destructive">
                                {error}
                            </p>
                        ) : results.length > 0 ? (
                            results.map((item) => {
                                const coverUrl = getCoverUrl(item.cover)

                                return (
                                    <Link
                                        key={`${item.type}-${item.id}`}
                                        href={
                                            item.type === "song"
                                                ? `/songs/${item.id}`
                                                : `/playlist/${item.id}`
                                        }
                                        onClick={() => saveSearch(query)}
                                        className="flex items-center gap-3 p-3 transition-colors hover:bg-muted"
                                    >
                                        {coverUrl ? (
                                            // eslint-disable-next-line @next/next/no-img-element
                                            <img
                                                src={coverUrl}
                                                alt=""
                                                className="size-11 shrink-0 rounded-md object-cover"
                                            />
                                        ) : (
                                            <div className="flex size-11 shrink-0 items-center justify-center rounded-md bg-muted">
                                                {item.type === "song" ? (
                                                    <Music2 className="size-5 text-muted-foreground" />
                                                ) : (
                                                    <ListMusic className="size-5 text-muted-foreground" />
                                                )}
                                            </div>
                                        )}

                                        <div className="min-w-0 flex-1">
                                            <p className="truncate text-sm font-medium">
                                                {item.name}
                                            </p>

                                            <p className="text-xs capitalize text-muted-foreground">
                                                {item.type}
                                            </p>
                                        </div>
                                    </Link>
                                )
                            })
                        ) : loading ? (
                            <p className="p-4 text-sm text-muted-foreground">
                                Searching songs and playlists...
                            </p>
                        ) : (
                            <p className="p-4 text-sm text-muted-foreground">
                                No songs or playlists found.
                            </p>
                        )}
                    </div>
                )}
            </div>

            <main className="min-h-screen w-full px-4 pb-40 text-white  ">
                {/* RECENT SEARCH CARDS */}
                {/* Keep your existing recent search cards here if needed. */}

                {/* RECENT SEARCH HISTORY */}
                {!query.trim() && recentSearches.length > 0 && (
                    <section className="mt-4 flex flex-col gap-1 lg:px-16">
                        <div className="mb-2 flex items-center justify-between ">
                            <h2 className="text-sm font-medium text-zinc-400">
                                Recent searches
                            </h2>

                            <button
                                type="button"
                                onClick={clearSearchHistory}
                                className="text-xs text-zinc-400 transition-colors hover:text-white"
                            >
                                Clear history
                            </button>
                        </div>

                        {recentSearches.map((text) => (
                            <div
                                key={text}
                                className="flex cursor-pointer items-center justify-between rounded-lg px-1 py-3 transition-colors hover:bg-[#ececec] hover:text-gray-900 dark:hover:bg-[#31393b]"
                                onClick={() => setQuery(text)}
                            >
                                <div className="flex min-w-0 items-center gap-4">
                                    <History className="size-5 shrink-0 dark:text-zinc-400 text-zinc-400" />

                                    <span className="truncate text-sm font-medium dark:text-zinc-200 text-zinc-400">
                                        {text}
                                    </span>
                                </div>

                                <button
                                    type="button"
                                    aria-label={`Search again for ${text}`}
                                    onClick={(event) => {
                                        event.stopPropagation()
                                        setQuery(text)
                                    }}
                                    className="rounded-full p-1 transition-colors hover:bg-zinc-800"
                                >
                                    <ArrowUpLeft className="size-5 text-zinc-400" />
                                </button>
                            </div>
                        ))}
                    </section>
                )}

                {/* THREE CATEGORY CARDS */}
                <section className="mt-8 grid grid-cols-3 gap-3 lg:px-16">
                    <button
                        type="button"
                        className="flex flex-col items-start gap-8 rounded-xl bg-[#cacbcc] p-3 text-left transition-opacity hover:opacity-80 dark:bg-[#22292B]"
                    >
                        <Music2 className="size-6  text-gray-900 dark:text-white" />
                        <span className="text-sm font-semibold text-gray-900 dark:text-white">
                            New releases
                        </span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-start gap-8 rounded-xl bg-[#cacbcc] p-3 text-left transition-opacity hover:opacity-80 dark:bg-[#22292B]"
                    >
                        <Heart className="size-6  text-gray-900 dark:text-white" />
                        <span className="text-sm font-semibold  text-gray-900 dark:text-white">
                            Favorites
                        </span>
                    </button>

                    <button
                        type="button"
                        className="flex flex-col items-start gap-8 rounded-xl bg-[#cacbcc] p-3 text-left transition-opacity hover:opacity-80 dark:bg-[#22292B] "
                    >
                        <ListMusic className="size-6  text-gray-900 dark:text-white" />
                        <span className="text-sm font-semibold  text-gray-900 dark:text-white">
                            Playlists
                        </span>
                    </button>
                </section>
            </main>
        </>
    )
}