"use client"

import { ExitIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import { logout } from "@/services/auth.service"
import { useRouter } from "next/navigation"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../ui/tooltip"

const LogoutButton = () => {
  const router = useRouter()
  const handleLogout = async () => {
    await logout()
    router.push("/login")
  }

  return (
    <TooltipProvider>
      <Tooltip>
        <TooltipTrigger asChild>
          <Button
            size={"icon"}
            variant={"ghost"}
            type="button"
            onClick={handleLogout}
          >
            <ExitIcon className="size-5" />
          </Button>
        </TooltipTrigger>
        <TooltipContent>
          <p>Logout</p>
        </TooltipContent>
      </Tooltip>
    </TooltipProvider>
  )
}
export default LogoutButton
