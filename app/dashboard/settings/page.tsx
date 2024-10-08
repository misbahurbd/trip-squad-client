import ChangePasswordForm from "@/components/form/change-password-form"
import PersonalInfoForm from "@/components/form/personal-info-form"
import ProfilePhotoUploadForm from "@/components/form/profile-photo-upload-form"
import DashboardHeader from "@/app/dashboard/_components/dashboard-header"
import { Separator } from "@/components/ui/separator"
import { getCurrentUser } from "@/services/user.service"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Settings | Trip Squad",
  description:
    "Update your profile information, change your password, and upload a profile photo to Trip Squad.",
}

const Profile = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full p-3 gap-3 max-w-2xl mx-auto">
      <DashboardHeader pageTitle="Settings" />
      <div className="grow">
        <div className="space-y-4">
          <div className="space-y-2 p-4 rounded-md bg-background">
            <h3 className="font-bold text-foreground">Profile Photo</h3>
            <Separator />
            <ProfilePhotoUploadForm currentUser={currentUser} />
          </div>
          <div className="space-y-2 p-4 rounded-md bg-background">
            <h3 className="font-bold text-foreground">Personal Information</h3>
            <Separator />
            <PersonalInfoForm currentUser={currentUser} />
          </div>
          <div className="space-y-2 p-4 rounded-md bg-background">
            <h3 className="font-bold text-foreground">Change Password</h3>
            <Separator />
            <ChangePasswordForm />
          </div>
        </div>
      </div>
    </div>
  )
}
export default Profile
