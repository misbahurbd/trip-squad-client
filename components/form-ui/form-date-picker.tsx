import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { format } from "date-fns"
import { CalendarIcon } from "@radix-ui/react-icons"
import { Calendar } from "@/components/ui/calendar"
import { useState } from "react"

interface FormInputProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  labelClassName?: string
  placeholder: string
  className?: string
  required?: boolean
  fieldClassName?: string
  disabled: boolean
  range?: "future" | "past" | "range"
}

const FormDatePicker: React.FC<FormInputProps> = ({
  form,
  name,
  label,
  placeholder,
  labelClassName,
  className,
  fieldClassName,
  required,
  disabled,
  range,
}) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", className)}>
          <FormLabel className={labelClassName}>{label}</FormLabel>
          <Popover
            open={isOpen}
            onOpenChange={open => setIsOpen(open)}
          >
            <PopoverTrigger asChild>
              <FormControl>
                <Button
                  disabled={disabled}
                  variant={"outline"}
                  className={cn(
                    "w-full pl-3 text-left font-normal",
                    !field.value && "text-muted-foreground",
                    fieldClassName
                  )}
                >
                  {field.value ? (
                    format(field.value, "MMM d, yyyy")
                  ) : (
                    <span>{placeholder}</span>
                  )}
                  <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                </Button>
              </FormControl>
            </PopoverTrigger>
            <PopoverContent
              className="w-auto p-0"
              align="start"
            >
              <Calendar
                mode="single"
                required={required || true}
                selected={field.value}
                onSelect={data => {
                  field.onChange(data)
                  setIsOpen(false)
                }}
                disabled={date => {
                  if (range && range == "future") {
                    return (
                      date >
                        new Date(
                          new Date().setFullYear(new Date().getFullYear() + 10)
                        ) ||
                      date <=
                        new Date(new Date().setDate(new Date().getDate() - 1))
                    )
                  }
                  return (
                    date >
                      new Date(
                        new Date().setFullYear(new Date().getFullYear() + 10)
                      ) || date < new Date("1900-01-01")
                  )
                }}
                initialFocus
              />
            </PopoverContent>
          </Popover>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormDatePicker