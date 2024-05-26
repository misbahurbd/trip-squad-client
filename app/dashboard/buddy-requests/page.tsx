import DashboardHeader from "@/components/shared/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getCurrentUser } from "@/services/user.service"

const BuddyRequests = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="Buddy Requests" />
      <ScrollArea className="grow bg-secondary rounded-tl-lg p-4">
        <div className="space-y-4 p-5 bg-background rounded-md"></div>
      </ScrollArea>
    </div>
  )
}
export default BuddyRequests
