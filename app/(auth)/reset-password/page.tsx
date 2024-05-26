"use client"

import ResetPasswordForm from "@/components/shared/reset-password-form"
import { useRouter, useSearchParams } from "next/navigation"

const ForgetPassword = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const token = searchParams.get("token")
  if (!token) {
    return router.replace("/forget-password")
  }

  return (
    <div className="max-w-xl w-full mx-auto flex items-stretch gap-3">
      <div className="w-full bg-background rounded-xl py-12 px-10 flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-center">Reset Your Password</h2>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}

export default ForgetPassword
