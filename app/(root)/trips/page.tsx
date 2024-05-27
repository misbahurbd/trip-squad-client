import HomeTripCard from "@/components/shared/home-trip-card"
import PaginationComponent from "@/components/shared/pagination"
import TripAside from "@/components/shared/trip-aside"
import { ITrip } from "@/interface"
import { axiosInstance } from "@/lib/axios"

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
    <div className="container py-20 flex gap-4">
      <aside className="w-[320px]">
        <TripAside
          className="sticky top-20"
          tripTypes={tripTypes?.data || []}
        />
      </aside>
      <div className="space-y-4 grow">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-4">
          {trips.data.map((trip: ITrip) => (
            <HomeTripCard
              key={trip.id}
              trip={trip}
            />
          ))}
        </div>
        <PaginationComponent totalPages={totalPage} />
      </div>
    </div>
  )
}
export default TripsPage
