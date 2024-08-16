"use client"

import Lottie from "lottie-react"
import animation from "@/assets/lottie/loding.json"

const LottieLoading = () => {
  return (
    <Lottie
      animationData={animation}
      loop
      className="w-32 sm:w-36 md:w-40 lg:w-52"
    />
  )
}
export default LottieLoading
