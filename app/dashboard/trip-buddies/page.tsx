import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import EmptyRes from "@/components/shared/empty-res"
import { axiosInstance } from "@/lib/axios"
import PaginationComponent from "@/components/shared/pagination"
import { HiOutlineUsers } from "react-icons/hi2"

import { Metadata } from "next"
import TripBuddiesCard from "./_components/trip-buddies-card"
import { IBuddies } from "@/interface"

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
  const query = Object.keys(searchParams)
    .map(key => {
      if (searchParams[key] !== undefined) {
        return `${key}=${searchParams[key]}`
      }
    })
    .join("&")

  const buddies = await axiosInstance.get(`/trip-buddies/buddies?${query}`)
  const totalPage = Math.ceil(buddies?.meta?.total / buddies?.meta?.limit)

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
          <div className="gap-3 rounded-lg grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
            {buddies?.data?.map((buddy: IBuddies) => (
              <TripBuddiesCard
                key={buddy.id + "buddy-card"}
                trip={buddy}
              />
            ))}
          </div>
          {buddies?.data?.length > 0 && (
            <PaginationComponent totalPages={totalPage} />
          )}
        </div>
      </div>
    </div>
  )
}
export default TripBuddies
