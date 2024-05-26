"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { resetPasswordFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"

const ResetPasswordForm = ({ token }: { token: string }) => {
  const [isLoading, setIsLoading] = useState(false)

  const form = useForm<z.infer<typeof resetPasswordFormSchema>>({
    resolver: zodResolver(resetPasswordFormSchema),
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof resetPasswordFormSchema>) => {
    setIsLoading(true)
    const toastid = toast.loading("Createing account...")
    try {
      const res = await axiosInstance.post(
        `/auth/reset-password/${token}`,
        values
      )
      toast.success(
        res.data.message || "Password reset link sent successfully",
        {
          id: toastid,
        }
      )
    } catch (error: any) {
      console.log(error)
      toast.error(error.message || "Unable to create account", { id: toastid })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto flex flex-col gap-3"
      >
        <FormInput
          form={form}
          placeholder="Password"
          name="password"
          type="password"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          placeholder="Confirm Password"
          name="confirmPassword"
          type="password"
          disabled={isLoading}
        />
        <Button
          className="mt-2"
          variant={"default"}
          type="submit"
          disabled={isLoading}
        >
          Change Password
        </Button>
      </form>
    </Form>
  )
}
export default ResetPasswordForm
