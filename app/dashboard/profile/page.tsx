import DashboardHeader from "@/components/shared/dashboard-header"
import { getCurrentUser } from "@/services/user.service"
import UserProfile from "./_components/user-profile"
import { axiosInstance } from "@/lib/axios"
import { IBuddyRequest, ITrip } from "@/interface"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import RequestHistory from "@/components/shared/request-history"
import TripCardProfile from "./_components/trip-card-profile"
import EmptyRes from "@/components/shared/empty-res"
import { PiBackpack } from "react-icons/pi"
import { AiOutlineHistory } from "react-icons/ai"

const Profile = async () => {
  const currentUser = await getCurrentUser()

  const trips = await axiosInstance.get(`/trips/get-my-trips?limit=6`)
  const requestHistory = await axiosInstance.get(
    `/trip-buddies/history?limit=6`
  )

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Profile" />
      <div className="grow @container/profile-aside space-y-3">
        <UserProfile currentUser={currentUser} />
        {currentUser.role === "User" && (
          <div className="flex flex-col @2xl/profile-aside:flex-row gap-3">
            <div className="@container/trips flex-1 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">My Trips</h3>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                >
                  <Link href={"/dashboard/my-trips"}>
                    <span>View All</span>
                  </Link>
                </Button>
              </div>
              {trips?.data?.length === 0 && (
                <EmptyRes
                  icon={PiBackpack}
                  message="No trips posted yet."
                />
              )}
              <div className="gap-3 rounded-lg grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3">
                {trips?.data?.map((trip: ITrip) => (
                  <TripCardProfile
                    key={trip.id}
                    trip={trip}
                  />
                ))}
              </div>
            </div>
            <div className="@container/trips flex-1 space-y-3">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold">Request History</h3>
                <Button
                  asChild
                  size="sm"
                  variant="outline"
                >
                  <Link href={"/dashboard/requests-history"}>
                    <span>View All</span>
                  </Link>
                </Button>
              </div>
              {requestHistory?.data?.length === 0 && (
                <EmptyRes
                  icon={AiOutlineHistory}
                  message="You haven't sent any trip requests yet."
                />
              )}
              <div className="gap-3 rounded-lg grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3">
                {requestHistory?.data?.map((history: IBuddyRequest) => (
                  <RequestHistory
                    key={history.id}
                    request={history}
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
export default Profile
