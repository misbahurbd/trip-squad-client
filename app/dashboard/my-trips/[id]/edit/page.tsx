import EditTripForm from "@/components/form/edit-trip-form"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { axiosInstance } from "@/lib/axios"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Edit Trip | Trip Squad",
  description:
    "Update your trip details on Trip Squad. Modify your travel plans, adjust itineraries, and ensure everything is set for your journey.",
}

const CreateTrip = async ({ params }: { params: { id: string } }) => {
  const trip = await axiosInstance.get(`trips/${params.id}`)

  if (!trip.data) notFound()

  return (
    <div className="flex flex-col h-full p-3 gap-3 max-w-2xl mx-auto">
      <DashboardHeader pageTitle="Edit Trip" />
      <div className="grow">
        <div className="bg-background rounded-md p-5">
          <EditTripForm
            tripData={trip.data}
            path={"/my-trips"}
          />
        </div>
      </div>
    </div>
  )
}
export default CreateTrip
