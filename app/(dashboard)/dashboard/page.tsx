import DeshboardHeader from "@/components/shared/deshboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"

const Dashboard = () => {
  return (
    <div className="flex flex-col h-full">
      <DeshboardHeader pageTitle="Deshboard" />

      <ScrollArea className="grow bg-secondary rounded-tl-lg"></ScrollArea>
    </div>
  )
}
export default Dashboard
