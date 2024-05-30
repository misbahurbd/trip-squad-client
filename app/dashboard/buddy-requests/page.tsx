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
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="Buddy Requests" />
      <ScrollArea className="grow bg-secondary rounded-tl-lg p-2 md:p-4">
        <div className="space-y-4">
          {buddyRequests?.data?.length === 0 && (
            <EmptyRes
              icon={HiOutlineUserPlus}
              message="You have no buddy requests"
            />
          )}
          <div className="grid grid-cols-3 gap-3">
            {buddyRequests?.data?.map((buddyRequest: IBuddyRequest) => (
              <RequestCard
                key={buddyRequest.tripId + buddyRequest.userId}
                buddyRequest={buddyRequest}
              />
            ))}
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
export default BuddyRequests
