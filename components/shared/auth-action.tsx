"use client"

import { Button } from "@/components/ui/button"
import { usePathname, useRouter } from "next/navigation"

const AuthActions = () => {
  const pathname = usePathname()
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Button
        className="hidden sm:block"
        onClick={() => router.push("/register")}
        variant={"outline"}
      >
        Get Started
      </Button>
      <Button onClick={() => router.push(`/login?next=${pathname}`)}>
        Login
      </Button>
    </div>
  )
}
export default AuthActions
