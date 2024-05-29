import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TbMapPlus } from "react-icons/tb"
import { getCurrentUser } from "@/services/user.service"
import Link from "next/link"
import { axiosInstance } from "@/lib/axios"
import { ITrip } from "@/interface"
import TripCard from "@/components/shared/trip-card"
import { Suspense } from "react"
import Pagination from "@/components/shared/pagination"
import DashboardHeader from "@/components/shared/dashboard-header"
import EmptyRes from "@/components/shared/empty-res"
import { HiOutlineMap } from "react-icons/hi2"

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
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="My Trips">
        <Button
          className="flex items-center gap-2"
          asChild
        >
          <Link href={"/dashboard/trips/create"}>
            <TbMapPlus className="size-5" />
            <span>Add Trip</span>
          </Link>
        </Button>
      </DashboardHeader>
      <ScrollArea className="grow bg-secondary rounded-tl-lg p-4">
        <div className="space-y-4">
          {trips.data.length === 0 && (
            <EmptyRes
              icon={HiOutlineMap}
              message="You have no trip posted"
            />
          )}
          <Suspense key={searchParams.page}>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
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
      </ScrollArea>
    </div>
  )
}
export default TripsPage
