"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { forgetPasswordFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { EnvelopeOpenIcon } from "@radix-ui/react-icons"
import { axiosInstance } from "@/lib/axios"

const ForgetPasswordForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isMailSend, setIsMailSend] = useState(false)
  const form = useForm<z.infer<typeof forgetPasswordFormSchema>>({
    resolver: zodResolver(forgetPasswordFormSchema),
    defaultValues: {
      identifer: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof forgetPasswordFormSchema>) => {
    setIsLoading(true)
    const toastid = toast.loading("Resetig password...")
    try {
      const res = await axiosInstance.post("/auth/forget-password", values)
      toast.success(res?.message || "Password reset link sent successfully", {
        id: toastid,
      })
      setIsMailSend(true)
    } catch (error: any) {
      console.log(error)
      toast.error(error?.message || "Unable to reset password", { id: toastid })
    } finally {
      setIsLoading(false)
    }
  }

  if (isMailSend) {
    return (
      <div className="w-full max-w-sm mx-auto flex flex-col gap-6">
        <div className="size-14 mx-auto rounded-full flex items-center justify-center bg-primary/80 ">
          <EnvelopeOpenIcon className="size-8 text-white" />
        </div>
        <p className="text-sm text-center text-gray-500">
          Please check your email to reset your password.
        </p>
      </div>
    )
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="w-full max-w-sm mx-auto flex flex-col gap-3"
      >
        <FormInput
          form={form}
          placeholder="Username or Email"
          name="identifer"
          disabled={isLoading}
        />
        <Button
          className="mt-2"
          variant={"default"}
          type="submit"
          disabled={isLoading || !form.formState.isDirty}
        >
          Reset Password
        </Button>
      </form>
    </Form>
  )
}
export default ForgetPasswordForm
