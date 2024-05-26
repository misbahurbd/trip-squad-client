"use client"

import { ExitIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/auth.service"
import { useRouter } from "next/navigation"

const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <Button
      size={"icon"}
      variant={"ghost"}
      onClick={handleLogout}
    >
      <ExitIcon className="size-5" />
    </Button>
  )
}
export default LogoutButton
