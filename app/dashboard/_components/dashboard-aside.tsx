"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { getDashboardNav } from "@/constant"
import { cn } from "@/lib/utils"
import { usePathname } from "next/navigation"
import { CurrentUser } from "@/interface"
import { Button } from "@/components/ui/button"
import DashboardTopSearchbar from "./dashboard-top-searchbar"
import UserBox from "@/components/shared/user-box"
import { LuAlignJustify } from "react-icons/lu"
import DashboardNavbar from "./dashboard-navbar"
import DashboardMobileNavbar from "./dashboard-mobile-navbar"

const DashboardAside = ({ currentUser }: { currentUser: CurrentUser }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const pathname = usePathname()
  const dasboardNavs = getDashboardNav(pathname, currentUser.role)

  const onCollapse = () => {
    const navCollapse = localStorage.getItem("dasboard-nav-collapsed")

    if (navCollapse) {
      localStorage.setItem(
        "dasboard-nav-collapsed",
        JSON.parse(navCollapse) ? JSON.stringify(false) : JSON.stringify(true)
      )
    } else {
      localStorage.setItem("dasboard-nav-collapsed", JSON.stringify(true))
    }
    setIsCollapsed(!isCollapsed)
  }

  useEffect(() => {
    const navCollapse = localStorage.getItem("dasboard-nav-collapsed")
    if (navCollapse) {
      setIsCollapsed(JSON.parse(navCollapse))
    }
  }, [])

  return (
    <aside
      className={cn(
        "h-14 bg-background shadow md:shadow-none z-10 flex md:flex-col gap-3 items-center md:items-stretch md:h-full fixed w-full md:static md:max-w-60 top-0 left-0",
        isCollapsed && "md:w-14"
      )}
    >
      <div className="grow flex flex-col">
        <div className="flex px-2 justify-center gap-3 items-center h-14 md:h-16">
          <DashboardMobileNavbar navLinks={dasboardNavs} />
          <div className={cn("mr-auto", isCollapsed && "md:hidden")}>
            <Link
              className="text-lg font-semibold"
              href={"/"}
            >
              Trip Squad
            </Link>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={onCollapse}
            className="hidden md:flex"
          >
            <LuAlignJustify className="w-6 h-6" />
          </Button>
        </div>
        <div className="grow">
          <DashboardNavbar
            isCollapsed={isCollapsed}
            navLinks={dasboardNavs}
          />
        </div>
      </div>

      <div className="flex items-center gap-3 px-3 md:hidden">
        <DashboardTopSearchbar />
        <UserBox user={currentUser} />
      </div>
    </aside>
  )
}
export default DashboardAside
