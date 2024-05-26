"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { CurrentUser } from "@/interface"
import { changePasswordFormSchema } from "@/validations"
import { axiosInstance } from "@/lib/axios"

const ChangePasswordForm = ({ currentUser }: { currentUser: CurrentUser }) => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof changePasswordFormSchema>>({
    resolver: zodResolver(changePasswordFormSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof changePasswordFormSchema>) => {
    setIsLoading(true)
    const toastid = toast.loading("Updating password...")
    try {
      const res = await axiosInstance.put("/auth/change-password", {
        oldPassword: values.oldPassword,
        newPassword: values.newPassword,
      })

      toast.success(res?.data?.message || "Password update successfully!", {
        id: toastid,
      })
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || "Unable to update password", { id: toastid })
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
        <FormInput
          form={form}
          placeholder="Current Password"
          label="Current Password"
          name="oldPassword"
          type="password"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          placeholder="New Password"
          label="New Password"
          name="newPassword"
          type="password"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          placeholder="Confirm Password"
          label="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={isLoading}
        />
        <Button
          className="mt-2 ml-auto"
          variant={"default"}
          type="submit"
          disabled={isLoading || !form.formState.isDirty}
        >
          Change
        </Button>
      </form>
    </Form>
  )
}
export default ChangePasswordForm
