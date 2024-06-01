import HeroSection from "./_components/hero"
import LatestTrip from "./_components/latest-trip"
import TopTripTypes from "./_components/top-trip-types"
import HowItWork from "./_components/how-it-work"
import { Metadata } from "next"
import { Suspense } from "react"

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
        <Suspense>
          <TopTripTypes />
          <LatestTrip />
          <HowItWork />
        </Suspense>
      </div>
    </>
  )
}
export default Home
