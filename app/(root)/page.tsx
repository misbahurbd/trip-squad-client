import HeroSection from "@/app/(root)/_components/hero"
import LatestTrip from "@/app/(root)/_components/latest-trip"
import TopTripTypes from "@/app/(root)/_components/top-trip-types"
import { Metadata } from "next"
import HowItWork from "./_components/how-it-work"

export const metadata: Metadata = {
  title: "How It Works - Trip Squad",
  description:
    "Discover how Trip Squad helps you connect with like-minded travelers and make your dream trips a reality.",
}

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="container space-y-12">
        <TopTripTypes />
        <LatestTrip />
        <HowItWork />
      </div>
    </>
  )
}
export default Home
