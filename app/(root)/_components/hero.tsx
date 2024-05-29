import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroImg from "@/assets/img/hero-img.png"
import HeroSearchField from "./hero-search-field"
import { axiosInstance } from "@/lib/axios"

const HeroSection = async () => {
  const tripTypes = await axiosInstance.get("/trips/top-trip-types")

  return (
    <section className="pt-[4.5rem] md:pt-20 relative isolate mb-10 sm:mb-12 md:mb-20">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-secondary h-1/2"></div>
      <div className="container">
        <div className="relative rounded-2xl">
          <Image
            src={HeroImg}
            alt="Hero Image"
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="relative top-0 left-0 w-full h-full md:min-h-96 bg-black/40 flex flex-col items-center justify-center p-3 rounded-2xl">
            <div className="w-full max-w-3xl text-center py-12 px-6">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold leading-tight text-background mb-2">
                Find Your Perfect Trip Buddy
              </h1>
              <p className="text-muted md:text-lg">
                Discover exciting adventures and connect with like-minded
                explorers. Share your trip details and embark on unforgettable
                journeys with Trip Squad.
              </p>
              <Button
                className="mt-6"
                size="lg"
                asChild
              >
                <Link href={"/dashboard/trips/create"}>Share Your Trip</Link>
              </Button>
            </div>
            <HeroSearchField tripTypes={tripTypes.data} />
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
