import { UseFormReturn } from "react-hook-form"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { cn } from "@/lib/utils"
import avatar from "@/assets/img/avatar.jpeg"
import Image from "next/image"
import { useState } from "react"
import { toast } from "sonner"
import { HiPhoto } from "react-icons/hi2"

interface FormImageUploaderProps {
  form: UseFormReturn<any>
  name: string
  setSelected: (state: boolean) => void
  currentImage: string | undefined
  label?: string
  type?: "text" | "email" | "password" | "number" | "tel" | "url" | "search"
  className?: string
  disabled: boolean
}

const FormImageUploader: React.FC<FormImageUploaderProps> = ({
  form,
  name,
  label,
  className,
  currentImage,
  disabled,
  setSelected,
}) => {
  const [image, setImage] = useState("")

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]

    if (!file) return
    if (!file.type.includes("image")) {
      toast.error("Please select an image file")
      return
    }

    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => {
      setImage(reader.result as string)
      setSelected(true)
    }
    form.setValue(name, e.target.files?.[0])
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("space-y-0.5", className)}>
          {label && (
            <FormLabel className="group cursor-pointer">
              <div className="relative size-32">
                <span className="absolute transition left-0 top-0 w-full h-full z-10 bg-white/30 opacity-0 flex items-center justify-center group-hover:opacity-100">
                  <HiPhoto
                    className="w-1/3 h-1/3"
                    color="white"
                  />
                </span>
                <Image
                  src={image || currentImage || avatar}
                  fill
                  alt="Profile Photo"
                  className={cn("object-cover", className)}
                />
              </div>
            </FormLabel>
          )}
          <FormControl>
            <Input
              className="bg-background hidden"
              type="file"
              disabled={disabled}
              accept="image/png, image/jpeg, image/jpg, image/webp"
              onChange={handleChange}
            />
          </FormControl>

          <FormMessage />
        </FormItem>
      )}
    />
  )
}
export default FormImageUploader
