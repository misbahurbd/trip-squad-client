import CreateTripForm from "@/components/form/create-trip-form"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create a Trip | Trip Squad",
  description:
    "Plan your next adventure on Trip Squad. Create a new trip, add details, and invite buddies to join your exciting journey.",
}

const CreateTrip = () => {
  return (
    <div className="flex flex-col h-full p-3 gap-3 max-w-2xl mx-auto">
      <DashboardHeader pageTitle="Create a Trip" />
      <div className="grow">
        <div className="bg-background rounded-md p-5">
          <CreateTripForm />
        </div>
      </div>
    </div>
  )
}
export default CreateTrip
