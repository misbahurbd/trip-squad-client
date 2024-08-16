import type { Metadata } from "next"
import { PiBackpack } from "react-icons/pi"
import { ITrip } from "@/interface"
import { axiosInstance } from "@/lib/axios"

import {
  Table,
  TableBody,
  TableCell,
  TableFooter,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import EmptyRes from "@/components/shared/empty-res"
import { getCurrentUser } from "@/services/user.service"
import Pagination from "@/components/shared/pagination"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import Image from "next/image"
import { TripEdit } from "../my-trips/_components/trip-edit"
import { Separator } from "@/components/ui/separator"
import { TripDelete } from "../my-trips/_components/trip-delete"
import { format } from "date-fns"

export const metadata: Metadata = {
  title: "Trip Management | Trip Squad",
  description:
    "Manage all trips on Trip Squad. Admins can edit, update, and delete trips efficiently to ensure seamless trip organization.",
}

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

  const trips = await axiosInstance.get(`/trips?${query}`)
  const totalPage = Math.ceil(trips?.meta?.total / trips?.meta?.limit)

  return (
    <div className="h-full flex flex-col p-3 gap-3 @container">
      <DashboardHeader pageTitle="Trip Management" />

      <div className="space-y-4">
        {trips.data.length === 0 && (
          <EmptyRes
            icon={PiBackpack}
            message="You have no trip posted"
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
      </div>
    </div>
  )
}
export default TripsPage
