"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { Form } from "../ui/form"
import { Button } from "../ui/button"
import { useState } from "react"
import FormInput from "../form-ui/form-input"
import FormDatePicker from "../form-ui/form-date-picker"
import {
  HiOutlineCalendarDays,
  HiOutlineMagnifyingGlass,
  HiOutlineMapPin,
} from "react-icons/hi2"
import { Separator } from "../ui/separator"
import { useRouter } from "next/navigation"

const searchFormSchema = z.object({
  searchTerm: z.string().min(1, { message: "Search term is required" }),
  startDate: z.date(),
})

const HeroSearchField = () => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
  })

  const onSubmit = async (value: z.infer<typeof searchFormSchema>) => {
    setIsLoading(true)
    try {
      router.push(
        `/trips?searchTerm=${value.searchTerm}&startDate=${value.startDate}`
      )
    } catch (error) {}
  }

  return (
    <div className="absolute w-1/2 bottom-0 translate-y-1/2 bg-white border z-20 py-2 pl-4 pr-3 rounded-full">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="flex gap-4 items-center"
        >
          <div className="flex items-center gap-2 relative flex-1">
            <span>
              <HiOutlineMapPin className="size-7 text-primary" />
            </span>
            <FormInput
              form={form}
              name={"searchTerm"}
              label="Description"
              labelClassName="text-xs text-muted-foreground cursor-pointer"
              className="!space-y-1 p-0 pb-1"
              fieldClassName="p-0 leading-tight border-none h-auto shadow-none !ring-transparent h-5"
              placeholder="Search your travel destination..."
              disabled={isLoading}
            />
          </div>
          <Separator
            orientation="vertical"
            className="h-8"
          />
          <div className="flex items-center gap-2 relative flex-1 max-w-[280px]">
            <span>
              <HiOutlineCalendarDays className="size-7 text-primary" />
            </span>
            <FormDatePicker
              form={form}
              name={"startDate"}
              label="When"
              placeholder="Choose a date"
              range="future"
              labelClassName="text-xs text-muted-foreground cursor-pointer"
              className="!space-y-1 p-0 pb-1"
              fieldClassName="p-0 border-none h-auto shadow-none !ring-transparent hover:bg-transparent h-5"
              disabled={isLoading}
            />
          </div>
          <Separator
            orientation="vertical"
            className="h-8"
          />
          <Button
            type="submit"
            className="size-12 rounded-full"
            size="icon"
          >
            <HiOutlineMagnifyingGlass className="size-6" />
          </Button>
        </form>
      </Form>
    </div>
  )
}
export default HeroSearchField
