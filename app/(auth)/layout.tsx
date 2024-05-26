import Link from "next/link"
import { PropsWithChildren } from "react"

const AuthLayout = ({ children }: PropsWithChildren) => {
  return (
    <div className="min-h-screen space-y-8 container flex justify-center flex-col py-20">
      <Link
        href={"/"}
        className="text-center text-3xl font-bold"
      >
        Trip Squad
      </Link>
      {children}
    </div>
  )
}
export default AuthLayout
