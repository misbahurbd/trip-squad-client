"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Button } from "@/components/ui/button"
import { CurrentUser } from "@/interface"
import Image from "next/image"
import { usePathname, useRouter } from "next/navigation"
import { logout } from "@/services/auth.service"
import avatar from "@/assets/img/avatar.jpeg"

interface UserBoxProps {
  user: CurrentUser
}

const UserBox = ({ user }: UserBoxProps) => {
  const router = useRouter()
  const pathname = usePathname()

  const onLogout = async () => {
    const regex = /^\/trips\/[^/]+\/request$/
    await logout()
    if (pathname.startsWith("/dashboard")) {
      router.push(`/login`)
    } else if (pathname.match(regex)) {
      const params = new URLSearchParams()
      params.set("next", pathname)
      router.push(`/login?${params.toString()}`)
    } else {
      router.refresh()
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button className="w-8 h-8 relative rounded-full ring-2 ring-primary ring-offset-2">
          <Image
            fill
            alt={user.name}
            src={user.profilePhoto || avatar}
            className="rounded-full object-cover"
          />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="bottom"
        align="end"
        sideOffset={10}
        alignOffset={-5}
        className="min-w-52"
      >
        <DropdownMenuLabel>
          <div>
            <h3 className="font-bold">{user.name}</h3>
            <p className="text-xs text-muted-foreground font-normal">
              {user.email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard")}
          >
            Dashboard
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/profile")}
          >
            Profile
          </DropdownMenuItem>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={() => router.push("/dashboard/settings")}
          >
            Settings
          </DropdownMenuItem>
        </DropdownMenuGroup>
        <DropdownMenuSeparator />
        <DropdownMenuGroup>
          <DropdownMenuItem
            className="cursor-pointer"
            onClick={onLogout}
          >
            Logout
          </DropdownMenuItem>
        </DropdownMenuGroup>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserBox
