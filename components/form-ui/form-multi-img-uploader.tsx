import React, { useState } from "react"
import {
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"
import { cn } from "@/lib/utils"
import Image from "next/image"
import { Input } from "@/components/ui/input"
import { UseFormReturn } from "react-hook-form"
import { toast } from "sonner"
import { TbPhotoPlus } from "react-icons/tb"

interface FormMultiImageUploaderProps {
  form: UseFormReturn<any>
  name: string
  label?: string
  className?: string
  disabled: boolean
}

const FormMultiImageUploader: React.FC<FormMultiImageUploaderProps> = ({
  form,
  disabled,
  name,
  label,
  className,
}) => {
  const [images, setImages] = useState<string[]>([])

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files

    if (!files || files.length === 0) return

    for (let i = 0; i < files.length; i++) {
      const file = files[i]
      if (!file.type.includes("image")) {
        toast.error("Please select only image files")
        return
      }
    }

    try {
      const imgArray = await Promise.all(
        Array.from(files)
          .slice(0, 5 - images.length)
          .map(
            file =>
              new Promise<string>((resolve, reject) => {
                const reader = new FileReader()
                reader.readAsDataURL(file)
                reader.onload = () => {
                  resolve(reader.result as string)
                }
                reader.onerror = () => {
                  reject(reader.error)
                }
              })
          )
      )

      setImages(prevImages => [...prevImages, ...imgArray])

      const existingFiles: FileList = form.getValues(name)
      const newFiles: File[] = Array.from(files)
      const combinedFiles = [...Array.from(existingFiles || []), ...newFiles]

      const dataTransfer = new DataTransfer()
      combinedFiles.forEach(file => dataTransfer.items.add(file))
      form.setValue(name, dataTransfer.files, { shouldValidate: true })
    } catch (error) {
      console.error("Error reading files:", error)
    }
  }

  return (
    <FormField
      control={form.control}
      name={name}
      render={({ field }) => (
        <FormItem className={cn("w-full space-y-1", className)}>
          <h2 className="text-sm font-semibold">{label}</h2>
          {images.length > 0 && (
            <div
              className={cn(
                "grid gap-3 w-full aspect-video",
                (images.length === 2 || images.length >= 4) && "grid-cols-2",
                images.length === 3 && "grid-cols-3"
              )}
            >
              {images.slice(0, 4).map((img, i) => (
                <div
                  key={i}
                  className="relative border border-muted-foreground/10 rounded-md overflow-hidden"
                >
                  {i === 3 && images.length > 4 && (
                    <span className="bg-black/30 absolute z-10 flex items-center justify-center inset-0 font-semibold text-white text-3xl">
                      +{images.length - 4}
                    </span>
                  )}
                  <Image
                    src={img}
                    layout="fill"
                    alt="Uploaded Image"
                    className={cn("object-cover", className)}
                  />
                </div>
              ))}
            </div>
          )}
          <FormLabel
            className={cn(
              "group cursor-pointer flex flex-row items-center justify-center gap-3 border rounded-lg text text-muted-foreground p-3 transition hover:bg-secondary",
              images.length == 0 && "aspect-video flex-col",
              images.length == 5 && "pointer-events-none opacity-60"
            )}
          >
            <TbPhotoPlus
              className={cn("w-10 h-10", images.length > 0 && "w-6 h-6")}
            />
            <p>{images.length === 0 ? "Select photos" : "Add more"} </p>
          </FormLabel>
          <FormControl>
            <Input
              className="bg-background hidden"
              type="file"
              multiple
              accept="image/png, image/jpeg, image/jpg, image/webp"
              disabled={disabled}
              onChange={handleChange}
            />
          </FormControl>
          <FormMessage />
        </FormItem>
      )}
    />
  )
}

export default FormMultiImageUploader
