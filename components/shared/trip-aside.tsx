"use client"

import { cn, formatedDate } from "@/lib/utils"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { FiFilter, FiSearch } from "react-icons/fi"

import { useForm } from "react-hook-form"
import { date, z } from "zod"
import { Form } from "../ui/form"
import FormInput from "../form-ui/form-input"
import { useEffect, useState } from "react"
import { Button } from "../ui/button"
import FormDatePicker from "../form-ui/form-date-picker"
import { Separator } from "../ui/separator"
import { ITripType } from "@/interface"

interface TripAsideProps {
  className?: string
  tripTypes: ITripType[]
}

const searchFormSchema = z.object({
  searchTerm: z.string().trim(),
})

const dateRangeSchema = z.object({
  startDate: z.date().optional(),
  endDate: z.date().optional(),
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

  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: searchParams.get("searchTerm") || "",
    },
  })

  const dateRangeForm = useForm<z.infer<typeof dateRangeSchema>>({
    resolver: zodResolver(dateRangeSchema),
    defaultValues: {
      startDate:
        (searchParams.get("startDate") &&
          new Date(searchParams.get("startDate") || "")) ||
        undefined,
      endDate:
        (searchParams.get("endDate") &&
          new Date(searchParams.get("endDate") || "")) ||
        undefined,
    },
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
      if (selectedType.includes(type.label)) {
        setSelectedType(selectedType.filter(data => data !== type.label))
      } else {
        setSelectedType([...selectedType, type.label])
      }
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }

  const handleSearch = (value: z.infer<typeof searchFormSchema>) => {
    const params = new URLSearchParams(searchParams)
    if (value.searchTerm) {
      params.set("searchTerm", value.searchTerm)
    } else {
      params.delete("searchTerm")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleDateRangeSubmit = (value: z.infer<typeof dateRangeSchema>) => {
    const params = new URLSearchParams(searchParams)
    if (value.startDate && value.endDate) {
      params.set("startDate", formatedDate(value.startDate))
      params.set("endDate", formatedDate(value.endDate))
    } else {
      params.delete("startDate")
      params.delete("endDate")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  const handleBudgetRangeSubmit = (
    value: z.infer<typeof budgetRangeFormSchema>
  ) => {
    const params = new URLSearchParams(searchParams)
    if (value.minBudget && value.maxBudget) {
      params.set("minBudget", value.minBudget)
      params.set("maxBudget", value.maxBudget)
    } else {
      params.delete("minBudget")
      params.delete("maxBudget")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }

  useEffect(() => {
    const tripTypes = searchParams.get("tripType")
    setSelectedType(tripTypes ? tripTypes.split(",") : [])
  }, [])

  useEffect(() => {
    const params = new URLSearchParams(searchParams)
    if (selectedType.length > 0) {
      params.set("tripType", selectedType.join(","))
    } else {
      params.delete("tripType")
    }
    router.replace(`${pathname}?${params.toString()}`)
  }, [selectedType, pathname, router, searchParams])

  return (
    <div className={cn("rounded-lg p-3 bg-background space-y-4", className)}>
      <div>
        <Form {...searchForm}>
          <form
            onClick={searchForm.handleSubmit(handleSearch)}
            className="flex items-center transition-all ring-1 focus-within:ring-2 rounded-md ring-primary"
          >
            <FormInput
              form={searchForm}
              name="searchTerm"
              disabled={isLoading}
              fieldClassName="py-0 shadow-none !ring-transparent border-none grow"
              placeholder="Search..."
            />
            <Button
              size={"icon"}
              className="shrink-0 rounded-r-md rounded-l-none ring-1 ring-primary"
            >
              <FiSearch className="size-5" />
            </Button>
          </form>
        </Form>
      </div>

      <div>
        <h4 className="font-semibold mb-1.5 text-sm">Trip Type</h4>
        <div className="flex flex-wrap items-center gap-2">
          {tripTypes.map(type => (
            <Button
              className="text-center"
              variant={
                selectedType.includes(type.label) ? "default" : "secondary"
              }
              onClick={() => handleSelectType(type)}
              key={type.label.replace(" ", "-")}
            >
              {type.label}
            </Button>
          ))}
        </div>
      </div>

      <div>
        <h4 className="font-semibold mb-1 text-sm">Date Range</h4>
        <Form {...dateRangeForm}>
          <form
            onSubmit={dateRangeForm.handleSubmit(handleDateRangeSubmit)}
            className="w-full flex flex-col gap-2 "
          >
            <FormDatePicker
              form={dateRangeForm}
              name="startDate"
              required
              placeholder="Start Date"
              className="flex-1 shrink-1"
              disabled={isLoading}
            />
            <FormDatePicker
              form={dateRangeForm}
              name="endDate"
              required
              placeholder="End Date"
              className="flex-1 shrink-1"
              disabled={isLoading}
            />
            <Button>
              <FiFilter className="size-4 mr-2" /> Filter
            </Button>
          </form>
        </Form>
      </div>

      <div>
        <h4 className="font-semibold mb-1.5 text-sm">Budget Range</h4>
        <Form {...budgetRangeForm}>
          <form
            onSubmit={budgetRangeForm.handleSubmit(handleBudgetRangeSubmit)}
            className="w-full flex flex-col gap-2 "
            onChangeCapture={budgetRangeForm.handleSubmit(
              handleBudgetRangeSubmit
            )}
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
            <Button>
              <FiFilter className="size-4 mr-2" /> Filter
            </Button>
          </form>
        </Form>
      </div>
    </div>
  )
}
export default TripAside
