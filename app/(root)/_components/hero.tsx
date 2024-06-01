import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import HeroSearchField from "./hero-search-field"
import { getTripType } from "@/services/trip.service"
import heroImg from "@/assets/img/hero-img.png"

const HeroSection = async () => {
  const tripTypes = await getTripType()

  return (
    <section className="relative isolate mb-10 sm:mb-12 md:mb-20">
      <div className="container">
        <div className="relative rounded-2xl">
          <Image
            src={heroImg}
            alt="Hero Image"
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover rounded-2xl"
            fill
          />
          <div className="relative top-0 left-0 w-full h-full md:min-h-[520px] bg-gradient-to-t from-black/80 to-black/20 flex flex-col items-center justify-center p-3 rounded-2xl">
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
            <HeroSearchField tripTypes={tripTypes?.data || []} />
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
