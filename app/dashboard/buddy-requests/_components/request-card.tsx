"use client"

import { IBuddyRequest } from "@/interface"
import avatar from "@/assets/img/avatar.jpeg"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import { RiMap2Line } from "react-icons/ri"
import { LuCalendarRange } from "react-icons/lu"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { axiosInstance } from "@/lib/axios"
import { useState } from "react"
import { toast } from "sonner"

const RequestCard = ({ buddyRequest }: { buddyRequest: IBuddyRequest }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const onResponse = async (response: "Approved" | "Rejected") => {
    setIsLoading(true)
    const toastId = toast.loading("Sending request response...")
    try {
      const res = await axiosInstance.put(
        `/trip-buddies/response/${buddyRequest.id}`,
        {
          status: response,
        }
      )
      toast.success(res?.message || "Request response successfully!", {
        id: toastId,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || "Unable to send request response", {
        id: toastId,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <article className="bg-background rounded-lg flex">
      <div className="aspect-video overflow-hidden relative basis-1/4">
        <Image
          src={buddyRequest.trip.photos[0]}
          fill
          alt={buddyRequest.trip.description}
          className="object-cover rounded-l-lg"
        />
      </div>
      <div className="basis-3/4">
        <div className="p-4">
          <div className="flex items-center gap-3">
            <div className="relative size-14">
              <Image
                src={buddyRequest.user.profile.profilePhoto || avatar}
                fill
                alt={buddyRequest.user.profile.name}
                className="rounded-lg object-cover"
              />
            </div>
            <div>
              <h4 className="font-semibold">
                {buddyRequest.user.profile.name}
              </h4>
              <p className="text-muted-foreground text-xs">
                @{buddyRequest.user.username}
              </p>
            </div>
          </div>
        </div>
        <Separator className="opacity-50" />
        <div className="p-4 space-y-1">
          <div className="flex items-center gap-1 text-sm">
            <RiMap2Line className="mr-1" />
            <span className="font-semibold text-foreground">Destenation:</span>
            <span className="text-muted-foreground">
              {buddyRequest.trip.destination}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <LuCalendarRange className="mr-1" />
            <span className="font-semibold text-foreground">Trip Date:</span>
            <span className="text-muted-foreground">
              {format(buddyRequest.trip.startDate, "dd MMM")}
            </span>
            <Separator className="w-2 bg-muted-foreground" />
            <span className="text-muted-foreground">
              {format(buddyRequest.trip.endDate, "dd MMM, yyyy")}
            </span>
          </div>
        </div>
        <Separator className="opacity-50" />
        <div className="flex items-center gap-3 p-4">
          <Button
            disabled={isLoading}
            onClick={() => onResponse("Approved")}
            className="flex-1"
            variant={"positive"}
          >
            Accept
          </Button>
          <Button
            disabled={isLoading}
            onClick={() => onResponse("Rejected")}
            className="flex-1"
            variant={"destructive"}
          >
            Reject
          </Button>
        </div>
      </div>
    </article>
  )
}
export default RequestCard
