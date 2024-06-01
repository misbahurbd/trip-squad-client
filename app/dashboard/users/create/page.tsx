import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import CreateUserForm from "@/app/dashboard/users/create/_components/create-user-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Create User | Trip Squad",
  description:
    "Create a new user account on Trip Squad. Admins can create new users to manage their trips.",
}

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
