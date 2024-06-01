import { Button } from "@/components/ui/button"
import { TbMapPlus } from "react-icons/tb"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { getCurrentUser } from "@/services/user.service"
import Link from "next/link"
import { axiosInstance } from "@/lib/axios"
import { ITrip } from "@/interface"
import { Suspense } from "react"
import Pagination from "@/components/shared/pagination"
import EmptyRes from "@/components/shared/empty-res"
import { PiBackpack } from "react-icons/pi"
import TripCard from "@/components/shared/trip-card"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "My Trips | Trip Squad",
  description:
    "View and manage your trips on Trip Squad. Keep track of upcoming and past adventures, and share your travel experiences.",
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

  const trips = await axiosInstance.get(`/trips/get-my-trips?${query}`)
  const totalPage = Math.ceil(trips?.meta?.total / trips?.meta?.limit)

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="My Trips">
        <Button
          className="flex items-center gap-2"
          asChild
        >
          <Link href={"/dashboard/my-trips/create"}>
            <TbMapPlus className="size-5" />
            <span>Add Trip</span>
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grow @container">
        <div className="space-y-4">
          {trips.data.length === 0 && (
            <EmptyRes
              icon={PiBackpack}
              message="No trip found!"
            />
          )}
          <Suspense key={searchParams.page}>
            <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @[85rem]:grid-cols-4 gap-3">
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
    </div>
  )
}
export default TripsPage
