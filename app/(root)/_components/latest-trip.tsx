import Link from "next/link"
import { ITrip } from "@/interface"
import SectionHeader from "@/components/shared/section-header"
import HomeTripCard, {
  HomeTripCardSkeleton,
} from "@/components/shared/home-trip-card"
import { Button } from "@/components/ui/button"
import { getTrips } from "@/services/trip.service"

const LatestTrip = async () => {
  const trips = await getTrips()
  const tripsArray =
    trips?.data?.length > 0
      ? trips?.data?.length < 8
        ? trips?.data?.slice(0, 4)
        : trips?.data.length < 12
        ? trips?.data?.slice(0, 8)
        : trips?.data?.slice(0, 12)
      : []

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Explore Latest Destinations"
        subTitle="Dive into the freshest travel experiences shared by our community. Find inspiration for your next getaway!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {tripsArray &&
          tripsArray.map((trip: ITrip) => (
            <HomeTripCard
              key={trip.id}
              trip={trip}
            />
          ))}
      </div>
      <div className="text-center">
        <Button asChild>
          <Link href={"/trips"}>See More Trip</Link>
        </Button>
      </div>
    </section>
  )
}

export const LatestTripSkeleton = () => {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Explore Latest Destinations"
        subTitle="Dive into the freshest travel experiences shared by our community. Find inspiration for your next getaway!"
      />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2 md:gap-3">
        {Array.from({ length: 12 }).map((_, i) => (
          <HomeTripCardSkeleton key={`home-trip-card-skle-${i}`} />
        ))}
      </div>
      <div className="text-center">
        <Button asChild>
          <Link href={"/trips"}>See More Trip</Link>
        </Button>
      </div>
    </section>
  )
}

export default LatestTrip
