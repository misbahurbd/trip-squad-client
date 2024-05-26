import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"

interface FormInputProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  placeholder: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search"
  className?: string
  disabled: boolean
}

const FormInput: React.FC<FormInputProps> = ({
  label,
  placeholder,
  name,
  form,
  className,
  type,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <Input
              className="bg-background"
              placeholder={placeholder}
              type={type || "text"}
              disabled={disabled}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormInput
