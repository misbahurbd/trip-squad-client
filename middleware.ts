import type { NextRequest } from "next/server"
import { getCurrentUser } from "./services/user.service"

export async function middleware(request: NextRequest) {
  try {
    const currentUser = request.cookies.get("session")?.value

    const pathname = request.nextUrl.pathname

    const authRoutes = [
      "/login",
      "/register",
      "/forget-password",
      "/reset-password",
    ]

    const privateRoutes = [/^\/dashboard\b.*/, /^\/trips\/[^/]+\/request\b.*/]

    const adminOnlyRoutes = [
      /^\/dashboard\/trips\b.*/,
      /^\/dashboard\/users\b.*/,
    ]
    const userOnlyRoutes = [
      /^\/dashboard\/my-trips\b.*/,
      /^\/dashboard\/buddy-requests\b.*/,
      /^\/dashboard\/requests-history\b.*/,
      /^\/dashboard\/trip-buddies\b.*/,
    ]

    if (currentUser && authRoutes.some(route => pathname.startsWith(route))) {
      return Response.redirect(new URL("/dashboard", request.url))
    }

    if (!currentUser && privateRoutes.some(route => pathname.match(route))) {
      return Response.redirect(new URL(`/login?next=${pathname}`, request.url))
    }

    if (currentUser && pathname === "/dashboard") {
      const user = await getCurrentUser()
      if (!user) {
        return Response.redirect(new URL("/login", request.url))
      }
      if (user?.role != "User") {
        return Response.redirect(new URL("/dashboard/trips", request.url))
      } else {
        return Response.redirect(new URL("/dashboard/my-trips", request.url))
      }
    }

    if (currentUser && adminOnlyRoutes.some(route => pathname.match(route))) {
      const user = await getCurrentUser()
      if (!user) {
        return Response.redirect(new URL("/login", request.url))
      }
      if (user?.role != "Admin") {
        return Response.redirect(new URL("/dashboard/my-trips", request.url))
      }
    }

    if (currentUser && userOnlyRoutes.some(route => pathname.match(route))) {
      const user = await getCurrentUser()
      if (!user) {
        return Response.redirect(new URL("/login", request.url))
      }
      if (user?.role != "User") {
        return Response.redirect(new URL("/dashboard/trips", request.url))
      }
    }
  } catch (error) {
    console.log(error)
    return Response.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
