
"use server"

import { createClient } from "@/lib/supabase/server"

export type SearchResult = {
    id: string | number
    name: string
    cover: string | null
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

    const { data, error } = await supabase
        .from("song")
        .select("id, name, cover")
        .eq("band", userId)
        .ilike("name", `%${trimmedQuery}%`)
        .limit(10)

    if (error) {
        return { success: false, data: [], error: error.message }
    }

    return {
        success: true,
        data: data ?? [],
    }
}
