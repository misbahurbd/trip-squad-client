"use client"

import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

const AuthActions = () => {
  const router = useRouter()

  return (
    <div className="flex items-center gap-2">
      <Button
        onClick={() => router.push("/register")}
        variant={"ghost"}
      >
        Get Started
      </Button>
      <Button onClick={() => router.push("/login")}>Login</Button>
    </div>
  )
}
export default AuthActions
