"use client"

import { useRouter } from "next/navigation"
import { Button } from "../ui/button"
import { ChevronLeftIcon } from "@radix-ui/react-icons"

interface DashboardHeaderProps {
  pageTitle: string
  children?: React.ReactNode
}

const DashboardHeader: React.FC<DashboardHeaderProps> = ({
  children,
  pageTitle,
}) => {
  const router = useRouter()

  return (
    <aside className="py-4 pr-4 flex items-center bg-background gap-2 ">
      <Button
        onClick={() => router.back()}
        variant={"ghost"}
        size={"icon"}
      >
        <ChevronLeftIcon className="w-8 h-8" />
      </Button>

      <h1 className="text-xl font-semibold mr-auto">{pageTitle}</h1>
      {children && <div>{children}</div>}
    </aside>
  )
}
export default DashboardHeader
