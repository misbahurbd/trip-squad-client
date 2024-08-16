import { DashboardNavLinks } from "@/constant"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { HiOutlineHome } from "react-icons/hi2"

const DashboardNavbar = ({
  navLinks,
  isCollapsed,
  className,
}: {
  navLinks: DashboardNavLinks
  isCollapsed: boolean
  className?: string
}) => {
  return (
    <ul className={cn("space-y-1 grow hidden md:block", className)}>
      {navLinks.map(nav => (
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
              "relative transition text-foreground group hover:bg-secondary rounded-lg w-full p-2 flex items-center gap-2",
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
  )
}
export default DashboardNavbar
