"use client"

import SectionHeader from "@/components/shared/section-header"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { axiosInstance } from "@/lib/axios"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { toast } from "sonner"
import { z } from "zod"

const newsleterSchema = z.object({
  email: z.string().min(1, "Email is requred").email("Invalid email address"),
})

const CtaSection = () => {
  const [isLoading, setIsLoading] = useState(false)
  const form = useForm<z.infer<typeof newsleterSchema>>({
    resolver: zodResolver(newsleterSchema),
    defaultValues: {
      email: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof newsleterSchema>) => {
    setIsLoading(true)
    const toaster = toast.loading("Submiting your email...", { id: "login" })
    try {
      const res = await axiosInstance.post(`/subscribe`, values)
      toast.success(res?.data?.message || "Email subscribe successfully!", {
        id: toaster,
      })
      form.reset()
    } catch (error: any) {
      toast.error(error.message || "Unable to subscribe!", { id: toaster })
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <section className="bg-primary px-8 py-20 rounded-xl space-y-8 relative isolate overflow-hidden">
      <span className="absolute w-full h-full inset-0 bg-[url(/img/newsleter-section.jpg)] bg-cover bg-center -z-10 opacity-10" />
      <SectionHeader
        className="max-w-xl"
        title="Join Our Travel Community"
        subTitle="Connect with like-minded travelers, share experiences, and make new friends. Become a part of our growing global network!"
        mode="dark"
      />
      <div className="max-w-md mx-auto">
        <form onSubmit={form.handleSubmit(onSubmit)}>
          <Form {...form}>
            <div className="flex items-center">
              <FormField
                control={form.control}
                name="email"
                render={({ field }) => (
                  <FormItem className="flex-1">
                    <FormControl>
                      <Input
                        className="h-9 px-3 bg-secondary/90 rounded-r-none"
                        type="email"
                        placeholder="Enter your email address"
                        disabled={isLoading}
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <Button
                variant="secondary"
                className="rounded-l-none"
                disabled={isLoading}
              >
                Subscribe
              </Button>
            </div>
          </Form>
        </form>
      </div>
    </section>
  )
}
export default CtaSection
