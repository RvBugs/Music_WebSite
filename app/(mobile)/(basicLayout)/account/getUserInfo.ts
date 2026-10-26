"use server"

import { createClient } from "@/lib/supabase/server"

export default async function getUserInfo() {
    const supabase = await createClient()

    const {
        data: { user },
        error,
    } = await supabase.auth.getUser()

    if (error || !user) {
        return {
            success: false,
            data: null,
            error: error?.message ?? "User not authenticated.",
        }
    }

    const { data, error: bandError } = await supabase
        .from("band")
        .select("id, name, description, avatar")
        .eq("id", user.id)
        .single()

    if (bandError) {
        return {
            success: false,
            data: null,
            error: bandError.message,
        }
    }

    const url = supabase.storage.from("band").getPublicUrl((data.avatar as string).split("/").splice(1,3).join("/")).data.publicUrl

    console.log(url)

    return {
        success: true,
        data: {
            id: user.id,
            email: user.email,
            name: data.name,
            description: data.description,
            avatar: url,
        },
    }
}