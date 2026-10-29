import { useEffect, useState } from "react"

import getUserInfo from "@/app/(mobile)/(basicLayout)/account/getUserInfo"
import type { UserInfo } from "../types"

const LOAD_FAILED = "We could not load your profile."
const LOAD_CRASHED = "Something went wrong while loading your profile."

export function useUserProfile() {
  const [user, setUser] = useState<UserInfo | null>(null)
  const [loaded, setLoaded] = useState(false)
  const [loadError, setLoadError] = useState("")

  useEffect(() => {
    let cancelled = false

    async function load() {
      try {
        const result = await getUserInfo()

        if (cancelled) return

        if (!result.success || !result.data) {
          setLoadError(LOAD_FAILED)
          return
        }

        const { id, email, name, description, avatar } = result.data

        setUser({
          id,
          email: email ?? "",
          name: name ?? "",
          description: description ?? "",
          avatar: avatar ?? null,
        })
      } catch {
        if (!cancelled) setLoadError(LOAD_CRASHED)
      } finally {
        if (!cancelled) setLoaded(true)
      }
    }

    load()

    return () => {
      cancelled = true
    }
  }, [])

  return { user, loaded, loadError }
}
