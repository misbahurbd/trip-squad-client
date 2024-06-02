"use client"

import { IUser } from "@/interface"
import Image from "next/image"
import UserActoinMenu from "./user-action-menu"
import { Badge } from "@/components/ui/badge"
import { useEffect, useState } from "react"
import avatar from "@/assets/img/avatar.jpeg"
import { cn } from "@/lib/utils"

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
    <div className="flex @container/user-item items-center gap-3 bg-background rounded-xl p-3">
      <div className="size-24 shrink-0 relative rounded overflow-hidden">
        <Image
          src={user.profilePhoto || avatar}
          alt={user.name}
          fill
          className="object-cover"
        />
      </div>
      <div className="grow">
        <div>
          <h3 className="font-semibold leading-tight flex items-center gap-2">
            <span>{user.name}</span>
            <Badge
              variant={user.emailVerified ? "active" : "destructive"}
              className="text-xs px-1 py-0.5 leading-tight"
            >
              {user.emailVerified ? "Verified" : "Not Verified"}
            </Badge>
          </h3>
          <p className="text-sm text-muted-foreground leading-tight">
            @{user.username}
          </p>
        </div>
        <div className="grid grid-cols-2 w-fit gap-x-8 gap-y-0 mt-1 items-center">
          <p className="text-sm col-span-2 @2xl/user-item:col-span-1 text-muted-foreground flex items-center gap-1">
            <span className="text-foreground">Email:</span>
            {user.email}
          </p>
          <p className="text-sm col-span-2 @2xl/user-item:col-span-1 text-muted-foreground flex items-center gap-1">
            <span className="text-foreground">Mobile:</span>
            {user?.mobile || "null"}
          </p>
          <p className="text-sm text-muted-foreground flex items-center  gap-1">
            <span className="text-foreground">Status:</span>
            <Badge
              variant={"secondary"}
              className={cn(
                "text-xs px-1 py-0.5 leading-tight",
                user.status == "Active" ? "text-green-500" : "text-destructive"
              )}
            >
              {user.status}
            </Badge>
          </p>
          <p className="text-sm text-muted-foreground flex gap-1">
            <span className="text-foreground">Role:</span>
            <Badge
              variant={"secondary"}
              className={cn("text-xs px-1 py-0.5 leading-tight")}
            >
              {user.role}
            </Badge>
          </p>
        </div>
      </div>
      <UserActoinMenu user={user} />
    </div>
  )
}
export default UserListItem
