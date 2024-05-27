import HeroSection from "@/components/home/hero"
import LatestTrip from "@/components/home/latest-trip"
import TopTripTypes from "@/components/home/top-trip-types"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Trip Squad - Your Ultimate Trip Sharing Management System",
  description:
    "Share trip details, find travel buddies, and embark on seamless adventures with Trip Squad! Join today.",
}

const Home = () => {
  return (
    <>
      <HeroSection />
      <div className="container space-y-12">
        <TopTripTypes />
        <LatestTrip />
      </div>
    </>
  )
}
export default Home
