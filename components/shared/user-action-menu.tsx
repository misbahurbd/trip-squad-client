"use client"

import { IUser } from "@/interface"
import { Button } from "../ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu"
import { HiOutlineCheck, HiOutlineEllipsisVertical } from "react-icons/hi2"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"

const UserActoinMenu = ({ user }: { user: IUser }) => {
  const router = useRouter()

  const handleRoleChange = async (role: "Admin" | "User") => {
    const toastId = toast.loading("Updating role...")
    try {
      const res = await axiosInstance.put(`/user/update-role/${user.id}`, {
        role: role,
      })
      toast.success(res?.message || "Role updated successfully", {
        id: toastId,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Role update failed", { id: toastId })
    }
  }
  const handleStatusChange = async (status: "Active" | "Blocked") => {
    const toastId = toast.loading("Updating status...")
    try {
      const res = await axiosInstance.put(`/user/update-status/${user.id}`, {
        status: status,
      })
      toast.success(res?.message || "Status updated successfully", {
        id: toastId,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Status update failed", { id: toastId })
    }
  }

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          size="icon"
          variant="ghost"
        >
          <HiOutlineEllipsisVertical className="w-4 h-4" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end">
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change Role</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                disabled={user.role === "User"}
                onClick={() => handleRoleChange("User")}
                className="pr-6 relative"
              >
                User
                {user.role === "User" && (
                  <HiOutlineCheck className="absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={user.role === "Admin"}
                onClick={() => handleRoleChange("Admin")}
              >
                Admin
                {user.role === "Admin" && (
                  <HiOutlineCheck className="absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
        <DropdownMenuSub>
          <DropdownMenuSubTrigger>Change Status</DropdownMenuSubTrigger>
          <DropdownMenuPortal>
            <DropdownMenuSubContent>
              <DropdownMenuItem
                disabled={user.status === "Active"}
                onClick={() => handleStatusChange("Active")}
              >
                Active
                {user.status === "Active" && (
                  <HiOutlineCheck className="absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </DropdownMenuItem>
              <DropdownMenuItem
                disabled={user.status === "Blocked"}
                onClick={() => handleStatusChange("Blocked")}
              >
                Block
                {user.status === "Blocked" && (
                  <HiOutlineCheck className="absolute right-3 top-1/2 -translate-y-1/2" />
                )}
              </DropdownMenuItem>
            </DropdownMenuSubContent>
          </DropdownMenuPortal>
        </DropdownMenuSub>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
export default UserActoinMenu
