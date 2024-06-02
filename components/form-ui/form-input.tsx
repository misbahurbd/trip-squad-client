import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react"
import { UseFormReturn } from "react-hook-form"

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip"
import { HiOutlineEye, HiOutlineEyeOff } from "react-icons/hi"

interface FormInputProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  placeholder: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search"
  className?: string
  labelClassName?: string
  fieldClassName?: string
  disabled: boolean
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  name,
  form,
  className,
  labelClassName,
  fieldClassName,
  type = "text",
  disabled,
}) => {
  const [inputType, setInputType] = useState(type)

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", className)}>
          {label && (
            <FormLabel className={cn(labelClassName)}>{label}</FormLabel>
          )}
          <FormControl>
            <div className="w-full relative">
              <Input
                className={cn(
                  "bg-background",
                  type == "password" && "pr-10",
                  fieldClassName
                )}
                placeholder={placeholder}
                type={inputType}
                disabled={disabled}
                {...field}
              />
              {type == "password" && (
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        size="icon"
                        variant="secondary"
                        tabIndex={-1}
                        type="button"
                        onClick={() =>
                          setInputType(
                            inputType === "password" ? "text" : "password"
                          )
                        }
                        className="absolute right-1 top-1/2 -translate-y-1/2 size-7 select-none "
                      >
                        {inputType === "password" ? (
                          <HiOutlineEye />
                        ) : (
                          <HiOutlineEyeOff />
                        )}
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p>{inputType === "password" ? "Show" : "Hide"}</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              )}
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormInput
