import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import { DashboardNavLinks } from "@/constant"
import DashboardNavbar from "./dashboard-navbar"
import { Button } from "@/components/ui/button"
import { LuAlignLeft } from "react-icons/lu"
import Link from "next/link"
import { useEffect, useState } from "react"
import { usePathname } from "next/navigation"

const DashboardMobileNavbar = ({
  navLinks,
}: {
  navLinks: DashboardNavLinks
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const pathname = usePathname()

  useEffect(() => {
    setIsOpen(false)
  }, [pathname])

  return (
    <Sheet
      open={isOpen}
      onOpenChange={open => setIsOpen(open)}
    >
      <SheetTrigger asChild>
        <Button
          size="icon"
          variant="outline"
          className="md:hidden"
        >
          <LuAlignLeft className="w-6 h-6" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className="p-0 flex flex-col gap-6 w-full max-w-72"
        side="left"
      >
        <div className="p-3">
          <Link
            href={"/"}
            className="text-lg font-semibold"
          >
            Trip Squad
          </Link>
        </div>
        <DashboardNavbar
          navLinks={navLinks}
          className="block"
          isCollapsed={false}
        />
      </SheetContent>
    </Sheet>
  )
}
export default DashboardMobileNavbar
