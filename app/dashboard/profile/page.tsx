import DashboardHeader from "@/components/shared/dashboard-header"
import { ScrollArea } from "@/components/ui/scroll-area"
import { getCurrentUser } from "@/services/user.service"
import Image from "next/image"
import { format } from "date-fns"
import avatar from "@/assets/img/avatar.jpeg"
import { Separator } from "@/components/ui/separator"

const Profile = async () => {
  const currentUser = await getCurrentUser()

  if (!currentUser) return null

  return (
    <div className="flex flex-col h-full">
      <DashboardHeader pageTitle="Profile" />
      <ScrollArea className="grow bg-secondary rounded-tl-lg p-2 md:p-4">
        <div className="space-y-4 mx-auto max-w-2xl p-4 bg-background rounded-md">
          <div className="flex flex-col items-center justify-center gap-3">
            <div className="size-24 rounded-2xl relative">
              <Image
                src={currentUser.profilePhoto || avatar}
                alt={currentUser.name}
                fill
                className="rounded-xl object-cover"
              />
            </div>
            <div className="text-center">
              <h1 className="font-semibold">{currentUser.name}</h1>
              <p className="text-sm from-muted-foreground">
                {currentUser.username}
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <h3 className="font-bold">Personal Information</h3>
            <Separator />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
              <div>
                <p className="text-sm text-muted-foreground">Name</p>
                <p className="text-foreground">{currentUser.name}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Email</p>
                <p className="text-foreground">{currentUser.email}</p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Mobile Number</p>
                <p className="text-foreground">
                  {currentUser.mobile || "null"}
                </p>
              </div>
              <div>
                <p className="text-sm text-muted-foreground">Date of Birth</p>
                <p className="text-foreground">
                  {currentUser.dateOfBirth
                    ? format(new Date(currentUser.dateOfBirth), "yyyy-MM-dd")
                    : "null"}
                </p>
              </div>
              <div className="sm:col-span-2">
                <p className="text-sm text-muted-foreground">Bio</p>
                <p className="text-foreground">{currentUser.bio || "null"}</p>
              </div>
            </div>
          </div>
        </div>
      </ScrollArea>
    </div>
  )
}
export default Profile
