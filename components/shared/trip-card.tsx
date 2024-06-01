"use client"

import Image from "next/image"
import { ITrip } from "@/interface"

import { Button } from "@/components/ui/button"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/lib/utils"
import { LuFileEdit, LuMapPin, LuTrash2 } from "react-icons/lu"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useState } from "react"
import { usePathname, useRouter } from "next/navigation"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import Link from "next/link"

interface TripCardProps {
  trip: ITrip
}

const TripCard: React.FC<TripCardProps> = ({ trip }) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const onDelete = async () => {
    const toastId = toast.loading("Deleting trip...")
    try {
      const res = await axiosInstance.delete(`/trips/${trip.id}`)
      toast.success(res?.message || "Trip deleted successfully", {
        id: toastId,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || "Unable to delete this trip", {
        id: toastId,
      })
    }
  }

  return (
    <article className="p-3 rounded-lg bg-background flex flex-col gap-5">
      <div className="h-full aspect-video relative flex items-center">
        {trip.photos.slice(0, 3).map((photo, i) => {
          return (
            <div
              key={trip.destination.replace(" ", "-") + 1}
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
                alt={trip.destination}
                fill
                className="object-cover rounded"
              />
            </div>
          )
        })}
      </div>
      <div className="space-y-2">
        <div>
          <h3 className="font-semibold leading-tight">{trip.destination}</h3>
          <p className="text-xs text-muted-foreground leading-tight flex items-center gap-1">
            <LuMapPin className="size-2.5" />
            {trip.location}
          </p>
        </div>
        <p className="text-muted-foreground line-clamp-2 text-sm">
          {trip.description}
        </p>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-2 gap-3">
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              Start Date
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              {formatedDate(trip.startDate)}
            </p>
          </div>
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              End Date
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              {formatedDate(trip.endDate)}
            </p>
          </div>
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              Trip Type
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              {trip.tripType}
            </p>
          </div>
          <div>
            <h3 className="text-xs text-foreground/60 leading-tight font-medium">
              Budget
            </h3>
            <p className="text-sm leading-tight text-muted-foreground">
              ${trip.budget.toLocaleString()}
            </p>
          </div>
        </div>
        <Separator className="opacity-50" />
        <div className="grid grid-cols-2 gap-3">
          <Button
            variant="secondary"
            asChild
          >
            <Link
              className="flex-1 text-center"
              href={`${pathname}/${trip.id}/edit`}
            >
              <LuFileEdit className="mr-2" />
              <span>Edit</span>
            </Link>
          </Button>
          <DropdownMenu
            open={isOpen}
            onOpenChange={open => setIsOpen(open)}
          >
            <DropdownMenuTrigger asChild>
              <Button
                className="flex-1 text-center"
                variant="destructive"
              >
                <LuTrash2 className="mr-2" />
                <span>Delete</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              side="top"
              className="p-4"
            >
              <div className="space-y-2 py-2 flex flex-col items-center">
                <p className="text-sm text-muted-foreground">
                  Are you sure to delete this trip?
                </p>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="destructive"
                    onClick={onDelete}
                  >
                    Delete
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={() => setIsOpen(false)}
                  >
                    Cancle
                  </Button>
                </div>
              </div>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </article>
  )
}
export default TripCard
