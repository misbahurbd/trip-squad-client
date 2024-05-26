import Header from "@/components/shared/header"
import { PropsWithChildren } from "react"

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main>{children}</main>
    </>
  )
}
export default RootLayout
