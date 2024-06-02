"use server"

import { jwtDecode } from "jwt-decode"
import { cookies } from "next/headers"
import { redirect } from "next/navigation"

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
export const setRefreshToken = async (token: string) => {
  const oneDay = 24 * 60 * 60

  cookies().set("refreshToken", token, {
    secure: process.env.NODE_ENV === "production",
    maxAge: oneDay * 7,
    httpOnly: true,
    sameSite: "lax",
  })
}

export async function logout() {
  cookies().delete("session")
  cookies().delete("refreshToken")
}
