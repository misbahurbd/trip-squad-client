import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { cn } from "@/lib/utils"
import { UseFormReturn } from "react-hook-form"
import { HiOutlineStar, HiStar } from "react-icons/hi2"

interface RatingInputProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  numOfRate?: number
  disabled: boolean
}

export const RatingInput: React.FC<RatingInputProps> = ({
  form,
  name,
  label,
  numOfRate = 5,
  disabled,
}) => {
  return (
    <FormField
      name={name}
      control={form.control}
      render={({ field }) => (
        <FormItem className="flex gap-3 items-center">
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <RadioGroup
              onValueChange={field.onChange}
              defaultValue={field.value}
              className="flex items-center gap-1 !m-0"
              disabled={disabled}
            >
              {Array.from({ length: numOfRate }).map((_, index) => (
                <FormItem
                  key={`star-${index}`}
                  className="!m-0"
                >
                  <FormControl>
                    <RadioGroupItem
                      hidden
                      value={(index + 1).toString()}
                    />
                  </FormControl>
                  <FormLabel
                    className={cn(
                      "cursor-pointer transition text-muted-foreground hover:text-primary",
                      (Number(field.value) || 0) > index && "text-primary"
                    )}
                  >
                    {(Number(field.value) || 0) > index ? (
                      <HiStar className="size-6" />
                    ) : (
                      <HiOutlineStar className="size-6" />
                    )}
                  </FormLabel>
                </FormItem>
              ))}
            </RadioGroup>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
