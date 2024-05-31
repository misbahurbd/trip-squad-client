import EditTripForm from "@/components/form/edit-trip-form"
import DashboardHeader from "@/components/shared/dashboard-header"
import { axiosInstance } from "@/lib/axios"

const CreateTrip = async (params: { id: string }) => {
  const trip = await axiosInstance.get(`trips/${params.id}`)

  if (!trip.data) return null

  return (
    <div className="flex flex-col h-full p-3 gap-3 max-w-2xl mx-auto">
      <DashboardHeader pageTitle="Edit Trip" />
      <div className="grow">
        <div className="bg-background rounded-md p-5">
          <EditTripForm
            tripData={trip.data}
            path={"/my-trip"}
          />
        </div>
      </div>
    </div>
  )
}
export default CreateTrip
