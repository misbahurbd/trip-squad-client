"use client"

import { CurrentUser, ITrip } from "@/interface"
import { format } from "date-fns"
import { HiOutlineCalendarDays } from "react-icons/hi2"
import { FaArrowRightLong } from "react-icons/fa6"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import Image from "next/image"
import { cn } from "@/lib/utils"
import { Separator } from "@/components/ui/separator"
import avatar from "@/assets/img/avatar.jpeg"
import { LuMapPin } from "react-icons/lu"

interface SingleTripAsideProps {
  trip: ITrip
  user: CurrentUser | null
}

const SingleTripAside: React.FC<SingleTripAsideProps> = ({ trip, user }) => {
  const router = useRouter()
  const buddy = trip.tripBuddy.find(buddy => buddy.userId === user?.userId)
  const currentBuddies =
    trip?.tripBuddy?.filter(buddy => buddy.status === "Approved") || []

  const getButtonVarient = () => {
    if (user?.role == "Admin") return "secondary"
    if (trip.creatorId == user?.userId) return "secondary"

    if (buddy) {
      if (buddy.status === "Pending") {
        return "secondary"
      } else if (buddy.status === "Approved") {
        return "positive"
      } else if (buddy.status === "Rejected") {
        return "destructive"
      }
    } else {
      return "default"
    }
  }

  const getButtonStatus = () => {
    if (user?.role == "Admin") return true
    if (trip.creatorId == user?.userId) return true

    if (buddy) {
      return true
    } else {
      return false
    }
  }

  const getButtonText = () => {
    if (trip.creatorId == user?.userId) return "You can't join your own trip."
    if (user?.role === "Admin") return "Admin can't send trip buddy requests."
    if (buddy) {
      return `Request ${buddy.status}`
    } else {
      return "Request Buddy"
    }
  }

  return (
    <aside className="bg-background rounded-xl sticky top-20 p-3 space-y-3">
      <div className="space-y-1">
        <h1 className="font-bold text-xl text-foreground leading-tight">
          {trip.destination}
        </h1>
        <p className="text-sm flex text-muted-foreground items-center gap-1 leading-tight">
          <LuMapPin />
          {trip.location}
        </p>
      </div>

      <Separator className="opacity-60" />

      <div className="flex gap-3 items-center">
        <div className="flex-1 flex items-center gap-2 text-foreground">
          <span className="size-8 rounded bg-secondary flex items-center justify-center">
            <HiOutlineCalendarDays className="size-5" />
          </span>
          <div className="flex flex-col">
            <span className="text-xs text-foreground/60 leading-tight font-medium">
              Start Date
            </span>
            <span className="text-sm leading-tight text-muted-foreground">
              {format(new Date(trip.startDate), "MMM d, yyyy")}
            </span>
          </div>
        </div>

        <span className="text-muted-foreground/60">
          <FaArrowRightLong />
        </span>

        <div className="flex-1 flex flex-row-reverse items-center gap-2 text-foreground">
          <span className="size-8 rounded bg-secondary flex items-center justify-center">
            <HiOutlineCalendarDays className="size-5" />
          </span>
          <div className="flex flex-col text-end">
            <span className="text-xs text-foreground/60 leading-tight font-medium">
              End Date
            </span>
            <span className="text-sm leading-tight text-muted-foreground">
              {format(new Date(trip.endDate), "MMM d, yyyy")}
            </span>
          </div>
        </div>
      </div>

      <Separator className="opacity-60" />

      <div className="flex items-center justify-between">
        <span className="font-semibold text-foreground text-lg">Budget</span>
        <span className="text-primary text-lg font-bold">
          ${trip.budget.toLocaleString()}
        </span>
      </div>

      <Separator className="opacity-60" />

      {currentBuddies?.length > 0 && (
        <div className="text-center flex items-center justify-center gap-1 text-muted-foreground text-sm">
          <div className="flex">
            {currentBuddies?.map((buddy, i) => (
              <div
                key={buddy?.user?.profile?.name + i}
                className={cn(
                  "w-6 h-6 rounded-full relative border-2 border-background",
                  i > 0 && "-ml-2"
                )}
              >
                <Image
                  src={buddy?.user?.profile?.profilePhoto || avatar}
                  alt={buddy?.user?.profile?.name}
                  className="w-6 h-6 rounded-full"
                  fill
                />
              </div>
            ))}
          </div>
          <span>{currentBuddies?.length} buddies already join</span>
        </div>
      )}

      <Button
        onClick={() => router.push(`/trips/${trip.id}/request`)}
        disabled={getButtonStatus()}
        className="w-full"
        variant={getButtonVarient()}
      >
        {getButtonText()}
      </Button>
    </aside>
  )
}
export default SingleTripAside
