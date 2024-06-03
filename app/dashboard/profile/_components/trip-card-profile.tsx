import { Separator } from "@/components/ui/separator"
import { ITrip } from "@/interface"
import { format } from "date-fns"
import Image from "next/image"
import { LuMapPin } from "react-icons/lu"

const TripCardProfile = ({ trip }: { trip: ITrip }) => {
  return (
    <div className="@container/req-history">
      <article className="flex flex-col gap-2 p-3 bg-background rounded-lg">
        <div className="h-40 w-full relative">
          <Image
            src={trip.photos[0]}
            alt={trip.destination}
            fill
            className="object-cover rounded-lg"
          />
        </div>
        <div className="space-y-1 w-full flex items-center gap-3">
          <div className="grow space-y-2">
            <div className="space-y-0.5">
              <h3 className="font-semibold leading-tight">
                {trip.destination}
              </h3>
              <p className="text-xs text-muted-foreground leading-tight flex items-center gap-1">
                <LuMapPin className="size-2.5" />
                {trip.location}
              </p>
            </div>
            <Separator className="opacity-50" />
            <div className="space-y-0.5">
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <span className="font-medium">Date:</span>
                <span>{format(trip.startDate, "d MMM")}</span>
                <Separator className="bg-muted-foreground w-1.5" />
                <span>{format(trip.startDate, "d MMM, yyyy")}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <span className="font-medium">Trip Type:</span>
                <span>{trip.tripType}</span>
              </div>
              <div className="flex items-center gap-1 text-muted-foreground text-sm">
                <span className="font-medium">Budget:</span>
                <span>${trip.budget.toLocaleString()}</span>
              </div>
            </div>
          </div>
        </div>
      </article>
    </div>
  )
}
export default TripCardProfile
