import type { Metadata } from "next"
import NotFoundComponent from "@/components/shared/not-found-component"

export const metadata: Metadata = {
  title: "Page Not Found | Trip Squad",
  description:
    "Sorry, the page you are looking for does not exist. Return to the homepage or explore other sections of Trip Squad.",
}

const NotFound = () => {
  return (
    <div className="h-screen flex items-center justify-center p-12">
      <NotFoundComponent />
    </div>
  )
}

export default NotFound
