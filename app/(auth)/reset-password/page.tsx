import ResetPasswordForm from "@/components/form/reset-password-form"
import { Metadata } from "next"
import { redirect } from "next/navigation"

export const metadata: Metadata = {
  title: "Reset Password - Trip Squad",
  description:
    "Reset your password for your Trip Squad account. Follow the instructions to regain access to your account and continue your travel journey with ease.",
}

const ForgetPassword = ({
  searchParams,
}: {
  searchParams: { token: string }
}) => {
  const { token } = searchParams

  if (!token) {
    return redirect("/forgot-password")
  }

  return (
    <div className="max-w-xl w-full mx-auto flex items-stretch gap-3">
      <div className="w-full bg-background rounded-xl py-12 px-10 flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-center text-foreground">
          Reset Your Password
        </h2>
        <ResetPasswordForm token={token} />
      </div>
    </div>
  )
}

export default ForgetPassword
