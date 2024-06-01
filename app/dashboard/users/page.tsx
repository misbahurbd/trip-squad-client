import type { Metadata } from "next"
import { TbUserPlus } from "react-icons/tb"
import Link from "next/link"
import { IUser } from "@/interface"
import { HiOutlineUserGroup } from "react-icons/hi2"
import { axiosInstance } from "@/lib/axios"
import { getCurrentUser } from "@/services/user.service"

import EmptyRes from "@/components/shared/empty-res"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import PaginationComponent from "@/components/shared/pagination"
import UserListItem from "@/components/shared/user-list-item"
import { Button } from "@/components/ui/button"

export const metadata: Metadata = {
  title: "User Management | Trip Squad",
  description:
    "Manage all user accounts on Trip Squad. Change user roles, update statuses, and ensure efficient user administration.",
}

const UserManagement = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  const query = Object.keys(searchParams)
    .map(key => {
      if (searchParams[key] !== undefined) {
        return `${key}=${searchParams[key]}`
      }
    })
    .join("&")

  const users = await axiosInstance(`/users?${query}`)
  const totalPage = Math.ceil(users?.meta?.total / users?.meta?.limit)

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="User Management">
        <Button
          className="flex items-center gap-2"
          asChild
        >
          <Link href={"/dashboard/users/create"}>
            <TbUserPlus className="size-5" />
            <span>Add User</span>
          </Link>
        </Button>
      </DashboardHeader>

      <div className="grow @container/users">
        <div className="space-y-3">
          {users.data.length === 0 && (
            <EmptyRes
              icon={HiOutlineUserGroup}
              message="No users found"
            />
          )}
          <div className="grid grid-cols-1 @4xl/users:grid-cols-2 @7xl/users:grid-cols-3 gap-3">
            {users.data.map((user: IUser) => {
              return (
                <UserListItem
                  key={user.id}
                  user={user}
                />
              )
            })}
          </div>
          {users?.data?.length > 0 && (
            <PaginationComponent totalPages={totalPage} />
          )}
        </div>
      </div>
    </div>
  )
}
export default UserManagement
