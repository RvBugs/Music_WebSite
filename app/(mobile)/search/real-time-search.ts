"use server"

import { createClient } from "@/lib/supabase/server"

export type SearchResult = {
    id: string | number
    name: string
    cover: string | null
    type: "song" | "playlist"
}

export default async function RealTimeSearch(
    query: string,
): Promise<{ success: boolean; data: SearchResult[]; error?: string }> {
    const trimmedQuery = query.trim()

    if (!trimmedQuery) {
        return { success: true, data: [] }
    }

    const supabase = await createClient()
    const { data: authData } = await supabase.auth.getUser()
    const userId = authData.user?.id

    if (!userId) {
        return { success: false, data: [], error: "Please log in to search." }
    }

    const [songsResult, playlistsResult] = await Promise.all([
        supabase
            .from("song")
            .select("id, name, cover")
            .eq("band", userId)
            .ilike("name", `%${trimmedQuery}%`)
            .limit(10),

        supabase
            .from("playlist")
            .select("id, name, cover")
            .eq("band", userId)
            .ilike("name", `%${trimmedQuery}%`)
            .limit(10),
    ])

    if (songsResult.error) {
        return { success: false, data: [], error: songsResult.error.message }
    }

    if (playlistsResult.error) {
        return { success: false, data: [], error: playlistsResult.error.message }
    }

    const songs: SearchResult[] = (songsResult.data ?? []).map((song) => ({
        ...song,
        type: "song",
    }))

    const playlists: SearchResult[] = (playlistsResult.data ?? []).map((playlist) => ({
        ...playlist,
        type: "playlist",
    }))

    return {
        success: true,
        data: [...songs, ...playlists],
    }
}