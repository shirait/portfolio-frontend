import { cookies } from "next/headers"
import { redirect } from "next/navigation"

const CLEAR_SESSION_PATH = "/api/auth/clear-session"

export async function getAccessToken(): Promise<string | undefined> {
  const cookieStore = await cookies()
  return cookieStore.get("access_token")?.value
}

export function redirectToLogin() {
  redirect(CLEAR_SESSION_PATH)
}

export async function requireAccessToken() {
  const token = await getAccessToken()

  if(!token) {
    redirect("/login")
  }

  return token
}

async function isAccessTokenValid(token: string): Promise<boolean> {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/v1/profile`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    cache: "no-store",
  })

  return res.ok
}

export async function redirectIfAuthenticated(redirectTo = "/") {
  const token = await getAccessToken()

  if(!token) {
    return
  }

  if(await isAccessTokenValid(token)) {
    redirect(redirectTo)
  }

  redirect(CLEAR_SESSION_PATH)
}
