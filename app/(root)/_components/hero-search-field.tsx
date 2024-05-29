"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import { z } from "zod"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { IoSearchSharp } from "react-icons/io5"

import { HiOutlineCalendarDays, HiOutlineMapPin } from "react-icons/hi2"
import { Separator } from "@/components/ui/separator"
import { useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { Calendar } from "@/components/ui/calendar"
import { FaSearch } from "react-icons/fa"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { ITripType } from "@/interface"
import { PiBackpack } from "react-icons/pi"

const searchFormSchema = z.object({
  searchTerm: z.string().min(1, { message: "Search term is required" }),
  startDate: z.date({ required_error: "Select a date" }),
  tripType: z.string().min(1, { message: "Select trip type" }),
})

const HeroSearchField = ({ tripTypes }: { tripTypes: ITripType[] }) => {
  const [isLoading, setIsLoading] = useState(false)
  const router = useRouter()

  const form = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
  })

  const onSubmit = async (values: z.infer<typeof searchFormSchema>) => {
    setIsLoading(true)
    try {
      router.push(
        `/trips?searchTerm=${values.searchTerm}&startDate=${values.startDate}&tripType=${values.tripType}`
      )
    } catch (error) {
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="bg-white w-full max-w-2xl md:absolute md:bottom-0 md:translate-y-1/2 lg:max-w-3xl shadow-lg z-20 rounded-xl">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="grid grid-cols-2 sm:flex sm:items-center"
        >
          <div className="col-span-2 sm:flex-1 sm:border-none p-2 md:p-3 border-b border-secondary">
            <FormField
              control={form.control}
              name="searchTerm"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center gap-0 sm:gap-1">
                    <span>
                      <HiOutlineMapPin className="size-6 sm:size-7 text-primary" />
                    </span>
                    <div className="w-full">
                      <span className="text-xs text-foreground px-2">
                        Where
                      </span>
                      <FormControl>
                        <Input
                          className="h-6 w-full !ring-transparent !shadow-none px-2 !border-none"
                          placeholder="Destenation..."
                          disabled={isLoading}
                          autoComplete="false"
                          {...field}
                        />
                      </FormControl>
                    </div>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <Separator
            orientation="vertical"
            className="h-8 hidden sm:block"
          />
          <div className="p-2 md:p-3 sm:flex-1 sm:border-none border-r border-secondary">
            <FormField
              control={form.control}
              name="startDate"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center sm:gap-1">
                    <span>
                      <HiOutlineCalendarDays className="size-6 sm:size-7 text-primary" />
                    </span>
                    <div className="w-full">
                      <span className="text-xs text-foreground px-2 block">
                        When
                      </span>
                      <FormControl>
                        <Popover>
                          <PopoverTrigger
                            disabled={isLoading}
                            asChild
                          >
                            <FormControl>
                              <Button
                                variant={"outline"}
                                className={cn(
                                  "w-full px-2 !text-left font-normal h-6 !border-none !ring-transparent !shadow-none hover:!bg-transparent",
                                  !field.value && "text-muted-foreground"
                                )}
                              >
                                {field.value ? (
                                  <span className="w-full text-left">
                                    {format(field.value, "d MMM, yyyy")}
                                  </span>
                                ) : (
                                  <span className="w-full text-left">
                                    Pick a date
                                  </span>
                                )}
                              </Button>
                            </FormControl>
                          </PopoverTrigger>
                          <PopoverContent
                            className="w-auto p-0"
                            align="start"
                          >
                            <Calendar
                              mode="single"
                              selected={field.value}
                              onSelect={field.onChange}
                              disabled={date =>
                                date >
                                  new Date(
                                    new Date().setFullYear(
                                      new Date().getFullYear() + 10
                                    )
                                  ) ||
                                date <=
                                  new Date(
                                    new Date().setDate(new Date().getDate() - 1)
                                  )
                              }
                              initialFocus
                            />
                          </PopoverContent>
                        </Popover>
                      </FormControl>
                    </div>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <Separator
            orientation="vertical"
            className="h-8 hidden sm:block"
          />
          <div className="p-2 md:p-3 sm:flex-1 sm:border-none">
            <FormField
              control={form.control}
              name="tripType"
              render={({ field }) => (
                <FormItem className="flex-1">
                  <FormLabel className="flex items-center sm:gap-1">
                    <span>
                      <PiBackpack className="size-6 sm:size-7 text-primary" />
                    </span>
                    <div className="w-full">
                      <span className="text-xs text-foreground px-2 block">
                        Type
                      </span>
                      <FormControl>
                        <Select
                          onValueChange={field.onChange}
                          defaultValue={field.value}
                          disabled={isLoading}
                        >
                          <FormControl>
                            <SelectTrigger
                              className={cn(
                                "px-2 h-6 w-full appearance-none !border-none !ring-transparent !shadow-none hover:!bg-transparent font-normal",
                                field.value
                                  ? "text-foreground"
                                  : "text-muted-foreground"
                              )}
                            >
                              <SelectValue placeholder="Select a type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {tripTypes?.map(type => (
                              <SelectItem
                                key={type.label}
                                value={type.label}
                              >
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </FormControl>
                    </div>
                  </FormLabel>
                </FormItem>
              )}
            />
          </div>
          <div className="col-span-2 sm:size-14 md:size-16 sm:p-2 md:p-3">
            <Button
              type="submit"
              className="rounded-none rounded-b-xl w-full flex items-center justify-center sm:rounded-lg sm:size-10 sm:p-0 sm:shrink-0 sm:block"
              size={"lg"}
              disabled={isLoading}
            >
              <div className="flex items-center justify-center mr-3 sm:mr-0 sm:w-full">
                <FaSearch className="size-4 sm:size-5" />
              </div>
              <span className="sm:hidden">Search</span>
            </Button>
          </div>
        </form>
      </Form>
    </div>
  )
}
export default HeroSearchField
