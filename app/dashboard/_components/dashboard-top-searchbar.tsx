"use client"

import { Button } from "@/components/ui/button"
import { useState } from "react"
import { LuSearch, LuX } from "react-icons/lu"
import { cn } from "@/lib/utils"
import { Form } from "@/components/ui/form"
import { usePathname, useRouter, useSearchParams } from "next/navigation"
import { searchFormSchema } from "@/validations"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import FormInput from "@/components/form-ui/form-input"
import { dashboardWithSearch } from "@/constant"

const DashboardTopSearchbar = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isShowing, setIsShowing] = useState(false)
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
      if (values.searchTerm) {
        params.set("searchTerm", values.searchTerm)
        router.replace(`${pathname}?${params.toString()}`)
      } else {
        params.delete("searchTerm")
        router.replace(`${pathname}?${params.toString()}`)
      }
    } catch (error) {
    } finally {
      setIsLoading(false)
      setIsShowing(false)
    }
  }

  return (
    <div>
      {dashboardWithSearch.some(page => `/dashboard${page}` === pathname) && (
        <>
          <Button
            size="icon"
            variant="secondary"
            onClick={() => setIsShowing(true)}
          >
            <LuSearch className="w-5 h-5 text-foreground" />
          </Button>
          <div
            className={cn(
              "fixed transition-all top-0 h-14 left-0 w-full px-3 z-20 flex items-center gap-3 bg-background -mt-14",
              isShowing && "m-0"
            )}
          >
            <Form {...searchForm}>
              <form
                onSubmit={searchForm.handleSubmit(onSearch)}
                className="w-full relative"
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
                  variant="outline"
                >
                  <LuSearch className="w-5 h-5 text-foreground" />
                </Button>
              </form>
            </Form>
            <Button
              size="icon"
              variant="secondary"
              className="shrink-0"
              onClick={() => setIsShowing(false)}
            >
              <LuX className="w-6 h-6 text-foreground" />
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
export default DashboardTopSearchbar
