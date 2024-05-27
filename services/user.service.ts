import { axiosInstance } from "@/lib/axios"
import { getSession } from "./auth.service"
import { CurrentUser } from "@/interface"

export const getCurrentUser = async (): Promise<CurrentUser | null> => {
  try {
    const session = await getSession()
    if (!session) return null

    const user = await axiosInstance.get("/users/current-user")
    return user?.data
  } catch (err) {
    return null
  }
}
