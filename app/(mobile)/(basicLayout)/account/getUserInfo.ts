"use server"

import { createClient } from "@/lib/supabase/server"

const AVATAR_BUCKET = "band"
const DEFAULT_AUTH_ERROR = "User not authenticated."

type SupabaseServerClient = Awaited<ReturnType<typeof createClient>>

function failure(message: string) {
    return {
        success: false as const,
        data: null,
        error: message,
    }
}

// The stored avatar value is a path like "<bucket>/<folder>/<file>";
// the storage API wants everything after the first segment.
function resolveAvatarUrl(supabase: SupabaseServerClient, storedPath: string) {
    const objectPath = storedPath.split("/").splice(1, 3).join("/")

    return supabase.storage.from(AVATAR_BUCKET).getPublicUrl(objectPath).data
        .publicUrl
}

export default async function getUserInfo() {
    const supabase = await createClient()

    const {
        data: { user },
        error: authError,
    } = await supabase.auth.getUser()

    if (authError || !user) {
        return failure(authError?.message ?? DEFAULT_AUTH_ERROR)
    }

    const { data: band, error: bandError } = await supabase
        .from("band")
        .select("id, name, description, avatar")
        .eq("id", user.id)
        .single()

    if (bandError) {
        return failure(bandError.message)
    }

    return {
        success: true as const,
        data: {
            id: user.id,
            email: user.email,
            name: band.name,
            description: band.description,
            avatar: resolveAvatarUrl(supabase, band.avatar as string),
        },
    }
}
