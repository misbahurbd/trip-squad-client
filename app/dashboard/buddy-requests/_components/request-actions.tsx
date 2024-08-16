"use client"

import { Button } from "@/components/ui/button"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { toast } from "sonner"

const RequestActions = ({ id }: { id: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const onResponse = async (response: "Approved" | "Rejected") => {
    setIsLoading(true)
    const toastId = toast.loading("Sending request response...")
    try {
      const res = await axiosInstance.put(`/trip-buddies/response/${id}`, {
        status: response,
      })
      toast.success(res?.message || "Request response successfully!", {
        id: toastId,
      })
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || "Unable to send request response", {
        id: toastId,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div
      key={id}
      className="flex items-center gap-2"
    >
      <Button
        disabled={isLoading}
        onClick={() => onResponse("Approved")}
        className="flex-1"
        size="sm"
        variant={"positive"}
      >
        Accept
      </Button>
      <Button
        disabled={isLoading}
        onClick={() => onResponse("Rejected")}
        className="flex-1"
        size="sm"
        variant={"destructive"}
      >
        Reject
      </Button>
    </div>
  )
}
export default RequestActions
