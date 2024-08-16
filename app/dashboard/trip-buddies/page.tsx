import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import EmptyRes from "@/components/shared/empty-res"
import { axiosInstance } from "@/lib/axios"
import { HiOutlineUsers } from "react-icons/hi2"
import { Metadata } from "next"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import PaginationComponent from "@/components/shared/pagination"
import { IBuddies } from "@/interface"
import { BuddyRow } from "./_components/buddies-row"
import { getCurrentUser } from "@/services/user.service"

export const metadata: Metadata = {
  title: "Trip Buddies | Trip Squad",
  description:
    "View all your trip buddies on Trip Squad. See who has accepted your trip buddy requests and plan your adventures together.",
}

const TripBuddies = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const currentUser = await getCurrentUser()
  const query = Object.keys(searchParams)
    .map(key => {
      if (searchParams[key] !== undefined) {
        return `${key}=${searchParams[key]}`
      }
    })
    .join("&")

  const buddies = await axiosInstance.get(`/trip-buddies/buddies?${query}`)
  const totalPage = Math.ceil(buddies?.meta?.total / buddies?.meta?.limit)

  if (!currentUser) {
    return null
  }

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Trip Buddies" />
      <div className="grow @container/history">
        <div className="space-y-4">
          {buddies?.data?.length === 0 && (
            <EmptyRes
              icon={HiOutlineUsers}
              message="You haven't sent any trip requests yet."
            />
          )}
          {buddies?.data?.length > 0 && (
            <div className="w-full overflow-auto">
              <Table className="bg-background border border-border min-w-full w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={2}>Trip Details</TableHead>
                    <TableHead>Buddies</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buddies?.data?.map((buddy: IBuddies) => (
                    <BuddyRow
                      buddy={buddy}
                      userId={currentUser.userId || ""}
                      key={buddy.id + "-buddy-cell"}
                    />
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>
                      {buddies?.data?.length > 0 && (
                        <PaginationComponent totalPages={totalPage} />
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
          {/* <div className="gap-3 rounded-lg grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
            {buddies?.data?.map((buddy: IBuddies) => (
              <TripBuddiesCard
                key={buddy.id + "buddy-card"}
                trip={buddy}
              />
            ))}
          </div>
          {buddies?.data?.length > 0 && (
            <PaginationComponent totalPages={totalPage} />
          )} */}
        </div>
      </div>
    </div>
  )
}
export default TripBuddies
