"use server"

import { revalidatePath } from "next/cache"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function logoutAction(){
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath("/", "layout")
  redirect("/")
}
