import Footer from "@/components/shared/footer"
import Header from "@/components/shared/header"
import { PropsWithChildren, Suspense } from "react"
import Loading from "@/app/(root)/loading"

const RootLayout = ({ children }: PropsWithChildren) => {
  return (
    <>
      <Header />
      <Suspense fallback={<Loading />}>
        <main className="pb-12 flex-1 pt-[4.5rem] md:pt-16">{children}</main>
      </Suspense>
      <Footer />
    </>
  )
}
export default RootLayout
