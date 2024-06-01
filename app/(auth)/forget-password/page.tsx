import ForgetPasswordForm from "@/components/form/forget-password-form"
import { Metadata } from "next"
import Link from "next/link"

export const metadata: Metadata = {
  title: "Forget Password | Trip Squad",
  description:
    "Reset your password on Trip Squad. Enter your email address and we'll send you a link to reset your password.",
}

const ForgetPassword = () => {
  return (
    <div className="max-w-xl w-full mx-auto flex items-stretch gap-3">
      <div className="w-full bg-background rounded-xl py-12 px-10 flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-center">Forget Your Password</h2>

        <ForgetPasswordForm />

        <div className="text-sm text-center flex gap-2 items-center">
          <span>Remember your password?</span>
          <Link
            href={"/login"}
            className="underline hover:text-primary"
          >
            Login
          </Link>
        </div>
      </div>
    </div>
  )
}
export default ForgetPassword
