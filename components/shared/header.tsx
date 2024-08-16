import Link from "next/link"
import AuthActions from "@/components/shared/auth-action"
import UserBox from "@/components/shared/user-box"
import { getCurrentUser } from "@/services/user.service"
import Navbar from "./navbar"
import MobileNav from "./mobile-nav"

const Header = async () => {
  const currentUser = await getCurrentUser()

  return (
    <header className="flex items-center h-14 md:h-14 bg-background/80 fixed left-0 right-0 top-0 z-50 backdrop-blur-sm border-b">
      <nav className="container flex items-center gap-1">
        <div className="md:hidden">
          <MobileNav />
        </div>
        <div className="flex-1">
          <Link
            href="/"
            className="font-bold text-lg text-foreground md:text-xl"
          >
            Trip Squad
          </Link>
        </div>
        <div>
          <Navbar />
        </div>
        <div className="flex flex-1 justify-end">
          {currentUser ? <UserBox user={currentUser} /> : <AuthActions />}
        </div>
      </nav>
    </header>
  )
}
export default Header
