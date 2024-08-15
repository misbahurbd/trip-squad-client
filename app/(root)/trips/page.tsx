import HomeTripCard from "@/components/shared/home-trip-card"
import PaginationComponent from "@/components/shared/pagination"

import { ITrip } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import TripAside from "@/app/(root)/trips/_components/trip-aside"
import EmptyRes from "@/components/shared/empty-res"
import { PiBackpack } from "react-icons/pi"
import MobileTripAside from "./_components/mobile-trip-aside"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Explore Trips | Trip Squad",
  description:
    "Find the best trips for your next adventure. Explore the latest trips and connect with fellow travelers.",
}

interface TripsPageProps {
  searchParams: Record<string, string>
}

const TripsPage: React.FC<TripsPageProps> = async ({ searchParams }) => {
  const query = Object.keys(searchParams)
    .map(key => {
      if (searchParams[key] !== undefined) {
        return `${key}=${searchParams[key]}`
      }
    })
    .join("&")

  const trips = await axiosInstance.get(`/trips?${query}`)
  const totalPage = Math.ceil(trips?.meta?.total / trips?.meta?.limit)
  const tripTypes = await axiosInstance.get("/trips/trip-types")

  return (
    <div className="container flex gap-3">
      <MobileTripAside tripTypes={tripTypes?.data || []} />
      <aside className="w-[320px] shrink-0 hidden lg:block">
        <TripAside
          className="sticky top-20"
          tripTypes={tripTypes?.data || []}
        />
      </aside>
      <div className="space-y-4 grow">
        {(!trips?.data || trips?.data?.length == 0) && (
          <EmptyRes
            icon={PiBackpack}
            message="There are no trip!"
          />
        )}
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-3">
          {trips?.data?.map((trip: ITrip) => (
            <HomeTripCard
              key={trip.id}
              trip={trip}
            />
          ))}
        </div>
        {trips?.data?.length > 0 && (
          <PaginationComponent totalPages={totalPage} />
        )}
      </div>
    </div>
  )
}

export default TripsPage
