import { cn } from "@/lib/utils"
import Image from "next/image"
import SectionHeader from "./section-header"
import { shuffleArray } from "@/lib/shuffle"
import { getTripsPhoto } from "@/services/trip.service"
import { Skeleton } from "../ui/skeleton"

const PhotoGallery = async () => {
  const photos = await getTripsPhoto()
  const photoArray = shuffleArray(photos?.data as string[])

  return (
    <section className="space-y-8">
      <SectionHeader
        title="Trip Photo Gallery"
        subTitle="Explore the adventures of fellow travelers through their shared photos and stories."
      />
      <div className="p-3 rounded-md bg-background grid auto-rows-[150px] sm:auto-rows-[160px] md:auto-rows-[220px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {photoArray?.slice(0, 9).map((photo: string, i: number) => (
          <div
            className={cn(
              "relative shadow",
              i == 0 &&
                "col-span-2 sm:row-span-2 sm:col-span-1 md:col-span-2 md:row-span-1",
              i == 3 && "sm:row-span-2 md:row-span-1",
              i == 6 && "sm:row-span-2",
              i == 8 && "md:col-span-2"
            )}
            key={i}
          >
            <Image
              src={photo}
              fill
              className="object-cover rounded"
              alt="Trip Photo"
            />
          </div>
        ))}
      </div>
    </section>
  )
}

export const PhotoGallerySkeleton = () => {
  return (
    <section className="space-y-8">
      <SectionHeader
        title="Trip Photo Gallery"
        subTitle="Explore the adventures of fellow travelers through their shared photos and stories."
      />
      <div className="p-3 rounded-md bg-background grid auto-rows-[150px] sm:auto-rows-[160px] md:auto-rows-[220px] grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-2 sm:gap-3">
        {Array.from({ length: 9 })
          .slice(0, 9)
          .map((_, i) => (
            <div
              className={cn(
                "relative shadow",
                i == 0 &&
                  "col-span-2 sm:row-span-2 sm:col-span-1 md:col-span-2 md:row-span-1",
                i == 3 && "sm:row-span-2 md:row-span-1",
                i == 6 && "sm:row-span-2",
                i == 8 && "md:col-span-2"
              )}
              key={i}
            >
              <Skeleton className="w-full h-full" />
            </div>
          ))}
      </div>
    </section>
  )
}

export default PhotoGallery
