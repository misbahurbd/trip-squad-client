import SectionHeader from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"
import HowItWork from "@/app/(root)/_components/how-it-work"
import { whyTravelWithUsContent } from "@/constant"
import PhotoGallery from "@/components/shared/photo-gallery"

const AboutUs = () => {
  return (
    <article className="container space-y-12">
      <div className="flex flex-col gap-3 items-stretch relative overflow-hidden rounded-xl md:flex-row md:gap-3">
        <div className="absolute md:relative w-full h-full md:w-1/2 md:h-auto">
          <Image
            src={"/img/about-hero.jpeg"}
            fill
            alt="Trip Squad"
            className="rounded-xl object-cover "
          />
        </div>
        <div className="w-full md:w-1/2">
          <div className="relative bg-gradient-to-t from-black/90 to-black/20 md:from-background md:to-background px-5 py-12 md:px-12 md:py-24 md:rounded-xl md:shadow-lg">
            <SectionHeader
              title="Welcome to Trip Squad"
              subTitle="Trip Squad connects travelers globally, making it easy to share plans, find travel buddies, and start new adventures. Join us to discover destinations, meet fellow travelers, and create lasting memories."
              className="text-center md:text-start text-background md:text-foreground"
            />
          </div>
        </div>
      </div>

      <section className="space-y-8">
        <SectionHeader
          title="About Us"
          subTitle="Trip Squad is dedicated to connecting travelers around the world.
            Share your travel experiences, find travel buddies, and plan your
            trips effortlessly."
        />
        <div className="lg:w-4/5 mx-auto flex flex-col lg:flex-row items-stretch lg:items-center gap-10">
          <div className="lg:w-2/5 aspect-[5/3] sm:aspect-[2/1] lg:aspect-square relative h-full bg-black rounded-xl">
            <Image
              src={"/img/about-us.jpg"}
              fill
              alt="Trip Squad"
              className="rounded-xl object-cover"
            />
          </div>
          <div className="lg:w-3/5 flex flex-col justify-center space-y-4 items-start sm:w-[90%] sm:px-6 sm:py-5 sm:bg-background sm:rounded-lg sm:-mt-32 relative mx-auto lg:mt-0 lg:bg-transparent lg:p-0 lg:m-0">
            <h3 className="text-xl md:text-2xl font-bold mb-2">
              Trip With Like-minded Travelers
            </h3>
            <p className="text-muted-foreground">
              Welcome to Trip Squad, your ultimate destination for connecting
              with fellow travelers and exploring the world together.
            </p>
            <p className="text-muted-foreground">
              At Trip Squad, we&lsquo;re passionate about fostering a global
              community of adventurers who share a love for exploration,
              discovery, and unforgettable experiences.
            </p>
            <Button
              className="mt-8"
              asChild
            >
              <Link href={"/trips"}>Explore Trips</Link>
            </Button>
          </div>
        </div>
      </section>

      <section className="space-y-8">
        <SectionHeader
          title="Why Travel with Us"
          subTitle="Unlock unforgettable adventures with Trip Squad: where every journey is a story waiting to be told. Join us and let the adventure begin!"
        />
        <div className="grid gap-3 sm:gap-3 sm:grid-cols-2 md:grid-cols-3">
          {whyTravelWithUsContent.map((content, i) => (
            <div
              className="p-6 bg-background rounded-lg"
              key={content.title.replace(" ", "-")}
            >
              <h3 className="font-bold mb-3">{content.title}</h3>
              <p className="text-muted-foreground text-sm">
                {content.description}
              </p>
            </div>
          ))}
        </div>
      </section>
      <PhotoGallery />
      <HowItWork />
    </article>
  )
}
export default AboutUs
