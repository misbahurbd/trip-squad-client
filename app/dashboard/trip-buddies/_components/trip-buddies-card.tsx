"use client"

import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/lib/utils"
import { LuMapPin } from "react-icons/lu"
import BuddiesInfoCard from "./buddies-info-card"
import Link from "next/link"
import { ScrollArea } from "@/components/ui/scroll-area"
import { IBuddies } from "@/interface"

interface TripBuddiesProps {
  trip: IBuddies
}

const TripBuddiesCard: React.FC<TripBuddiesProps> = ({ trip }) => {
  return (
    <article className="p-3 @container/buddy rounded-lg bg-background flex flex-col gap-5">
      <div className="h-full aspect-video relative flex items-center">
        {trip.photos.slice(0, 3).map((photo, i) => {
          return (
            <div
              key={trip?.destination.replace(" ", "-") + 1}
              className={`absolute w-full h-full`}
              style={{
                translate: `0 ${i * 5}px`,
                scale: 1 - (3 - i - 1) * 0.04,
                transformOrigin: "top center",
              }}
            >
              <Image
                key={i}
                src={photo}
                alt={trip?.destination}
                fill
                className="object-cover rounded"
              />
            </div>
          )
        })}
      </div>
      <div className="space-y-2">
        <div>
          <Link
            className="transition hover:text-primary"
            href={`/trips/${trip?.id}`}
          >
            <h3 className="font-semibold leading-tight">{trip?.destination}</h3>
          </Link>
          <p className="text-xs text-muted-foreground leading-tight flex items-center gap-1">
            <LuMapPin className="size-2.5" />
            {trip?.location}
          </p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              Start Date
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              {formatedDate(trip?.startDate)}
            </p>
          </div>
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              End Date
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              {formatedDate(trip?.endDate)}
            </p>
          </div>
        </div>
        <Separator className="opacity-50" />
        <h4 className="text-sm font-medium flex items-center justify-between">
          <span>Trip Buddies</span>
          <span>({trip?.tripBuddy?.length + 1})</span>
        </h4>
        <Separator className="opacity-50" />
        <ScrollArea className="h-28">
          <div className="grid gap-3">
            <BuddiesInfoCard
              name={trip?.createdBy?.profile?.name}
              email={trip?.createdBy?.profile?.email}
              mobile={trip?.createdBy?.profile?.mobile}
              profilePhoto={trip?.createdBy?.profile?.profilePhoto}
            />
            {trip?.tripBuddy?.map(buddy => (
              <BuddiesInfoCard
                key={buddy?.id + "buddy-info"}
                name={buddy?.name}
                email={buddy?.email}
                mobile={buddy?.mobile}
                profilePhoto={buddy?.user?.profile?.profilePhoto}
              />
            ))}
          </div>
        </ScrollArea>
      </div>
    </article>
  )
}
export default TripBuddiesCard
