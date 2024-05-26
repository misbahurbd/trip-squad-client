import type { NextRequest } from "next/server"

export function middleware(request: NextRequest) {
  const currentUser = request.cookies.get("session")?.value

  const pathname = request.nextUrl.pathname

  const authRoutes = [
    "/login",
    "/register",
    "/forget-password",
    "/reset-password",
  ]

  const privateRoutes = ["/dashboard", "/profile", "/settings"]

  if (currentUser && authRoutes.some(route => pathname.startsWith(route))) {
    return Response.redirect(new URL("/dashboard", request.url))
  }

  if (!currentUser && privateRoutes.some(route => pathname.startsWith(route))) {
    return Response.redirect(new URL("/login", request.url))
  }
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
}
