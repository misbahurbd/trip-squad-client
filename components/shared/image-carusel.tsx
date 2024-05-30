import Image from "next/image"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { ITrip } from "@/interface"
import { cn } from "@/lib/utils"

const ImageCarousel = ({
  trip,
  className,
}: {
  trip: ITrip
  className?: string
}) => {
  return (
    <>
      {trip.photos.length > 0 && (
        <Carousel
          opts={{ loop: true }}
          className="w-full cursor-grab active:cursor-grabbing"
        >
          <CarouselContent>
            {trip.photos.map((photo, index) => (
              <CarouselItem
                key={
                  trip.destination.replace(" ", "-") + "-" + index.toString()
                }
              >
                <div className={cn("aspect-video relative", className)}>
                  <Image
                    src={photo}
                    alt={trip.destination}
                    fill
                    className="object-cover rounded"
                  />
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious
            className="transition bg-background disabled:bg-background/60 size-7 rounded-none left-0 !opacity-0 group-hover:!opacity-100 rounded-r-full"
            variant={"secondary"}
            size={"icon"}
          />
          <CarouselNext
            className="transition bg-background disabled:bg-background/60 size-7 rounded-none right-0 !opacity-0 group-hover:!opacity-100 rounded-l-full"
            variant={"secondary"}
            size={"icon"}
          />
        </Carousel>
      )}
    </>
  )
}
export default ImageCarousel
