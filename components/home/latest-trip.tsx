import { axiosInstance } from "@/lib/axios"
import SectionHeader from "../shared/section-header"
import { ITrip } from "@/interface"
import HomeTripCard from "../shared/home-trip-card"
import { Button } from "../ui/button"
import Link from "next/link"

const LatestTrip = async () => {
  const trips = await axiosInstance.get("/trips?limit=8")
  const tripsArray =
    trips?.data?.length > 0
      ? trips?.data?.length < 8
        ? trips?.data?.slice(0, 4)
        : trips?.data
      : []

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Explore Latest Destinations"
        subTitle="Dive into the freshest travel experiences shared by our community. Find inspiration for your next getaway!"
      />
      <div className="grid grid-cols-4 gap-4">
        {tripsArray.map((trip: ITrip) => (
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
export default LatestTrip
