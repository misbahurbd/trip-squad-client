import SectionHeader, {
  SectionHeaderSkeleton,
} from "@/components/shared/section-header"
import { TripTypeItemSkeleton } from "@/app/(root)/_components/trip-type-item"
import { getTopReviews } from "@/services/trip.service"
import { IReview } from "@/interface"
import ReviewSlider from "./review-slider"

const TopTripReviews = async () => {
  const tripReviews = await getTopReviews()
  const tripReviewData = (tripReviews?.data?.slice(0, 10) as IReview[]) || []

  return (
    <section className="space-y-8">
      <SectionHeader
        title="What Our Travelers Are Saying"
        subTitle=" Hear from fellow adventurers about their unforgettable experiences with Trip Squad. Your next story could be here!"
      />
      <div className="">
        <ReviewSlider tripReviewData={tripReviewData} />
      </div>
    </section>
  )
}

export const TopTripReviewsSkeleton = () => {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="What Our Travelers Are Saying"
        subTitle=" Hear from fellow adventurers about their unforgettable experiences with Trip Squad. Your next story could be here!"
      />
      <div className="grid grid-cols-2 md:grid-cols-3 gap-2 md:gap-3">
        {Array.from({ length: 3 }).map((_, i) => (
          <TripTypeItemSkeleton key={`trip-item-ske-${i}`} />
        ))}
      </div>
    </section>
  )
}
export default TopTripReviews
