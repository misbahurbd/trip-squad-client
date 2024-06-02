"use client"

import { useState } from "react"
import Link from "next/link"
import { useForm } from "react-hook-form"
import { z } from "zod"

import { loginFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { loginUser } from "@/services/auth.action"
import { useRouter, useSearchParams } from "next/navigation"

const LoginForm = () => {
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof loginFormSchema>>({
    resolver: zodResolver(loginFormSchema),
    defaultValues: {
      username: "",
      password: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof loginFormSchema>) => {
    setIsLoading(true)
    const toaster = toast.loading("Login account...", { id: "login" })
    try {
      const next = searchParams.get("next")
      const res = await loginUser(values)
      console.log({ res })
      toast.success("Login successfully", { id: toaster })
      router.replace(next ? next : "/dashboard")
    } catch (error: any) {
      toast.error(error?.message || "Something went wrong", { id: toaster })
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
          placeholder="Email or Username"
          name="username"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          placeholder="Password"
          name="password"
          type="password"
          disabled={isLoading}
        />
        <div className="flex justify-end">
          <Link
            className="text-xs text-end hover:text-primary hover:underline"
            href="/forget-password"
          >
            Forget password
          </Link>
        </div>
        <Button
          className="mt-2"
          variant={"default"}
          disabled={isLoading || !form.formState.isDirty}
        >
          Login
        </Button>
      </form>
    </Form>
  )
}
export default LoginForm
