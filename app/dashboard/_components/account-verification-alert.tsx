"use client"

import { Button } from "@/components/ui/button"
import { axiosInstance } from "@/lib/axios"
import { toast } from "sonner"

const AccountVerificationAlert = () => {
  const onResent = async () => {
    const toastId = toast.loading("Sending new verification link...")
    try {
      const res = await axiosInstance.post("/auth/resend-verification-link")
      toast.success(res?.message || "Verification link sent successfully", {
        id: toastId,
      })
      console.log(res.status)
    } catch (error: any) {
      toast.error(error?.message || "Unable to resend verification link", {
        id: toastId,
      })
    }
  }

  return (
    <div className="bg-orange-200 text-center text-sm text-orange-500 p-3 flex gap-4 justify-center items-center">
      Please check your email and follow the link to verify your account.
      <Button
        size="sm"
        variant="secondary"
        onClick={onResent}
      >
        Resend
      </Button>
    </div>
  )
}
export default AccountVerificationAlert

// /resend-verification-link
