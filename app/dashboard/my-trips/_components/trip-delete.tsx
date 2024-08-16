"use client"

import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { axiosInstance } from "@/lib/axios"
import { cn } from "@/lib/utils"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

export const TripDelete = ({
  id,
  className,
}: {
  id: string
  className?: string
}) => {
  const [isOpen, setIsOpen] = useState(false)
  const router = useRouter()

  const onDelete = async () => {
    const toastId = toast.loading("Deleting trip...")
    try {
      const res = await axiosInstance.delete(`/trips/${id}`)
      toast.success(res?.message || "Trip deleted successfully", {
        id: toastId,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || "Unable to delete this trip", {
        id: toastId,
      })
    }
  }
  return (
    <DropdownMenu
      open={isOpen}
      onOpenChange={open => setIsOpen(open)}
      key={id}
    >
      <DropdownMenuTrigger className={cn(className)}>
        Delete
      </DropdownMenuTrigger>
      <DropdownMenuContent
        side="top"
        className="p-4"
      >
        <div className="space-y-2 py-2 flex flex-col items-center">
          <p className="text-sm text-muted-foreground">
            Are you sure to delete this trip?
          </p>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="destructive"
              onClick={onDelete}
            >
              Delete
            </Button>
            <Button
              size="sm"
              variant="outline"
              onClick={() => setIsOpen(false)}
            >
              Cancle
            </Button>
          </div>
        </div>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
