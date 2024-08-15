import HeroSection from "./_components/hero"
import LatestTrip, { LatestTripSkeleton } from "./_components/latest-trip"
import TopTripTypes, {
  TopTripTypesSkeleton,
} from "./_components/top-trip-types"
import HowItWork from "./_components/how-it-work"
import { Metadata } from "next"
import { Suspense } from "react"
import Loading from "./loading"
import TopTripReviews, {
  TopTripReviewsSkeleton,
} from "./_components/top-trip-reviews"
import PhotoGallery, {
  PhotoGallerySkeleton,
} from "@/components/shared/photo-gallery"

export const metadata: Metadata = {
  title: "Trip Squad - Your Ultimate Tavel Pattern",
  description:
    "Discover how Trip Squad helps you connect with like-minded travelers and make your dream trips a reality.",
}

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="container space-y-12">
        <Suspense fallback={<TopTripTypesSkeleton />}>
          <TopTripTypes />
        </Suspense>
        <Suspense fallback={<LatestTripSkeleton />}>
          <LatestTrip />
        </Suspense>
        <Suspense fallback={<PhotoGallerySkeleton />}>
          <PhotoGallery />
        </Suspense>
        <HowItWork />
        <Suspense fallback={<TopTripReviewsSkeleton />}>
          <TopTripReviews />
        </Suspense>
      </div>
    </>
  )
}
export default Home
