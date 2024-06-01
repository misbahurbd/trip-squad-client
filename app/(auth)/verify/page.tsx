import { Metadata } from "next"
import HandleVerifyRequest from "./_components/handle-request"
import { notFound } from "next/navigation"

export const metadata: Metadata = {
  title: "Verify Account | Trip Squad",
  description:
    "Verify your account on Trip Squad. Follow the instructions to activate your account and continue your travel journey with ease.",
}

const VerifyAccount = async ({
  searchParams,
}: {
  searchParams: { token: string }
}) => {
  const token = searchParams.token
  if (!token) notFound()

  return <HandleVerifyRequest token={searchParams.token} />
}
export default VerifyAccount
