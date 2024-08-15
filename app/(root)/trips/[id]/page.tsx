import { ITrip } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import type { Metadata } from "next"
import Image from "next/image"
import { HiAtSymbol } from "react-icons/hi"
import { GrMapLocation } from "react-icons/gr"
import TripImgSlide from "@/components/shared/trip-img-slide"
import SingleTripAside from "@/components/shared/single-trip-aside"
import { getCurrentUser } from "@/services/user.service"
import { Separator } from "@/components/ui/separator"
import { HiOutlineClock, HiOutlineMapPin } from "react-icons/hi2"
import { formatDistanceToNow } from "date-fns"
import { PiBackpack } from "react-icons/pi"
import { notFound } from "next/navigation"
import avatar from "@/assets/img/avatar.jpeg"
import Preview from "@/components/shared/preview"
import { getPlainText } from "@/lib/utils"
import TripReviews from "../_components/trip-reviews"

type Props = {
  params: { id: string }
  searchParams: { [key: string]: string | string[] | undefined }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const id = params.id
  const trip = await axiosInstance.get("/trips/" + id)

  return {
    title: trip?.data?.destination + " - Trip Squad" || "Trip Details Page",
    description:
      getPlainText(trip?.data?.description)?.slice(0, 160) ||
      "Trip descriptoin...",
  }
}

const TripPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const trip = await axiosInstance.get("/trips/" + id)
  const tripData = trip.data as ITrip
  const user = await getCurrentUser()

  if (!tripData) return notFound()

  return (
    <div className="container space-y-4">
      <TripImgSlide tripImgs={tripData?.photos || []} />
      <div className="flex flex-col md:flex-row gap-3">
        <div className="grow space-y-4">
          <div className="p-3 rounded-xl bg-background space-y-4">
            <div className="shadow-sm bg-muted p-3 rounded-lg space-y-2">
              <div className="flex items-center gap-3">
                <div className="size-20 sm:size-32 rounded relative shrink-0">
                  <Image
                    src={tripData?.createdBy?.profile?.profilePhoto || avatar}
                    className="rounded object-cover"
                    fill
                    alt={tripData?.createdBy?.profile?.name}
                  />
                </div>
                <div className="space-y-1">
                  <h4 className="font-bold text-lg leading-tight">
                    {tripData?.createdBy?.profile?.name}
                  </h4>
                  <div className="flex flex-col sm:flex-row gap-x-5">
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <HiAtSymbol />
                      {tripData?.createdBy?.username}
                    </p>
                    <p className="text-muted-foreground text-sm flex items-center gap-1">
                      <GrMapLocation />
                      {tripData?.createdBy?._count?.trip} trip posted
                    </p>
                  </div>
                  <Separator className="hidden sm:block" />
                  <p className="hidden text-sm text-muted-foreground max-w-lg sm:line-clamp-3">
                    {tripData?.createdBy?.profile?.bio ||
                      "This user doesn't have a bio yet."}
                  </p>
                </div>
              </div>
              <Separator className="sm:hidden" />
              <p className="sm:hidden text-sm text-muted-foreground max-w-sm line-clamp-3">
                {tripData?.createdBy?.profile?.bio ||
                  "This user doesn't have a bio yet."}
              </p>
            </div>

            <div className="border-y py-2 flex flex-wrap items-center gap-x-5 gap-y-2">
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="size-7 bg-secondary grid place-items-center rounded">
                  <HiOutlineClock className="size-5 text-foreground" />
                </span>
                <p className="flex gap-1">
                  <span className="text-foreground font-medium">Posted:</span>
                  <span>{formatDistanceToNow(tripData?.createdAt)} ago</span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="size-7 bg-secondary grid place-items-center rounded">
                  <HiOutlineMapPin className="size-5 text-foreground" />
                </span>
                <p className="flex gap-1">
                  <span className="text-foreground font-medium">Location:</span>
                  <span>{tripData?.location}</span>
                </p>
              </div>
              <div className="flex items-center gap-2 text-muted-foreground">
                <span className="size-7 bg-secondary grid place-items-center rounded">
                  <PiBackpack className="size-5 text-foreground" />
                </span>
                <p className="flex gap-1">
                  <span className="text-foreground font-medium">
                    Trip Type:
                  </span>
                  <span>{tripData?.tripType}</span>
                </p>
              </div>
            </div>

            <div>
              <h4 className="font-semibold text-xl">Trip Itinerary</h4>
              <p className="leading-normal text-muted-foreground">
                {tripData?.itinerary}
              </p>
            </div>

            <div>
              <h4 className="font-semibold text-xl">Trip Details</h4>
              <p className="leading-normal text-muted-foreground">
                <Preview value={tripData?.description} />
              </p>
            </div>
          </div>

          <TripReviews
            trip={tripData}
            currentUser={user}
          />
        </div>

        <div className="md:w-[320px] lg:w-[360px] md:shrink-0">
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
