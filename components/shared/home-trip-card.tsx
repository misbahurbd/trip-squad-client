import { ITrip } from "@/interface"
import Image from "next/image"
import { Separator } from "../ui/separator"
import { HiOutlineBriefcase, HiOutlineCalendarDays } from "react-icons/hi2"
import { CgDollar } from "react-icons/cg"

import { format } from "date-fns"
import Link from "next/link"
import { Button } from "../ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "../ui/carousel"

interface HomeTripProps {
  trip: ITrip
}

const HomeTripCard: React.FC<HomeTripProps> = ({ trip }) => {
  return (
    <article className="space-y-2 group p-3 rounded-xl bg-background border">
      {trip.photos.length > 0 && (
        <Carousel className="w-full">
          <CarouselContent>
            {trip.photos.map((photo, index) => (
              <CarouselItem
                key={
                  trip.destination.replace(" ", "-") + "-" + index.toString()
                }
              >
                <div className="aspect-video relative">
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
          <CarouselPrevious className="!opacity-0 transition group-hover:!opacity-70 left-2" />
          <CarouselNext className="!opacity-0 transition group-hover:!opacity-70 right-2" />
        </Carousel>
      )}
      <h2 className="font-semibold py-1">{trip.destination}</h2>
      <Separator className="opacity-50" />
      <div className="grid grid-cols-2 gap-2">
        <div className="flex items-center gap-2 text-foreground">
          <span className="size-8 rounded bg-secondary flex items-center justify-center">
            <HiOutlineCalendarDays className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Start Date</span>
            <span className="text-sm">
              {format(new Date(trip.startDate), "MMM d, yyyy")}
            </span>
          </div>
        </div>
        <div className="flex items-center gap-2 text-foreground">
          <span className="size-8 rounded bg-secondary flex items-center justify-center">
            <HiOutlineCalendarDays className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">End Date</span>
            <span className="text-sm">
              {format(new Date(trip.endDate), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <div className="flex items-center col-span-2 gap-2">
          <span className="size-8 rounded bg-secondary flex items-center justify-center">
            <HiOutlineBriefcase className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-muted-foreground">Trip Type</span>
            <span className="text-sm">{trip.tripType}</span>
          </div>
        </div>
      </div>
      <Separator className="opacity-50" />
      <div className="flex items-center justify-between">
        <div className="flex items-center text-primary font-bold text-xl">
          <span>
            <CgDollar />
          </span>
          <span>{trip.budget.toLocaleString()}</span>
        </div>
        <Button asChild>
          <Link href={`/trips/${trip.id}`}>View Details</Link>
        </Button>
      </div>
    </article>
  )
}
export default HomeTripCard
