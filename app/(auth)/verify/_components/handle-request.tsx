"use client"

import { Button } from "@/components/ui/button"
import { Skeleton } from "@/components/ui/skeleton"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import { BsEnvelopeCheck, BsEnvelopeExclamation } from "react-icons/bs"

const HandleVerifyRequest = ({ token }: { token: string }) => {
  const [isVerified, setIsVerified] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)
  const router = useRouter()

  useEffect(() => {
    const handleVerify = async () => {
      try {
        await axiosInstance.post(`/auth/verify/${token}`)
        setIsVerified(true)
      } catch (error: any) {
        setError(error?.message || "Unable to verify your account")
      } finally {
        setIsLoading(false)
      }
    }
    handleVerify()
  }, [token])

  if (isLoading) {
    return (
      <div className="px-8 py-12 max-w-2xl mx-auto w-full flex flex-col items-center justify-center text-center bg-background rounded-lg space-y-2">
        <Skeleton className="size-20 rounded-xl" />
        <Skeleton className="w-64 h-8" />
        <Skeleton className="w-96 h-4" />
        <Skeleton className="w-24 h-12" />
      </div>
    )
  }

  return (
    <div className="px-8 py-12 max-w-2xl mx-auto w-full flex flex-col items-center justify-center text-center bg-background rounded-lg space-y-2">
      {!isVerified && error ? (
        <>
          <BsEnvelopeExclamation className="size-20" />
          <h2 className="text-2xl font-bold text-foreground">
            Unable to verify your account
          </h2>
          <p>{error}</p>
        </>
      ) : (
        <>
          <BsEnvelopeCheck className="size-20" />
          <h2 className="text-2xl font-bold text-foreground">
            Your account has been verified
          </h2>
          <p className="text-muted-foreground">
            Your account has been verified successfully. Now you can access your
            account.
          </p>
          <Button onClick={() => router.replace("/dashboard")}>
            Back to Dashboard
          </Button>
        </>
      )}
    </div>
  )
}

export default HandleVerifyRequest
