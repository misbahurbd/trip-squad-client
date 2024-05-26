import DashboardHeader from "@/components/shared/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="Dashboard" />

      <ScrollArea className="grow bg-secondary rounded-tl-lg"></ScrollArea>
    </div>
  )
}
export default Dashboard
