import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface FormSelectProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  placeholder: string
  data: { label: string; value: string }[]
  className?: string
  disabled: boolean
}

const FormSelect: React.FC<FormSelectProps> = ({
  label,
  placeholder,
  name,
  form,
  className,
  data,
  disabled,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormLabel>Email</FormLabel>
          <Select
            onValueChange={field.onChange}
            defaultValue={field.value}
          >
            <FormControl>
              <SelectTrigger disabled={disabled}>
                <SelectValue placeholder={placeholder} />
              </SelectTrigger>
            </FormControl>
            <SelectContent>
              {data.map(item => (
                <SelectItem
                  key={item.value}
                  value={item.label}
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
  )
}
export default FormSelect
