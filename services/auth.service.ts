"use server"

import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"

export const getSession = async () => {
  const session = cookies().get("session")?.value
  if (!session) return null
  return jwtDecode(session)
}

export const getAccessToken = async () => {
  const session = cookies().get("session")?.value
  if (!session) return null
  return session
}

export const setSessionCookie = async (token: string) => {
  const oneDay = 24 * 60 * 60

  cookies().set("session", token, {
    secure: process.env.NODE_ENV === "production",
    maxAge: oneDay * 2,
    httpOnly: true,
    sameSite: "lax",
  })
}

export async function logout() {
  cookies().set("session", "", { expires: new Date(0) })
  cookies().set("refreshToken", "", { expires: new Date(0) })
}
