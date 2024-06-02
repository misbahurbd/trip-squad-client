"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { editTripFormSchema } from "@/validations"
import { zodResolver } from "@hookform/resolvers/zod"

import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import { toast } from "sonner"
import { axiosInstance } from "@/lib/axios"
import { useRouter } from "next/navigation"
import FormDatePicker from "@/components/form-ui/form-date-picker"
import FormTextArea from "@/components/form-ui/form-textarea"
import { travelTripTypes } from "@/constant"
import FormSelect from "@/components/form-ui/form-select"
import { ITrip } from "@/interface"
import Image from "next/image"
import { cn } from "@/lib/utils"
import FormEditor from "../form-ui/form-editor"

const EditTripForm = ({
  tripData,
  path,
}: {
  tripData: ITrip
  path: string
}) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()
  const form = useForm<z.infer<typeof editTripFormSchema>>({
    resolver: zodResolver(editTripFormSchema),
    defaultValues: {
      destination: tripData.destination,
      description: tripData.description,
      startDate: new Date(tripData.startDate),
      endDate: new Date(tripData.endDate),
      tripType: tripData.tripType,
      budget: tripData.budget.toString(),
      location: tripData.location,
      itinerary: tripData.itinerary,
    },
  })

  const onSubmit = async (values: z.infer<typeof editTripFormSchema>) => {
    setIsLoading(true)
    const toastid = toast.loading("Updating trip...")

    try {
      const res = await axiosInstance.put(`/trips/${tripData.id}`, values)
      toast.success(res?.message || "Trip update successfully!", {
        id: toastid,
      })
      router.push(`/dashboard${path}`)
      router.refresh()
    } catch (error: any) {
      toast.error(error?.message || "Unable to update trip", { id: toastid })
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
        <h2 className="text-sm font-medium">Photos</h2>
        {tripData.photos.length > 0 && (
          <div
            className={cn(
              "grid gap-3 w-full aspect-video",
              (tripData.photos.length === 2 || tripData.photos.length >= 4) &&
                "grid-cols-2",
              tripData.photos.length === 3 && "grid-cols-3"
            )}
          >
            {tripData.photos.slice(0, 4).map((img, i) => (
              <div
                key={i}
                className="relative border border-muted-foreground/10 rounded-md overflow-hidden"
              >
                {i === 3 && tripData.photos.length > 4 && (
                  <span className="bg-black/30 absolute z-10 flex items-center justify-center inset-0 font-semibold text-white text-3xl">
                    +{tripData.photos.length - 4}
                  </span>
                )}
                <Image
                  src={img}
                  layout="fill"
                  alt="Uploaded Image"
                  className={cn("object-cover")}
                />
              </div>
            ))}
          </div>
        )}
        <div className="grid grid-cols-2 gap-3">
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
          disabled={isLoading || !form.formState.isDirty}
        >
          Update Trip
        </Button>
      </form>
    </Form>
  )
}
export default EditTripForm
