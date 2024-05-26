import ChangePasswordForm from "@/components/form/change-password-form"
import PersonalInfoForm from "@/components/form/personal-info-form"
import ProfilePhotoUploadForm from "@/components/form/profile-photo-upload-form"
import DeshboardHeader from "@/components/shared/deshboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { Separator } from "@/components/ui/separator"
import { getCurrentUser } from "@/services/user.service"

const Profile = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full">
      <DeshboardHeader pageTitle="Settings" />
      <ScrollArea className="grow bg-secondary rounded-tl-lg">
        <div className="max-w-2xl mx-auto space-y-4 p-4">
          <div className="space-y-2 p-5 rounded-md bg-background">
            <h3 className="font-bold">Profile Photo</h3>
            <Separator />
            <ProfilePhotoUploadForm currentUser={currentUser} />
          </div>
          <div className="space-y-2 p-5 rounded-md bg-background">
            <h3 className="font-bold">Personal Information</h3>
            <Separator />
            <PersonalInfoForm currentUser={currentUser} />
          </div>
          <div className="space-y-2 p-5 rounded-md bg-background">
            <h3 className="font-bold">Change Password</h3>
            <Separator />
            <ChangePasswordForm currentUser={currentUser} />
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
export default Profile
