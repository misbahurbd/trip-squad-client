import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { axiosInstance } from "@/lib/axios"
import { getCurrentUser } from "@/services/user.service"
import RequestCard from "./_components/request-card"
import { IBuddyRequest } from "@/interface"
import EmptyRes from "@/components/shared/empty-res"
import { HiOutlineUserPlus } from "react-icons/hi2"
import PaginationComponent from "@/components/shared/pagination"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Buddy Requests | Trip Squad",
  description:
    "Manage your trip buddy requests on Trip Squad. View, accept, or reject requests from other users to join your trips.",
}

const BuddyRequests = async ({
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

  const buddyRequests = await axiosInstance.get(`/trip-buddies?${query}`)
  const totalPage = Math.ceil(
    buddyRequests?.meta?.total / buddyRequests?.meta?.limit
  )

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Buddy Requests" />
      <div className="grow @container">
        <div className="space-y-4">
          {buddyRequests?.data?.length === 0 && (
            <EmptyRes
              icon={HiOutlineUserPlus}
              message="You don't have any pending buddy request."
            />
          )}
          <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @[85rem]:grid-cols-4 gap-3 ">
            {buddyRequests?.data?.map((buddyRequest: IBuddyRequest) => (
              <RequestCard
                key={buddyRequest.tripId + buddyRequest.userId}
                buddyRequest={buddyRequest}
              />
            ))}
          </div>
          {buddyRequests?.data?.length > 0 && (
            <PaginationComponent totalPages={totalPage} />
          )}
        </div>
      </div>
    </div>
  )
}
export default BuddyRequests
