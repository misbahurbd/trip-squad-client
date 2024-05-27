import HeroImg from "@/assets/img/hero-img.png"
import Image from "next/image"
import { Button } from "../ui/button"
import Link from "next/link"
import HeroSearchField from "./hero-search-field"

const HeroSection = () => {
  return (
    <section className="pt-20 relative isolate mb-20">
      <div className="absolute top-0 left-0 right-0 bottom-0 bg-secondary h-1/2"></div>
      <div className="container">
        <div className="relative aspect-[3/1] rounded-2xl">
          <Image
            src={HeroImg}
            alt="Hero Image"
            className="absolute left-0 right-0 top-0 bottom-0 w-full h-full object-cover rounded-2xl"
          />
          <div className="relative top-0 left-0 w-full h-full bg-black/40 flex items-center justify-center p-12 rounded-2xl">
            <div className="w-full max-w-3xl text-center">
              <h1 className="text-5xl font-bold leading-tight text-background">
                Find Your Perfect Travel Buddy
              </h1>
              <p className="text-lg text-muted">
                Discover amazing features and services that await you.
              </p>
              <Button
                className="mt-6"
                size="lg"
                asChild
              >
                <Link href={"/dashboard/trips/create"}>Share Your Trip</Link>
              </Button>
            </div>

            <HeroSearchField />
          </div>
        </div>
      </div>
    </section>
  )
}
export default HeroSection
