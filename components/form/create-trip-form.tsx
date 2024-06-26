"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { createTripFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"
import FormMultiImageUploader from "@/components/form-ui/form-multi-img-uploader"
import FormDatePicker from "@/components/form-ui/form-date-picker"
import FormTextArea from "@/components/form-ui/form-textarea"
import { travelTripTypes } from "@/constant"
import FormSelect from "@/components/form-ui/form-select"
import FormEditor from "../form-ui/form-editor"

const CreateTripForm = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof createTripFormSchema>>({
    resolver: zodResolver(createTripFormSchema),
  })

  const onSubmit = async (values: z.infer<typeof createTripFormSchema>) => {
    setIsLoading(true)
    const toastid = toast.loading("Creating trip...")

    const { images, ...data } = values

    const formData = new FormData()
    formData.append("data", JSON.stringify(data))
    Array.from(images).forEach(image => formData.append("images", image))

    try {
      const res = await axiosInstance.post("/trips", formData)
      toast.success(res?.data?.message || "Trip created successfully!", {
        id: toastid,
      })
      router.push("/dashboard/my-trips")
      router.refresh()
    } catch (error: any) {
      toast.error(error.message || "Unable to create trip", { id: toastid })
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
        <div className="grid grid-cols-2 gap-3">
          <FormMultiImageUploader
            form={form}
            name="images"
            label="Trip Images"
            className="col-span-2"
            disabled={isLoading}
          />
          <FormInput
            form={form}
            placeholder="Destination"
            label="Destination"
            name="destination"
            disabled={isLoading}
          />
          <FormInput
            form={form}
            placeholder="Budget"
            label="Budget"
            name="budget"
            type="number"
            disabled={isLoading}
          />
          <FormDatePicker
            form={form}
            placeholder="Start Date"
            label="Start Date"
            name="startDate"
            range="future"
            disabled={isLoading}
          />
          <FormDatePicker
            form={form}
            placeholder="End Date"
            label="End Date"
            name="endDate"
            range="future"
            startDate={
              form.watch("startDate") &&
              form.watch("startDate").toLocaleString()
            }
            disabled={isLoading}
          />
          <FormInput
            form={form}
            placeholder="Location"
            label="Location"
            name="location"
            disabled={isLoading}
          />
          <FormSelect
            form={form}
            placeholder="Select Trip Type"
            label="Trip Type"
            name="tripType"
            data={travelTripTypes}
            disabled={isLoading}
          />
          <FormTextArea
            form={form}
            placeholder="Write trip itinerary..."
            label="Trip Itinerary"
            name="itinerary"
            className="col-span-2"
            disabled={isLoading}
          />
          <FormEditor
            form={form}
            label="Trip Description"
            name="description"
            className="col-span-2"
          />
        </div>
        <Button
          className="mt-2"
          variant={"default"}
          type="submit"
          disabled={isLoading}
        >
          Create Trip
        </Button>
      </form>
    </Form>
  )
}
export default CreateTripForm
