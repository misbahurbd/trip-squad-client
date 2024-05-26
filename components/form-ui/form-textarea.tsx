import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Textarea } from "@/components/ui/textarea"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"

interface FormTextAreaProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  rows?: number
  placeholder: string
  className?: string
  disabled: boolean
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  placeholder,
  name,
  form,
  className,
  rows,
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
            <Textarea
              className="bg-background"
              placeholder={placeholder}
              disabled={disabled}
              rows={rows || 4}
              {...field}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormTextArea
