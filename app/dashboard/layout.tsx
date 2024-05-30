import { getCurrentUser } from "@/services/user.service"
import { PropsWithChildren, Suspense } from "react"
import DashboardNav from "@/components/shared/dasboard-nav"
import Loading from "@/app/dashboard/loading"

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return (
    <div className="h-screen flex flex-col pt-20 w-full md:p-0 md:flex-row">
      <DashboardNav currentUser={currentUser} />
      <Suspense fallback={<Loading />}>
        <div className="grow flex flex-col bg-background">{children}</div>
      </Suspense>
    </div>
  )
}
export default DashboardLayout
