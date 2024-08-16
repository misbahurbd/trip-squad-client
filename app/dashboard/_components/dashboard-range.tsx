"use client"

import FormSelect from "@/components/form-ui/form-select"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"

const RangeFormSchem = z.object({
  range: z.string().min(1, "Range is requried"),
})

const dataRange = [
  {
    label: "Weekly",
    value: "weekly",
  },
  {
    label: "Monthly",
    value: "monthly",
  },
  {
    label: "Yearly",
    value: "yearly",
  },
]

export const DashbaordRange = () => {
  const [isLoading, setIsLoading] = useState(false)
  const searchParams = useSearchParams()
  const range = searchParams.get("range")
  const router = useRouter()
  const pathname = usePathname()

  const form = useForm<z.infer<typeof RangeFormSchem>>({
    defaultValues: {
      range: range || "yearly",
    },
  })

  const onChange = async () => {
    setIsLoading(true)
    try {
      const range = form.watch("range")
      const params = new URLSearchParams(searchParams)
      if (range) {
        params.set("range", range)
        router.replace(`${pathname}?${params.toString()}`)
      } else {
        router.replace(`${pathname}`)
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <form onChangeCapture={form.handleSubmit(onChange)}>
      <Form {...form}>
        <FormField
          control={form.control}
          name={"range"}
          render={({ field }) => (
            <FormItem className={"w-full space-y-0.5"}>
              <Select
                onValueChange={field.onChange}
                defaultValue={field.value}
              >
                <FormControl>
                  <SelectTrigger
                    className="bg-background"
                    disabled={isLoading}
                  >
                    <SelectValue placeholder={"Select range"} />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  {dataRange.map(item => (
                    <SelectItem
                      key={item.value}
                      value={item.value}
                    >
                      {item.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <FormMessage />
            </FormItem>
          )}
        />
      </Form>
    </form>
  )
}
