import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete("access_token")

  const rawRedirect = request.nextUrl.searchParams.get("redirect")
  const redirectTo = rawRedirect?.startsWith("/") ? rawRedirect : "/login"

  return NextResponse.redirect(new URL(redirectTo, request.url))
}
