"use client"

import { getRootNavlinks } from "@/constant"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

const Navbar = () => {
  const pathname = usePathname()

  const navLinks = getRootNavlinks(pathname)
  return (
    <nav className="hidden md:block">
      <ul className="flex">
        {navLinks.map(link => (
          <li key={link.href}>
            <Link
              href={link.href}
              className={cn(
                "flex font-medium transition relative h-16 px-5 items-center justify-center text-foreground/70 text-base hover:bg-primary/5 hover:text-primary before:h-1 before:w-full before:left-0 before:bottom-0 before:bg-primary before:absolute before:transition before:scale-y-0 before:origin-bottom hover:before:scale-y-100",
                link.active && "before:scale-y-100 text-primary"
              )}
            >
              {link.label}
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  )
}
export default Navbar
