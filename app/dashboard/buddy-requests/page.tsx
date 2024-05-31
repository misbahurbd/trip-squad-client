import DashboardHeader from "@/components/shared/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { axiosInstance } from "@/lib/axios"
import { getCurrentUser } from "@/services/user.service"
import RequestCard from "./_components/request-card"
import { IBuddyRequest } from "@/interface"
import EmptyRes from "@/components/shared/empty-res"
import { HiOutlineUserPlus } from "react-icons/hi2"

const BuddyRequests = async () => {
  const currentUser = await getCurrentUser()
  const buddyRequests = await axiosInstance.get("/trip-buddies")

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Buddy Requests" />
      <div className="grow @container">
        <div className="space-y-4">
          {buddyRequests?.data?.length === 0 && (
            <EmptyRes
              icon={HiOutlineUserPlus}
              message="You have no buddy requests"
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
        </div>
      </div>
    </div>
  )
}
export default BuddyRequests
