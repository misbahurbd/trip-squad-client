"use client"

import { IBuddyRequest } from "@/interface"
import Image from "next/image"
import { Separator } from "@/components/ui/separator"
import {
  LuCalendarRange,
  LuMail,
  LuMap,
  LuMapPin,
  LuPhone,
  LuUser,
} from "react-icons/lu"
import { format } from "date-fns"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"
import { axiosInstance } from "@/lib/axios"
import { useState } from "react"
import { toast } from "sonner"
import avatar from "@/assets/img/avatar.jpeg"

const RequestCard = ({ buddyRequest }: { buddyRequest: IBuddyRequest }) => {
  console.log({ buddyRequest })

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
    <article className="bg-background rounded-lg">
      <div className="aspect-[3/1] overflow-hidden relative">
        <Image
          src={buddyRequest.trip.photos[0]}
          fill
          alt={buddyRequest.trip.destination}
          className="object-cover rounded-t-lg"
        />
      </div>
      <div className="basis-3/4">
        <div className="p-3 space-y-1">
          <div className="flex items-center gap-1 text-sm line-clamp-1">
            <LuMap className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Destenation:</span>
            <span className="text-foreground">
              {buddyRequest.trip.destination}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <LuMapPin className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Location:</span>
            <span className="text-foreground">
              {buddyRequest.trip.location}
            </span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <LuCalendarRange className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Date:</span>
            <span className="text-foreground">
              {format(buddyRequest.trip.startDate, "dd MMM")}
            </span>
            <Separator className="w-2 bg-muted-foreground" />
            <span className="text-foreground">
              {format(buddyRequest.trip.endDate, "dd MMM, yyyy")}
            </span>
          </div>
        </div>

        <Separator className="opacity-50" />

        <h3 className="px-3 py-2 font-semibold text-foreground">
          Buddy Information
        </h3>

        <Separator className="opacity-50" />

        <div className="px-3 py-2 space-y-1 relative">
          <div className="absolute size-16 right-3 top-3 rounded-md overflow-hidden">
            <Image
              src={buddyRequest?.user?.profile?.profilePhoto || avatar}
              fill
              className="object-cover"
              alt={buddyRequest?.user?.profile?.name}
            />
          </div>
          <div className="flex items-center gap-1 text-sm">
            <LuUser className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Name:</span>
            <span className="text-foreground">{buddyRequest.name}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <LuPhone className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Mobile:</span>
            <span className="text-foreground">{buddyRequest.mobile}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <LuMail className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Email:</span>
            <span className="text-foreground">{buddyRequest.email}</span>
          </div>
          <div className="flex items-center gap-1 text-sm">
            <LuMapPin className="mr-1 text-muted-foreground" />
            <span className="text-muted-foreground">Location:</span>
            <span className="text-foreground">
              {buddyRequest.city}, {buddyRequest.country}
            </span>
          </div>
        </div>

        <Separator className="opacity-50" />

        <div className="flex items-center gap-3 p-3">
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
