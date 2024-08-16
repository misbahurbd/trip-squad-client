import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { axiosInstance } from "@/lib/axios"
import { getCurrentUser } from "@/services/user.service"
import EmptyRes from "@/components/shared/empty-res"
import { HiOutlineUserPlus } from "react-icons/hi2"
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
import { IBuddyRequest } from "@/interface"
import Image from "next/image"
import avatar from "@/assets/img/avatar.jpeg"
import PaginationComponent from "@/components/shared/pagination"
import { format } from "date-fns"
import RequestActions from "./_components/request-actions"

export const metadata: Metadata = {
  title: "Buddy Requests | Trip Squad",
  description:
    "Manage your trip buddy requests on Trip Squad. View, accept, or reject requests from other users to join your trips.",
}

const BuddyRequests = async ({
  searchParams,
}: {
  searchParams: Record<string, string>
}) => {
  const currentUser = await getCurrentUser()
  const query = Object.keys(searchParams)
    .map(key => {
      if (searchParams[key] !== undefined) {
        return `${key}=${searchParams[key]}`
      }
    })
    .join("&")

  const buddyRequests = await axiosInstance.get(`/trip-buddies?${query}`)
  const totalPage = Math.ceil(
    buddyRequests?.meta?.total / buddyRequests?.meta?.limit
  )

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Buddy Requests" />
      <div className="grow @container">
        <div className="space-y-4">
          {buddyRequests?.data?.length === 0 && (
            <EmptyRes
              icon={HiOutlineUserPlus}
              message="You don't have any pending buddy request."
            />
          )}

          {buddyRequests?.data?.length > 0 && (
            <div className="w-full overflow-auto">
              <Table className="bg-background border border-border min-w-full w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={2}>Buddy Details</TableHead>
                    <TableHead>Trip Details</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {buddyRequests?.data?.map((buddyRequest: IBuddyRequest) => (
                    <TableRow key={buddyRequest.id + "-table-cell"}>
                      <TableCell
                        width={100}
                        className="w-28 shrink-0"
                      >
                        <div className="relative">
                          <Image
                            src={
                              buddyRequest?.user?.profile?.profilePhoto ||
                              avatar
                            }
                            width={100}
                            height={100}
                            alt={buddyRequest?.user?.profile?.name}
                            className="object-cover aspect-[4/3] rounded-md w-full"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <h5 className="text-base text-foreground font-semibold">
                          {buddyRequest?.user?.profile?.name}
                        </h5>
                        <p className="text-muted-foreground text-sm">
                          {buddyRequest?.address}, {buddyRequest?.city}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {buddyRequest?.email}
                        </p>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <h5 className="text-base text-foreground font-semibold">
                          {buddyRequest?.trip?.destination}
                        </h5>
                        <p className="text-muted-foreground text-sm">
                          {buddyRequest?.trip?.location}
                        </p>
                        <p className="text-muted-foreground text-sm">
                          {`${format(
                            buddyRequest?.trip?.startDate,
                            "dd MMM"
                          )} - ${format(
                            buddyRequest?.trip?.startDate,
                            "dd MMM, yyyy"
                          )}`}
                        </p>
                      </TableCell>
                      <TableCell>
                        <RequestActions id={buddyRequest.id} />
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>
                      {buddyRequests?.data?.length > 0 && (
                        <PaginationComponent totalPages={totalPage} />
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}

          {/* <div className="grid grid-cols-1 @2xl:grid-cols-2 @5xl:grid-cols-3 @[85rem]:grid-cols-4 gap-3 ">
            {buddyRequests?.data?.map((buddyRequest: IBuddyRequest) => (
              <RequestCard
                key={buddyRequest.tripId + buddyRequest.userId}
                buddyRequest={buddyRequest}
              />
            ))}
          </div>
          {buddyRequests?.data?.length > 0 && (
            <PaginationComponent totalPages={totalPage} />
          )} */}
        </div>
      </div>
    </div>
  )
}
export default BuddyRequests
