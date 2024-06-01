"use client"

import { HiOutlineExclamation } from "react-icons/hi"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { usePathname } from "next/navigation"

const NotFoundComponent = () => {
  const pathname = usePathname()

  return (
    <div className="p-8 flex flex-col items-center justify-center gap-6">
      <HiOutlineExclamation className="size-32" />
      <div className="text-center space-y-2 max-w-lg">
        <h1 className="text-2xl font-bold">Page Not Found!</h1>
        <p>
          We’re sorry. The page you requested could not be found. Please go back
          to the homepage
        </p>
      </div>
      <Button asChild>
        <Link href={pathname.startsWith("/dashboard") ? "/dashboard" : "/"}>
          Back to Home
        </Link>
      </Button>
    </div>
  )
}
export default NotFoundComponent
