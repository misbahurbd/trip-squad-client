import { getCurrentUser } from "@/services/user.service"
import { PropsWithChildren, Suspense } from "react"
import UserBox from "@/components/shared/user-box"
import DashboardSearchbar from "./_components/dashboard-searchbar"
import { ScrollArea } from "@/components/ui/scroll-area"
import Loading from "./loading"
import DashboardAside from "./_components/dashboard-aside"
import AccountVerificationAlert from "./_components/account-verification-alert"

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return (
    <div className="h-screen bg-secondary md:bg-background w-full flex flex-col md:flex-row pt-14 md:p-0">
      <DashboardAside currentUser={currentUser} />
      <div className="grow md:h-full md:flex md:flex-col">
        <aside className="h-16 shrink-0 hidden md:flex bg-background items-center gap-6 justify-between px-3">
          <DashboardSearchbar />
          <UserBox user={currentUser} />
        </aside>
        {!currentUser.emailVerified && <AccountVerificationAlert />}
        <ScrollArea className="bg-secondary grow">
          <Suspense fallback={<Loading />}>{children}</Suspense>
        </ScrollArea>
      </div>
    </div>
  )
}
export default DashboardLayout
