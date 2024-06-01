import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { getCurrentUser } from "@/services/user.service"
import UserProfile from "./_components/user-profile"
import ProfileSubsection from "./_components/profile-subsection"
import { Metadata } from "next"
import { notFound } from "next/navigation"

export const generateMetadata = async (): Promise<Metadata> => {
  const currentUser = await getCurrentUser()

  return {
    title: `${currentUser?.name} profile | Trip Squad`,
    description: `View the profile of ${currentUser?.name} on Trip Squad. Explore trip details, travel history, and connect with ${currentUser?.name}.`,
  }
}

const Profile = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) {
    return notFound()
  }

  return (
    <div className="flex flex-col h-full p-3 gap-3">
      <DashboardHeader pageTitle="Profile" />
      <div className="grow @container/profile-aside space-y-3">
        <UserProfile currentUser={currentUser} />
        {currentUser.role === "User" && <ProfileSubsection />}
      </div>
    </div>
  )
}
export default Profile
