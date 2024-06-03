import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import EmptyRes from "@/components/shared/empty-res"
import { IBuddyRequest } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import { AiOutlineHistory } from "react-icons/ai"
import RequestHistoryCard from "@/components/shared/request-history-card"
import PaginationComponent from "@/components/shared/pagination"
import { Metadata } from "next"

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
          <div className="gap-3 rounded-lg grid grid-cols-1 @xl:grid-cols-2 @4xl:grid-cols-3 @7xl:grid-cols-4">
            {history?.data?.map((request: IBuddyRequest) => (
              <RequestHistoryCard
                key={request.id}
                request={request}
              />
            ))}
          </div>
          {history?.data?.length > 0 && (
            <PaginationComponent totalPages={totalPage} />
          )}
        </div>
      </div>
    </div>
  )
}
export default RequestHistory
