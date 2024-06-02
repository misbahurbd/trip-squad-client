"use client"

import FormImageUploader from "@/components/form-ui/form-img-uploader"
import { Form } from "@/components/ui/form"
import { createUserFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import avatar from "@/assets/img/avatar.jpeg"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { useState } from "react"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import FormSelect from "@/components/form-ui/form-select"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"

const CreateUserForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [fileSelected, setFileSelected] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof createUserFormSchema>>({
    resolver: zodResolver(createUserFormSchema),
  })

  const onSubmit = async (values: z.infer<typeof createUserFormSchema>) => {
    if (!values.profilePhoto) {
      form.setError("profilePhoto", { message: "Select profile photo" })
      return null
    }
    setIsLoading(true)
    const toastId = toast.loading("Create new user...")
    try {
      const { profilePhoto, ...data } = values
      const formData = new FormData()
      formData.append("photo", profilePhoto)
      formData.append("data", JSON.stringify(data))

      const res = await axiosInstance.post("/users/create-user", formData)
      setFileSelected(false)
      toast.success(res?.message || "User created successfully!", {
        id: toastId,
      })
      router.replace("/dashboard/users")
    } catch (error: any) {
      toast.error(error?.message || "Unable to create new user", {
        id: toastId,
      })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="grid grid-cols-1 md:grid-cols-2 gap-3"
      >
        <div className="space-y-1 md:col-span-2 flex flex-col items-start">
          <h2 className="text-sm font-semibold">Profile Photo</h2>
          <FormImageUploader
            form={form}
            name="profilePhoto"
            label="Profile Photo"
            setSelected={setFileSelected}
            disabled={isLoading}
          />
        </div>
        <FormInput
          label="Full Name"
          name="name"
          placeholder="Full Name"
          form={form}
          disabled={isLoading}
        />
        <FormInput
          label="Username"
          name="username"
          placeholder="Username"
          form={form}
          disabled={isLoading}
        />
        <FormInput
          label="Email Address"
          name="email"
          placeholder="Email Address"
          type="email"
          form={form}
          disabled={isLoading}
        />
        <FormSelect
          form={form}
          name="role"
          label="Role"
          data={[
            { label: "User", value: "User" },
            { label: "Admin", value: "Admin" },
          ]}
          placeholder="Select user role"
          disabled={isLoading}
        />
        <FormInput
          label="Password"
          name="password"
          placeholder="Password"
          type="password"
          form={form}
          disabled={isLoading}
        />
        <FormInput
          label="Confirm Password"
          name="confirmPassword"
          placeholder="Confirm Password"
          type="password"
          form={form}
          disabled={isLoading}
        />
        <div className="md:col-span-2">
          <Button
            type="submit"
            disabled={isLoading || !form.formState.isDirty || !fileSelected}
          >
            Create User
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default CreateUserForm
