import { axiosInstance } from "@/lib/axios"
import { getCurrentUser } from "@/services/user.service"
import { Metadata } from "next"
import DashboardHeader from "./_components/dashboard-header"
import { OverviewCard } from "@/components/shared/overview-card"
import { Component as LineChart } from "@/components/shared/overview-line-chart"
import { OverviewPieChart } from "@/components/shared/overview-pie-chart"
import { DashbaordRange } from "./_components/dashboard-range"

export const metadata: Metadata = {
  title: "Overview | Trip Squad",
  description:
    "Explore Trip Squad: Your go-to platform for planning and enjoying seamless travel adventures. Discover, plan, and embark on your next journey today!.",
}

const DashboardPage = async ({
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

  const overview = await axiosInstance.get(`/trips/overview?${query}`)
  const overviewData = overview.data || {}

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Overview">
        <DashbaordRange />
      </DashboardHeader>
      <div className="grow @container space-y-3">
        <div className="grid sm:grid-cols-3 items-center gap-3">
          <OverviewCard
            label="Trip Budget"
            value={overviewData.summary?.budget}
            currency
          />
          <OverviewCard
            label="Trip Schedule"
            value={overviewData.summary?.trip}
          />
          <OverviewCard
            label="Buddy Approved"
            value={overviewData.summary?.buddy}
          />
        </div>
        <div className="grid gap-3">
          <h3 className="text-xl font-semibold text-foreground">
            Trip Statistics
          </h3>
          <div className="p-4 bg-background rounded-md">
            <LineChart data={overviewData.chartData} />
          </div>
        </div>
      </div>
    </div>
  )
}
export default DashboardPage
