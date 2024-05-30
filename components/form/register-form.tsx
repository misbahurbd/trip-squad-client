"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { registerFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { registerUser } from "@/services/auth.action"
import { useRouter } from "next/navigation"

const RegisterForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof registerFormSchema>>({
    resolver: zodResolver(registerFormSchema),
    defaultValues: {
      name: "",
      username: "",
      email: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof registerFormSchema>) => {
    setIsLoading(true)
    const toastid = toast.loading("Createing account...")
    try {
      await registerUser(values)
      toast.success("Registation successful!", { id: toastid })
      router.push("/login")
    } catch (error: any) {
      toast.error(error?.message || "Unable to create account", { id: toastid })
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
          placeholder="Name"
          name="name"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          placeholder="Username"
          name="username"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          placeholder="Email"
          type="email"
          name="email"
          disabled={isLoading}
        />
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
          disabled={isLoading || !form.formState.isDirty}
        >
          Register
        </Button>
      </form>
    </Form>
  )
}
export default RegisterForm
