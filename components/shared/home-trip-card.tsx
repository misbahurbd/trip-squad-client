import { ITrip } from "@/interface"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { HiOutlineBriefcase, HiOutlineCalendarDays } from "react-icons/hi2"
import { CgDollar } from "react-icons/cg"

import { format } from "date-fns"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

interface HomeTripProps {
  trip: ITrip
}

const HomeTripCard: React.FC<HomeTripProps> = ({ trip }) => {
  return (
    <article className="space-y-2 group p-3 rounded-xl bg-background border">
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
          <CarouselPrevious
            className="transition bg-background disabled:bg-background/60 size-7 rounded-none left-0 !opacity-0 group-hover:!opacity-100"
            variant={"secondary"}
            size={"icon"}
          />
          <CarouselNext
            className="transition bg-background disabled:bg-background/60 size-7 rounded-none right-0 !opacity-0 group-hover:!opacity-100"
            variant={"secondary"}
            size={"icon"}
          />
        </Carousel>
      )}
      <Link
        href={`/trips/${trip.id}`}
        className="transition hover:text-primary block pt-0.5"
      >
        <h2 className="font-bold leading-tight">{trip.destination}</h2>
      </Link>
      <p className="line-clamp-2 text-muted-foreground text-sm">
        {trip.description}
      </p>
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
