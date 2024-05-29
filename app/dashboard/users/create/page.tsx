import DashboardHeader from "@/components/shared/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import CreateUserForm from "@/app/dashboard/users/create/_components/create-user-form"

const CreateUser = () => {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="Create User" />
      <ScrollArea className="grow bg-secondary rounded-tl-lg">
        <div className="max-w-2xl mx-auto space-y-4 p-4">
          <div className="bg-background rounded-md p-5">
            <CreateUserForm />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
export default CreateUser
