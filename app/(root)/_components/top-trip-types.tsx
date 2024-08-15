import SectionHeader, {
  SectionHeaderSkeleton,
} from "@/components/shared/section-header"
import TripTypeItem, {
  TripTypeItemSkeleton,
} from "@/app/(root)/_components/trip-type-item"
import { getTripType } from "@/services/trip.service"

const TopTripTypes = async () => {
  const tripTypes = await getTripType()
  const tripTypesArray = tripTypes?.data && tripTypes?.data?.slice(0, 4)

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Explore Our Top Travel Destinations"
        subTitle="Discover the most popular trip types chosen by our travelers. Find your next adventure!"
      />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {tripTypesArray?.map(
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

export const TopTripTypesSkeleton = () => {
  return (
    <section className="space-y-8">
      <SectionHeaderSkeleton />
      <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-3">
        {Array.from({ length: 4 }).map((_, i) => (
          <TripTypeItemSkeleton key={`trip-item-ske-${i}`} />
        ))}
      </div>
    </section>
  )
}
export default TopTripTypes
