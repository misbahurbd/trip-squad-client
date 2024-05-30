import { ITrip } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import { getCurrentUser } from "@/services/user.service"
import BuddyRequestForm from "./_components/buddy-request-form"
import SectionHeader from "@/components/shared/section-header"
import ImageCarousel from "@/components/shared/image-carusel"
import { HiOutlineMapPin } from "react-icons/hi2"
import { Separator } from "@/components/ui/separator"
import { formatedDate } from "@/lib/utils"
import Link from "next/link"

const BuddyRequestPage = async ({ params }: { params: { id: string } }) => {
  const id = params.id
  const trip = await axiosInstance.get("/trips/" + id)
  const tripData = trip.data as ITrip
  const user = await getCurrentUser()
  if (!user) return null

  return (
    <div className="container space-y-12 pt-12">
      <SectionHeader
        title="Join Your Perfect Trip Buddy"
        subTitle="Send a request to join an exciting trip and connect with fellow adventurers."
      />
      <div className="flex flex-col-reverse md:flex-row gap-3">
        <div className="p-6 bg-background rounded-xl grow">
          <div className="mb-4">
            <h3 className="font-semibold text-lg">Buddy Request Form</h3>
            <p className="text-muted-foreground text-sm">
              Fill out the form below to request joining a trip as a buddy. We
              will notify the trip creator of your request.
            </p>
          </div>
          <BuddyRequestForm
            user={user}
            tripId={tripData.id}
          />
        </div>
        <div className="md:w-[360px] md:shrink-0">
          <div className="group sticky top-20 p-3 bg-background rounded-xl space-y-2">
            <h2 className="font-semibold text-lg">Trip Information</h2>
            <Separator className="opacity-50" />
            <ImageCarousel trip={tripData} />
            <div>
              <Link
                href={`/trips/${tripData.id}`}
                className="hover:text-primary"
              >
                <h3 className="text-xl font-semibold">
                  {tripData.destination}
                </h3>
              </Link>
              <p className="text-muted-foreground text-sm flex gap-1 items-center">
                <HiOutlineMapPin />
                <span>{tripData.location}</span>
              </p>
            </div>
            <Separator className="opacity-50" />
            <div className="grid grid-cols-2 gap-4">
              <div>
                <h5 className="text-sm font-semibold">Start Date</h5>
                <p className="text-sm from-muted-foreground">
                  {formatedDate(tripData.startDate)}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-semibold">End Date</h5>
                <p className="text-sm from-muted-foreground">
                  {formatedDate(tripData.endDate)}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-semibold">Trip Type</h5>
                <p className="text-sm from-muted-foreground">
                  {tripData.tripType}
                </p>
              </div>
              <div>
                <h5 className="text-sm font-semibold">Budget</h5>
                <p className="text-sm from-muted-foreground">
                  ${tripData.budget.toLocaleString()}
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
export default BuddyRequestPage
