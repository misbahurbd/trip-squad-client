import type { Metadata } from "next"
import { Suspense } from "react"
import { PiBackpack } from "react-icons/pi"
import { ITrip } from "@/interface"
import { axiosInstance } from "@/lib/axios"

import EmptyRes from "@/components/shared/empty-res"
import TripCard from "@/components/shared/trip-card"
import { getCurrentUser } from "@/services/user.service"
import Pagination from "@/components/shared/pagination"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"

export const metadata: Metadata = {
  title: "Trip Management | Trip Squad",
  description:
    "Manage all trips on Trip Squad. Admins can edit, update, and delete trips efficiently to ensure seamless trip organization.",
}

const TripsPage = async ({
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

  const trips = await axiosInstance.get(`/trips?${query}`)
  const totalPage = Math.ceil(trips?.meta?.total / trips?.meta?.limit)

  return (
    <div className="h-full flex flex-col p-3 gap-3 @container">
      <DashboardHeader pageTitle="Trip Management" />

      <div className="space-y-4">
        {trips.data.length === 0 && (
          <EmptyRes
            icon={PiBackpack}
            message="You have no trip posted"
          />
        )}
        <Suspense key={searchParams.page}>
          <div className="grid grid-cols-1 @[40rem]:grid-cols-2 @[60rem]:grid-cols-3 @[80rem]:grid-cols-4 gap-3">
            {trips.data.map((trip: ITrip) => (
              <TripCard
                key={trip.id}
                trip={trip}
              />
            ))}
          </div>
        </Suspense>
        {trips.data.length > 0 && <Pagination totalPages={totalPage} />}
      </div>
    </div>
  )
}
export default TripsPage
