import { axiosInstance } from "@/lib/axios"
import { registerFormSchema } from "@/validations"
import { z } from "zod"

export const loginUser = async (credentials: {
  username: string
  password: string
}) => {
  const { username, password } = credentials
  const res = await axiosInstance.post("/auth/login", {
    username: username,
    password: password,
  })
  return res
}

export const registerUser = async (
  userData: z.infer<typeof registerFormSchema>
) => {
  const res = await axiosInstance.post("/auth/register", userData)
  return res
}
