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
import Editor from "../shared/editor"

interface FormEditorProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  className?: string
  editorClass?: string
}

const FormEditor: React.FC<FormEditorProps> = ({
  label,
  name,
  form,
  className,
  editorClass,
}) => {
  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-0.5", className)}>
          {label && <FormLabel>{label}</FormLabel>}
          <FormControl>
            <div className="w-full relative">
              <Editor {...field} />
            </div>
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormEditor
