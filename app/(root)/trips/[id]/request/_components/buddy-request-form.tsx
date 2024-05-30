"use client"

import { Country, ICountry } from "country-state-city"

import { CurrentUser } from "@/interface"
import { tripRequestFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Checkbox } from "@/components/ui/checkbox"
import { Button } from "@/components/ui/button"
import Link from "next/link"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import FormSelect from "@/components/form-ui/form-select"
import { useRouter } from "next/navigation"

const BuddyRequestForm = ({
  user,
  tripId,
}: {
  user: CurrentUser
  tripId: string
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const countries = Country.getAllCountries() as ICountry[]
  const form = useForm<z.infer<typeof tripRequestFormSchema>>({
    resolver: zodResolver(tripRequestFormSchema),
    defaultValues: {
      name: user.name || "",
      email: user.email || "",
      mobile: user.mobile || "",
      address: "",
      city: "",
      country: "",
    },
  })

  const onSubmit = async (values: z.infer<typeof tripRequestFormSchema>) => {
    setIsLoading(true)
    const toastId = toast.loading("Sending trip buddy request...")
    try {
      const { termsAndConditions, ...buddyData } = values
      const res = await axiosInstance.post(
        `/trip-buddies/request/${tripId}`,
        buddyData
      )
      toast.success(res?.message || "Trip buddy request sent successfully!", {
        id: toastId,
      })
      router.refresh()
      router.push("/trips")
    } catch (error: any) {
      toast.error(error.message || "Unable to send trip buddy request", {
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
        className="grid grid-cols-2 gap-3"
      >
        <FormInput
          form={form}
          name="name"
          label="Full Name"
          placeholder="Full name"
          className="col-span-2"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="mobile"
          label="Contact Number"
          placeholder="Mobile number"
          className="col-span-2 sm:col-span-1"
          type="tel"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="email"
          label="Contact Email"
          placeholder="Email address"
          className="col-span-2 sm:col-span-1"
          type="email"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="address"
          label="State Address"
          className="col-span-2"
          placeholder="State address"
          disabled={isLoading}
        />
        <FormInput
          form={form}
          name="city"
          label="City"
          placeholder="City"
          className="col-span-2 sm:col-span-1"
          disabled={isLoading}
        />
        <FormSelect
          form={form}
          name="country"
          label="Country"
          data={countries.map(country => ({
            label: country.name,
            value: country.name,
          }))}
          placeholder="Country"
          className="col-span-2 sm:col-span-1"
          disabled={isLoading}
        />
        <FormField
          control={form.control}
          name="termsAndConditions"
          render={({ field }) => (
            <FormItem className="col-span-2">
              <div className="flex gap-2 items-center">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="leading-none">
                  <FormLabel>
                    I agree to the{" "}
                    <Link
                      href="/terms-and-conditions"
                      target="_blank"
                      className="hover:text-primary"
                    >
                      terms and conditions
                    </Link>
                  </FormLabel>
                </div>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <div className="col-span-2 mt-6">
          <Button
            disabled={isLoading}
            type="submit"
          >
            Send Request
          </Button>
        </div>
      </form>
    </Form>
  )
}
export default BuddyRequestForm
