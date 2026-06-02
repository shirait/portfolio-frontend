import { cookies } from "next/headers"
import { NextRequest, NextResponse } from "next/server"

export async function GET(request: NextRequest) {
  const cookieStore = await cookies()
  cookieStore.delete("access_token")

  const redirectTo = request.nextUrl.searchParams.get("redirect") ?? "/login"

  return NextResponse.redirect(new URL(redirectTo, request.url))
}
