"use client"

import { getDashboardNav } from "@/constant"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"
import LogoutButton from "@/components/form/logout-button"
import { CurrentUser } from "@/interface"
import Image from "next/image"
import avatar from "@/assets/img/avatar.jpeg"
import { useEffect, useState } from "react"
import { HiBars3 } from "react-icons/hi2"
import { Button } from "../ui/button"
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "../ui/sheet"

const DashboardNav = ({ currentUser }: { currentUser: CurrentUser }) => {
  const [isCollapsed, setIsCollapsed] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
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
        "md:h-full bg-background fixed md:static left-0 top-0 z-20 border-b border-secondary/50 w-full md:w-56 shrink-0 flex flex-row items-center md:items-stretch px-4 md:px-0 md:flex-col",
        isCollapsed && "md:w-14"
      )}
    >
      <Sheet
        open={isOpen}
        onOpenChange={open => setIsOpen(open)}
      >
        <SheetTrigger asChild>
          <Button
            variant="ghost"
            size="icon"
            className="size-8 md:hidden"
          >
            <HiBars3 className="w-6 h-6" />
          </Button>
        </SheetTrigger>
        <SheetContent
          className="p-0 w-full max-w-[300px] flex flex-col gap-3"
          side="left"
        >
          <SheetHeader>
            <SheetTitle className="p-4 text-start">
              <Link
                href={"/"}
                onClick={() => setIsOpen(false)}
                className={cn("text-xl font-bold")}
              >
                Trip Squad
              </Link>
            </SheetTitle>
          </SheetHeader>
          <ul className="space-y-1 grow">
            {dasboardNavs.map(nav => (
              <li
                key={nav.href}
                className={cn(
                  "relative px-2 before:w-1 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1/2 before:bg-primary before:rounded-r-full before:scale-y-0",
                  nav.active && "before:scale-y-100"
                )}
              >
                <Link
                  href={nav.href}
                  onClick={() => setIsOpen(false)}
                  className={cn(
                    "relative transition group hover:bg-secondary rounded-lg w-full p-2 flex items-center gap-2",
                    nav.active &&
                      "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
                  )}
                >
                  <nav.icon className="size-6 p-0.5" />
                  <span>{nav.label}</span>
                </Link>
              </li>
            ))}
          </ul>
          <div className="p-4 w-full flex items-center gap-3 ">
            <div className="flex grow items-center gap-3">
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
            </div>
            <div>
              <LogoutButton />
            </div>
          </div>
        </SheetContent>
      </Sheet>
      <div className="px-3 py-4 flex items-center justify-between">
        <Link
          href={"/"}
          className={cn("text-xl font-bold", isCollapsed && "md:hidden")}
        >
          Trip Squad
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="size-8 hidden md:flex"
          onClick={onCollapse}
        >
          <HiBars3 className="w-6 h-6" />
        </Button>
      </div>

      <ul className="space-y-1 grow hidden md:block">
        {dasboardNavs.map(nav => (
          <li
            key={nav.href}
            className={cn(
              "relative px-2 before:w-1 before:absolute before:left-0 before:top-1/2 before:-translate-y-1/2 before:h-1/2 before:bg-primary before:rounded-r-full before:scale-y-0",
              nav.active && "before:scale-y-100"
            )}
          >
            <Link
              href={nav.href}
              className={cn(
                "relative transition group hover:bg-secondary rounded-lg w-full p-2 flex items-center gap-2",
                nav.active &&
                  "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
              )}
            >
              <nav.icon className="size-6 p-0.5" />
              <span
                className={cn(
                  isCollapsed &&
                    "absolute transition z-20 whitespace-nowrap left-full top-1/2 -translate-y-1/2 bg-background px-2 py-1 rounded-md shadow text-foreground/70 text-sm translate-x-0 opacity-0 invisible pointer-events-none group-hover:translate-x-3 group-hover:opacity-100 group-hover:visible"
                )}
              >
                {nav.label}
              </span>
            </Link>
          </li>
        ))}
      </ul>

      <div className="p-2 items-center gap-3 hidden md:flex">
        <div
          className={cn(
            "flex items-center gap-3 pl-1",
            isCollapsed && "hidden"
          )}
        >
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
        </div>
        <div>
          <LogoutButton />
        </div>
      </div>
    </aside>
  )
}
export default DashboardNav
