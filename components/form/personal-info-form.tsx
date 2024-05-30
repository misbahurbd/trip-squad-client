"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { personalInfoFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CurrentUser } from "@/interface"
import FormTextArea from "@/components/form-ui/form-textarea"
import FormDatePicker from "@/components/form-ui/form-date-picker"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"

const PersonalInfoForm = ({ currentUser }: { currentUser: CurrentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof personalInfoFormSchema>>({
    resolver: zodResolver(personalInfoFormSchema),
    defaultValues: {
      name: currentUser.name || "",
      username: currentUser.username || "",
      mobile: currentUser.mobile || "",
      dateOfBirth: currentUser.dateOfBirth && new Date(currentUser.dateOfBirth),
      bio: currentUser.bio || "",
    },
  })

  const onSubmit = async (values: z.infer<typeof personalInfoFormSchema>) => {
    setIsLoading(true)
    const toastid = toast.loading("Updating profile...")
    try {
      const res = await axiosInstance.put("/profiles", values)
      router.refresh()
      toast.success(res.data.message || "Profile update successfully!", {
        id: toastid,
      })
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
        <div className="grid sm:grid-cols-2 gap-3">
          <FormInput
            form={form}
            placeholder="Name"
            label="Name"
            name="name"
            disabled={isLoading}
          />
          <FormInput
            form={form}
            placeholder="Username"
            label="Username"
            name="username"
            disabled={isLoading}
          />
          <FormInput
            form={form}
            placeholder="Mobile"
            label="Mobile"
            name="mobile"
            type="tel"
            disabled={isLoading}
          />
          <FormDatePicker
            form={form}
            placeholder="Date of Birth"
            label="Date of Birth"
            name="dateOfBirth"
            range="past"
            disabled={isLoading}
          />
          <FormTextArea
            form={form}
            className="sm:col-span-2"
            label="Bio"
            placeholder="Bio"
            name="bio"
            disabled={isLoading}
          />
        </div>
        <Button
          className="mt-2 ml-auto"
          variant={"default"}
          type="submit"
          disabled={isLoading || !form.formState.isDirty}
        >
          Save
        </Button>
      </form>
    </Form>
  )
}
export default PersonalInfoForm
