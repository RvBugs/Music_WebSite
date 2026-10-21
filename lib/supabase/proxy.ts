import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

const PUBLIC = ["/login", "/register"]
const GUEST_ONLY = ["/login", "/register"]

const matches = (path: string, routes: string[]) => routes.some((r) => path === r || path.startsWith(r + "/"))

function redirectTo(
  request: NextRequest,
  supabaseResponse: NextResponse,
  pathname: string,
  next?: string
) {
  const url = request.nextUrl.clone()
  url.pathname = pathname
  url.search = ""
  if (next) url.searchParams.set("next", next)

  const res = NextResponse.redirect(url)
  supabaseResponse.cookies.getAll().forEach((c) => res.cookies.set(c))
  return res
}

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request })

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll()
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          )
          supabaseResponse = NextResponse.next({ request })
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          )
        },
      },
    }
  )

  const { data } = await supabase.auth.getClaims()
  const user = data?.claims
  const path = request.nextUrl.pathname

  // 1. not logged in and the page is private
  if (!user && !matches(path, PUBLIC)) {
    // API calls get a 401, not an HTML redirect
    if (path.startsWith("/api")) {
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
    }
    return redirectTo(
      request,
      supabaseResponse,
      "/login",
      path + request.nextUrl.search
    )
  }

  // 2. logged in and opening login or register
  if (user && matches(path, GUEST_ONLY)) {
    return redirectTo(request, supabaseResponse, "/")
  }

  return supabaseResponse
}
