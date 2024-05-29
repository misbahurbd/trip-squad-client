"use client"

import { TextAlignLeftIcon } from "@radix-ui/react-icons"
import { Button } from "@/components/ui/button"
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import { useEffect, useState } from "react"
import { getRootNavlinks } from "@/constant"
import { usePathname, useRouter } from "next/navigation"
import Link from "next/link"
import { cn } from "@/lib/utils"

const MobileNav = () => {
  const [isMounted, setIsMounted] = useState(false)
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const handleClick = (href: string) => {
    setIsOpen(false)
    router.push(href)
  }

  useEffect(() => {
    setIsMounted(true)
  }, [])

  const navLinks = getRootNavlinks(pathname)

  if (!isMounted) return null

  return (
    <Sheet
      open={isOpen}
      onOpenChange={open => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          variant={"ghost"}
          className="p-0"
        >
          <TextAlignLeftIcon className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        side={"left"}
        className="w-full max-w-sm px-0"
      >
        <SheetHeader className="text-start mb-10 px-4">
          <SheetTitle className="font-bold text-lg">Trip Squad</SheetTitle>
        </SheetHeader>
        <ul className="border-y border-secondary">
          {navLinks.map((link, i) => (
            <li
              key={link.href}
              onClick={() => handleClick(link.href)}
              className={cn(
                "relative px-4 py-2 block font-medium transition text-foreground/80 hover:bg-primary/2 hover:text-primary before:absolute before:transition before:h-full before:top-0 before:left-0 before:w-1 before:bg-primary before:scale-x-0 before:origin-left hover:before:scale-x-100",
                i != 0 && "border-t border-secondary",
                link.active && "before:scale-x-100 text-primary"
              )}
            >
              {link.label}
            </li>
          ))}
        </ul>
      </SheetContent>
    </Sheet>
  )
}
export default MobileNav
