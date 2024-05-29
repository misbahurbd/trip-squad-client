import { ITrip } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import { cn } from "@/lib/utils"
import type { Metadata, ResolvingMetadata } from "next"
import Avatar from "@/assets/img/avatar.jpeg"
import Image from "next/image"
import { HiAtSymbol } from "react-icons/hi"
import { GrMapLocation } from "react-icons/gr"
import { PiBackpack } from "react-icons/pi"
import {
  HiOutlineBriefcase,
  HiOutlineCalendarDays,
  HiOutlineClock,
  HiOutlineMapPin,
} from "react-icons/hi2"
import { format, formatDistanceToNow } from "date-fns"
import TripImgSlide from "@/components/shared/trip-img-slide"
import SingleTripAside from "@/components/shared/single-trip-aside"
import { getCurrentUser } from "@/services/user.service"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata(
  { params }: Props,
  parent: ResolvingMetadata
): Promise<Metadata> {
  const id = params.id
  const trip = await axiosInstance.get("/trips/" + id)

  return {
    title: trip?.data?.destination + " - Trip Squad" || "Trip Details Page",
    description: trip?.data?.description || "Trip descriptoin...",
  }
}

const TripPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const trip = await axiosInstance.get("/trips/" + id)
  const tripData = trip.data as ITrip
  const user = await getCurrentUser()

  return (
    <div className="container pt-20 space-y-4">
      <TripImgSlide tripImgs={tripData.photos} />
      <div className="flex gap-4">
        <div className="grow p-3 rounded-xl bg-background space-y-4">
          <div className="shadow-sm bg-muted p-3 rounded-lg flex items-center gap-4">
            <div className="size-28 rounded relative shrink-0">
              <Image
                src={tripData.createdBy.profile.profilePhoto || Avatar}
                className="rounded"
                fill
                alt={tripData.createdBy.profile.name}
              />
            </div>
            <div className="space-y-1">
              <h4 className="font-bold text-lg leading-tight">
                {tripData.createdBy.profile.name}
              </h4>
              <div className="flex items-center gap-5">
                <p className="text-muted-foreground flex items-center gap-1">
                  <HiAtSymbol />
                  {tripData.createdBy.username}
                </p>
                <p className="text-muted-foreground flex items-center gap-2">
                  <GrMapLocation />
                  {tripData.createdBy._count.trip} Trip Posted
                </p>
              </div>
              <p className="text-sm text-muted-foreground max-w-sm line-clamp-2">
                {tripData.createdBy.profile.bio ||
                  "This user doesn't have a bio yet."}
              </p>
            </div>
          </div>

          <div className="border-y py-2 flex items-center gap-5">
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="size-7 bg-secondary grid place-items-center rounded">
                <HiOutlineClock className="size-5 text-foreground" />
              </span>
              <p className="flex gap-1">
                <span className="text-foreground font-medium">Posted:</span>
                <span>{formatDistanceToNow(tripData.createdAt)} ago</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="size-7 bg-secondary grid place-items-center rounded">
                <PiBackpack className="size-5 text-foreground" />
              </span>
              <p className="flex gap-1">
                <span className="text-foreground font-medium">Trip Type:</span>
                <span>{tripData.tripType}</span>
              </p>
            </div>
            <div className="flex items-center gap-2 text-muted-foreground">
              <span className="size-7 bg-secondary grid place-items-center rounded">
                <HiOutlineMapPin className="size-5 text-foreground" />
              </span>
              <p className="flex gap-1">
                <span className="text-foreground font-medium">Location:</span>
                <span>{tripData.location}</span>
              </p>
            </div>
          </div>

          <div>
            <h4 className="font-semibold">Trip Itinerary</h4>
            <p className="leading-normal text-muted-foreground">
              {tripData.itinerary}
            </p>
          </div>

          <div>
            <h4 className="font-semibold">Trip Details</h4>
            <p className="leading-normal text-muted-foreground">
              {tripData.description}
            </p>
          </div>
        </div>

        <div className="w-[400px] shrink-0">
          <SingleTripAside
            trip={tripData}
            user={user}
          />
        </div>
      </div>
    </div>
  )
}
export default TripPage
