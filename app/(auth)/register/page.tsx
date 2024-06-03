import { Metadata } from "next"
import Image from "next/image"
import Link from "next/link"
import RegisterForm from "@/components/form/register-form"
import authImg from "@/assets/img/auth-img-02.jpg"

export const metadata: Metadata = {
  title: "Register | Trip Squad",
  description:
    "Register for an account on Trip Squad and start planning your next adventure! Connect with like-minded travelers and share your trip plans.",
}

const RegisterPage = () => {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col md:flex-row items-stretch gap-3">
      <div className="md:w-1/2 aspect-video relative rounded-xl bg-background">
        <Image
          fill
          src={authImg}
          alt="Auth Image"
          className="object-cover rounded-xl"
        />
      </div>
      <div className="md:w-1/2 bg-background rounded-xl py-8 md:py-12 px-8 md:px-10 flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-center">
          Register Your Account
        </h2>

        <RegisterForm />

        <div className="text-sm text-center flex gap-2 items-center">
          <span>Already have an account?</span>
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
export default RegisterPage
