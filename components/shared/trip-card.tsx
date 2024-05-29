import { format } from "date-fns"
import Link from "next/link"
import Image from "next/image"
import { ITrip } from "@/interface"
import { HiOutlineBriefcase, HiOutlineCalendarDays } from "react-icons/hi2"
import { BsCurrencyDollar } from "react-icons/bs"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"

interface TripCardProps {
  trip: ITrip
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  return (
    <article className="space-y-2 p-3 rounded-xl bg-background">
      <div className="aspect-video relative">
        <Image
          src={trip.photos[0]}
          alt={trip.destination}
          fill
          className="object-cover rounded"
        />
      </div>
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
            <BsCurrencyDollar />
          </span>
          <span>{trip.budget.toLocaleString()}</span>
        </div>
        <Button asChild>
          <Link href={`/trips/${trip.id}`}>View Trip</Link>
        </Button>
      </div>
    </article>
  )
}
export default TripCard
