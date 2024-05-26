import { ScrollArea } from "@/components/ui/scroll-area"
import { getCurrentUser } from "@/services/user.service"
import Image from "next/image"
import Link from "next/link"
import { PropsWithChildren } from "react"
import avatar from "@/assets/img/avatar.jpeg"
import DashboardNav from "@/components/shared/dasboard-nav"
import LogoutButton from "@/components/form/logout-button"

const DashboardLayout = async ({ children }: PropsWithChildren) => {
  const currentUser = await getCurrentUser()
  if (!currentUser) return null

  return (
    <div className="h-screen flex">
      <aside className="h-full bg-background w-64 shrink-0 flex flex-col">
        <div className="p-4">
          <Link
            href={"/dashboard"}
            className="text-xl font-bold"
          >
            Trip Squad
          </Link>
        </div>
        <ScrollArea className="grow">
          <DashboardNav role={currentUser.role} />
        </ScrollArea>
        <div className="p-4 flex items-center gap-3">
          <div className="relative size-6 ring-2 ring-primary ring-offset-2 rounded-full">
            <Image
              src={currentUser.profilePhoto || avatar}
              fill
              alt={currentUser.name}
              className="rounded-full"
            />
          </div>
          <div className="grow">
            <h4 className="leading-tight font-semibold text-sm line-clamp-1	">
              {currentUser.name}
            </h4>
            <p className="leading-tight text-xs text-muted-foreground">
              @{currentUser.username}
            </p>
          </div>
          <LogoutButton />
        </div>
      </aside>
      <div className="grow flex flex-col bg-background">{children}</div>
    </div>
  )
}
export default DashboardLayout
