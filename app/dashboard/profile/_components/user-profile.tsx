"use client"

import Image from "next/image"
import { format } from "date-fns"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { LuFileEdit } from "react-icons/lu"
import { CurrentUser } from "@/interface"
import { useState } from "react"
import FormInput from "@/components/form-ui/form-input"
import { Form } from "@/components/ui/form"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { personalInfoFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import FormDatePicker from "@/components/form-ui/form-date-picker"
import FormTextArea from "@/components/form-ui/form-textarea"
import { axiosInstance } from "@/lib/axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import avatar from "@/assets/img/avatar.jpeg"
import profileCover from "@/assets/img/profile-cover.jpeg"
import { Country, ICountry } from "country-state-city"
import FormSelect from "@/components/form-ui/form-select"

const UserProfile = ({ currentUser }: { currentUser: CurrentUser }) => {
  const [isEditing, setIsEditing] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const countries = Country.getAllCountries() as ICountry[]
  const router = useRouter()

  const personalInfoForm = useForm<z.infer<typeof personalInfoFormSchema>>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      name: currentUser.name || "",
      username: currentUser.username || "",
      email: currentUser.email || "",
      mobile: currentUser.mobile || "",
      dateOfBirth: currentUser.dateOfBirth
        ? new Date(currentUser.dateOfBirth)
        : undefined,
      bio: currentUser.bio || "",
    },
  })

  const onPersonalInfoSubmit = async (
    values: z.infer<typeof personalInfoFormSchema>
  ) => {
    setIsLoading(true)
    const toastid = toast.loading("Updating profile...")
    try {
      const res = await axiosInstance.put("/profiles", values)
      toast.success(res.data.message || "Profile update successfully!", {
        id: toastid,
      })
      router.refresh()
      setIsEditing(false)
    } catch (error: any) {
      toast.error(error.message || "Unable to update", { id: toastid })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="space-y-3 p-3 bg-background rounded-md">
      <div className="flex flex-col">
        <div className="relative h-60">
          <Image
            src={profileCover}
            alt={currentUser.name}
            fill
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col sm:flex-row gap-3 items-center px-3">
          <div className="size-32 rounded-lg relative -mt-16">
            <Image
              src={currentUser.profilePhoto || avatar}
              alt={currentUser.name}
              fill
              className="rounded-lg object-cover"
            />
          </div>
          <div className="text-center sm:text-start">
            <h1 className="font-semibold text-foreground">
              {currentUser.name}
            </h1>
            <p className="text-sm text-muted-foreground">
              @{currentUser.username}
            </p>
          </div>
          {isEditing ? (
            <div className="sm:ml-auto flex items-center gap-2">
              <Button
                type="button"
                variant="outline"
                onClick={() => setIsEditing(false)}
              >
                Cancel
              </Button>
              <Button
                type="submit"
                form="personal-info-form"
                className="flex items-center"
                disabled={isLoading || !personalInfoForm.formState.isDirty}
              >
                Save
              </Button>
            </div>
          ) : (
            <Button
              variant="secondary"
              className="flex items-center sm:ml-auto"
              onClick={() => setIsEditing(true)}
            >
              <LuFileEdit className="mr-2" />
              <span>Edit Profile</span>
            </Button>
          )}
        </div>
      </div>

      <Form {...personalInfoForm}>
        <form
          id="personal-info-form"
          onSubmit={personalInfoForm.handleSubmit(onPersonalInfoSubmit)}
          className="space-y-3"
        >
          <h3 className="font-bold text-foreground">Personal Information</h3>
          <Separator />
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="space-y-1 sm:col-span-2">
              <p className="text-sm text-muted-foreground">Name</p>
              {isEditing ? (
                <FormInput
                  form={personalInfoForm}
                  name="name"
                  disabled={isLoading}
                  placeholder="Name"
                />
              ) : (
                <p className="text-foreground">{currentUser.name}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Username</p>
              {isEditing ? (
                <FormInput
                  form={personalInfoForm}
                  name="username"
                  disabled={isLoading}
                  placeholder="Username"
                />
              ) : (
                <p className="text-foreground">@{currentUser.username}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Email</p>
              {isEditing ? (
                <FormInput
                  form={personalInfoForm}
                  name="email"
                  disabled={isLoading}
                  placeholder="Email Address"
                />
              ) : (
                <p className="text-foreground">{currentUser.email}</p>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Mobile Number</p>
              {isEditing ? (
                <FormInput
                  form={personalInfoForm}
                  name="mobile"
                  disabled={isLoading}
                  type="number"
                  placeholder="Mobile Number"
                />
              ) : (
                <p className="text-foreground">{currentUser.mobile || "n/a"}</p>
              )}
            </div>
            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Date of Birth</p>
              {isEditing ? (
                <FormDatePicker
                  form={personalInfoForm}
                  name="dateOfBirth"
                  placeholder="Select date"
                  disabled={isLoading}
                />
              ) : (
                <p className="text-foreground">
                  {currentUser.dateOfBirth
                    ? format(new Date(currentUser.dateOfBirth), "d MMM, yyyy")
                    : "n/a"}
                </p>
              )}
            </div>

            <div className="space-y-1 sm:col-span-2">
              <p className="text-sm text-muted-foreground">State Address</p>
              {isEditing ? (
                <FormInput
                  form={personalInfoForm}
                  name="address"
                  disabled={isLoading}
                  placeholder="State address"
                />
              ) : (
                <p className="text-foreground">
                  {currentUser.address || "n/a"}
                </p>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">City</p>
              {isEditing ? (
                <FormInput
                  form={personalInfoForm}
                  name="city"
                  disabled={isLoading}
                  placeholder="City"
                />
              ) : (
                <p className="text-foreground">{currentUser.city || "n/a"}</p>
              )}
            </div>

            <div className="space-y-1">
              <p className="text-sm text-muted-foreground">Country</p>
              {isEditing ? (
                <FormSelect
                  form={personalInfoForm}
                  name="country"
                  data={countries.map(country => ({
                    label: country.name,
                    value: country.name,
                  }))}
                  placeholder="Country"
                  disabled={isLoading}
                />
              ) : (
                <p className="text-foreground">
                  {currentUser.country || "n/a"}
                </p>
              )}
            </div>
            <div className="sm:col-span-2 space-y-1">
              <p className="text-sm text-muted-foreground">Bio</p>
              {isEditing ? (
                <FormTextArea
                  form={personalInfoForm}
                  name="bio"
                  placeholder="Write about yourself"
                  disabled={isLoading}
                />
              ) : (
                <p className="text-foreground">{currentUser.bio || "n/a"}</p>
              )}
            </div>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default UserProfile
