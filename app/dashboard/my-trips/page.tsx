import { Button } from "@/components/ui/button"
import { TbMapPlus } from "react-icons/tb"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import Link from "next/link"
import { axiosInstance } from "@/lib/axios"
import { ITrip } from "@/interface"
import Pagination from "@/components/shared/pagination"
import EmptyRes from "@/components/shared/empty-res"
import { PiBackpack } from "react-icons/pi"
import { Metadata } from "next"
import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import Image from "next/image"
import { format } from "date-fns"
import { TripEdit } from "./_components/trip-edit"
import { Separator } from "@/components/ui/separator"
import { TripDelete } from "./_components/trip-delete"

export const metadata: Metadata = {
  title: "My Trips | Trip Squad",
  description:
    "View and manage your trips on Trip Squad. Keep track of upcoming and past adventures, and share your travel experiences.",
}

const TripsPage = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const query = Object.keys(searchParams)
    .map(key => {
      if (searchParams[key] !== undefined) {
        return `${key}=${searchParams[key]}`
      }
    })
    .join("&")

  const trips = await axiosInstance.get(`/trips/get-my-trips?${query}`)
  const totalPage = Math.ceil(trips?.meta?.total / trips?.meta?.limit)

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="My Trips">
        <Button
          className="flex items-center gap-2"
          asChild
        >
          <Link href={"/dashboard/my-trips/create"}>
            <TbMapPlus className="size-5" />
            <span>Add Trip</span>
          </Link>
        </Button>
      </DashboardHeader>
      <div className="grow @container">
        <div className="space-y-4">
          {trips.data.length === 0 && (
            <EmptyRes
              icon={PiBackpack}
              message="No trip found!"
            />
          )}

          {trips?.data?.length > 0 && (
            <div className="w-full overflow-auto">
              <Table className="bg-background border border-border min-w-full w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={2}>Trip Details</TableHead>
                    <TableHead>Publish At</TableHead>
                    <TableHead>Trip Type</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {trips?.data?.map((trip: ITrip) => (
                    <TableRow key={trip.id + "-table-cell"}>
                      <TableCell
                        width={100}
                        className="w-28 shrink-0"
                      >
                        <div className="relative">
                          <Image
                            src={trip.photos[0]}
                            width={100}
                            height={100}
                            alt={trip.destination}
                            className="object-cover aspect-[4/3] rounded-md w-full"
                          />
                        </div>
                      </TableCell>
                      <TableCell>
                        <h3 className="font-semibold text-foreground whitespace-nowrap">
                          {trip.destination}
                        </h3>
                        <p className="text-muted-foreground text-sm mb-1 whitespace-nowrap">
                          {trip.location}
                        </p>
                        <div className="flex text-sm gap-1 items-center">
                          <TripEdit
                            className="text-sm text-muted-foreground underline hover:text-primary"
                            id={trip.id}
                          />
                          <Separator className="size-1 rounded-full" />
                          <TripDelete
                            className="text-sm text-muted-foreground underline hover:text-primary"
                            id={trip.id}
                          />
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap text-muted-foreground">
                        {format(trip.createdAt, "d MMM, yyyy")}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {trip.tripType}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>
                      {trips.data.length > 0 && (
                        <Pagination totalPages={totalPage} />
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
          {/* <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @[85rem]:grid-cols-4 gap-3">
              {trips.data.map((trip: ITrip) => (
                <TripCard
                  key={trip.id}
                  trip={trip}
                />
              ))}
            </div> */}
        </div>
      </div>
    </div>
  )
}
export default TripsPage
