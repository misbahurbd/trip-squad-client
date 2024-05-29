"use client"

import { IUser } from "@/interface"
import Image from "next/image"
import avatar from "@/assets/img/avatar.jpeg"
import UserActoinMenu from "./user-action-menu"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import Loading from "@/app/(root)/trips/loading"

const UserListItem = ({ user }: { user: IUser }) => {
  const [isMounted, setIsMounted] = useState(false)
  useEffect(() => {
    setIsMounted(true)
    return () => {
      setIsMounted(false)
    }
  }, [])

  if (!isMounted) {
    return null
  }
  return (
    <div className="flex items-center gap-3 bg-background rounded-xl p-3">
      <div className="size-24 relative rounded overflow-hidden">
        <Image
          src={user.profilePhoto || avatar}
          alt={user.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="grow">
        <h3 className="font-semibold space-x-2">
          <span>{user.name}</span>
        </h3>
        <p className="text-sm text-muted-foreground">@{user.username}</p>
        <div className="grid grid-cols-2 gap-3 mt-1 max-w-[200px] items-center">
          <p className="text-xs text-muted-foreground flex items-center  space-x-1">
            <span className="text-foreground">Status:</span>
            <Badge
              variant={user.status == "Active" ? "active" : "deactived"}
              className="text-xs px-1 py-0.5 leading-tight"
            >
              {user.status}
            </Badge>
          </p>
          <p className="text-xs text-muted-foreground space-x-1">
            <span className="text-foreground">Role:</span>
            <span>{user.role}</span>
          </p>
        </div>
      </div>
      <UserActoinMenu user={user} />
    </div>
  )
}
export default UserListItem
