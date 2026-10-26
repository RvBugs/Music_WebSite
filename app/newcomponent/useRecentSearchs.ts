"use client"
import { useCallback, useEffect, useState } from "react"

const KEY = "music:recent-searches"
const MAX = 12

export function useRecentSearches() {
  const [items, setItems] = useState<string[]>([])

  // read localStorage only in the browser (avoids Next.js hydration errors)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(KEY)
      if (raw) setItems(JSON.parse(raw))
    } catch {}
  }, [])

  const persist = (next: string[]) => {
    setItems(next)
    try {
      localStorage.setItem(KEY, JSON.stringify(next))
    } catch {}
  }

  const add = useCallback(
    (q: string) => {
      const text = q.trim()
      if (!text) return
      const next = [
        text,
        ...items.filter((i) => i.toLowerCase() !== text.toLowerCase()),
      ].slice(0, MAX)
      persist(next)
    },
    [items]
  )

  const remove = useCallback(
    (q: string) => persist(items.filter((i) => i !== q)),
    [items]
  )

  const clear = useCallback(() => persist([]), [])

  return { items, add, remove, clear }
}
