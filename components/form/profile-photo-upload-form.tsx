"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { profilePhotoUPloadFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CurrentUser } from "@/interface"
import { axiosInstance } from "@/lib/axios"
import FormImageUploader from "@/components/form-ui/form-img-uploader"
import { useRouter } from "next/navigation"

const ProfilePhotoUploadForm = ({
  currentUser,
}: {
  currentUser: CurrentUser
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const [fileSelected, setFileSelected] = useState(false)
  const form = useForm<z.infer<typeof profilePhotoUPloadFormSchema>>({
    resolver: zodResolver(profilePhotoUPloadFormSchema),
  })

  const onSubmit = async (
    values: z.infer<typeof profilePhotoUPloadFormSchema>
  ) => {
    if (!values.profilePhoto) return null
    setIsLoading(true)
    const toastid = toast.loading("Updating profile...")
    try {
      const formData = new FormData()
      formData.append("profilePhoto", values.profilePhoto)
      const res = await axiosInstance.put("/profiles/profile-photo", formData)
      toast.success(res?.data?.message || "Profile update successfully!", {
        id: toastid,
      })
      setFileSelected(false)
      router.refresh()
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || "Unable to update", { id: toastid })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full flex flex-col gap-3"
      >
        <div className="flex items-center gap-3">
          <FormImageUploader
            form={form}
            currentImage={currentUser.profilePhoto}
            label="Profile Photo"
            name="profilePhoto"
            setSelected={setFileSelected}
            disabled={isLoading}
          />
          <div className="space-y-2">
            <p className="text-xs italic text-muted-foreground">
              Click your current profile picture to upload a new one, then click
              the &quot;Change&quot; button to update it.
            </p>
            <Button
              variant={"default"}
              type="submit"
              disabled={isLoading || !fileSelected}
            >
              Change
            </Button>
          </div>
        </div>
      </form>
    </Form>
  )
}
export default ProfilePhotoUploadForm
