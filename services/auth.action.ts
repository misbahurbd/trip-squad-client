import { z } from "zod"
import { axiosInstance } from "@/lib/axios"
import { registerFormSchema } from "@/validations"
import { setRefreshToken, setSessionCookie } from "./auth.service"

export const loginUser = async (credentials: {
  username: string
  password: string
}) => {
  const { username, password } = credentials
  const res = await axiosInstance.post("/auth/login", {
    username: username,
    password: password,
  })

  // await setRefreshToken(res?.data?.refreshToken)
  await setSessionCookie(res?.data?.accessToken)

  return res
}

export const registerUser = async (
  userData: z.infer<typeof registerFormSchema>
) => {
  const res = await axiosInstance.post("/auth/register", userData)
  return res
}

export const refreshToken = async () => {
  console.log("[START NEW]")

  const res = await axiosInstance({
    url: "/auth/refresh-token",
    method: "POST",
    withCredentials: true,
  })

  console.log({ res }, "[START]")
  await setRefreshToken(res?.data?.refreshToken)
  await setSessionCookie(res?.data?.accessToken)

  console.log({ res }, "[END]")
  return res
}
