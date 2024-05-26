import Link from "next/link"
import AuthActions from "@/components/shared/auth-action"
import UserBox from "@/components/shared/user-box"
import { getCurrentUser } from "@/services/user.service"

const Header = async () => {
  const currentUser = await getCurrentUser()

  return (
    <header className="flex items-center h-16 bg-background/80 fixed left-0 right-0 top-0 z-50 backdrop-blur-sm border-b">
      <nav className="container flex items-center justify-between">
        <Link
          href="/"
          className="font-bold text-xl"
        >
          Trip Squad
        </Link>
        {currentUser ? <UserBox user={currentUser} /> : <AuthActions />}
      </nav>
    </header>
  )
}
export default Header
