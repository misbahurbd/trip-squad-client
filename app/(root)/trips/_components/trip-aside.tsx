"use client"

import { z } from "zod"
import { useEffect, useState } from "react"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ClipLoader as Spinner } from "react-spinners"
import { useDebouncedCallback } from "use-debounce"
import { useForm } from "react-hook-form"
import { cn, formatedDate } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { FiFilter } from "react-icons/fi"

import { ITripType } from "@/interface"
import { Form } from "@/components/ui/form"
import FormInput from "@/components/form-ui/form-input"
import { Button } from "@/components/ui/button"
import FormDatePicker from "@/components/form-ui/form-date-picker"
import { Separator } from "@/components/ui/separator"
import { LuFilterX } from "react-icons/lu"
import { HiXMark } from "react-icons/hi2"
import { ScrollArea } from "@/components/ui/scroll-area"

interface TripAsideProps {
  className?: string
  tripTypes: ITripType[]
}

const searchFormSchema = z.object({
  searchTerm: z.string().trim(),
})

const dateRangeSchema = z.object({
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "End Date is required" }),
})

const budgetRangeFormSchema = z.object({
  minBudget: z.string().trim(),
  maxBudget: z.string().trim(),
})

const TripAside: React.FC<TripAsideProps> = ({ className, tripTypes }) => {
  const [selectedType, setSelectedType] = useState<string[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const pathname = usePathname()
  const router = useRouter()
  const searchParams = useSearchParams()
  const [isSearching, setIsSearching] = useState(false)

  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: searchParams.get("searchTerm") || "",
    },
  })

  const dateRangeForm = useForm<z.infer<typeof dateRangeSchema>>({
    resolver: zodResolver(dateRangeSchema),
  })

  const budgetRangeForm = useForm<z.infer<typeof budgetRangeFormSchema>>({
    resolver: zodResolver(budgetRangeFormSchema),
    defaultValues: {
      minBudget: searchParams.get("minBudget") || "",
      maxBudget: searchParams.get("maxBudget") || "",
    },
  })

  const handleSelectType = (type: ITripType) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams(searchParams)

      if (selectedType.includes(type.label)) {
        setSelectedType(data => {
          const newTripType = data.filter(t => t !== type.label)
          if (newTripType.length > 0) {
            params.set("tripType", newTripType.join(","))
          } else {
            params.delete("tripType")
          }
          params.delete("page")
          router.replace(`${pathname}?${params.toString()}`)
          return newTripType
        })
      } else {
        setSelectedType(data => {
          const newTripType = [...data, type.label]
          params.set("tripType", newTripType.join(","))
          params.delete("page")
          router.replace(`${pathname}?${params.toString()}`)
          return newTripType
        })
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const onSearchTermChange = (value: z.infer<typeof searchFormSchema>) => {
    const params = new URLSearchParams(searchParams)
    if (value.searchTerm !== "") {
      params.set("searchTerm", value.searchTerm)
    } else {
      params.delete("searchTerm")
    }
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
    setIsSearching(false)
  }
  const onSearchTermChangeDebounce = useDebouncedCallback(
    onSearchTermChange,
    500
  )

  const onDateChange = (value: z.infer<typeof dateRangeSchema>) => {
    const params = new URLSearchParams(searchParams)
    if (value.startDate && value.endDate) {
      params.set("startDate", formatedDate(value.startDate))
      params.set("endDate", formatedDate(value.endDate))
    } else {
      params.delete("startDate")
      params.delete("endDate")
    }
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
    router.refresh()
  }

  const onBudgetChange = (value: z.infer<typeof budgetRangeFormSchema>) => {
    const params = new URLSearchParams(searchParams)

    if (value.minBudget && value.maxBudget) {
      params.set("minBudget", value.minBudget)
      params.set("maxBudget", value.maxBudget)
    } else {
      params.delete("minBudget")
      params.delete("maxBudget")
    }
    params.delete("page")
    router.replace(`${pathname}?${params.toString()}`)
  }

  const onBudgetChangeDebounce = useDebouncedCallback(onBudgetChange, 500)

  useEffect(() => {
    const tripTypes = searchParams.get("tripType")
    setSelectedType(tripTypes ? tripTypes.split(",") : [])

    const startDate = searchParams.get("startDate")
    const endDate = searchParams.get("endDate")
    if (startDate) {
      dateRangeForm.setValue("startDate", new Date(startDate))
    }
    if (endDate) {
      dateRangeForm.setValue("endDate", new Date(endDate))
    }
  }, [searchParams, dateRangeForm])

  return (
    <div className={cn("rounded-lg p-3 bg-background space-y-4", className)}>
      <div className="space-y-2">
        <h2 className="font-semibold text-foreground text-sm">Search</h2>
        <Separator />
        <Form {...searchForm}>
          <form
            onSubmit={searchForm.handleSubmit(onSearchTermChange)}
            className="w-full flex flex-col gap-2"
            onChange={() => {
              setIsSearching(true)
              onSearchTermChangeDebounce(searchForm.getValues())
            }}
          >
            <div className="w-full relative">
              <FormInput
                form={searchForm}
                name="searchTerm"
                disabled={isLoading}
                placeholder="Type destenation"
                fieldClassName="pr-10"
              />
              {(isSearching || searchParams.get("searchTerm")) && (
                <span className="absolute right-0 top-1/2 -translate-y-1/2 flex items-center">
                  {isSearching && (
                    <Spinner
                      size={18}
                      className="block pt-2 mr-2"
                    />
                  )}
                  {searchParams.get("searchTerm") && (
                    <Button
                      variant="secondary"
                      type="reset"
                      size={"icon"}
                      onClick={() => {
                        searchForm.setValue("searchTerm", "")
                        onSearchTermChange(searchForm.getValues())
                      }}
                    >
                      <HiXMark className="w-6 h-6" />
                    </Button>
                  )}
                </span>
              )}
            </div>
          </form>
        </Form>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-foreground text-sm">Trip Type</h4>
        <Separator />

        <ScrollArea className="max-h-96">
          <div className="flex flex-wrap gap-2">
            {tripTypes.map(type => (
              <Button
                className="text-center flex justify-between gap-2 px-2.5"
                variant={
                  selectedType.includes(type.label) ? "default" : "secondary"
                }
                onClick={() => handleSelectType(type)}
                key={type.label.replace(" ", "-")}
              >
                <span>{type.label}</span>
                <span>({type.count})</span>
              </Button>
            ))}
          </div>
        </ScrollArea>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-foreground text-sm">Budget Range</h4>
        <Separator />
        <Form {...budgetRangeForm}>
          <form
            className="w-full flex flex-col gap-2"
            onChange={() => {
              const minBudget = budgetRangeForm.watch("minBudget")
              const maxBudget = budgetRangeForm.watch("maxBudget")

              if (minBudget && maxBudget) {
                onBudgetChangeDebounce(budgetRangeForm.getValues())
              }
            }}
          >
            <div className="flex items-center gap-2">
              <FormInput
                form={budgetRangeForm}
                name="minBudget"
                placeholder="Min Budget"
                className="flex-1 shrink-1"
                type="number"
                disabled={isLoading}
              />
              <Separator className="w-2" />
              <FormInput
                form={budgetRangeForm}
                name="maxBudget"
                placeholder="Max Budget"
                className="flex-1 shrink-1"
                type="number"
                disabled={isLoading}
              />
            </div>
            {["minBudget", "maxBudget"].some(value =>
              searchParams.get(value)
            ) && (
              <Button
                type="reset"
                variant="secondary"
                onClick={() => {
                  budgetRangeForm.setValue("minBudget", "")
                  budgetRangeForm.setValue("maxBudget", "")
                  onBudgetChange({ minBudget: "", maxBudget: "" })
                }}
              >
                <LuFilterX className="mr-2" />
                Clear
              </Button>
            )}
          </form>
        </Form>
      </div>

      <div className="space-y-2">
        <h4 className="font-semibold text-foreground text-sm">Date Range</h4>
        <Separator />
        <Form {...dateRangeForm}>
          <form
            onSubmit={dateRangeForm.handleSubmit(onDateChange)}
            className="w-full flex flex-col gap-2"
          >
            <FormDatePicker
              form={dateRangeForm}
              name="startDate"
              required
              onUpdate={() => onDateChange(dateRangeForm.getValues())}
              placeholder="Start Date"
              className="flex-1 shrink-1"
              disabled={isLoading}
            />
            <FormDatePicker
              form={dateRangeForm}
              name="endDate"
              required
              onUpdate={() => onDateChange(dateRangeForm.getValues())}
              placeholder="End Date"
              className="flex-1 shrink-1"
              disabled={isLoading}
            />
            {["startDate", "endDate"].some(value =>
              searchParams.get(value)
            ) && (
              <Button
                type="reset"
                variant="secondary"
                className="flex-1"
                onClick={() => {
                  dateRangeForm.reset()
                  onDateChange(dateRangeForm.getValues())
                }}
              >
                <FiFilter className="size-4 mr-2" /> Clear
              </Button>
            )}
          </form>
        </Form>
      </div>
    </div>
  )
}
export default TripAside
