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
    <div className="flex flex-col h-full p-3 gap-3 max-w-2xl mx-auto">
      <DashboardHeader pageTitle="Create User" />
      <div className="grow">
        <div className="bg-background rounded-md p-5">
          <CreateUserForm />
        </div>
      </div>
    </div>
  )
}
export default CreateUser
