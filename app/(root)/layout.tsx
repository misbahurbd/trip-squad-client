import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"
import { PropsWithChildren } from "react"

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <main className="pb-12 flex-1">{children}</main>
      <Footer />
    </>
  )
}
export default RootLayout
