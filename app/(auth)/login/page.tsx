import Image from "next/image"
import authImg from "@/assets/img/auth-img-01.jpg"
import Link from "next/link"
import LoginForm from "@/components/form/login-form"

const LoginPage = () => {
  return (
    <div className="max-w-3xl w-full mx-auto flex flex-col md:flex-row items-stretch gap-3">
      <div className="aspect-video md:w-1/2 relative rounded-xl">
        <Image
          fill
          src={authImg}
          alt="Auth Image"
          className="object-cover rounded-xl"
        />
      </div>
      <div className="md:w-1/2 bg-background rounded-xl py-8 md:py-12 px-8 md:px-10 flex flex-col items-center gap-8">
        <h2 className="text-2xl font-bold text-center">Login Your Account</h2>
        <LoginForm />

        <div className="text-sm text-center flex gap-2 items-center">
          <span>Don&apos;t have an account?</span>
          <Link
            href={"/register"}
            className="underline hover:text-primary"
          >
            Register
          </Link>
        </div>
      </div>
    </div>
  )
}
export default LoginPage
