"use client"
import { useState } from "react"
import { useRouter } from "next/navigation"
import { useRecentSearches } from "@/app/newcomponent/useRecentSearchs"
import type { QuickLink, RecentVisit } from "@/app/newcomponent/search"
import SearchBar from "@/app/newcomponent/searchbar"
import RecentCards from "@/app/newcomponent/recentcard"
import RecentList from "@/app/newcomponent/recentlist"
import QuickLinks from "@/app/newcomponent/Quicklink"
import "@/app/newcomponent/search.css"

// Demo data. Replace with real data from your API / database.
const visits: RecentVisit[] = [
  {
    id: "1",
    title: "Ma ekkala amanapawa wee dab...",
    query: "ma ekkala amanapawa",
  },
  {
    id: "2",
    title: "Shane Filan - Beautiful In White",
    query: "beautiful in white",
  },
  { id: "3", title: "Oya Dathin Alla", query: "oya dathin alla" },
  { id: "4", title: "Dynamite", query: "dynamite" },
]

const links: QuickLink[] = [
  { id: "n", label: "New releases", href: "/new-releases", icon: "new" },
  { id: "c", label: "Charts", href: "/charts", icon: "charts" },
  { id: "m", label: "Moods and genres", href: "/moods", icon: "moods" },
]

export default function SearchPage() {
  const router = useRouter()
  const [query, setQuery] = useState("")
  const { items, add, remove } = useRecentSearches()

  const runSearch = (q: string) => {
    const text = q.trim()
    if (!text) return
    add(text)
    setQuery(text)
    router.push(`/search/results?q=${encodeURIComponent(text)}`)
  }

  return (
    <main className="ms-page">
      <SearchBar
        value={query}
        onChange={setQuery}
        onSubmit={runSearch}
        onBack={() => router.back()}
      />

      <RecentCards items={visits} onSelect={runSearch} />
      <RecentList
        items={items}
        onSelect={runSearch}
        onFill={setQuery}
        onRemove={remove}
      />
      <QuickLinks links={links} />
    </main>
  )
}
