"use client"

import Image from "next/image"
import { ITripBuddyPost } from "@/interface"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/lib/utils"
import { LuMapPin } from "react-icons/lu"
import avatar from "@/assets/img/avatar.jpeg"

interface TripBuddiesProps {
  tripBuddy: ITripBuddyPost
}

const TripBuddiesCard: React.FC<TripBuddiesProps> = ({ tripBuddy }) => {
  return (
    <article className="p-3 @container/buddy rounded-lg bg-background flex flex-col gap-5">
      <div className="h-full aspect-video relative flex items-center">
        {tripBuddy?.trip?.photos?.slice(0, 3).map((photo, i) => {
          return (
            <div
              key={tripBuddy?.trip?.destination.replace(" ", "-") + 1}
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
                alt={tripBuddy?.trip?.destination}
                fill
                className="object-cover rounded"
              />
            </div>
          )
        })}
      </div>
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold leading-tight">
            {tripBuddy?.trip?.destination}
          </h3>
          <p className="text-xs text-muted-foreground leading-tight flex items-center gap-1">
            <LuMapPin className="size-2.5" />
            {tripBuddy?.trip?.location}
          </p>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              Start Date
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              {formatedDate(tripBuddy?.trip?.startDate)}
            </p>
          </div>
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              End Date
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              {formatedDate(tripBuddy?.trip?.endDate)}
            </p>
          </div>
        </div>
        <Separator className="opacity-50" />
        <h4 className="text-sm font-medium">Trip Buddies</h4>
        <Separator className="opacity-50" />
        <div className="grid @[16rem]/buddy:grid-cols-5 gap-3">
          <div className="w-full group aspect-square relative">
            <Image
              src={tripBuddy?.trip?.createdBy?.profile?.profilePhoto || avatar}
              fill
              alt={tripBuddy?.trip?.createdBy?.profile?.name}
              className="rounded-full object-cover"
            />
            <span className="text-xs bg-background text-muted-foreground py-0.5 px-1 rounded text-center shadow absolute top-0 left-1/2 -translate-x-1/2 z-10 -translate-y-[90%] opacity-0 invisible transition group-hover:opacity-100 group-hover:-translate-y-[110%] group-hover:visible">
              {tripBuddy?.trip?.createdBy?.profile?.name}
            </span>
          </div>
          {tripBuddy?.trip?.tripBuddy?.map(buddy => (
            <div
              key={buddy.id}
              className="w-full group aspect-square relative"
            >
              <Image
                src={buddy?.user?.profile?.profilePhoto || avatar}
                fill
                alt={buddy?.user?.profile?.name}
                className="rounded-full object-cover"
              />
              <span className="text-xs bg-background text-muted-foreground py-0.5 px-1 rounded text-center shadow absolute top-0 left-1/2 -translate-x-1/2 z-10 -translate-y-[90%] opacity-0 invisible transition group-hover:opacity-100 group-hover:-translate-y-[110%] group-hover:visible">
                {buddy?.user.profile?.name}
              </span>
            </div>
          ))}
        </div>
      </div>
    </article>
  )
}
export default TripBuddiesCard
