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
  counter?: boolean
  minLength?: number
  maxLength?: number
}

const FormTextArea: React.FC<FormTextAreaProps> = ({
  label,
  placeholder,
  name,
  form,
  className,
  rows,
  disabled,
  counter = false,
  minLength = 0,
  maxLength,
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
              maxLength={maxLength || undefined}
              {...field}
            />
          </FormControl>
          <div className="flex items-center gap-4">
            <div className="flex-1">
              <FormMessage />
            </div>
            {counter && (
              <div className="w-max text-muted-foreground text-xs">
                {form.watch(name).length}
              </div>
            )}
          </div>
        </FormItem>
      )}
    />
  )
}
export default FormTextArea
