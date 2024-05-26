import CreateTripForm from "@/components/form/create-trip-form"
import DashboardHeader from "@/components/shared/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"

const CreateTrip = () => {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="Create Trip" />
      <ScrollArea className="grow bg-secondary rounded-tl-lg">
        <div className="max-w-2xl mx-auto space-y-4 p-4">
          <div className="bg-background rounded-md p-5">
            <CreateTripForm />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
export default CreateTrip
