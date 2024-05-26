import Header from "@/components/shared/header"
import { PropsWithChildren } from "react"

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="bg-background space-y-10">{children}</main>
    </>
  )
}
export default RootLayout
