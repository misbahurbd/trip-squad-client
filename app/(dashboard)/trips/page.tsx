import DeshboardHeader from "@/components/shared/deshboard-header"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import { TbMapPlus } from "react-icons/tb"
import { getCurrentUser } from "@/services/user.service"
import Link from "next/link"
import { axiosInstance } from "@/lib/axios"

const TripsPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null
  const query = Object.keys(searchParams)
    .map(key => {
      if (searchParams[key] !== undefined) {
        return `${key}=${searchParams[key]}`
      }
    })
    .join("&")

  const trips = await axiosInstance.get(`/trip?${query}`)
  console.log(trips)

  return (
    <div className="flex flex-col h-full">
      <DeshboardHeader pageTitle="My Trips">
        <Button
          className="flex items-center gap-2"
          asChild
        >
          <Link href={"/trips/create"}>
            <TbMapPlus className="size-5" />
            <span>Add Trip</span>
          </Link>
        </Button>
      </DeshboardHeader>
      <ScrollArea className="grow bg-secondary rounded-tl-lg"></ScrollArea>
    </div>
  )
}
export default TripsPage
