"use client"

import { getDashboardNav } from "@/constant"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const DashboardNav = ({ role }: { role: string }) => {
  const pathname = usePathname()

  const dasboardNavs = getDashboardNav(pathname, role)

  return (
    <ul className="space-y-1 pr-2">
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
              "transition hover:bg-secondary rounded-lg w-full p-2 flex items-center gap-2",
              nav.active &&
                "bg-primary text-primary-foreground hover:bg-primary/90 hover:text-primary-foreground"
            )}
          >
            <nav.icon className="size-5" />
            <span>{nav.label}</span>
          </Link>
        </li>
      ))}
    </ul>
  )
}
export default DashboardNav
