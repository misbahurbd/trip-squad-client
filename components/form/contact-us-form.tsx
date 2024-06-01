"use client"

import { contactUsFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { useState } from "react"
import FormTextArea from "@/components/form-ui/form-textarea"
import { Button } from "@/components/ui/button"

const ContactUsForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof contactUsFormSchema>>({
    resolver: zodResolver(contactUsFormSchema),
    defaultValues: {
      name: "",
      email: "",
      mobile: "",
      subject: "",
      message: "",
    },
  })

  return (
    <Form {...form}>
      <form className="grid sm:grid-cols-2 gap-3">
        <FormInput
          form={form}
          name="name"
          placeholder="Full Name"
          label="Name"
          className="sm:col-span-2"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="email"
          placeholder="Email Address"
          label="Email"
          type="email"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="mobile"
          placeholder="Mobile Number"
          label="Mobile"
          type="tel"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="subject"
          placeholder="Subject"
          label="Subject"
          className="sm:col-span-2"
          disabled={isLoading}
        />
        <FormTextArea
          form={form}
          name="message"
          placeholder="Write details message"
          label="Message"
          className="sm:col-span-2"
          disabled={isLoading}
        />
        <div className="sm:col-span-2">
          <Button
            type="submit"
            disabled={isLoading || !form.formState.isDirty}
          >
            Send
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default ContactUsForm
