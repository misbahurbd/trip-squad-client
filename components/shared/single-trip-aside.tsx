"use client"

import { CurrentUser, ITrip, IUser } from "@/interface"
import { format } from "date-fns"
import { HiOutlineCalendarDays } from "react-icons/hi2"
import { Button } from "../ui/button"
import { useState } from "react"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import { usePathname, useRouter } from "next/navigation"

interface SingleTripAsideProps {
  trip: ITrip
  user: CurrentUser | null
}

const SingleTripAside: React.FC<SingleTripAsideProps> = ({ trip, user }) => {
  const router = useRouter()
  const pathname = usePathname()
  const [isLoading, setIsLoading] = useState(false)
  const buddy = trip.tripBuddy.find(buddy => buddy.userId === user?.userId)

  const onTripBuddyRequest = async () => {
    if (!user) return router.push(`/login?next=${pathname}`)
    setIsLoading(true)
    const toastId = toast.loading("Sending trip buddy request...")
    try {
      const res = await axiosInstance.post(`/trip-buddies/${trip.id}`)
      console.log(res)
      toast.success(res?.message || "Trip buddy request successfully!", {
        id: toastId,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || "Unable to send trip request", {
        id: toastId,
      })
    } finally {
      setIsLoading(false)
    }
  }

  const getButtonVarient = () => {
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

  const getButtonText = () => {
    if (trip.creatorId == user?.userId) return "You can't join your own trip."
    if (buddy) {
      return `Request ${buddy.status}`
    } else {
      return "Request Buddy"
    }
  }

  return (
    <aside className="bg-background rounded-xl sticky top-20 p-3 space-y-4">
      <h1 className="font-bold text-2xl pt-2">{trip.destination}</h1>
      <div className="border-y py-3 border-muted-foreground/10 grid grid-cols-2 gap-2">
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
      </div>

      <div className="flex items-center justify-between">
        <span className="font-bold text-xl">Budget</span>
        <span className="text-primary text-xl font-bold">
          ${trip.budget.toLocaleString()}
        </span>
      </div>

      <Button
        onClick={onTripBuddyRequest}
        disabled={isLoading || trip.creatorId == user?.userId}
        className="w-full"
        variant={getButtonVarient()}
      >
        {getButtonText()}
      </Button>
    </aside>
  )
}
export default SingleTripAside
