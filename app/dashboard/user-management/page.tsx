import DashboardHeader from "@/components/shared/dashboard-header"
import PaginationComponent from "@/components/shared/pagination"
import UserListItem from "@/components/shared/user-list-item"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IUser } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import { getCurrentUser } from "@/services/user.service"

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
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="User Management" />

      <ScrollArea className="grow bg-secondary rounded-tl-lg p-4">
        <div className="p-5 space-y-4">
          <div className="grid lg:grid-cols-2 gap-3">
            {users.data.map((user: IUser) => {
              return (
                <UserListItem
                  key={user.id}
                  user={user}
                />
              )
            })}
          </div>
          <PaginationComponent totalPages={totalPage} />
        </div>
      </ScrollArea>
    </div>
  )
}
export default UserManagement
