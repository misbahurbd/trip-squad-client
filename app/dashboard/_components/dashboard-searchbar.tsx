"use client"

import FormInput from "@/components/form-ui/form-input"
import { Form } from "@/components/ui/form"
import { zodResolver } from "@hookform/resolvers/zod"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { ClipLoader as Spinner } from "react-spinners"
import { useState } from "react"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { LuSearch } from "react-icons/lu"
import { Button } from "@/components/ui/button"
import { useDebouncedCallback } from "use-debounce"
import { cn } from "@/lib/utils"
import { searchFormSchema } from "@/validations"
import { dashboardWithSearch } from "@/constant"

const DashboardSearchbar = ({ className }: { className?: string }) => {
  const [isLoading, setIsLoading] = useState(false)
  const [isSearching, setIsSearching] = useState(false)
  const searchParams = useSearchParams()
  const pathname = usePathname()
  const router = useRouter()

  const searchForm = useForm<z.infer<typeof searchFormSchema>>({
    resolver: zodResolver(searchFormSchema),
    defaultValues: {
      searchTerm: searchParams.get("searchTerm") || "",
    },
  })

  const onSearch = async (values: z.infer<typeof searchFormSchema>) => {
    setIsLoading(true)
    try {
      const params = new URLSearchParams()
      setIsSearching(true)
      if (values.searchTerm) {
        params.set("searchTerm", values.searchTerm)
        params.delete("page")
        router.replace(`${pathname}?${params.toString()}`)
      } else {
        params.delete("searchTerm")
        params.delete("page")
        router.replace(`${pathname}?${params.toString()}`)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
      setIsSearching(false)
    }
  }

  const onSearchChange = useDebouncedCallback(onSearch, 500)

  return (
    <div className="w-full">
      {dashboardWithSearch.some(page => `/dashboard${page}` === pathname) && (
        <Form {...searchForm}>
          <form
            onSubmit={searchForm.handleSubmit(onSearch)}
            onChange={() => {
              setIsSearching(true)
              onSearchChange(searchForm.getValues())
            }}
            className={cn("w-full max-w-sm relative", className)}
          >
            <FormInput
              form={searchForm}
              name="searchTerm"
              fieldClassName="bg-secondary pr-12"
              placeholder="Search..."
              disabled={isLoading}
            />
            <Button
              className="absolute right-0 top-0"
              size="icon"
              variant={isSearching ? "ghost" : "outline"}
            >
              {isSearching ? (
                <Spinner size={20} />
              ) : (
                <LuSearch className="w-5 h-5" />
              )}
            </Button>
          </form>
        </Form>
      )}
    </div>
  )
}
export default DashboardSearchbar
