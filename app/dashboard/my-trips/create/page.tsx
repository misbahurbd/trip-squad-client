import CreateTripForm from "@/components/form/create-trip-form"
import DashboardHeader from "@/components/shared/dashboard-header"

const CreateTrip = () => {
  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Create Trip" />
      <div className="grow">
        <div className="max-w-2xl">
          <div className="bg-background rounded-md p-5">
            <CreateTripForm />
          </div>
        </div>
      </div>
    </div>
  )
}
export default CreateTrip
