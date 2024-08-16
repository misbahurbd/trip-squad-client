import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import EmptyRes from "@/components/shared/empty-res"
import { IBuddyRequest } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import { AiOutlineHistory } from "react-icons/ai"
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
import avatar from "@/assets/img/avatar.jpeg"
import { format } from "date-fns"
import PaginationComponent from "@/components/shared/pagination"
import { Badge } from "@/components/ui/badge"

export const metadata: Metadata = {
  title: "Requests History | Trip Squad",
  description:
    "Track your trip buddy requests on Trip Squad. View the history of sent and received requests to manage your travel plans efficiently.",
}

const RequestHistory = async ({
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

  const history = await axiosInstance.get(`/trip-buddies/history?${query}`)
  const totalPage = Math.ceil(history?.meta?.total / history?.meta?.limit)

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Requests History" />
      <div className="grow @container/history">
        <div className="space-y-4">
          {history?.data?.length === 0 && (
            <EmptyRes
              icon={AiOutlineHistory}
              message="No request history available"
            />
          )}

          {history?.data?.length > 0 && (
            <div className="w-full overflow-auto">
              <Table className="bg-background border border-border min-w-full w-max">
                <TableHeader>
                  <TableRow>
                    <TableHead colSpan={2}>Buddy Details</TableHead>
                    <TableHead>Trip Details</TableHead>
                    <TableHead>Status</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {history?.data?.map((buddyRequest: IBuddyRequest) => (
                    <TableRow key={buddyRequest.id + "-table-cell"}>
                      <TableCell
                        width={100}
                        className="w-28 shrink-0"
                      >
                        <div className="relative">
                          <Image
                            src={
                              buddyRequest?.trip?.createdBy?.profile
                                ?.profilePhoto || avatar
                            }
                            width={100}
                            height={100}
                            alt={buddyRequest?.trip?.createdBy?.profile?.name}
                            className="object-cover aspect-[4/3] rounded-md w-full"
                          />
                        </div>
                      </TableCell>
                      <TableCell className="whitespace-nowrap">
                        <h5 className="text-base text-foreground font-semibold">
                          {buddyRequest?.trip?.createdBy?.profile?.name}
                        </h5>
                        <p className="text-muted-foreground text-sm">
                          {buddyRequest?.trip?.createdBy?.profile?.email}
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
                        <Badge
                          variant={
                            buddyRequest.status === "Approved"
                              ? "active"
                              : buddyRequest.status === "Pending"
                              ? "pending"
                              : "destructive"
                          }
                        >
                          {buddyRequest.status}
                        </Badge>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
                <TableFooter>
                  <TableRow>
                    <TableCell colSpan={5}>
                      {history?.data?.length > 0 && (
                        <PaginationComponent totalPages={totalPage} />
                      )}
                    </TableCell>
                  </TableRow>
                </TableFooter>
              </Table>
            </div>
          )}
          {/* <div className="gap-3 rounded-lg grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
            {history?.data?.map((request: IBuddyRequest) => (
              <RequestHistoryCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
          {history?.data?.length > 0 && (
            <PaginationComponent totalPages={totalPage} />
          )} */}
        </div>
      </div>
    </div>
  )
}
export default RequestHistory
