import Link from "next/link"
import AuthActions from "@/components/shared/auth-action"
import UserBox from "@/components/shared/user-box"
import { getCurrentUser } from "@/services/user.service"
import Navbar from "./navbar"

const Header = async () => {
  const currentUser = await getCurrentUser()

  return (
    <header className="flex items-center h-16 bg-background/80 fixed left-0 right-0 top-0 z-50 backdrop-blur-sm border-b">
      <nav className="container flex items-center">
        <div className="flex-1">
          <Link
            href="/"
            className="font-bold text-xl"
          >
            Trip Squad
          </Link>
        </div>
        <div>
          <Navbar />
        </div>
        <div className="flex-1 flex justify-end">
          {currentUser ? <UserBox user={currentUser} /> : <AuthActions />}
        </div>
      </nav>
    </header>
  )
}
export default Header
