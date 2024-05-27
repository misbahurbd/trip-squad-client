import { axiosInstance } from "@/lib/axios"
import SectionHeader from "../shared/section-header"
import TripTypeItem from "./trip-type-item"

const TopTripTypes = async () => {
  const tripTypes = await axiosInstance.get("/trips/top-trip-types")
  const tripTypesArray =
    tripTypes.data && tripTypes.data.length >= 8
      ? tripTypes.data.slice(0, 8)
      : tripTypes.data.slice(0, 4)

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Explore Our Top Travel Destinations"
        subTitle="Discover the most popular trip types chosen by our travelers. Find your next adventure!"
      />
      <div className="grid grid-cols-4 gap-4">
        {tripTypesArray.map(
          (trip: { label: string; count: number }, i: number) => (
            <TripTypeItem
              key={i}
              tripType={trip}
            />
          )
        )}
      </div>
    </section>
  )
}
export default TopTripTypes
