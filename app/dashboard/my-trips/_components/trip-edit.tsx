"use client"

import { cn } from "@/lib/utils"
import Link from "next/link"
import { usePathname } from "next/navigation"

export const TripEdit = ({
  id,
  className,
}: {
  id: string
  className?: string
}) => {
  const pathname = usePathname()

  return (
    <Link
      className={cn(className)}
      href={`${pathname}/${id}/edit`}
    >
      Edit
    </Link>
  )
}
