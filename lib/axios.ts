import { getAccessToken } from "@/services/auth.service"
import axios from "axios"

export const axiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_HOST,
  withCredentials: true,
  headers: {
    ContentType: "application/json",
  },
})

axiosInstance.interceptors.request.use(
  async function (config) {
    const accessToken = await getAccessToken()
    if (accessToken) {
      config.headers["Authorization"] = accessToken
    }
    return config
  },
  function (error) {
    return Promise.reject(error?.response?.data)
  }
)

axiosInstance.interceptors.response.use(
  function (response) {
    const responseObj = {
      data: response?.data?.data,
      meta: response?.data?.meta,
      message: response?.data?.message,
    }
    return { ...response, ...responseObj }
  },
  function (error) {
    return Promise.reject(error?.response?.data)
  }
)
