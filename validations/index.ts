import { z } from "zod"

export const loginFormSchema = z.object({
  username: z.string().min(1, { message: "Username is required" }),
  password: z.string().min(1, { message: "Password is required" }),
})

export const registerFormSchema = z.object({
  name: z.string().min(1, { message: "Name is required" }),
  username: z.string().min(1, { message: "Username is required" }),
  email: z
    .string()
    .min(1, { message: "Email is required" })
    .email({ message: "Invalid email address" })
    .trim()
    .toLowerCase(),
  password: z
    .string()
    .min(1, { message: "Password is required" })
    .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/gm, {
      message:
        "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.",
    }),
})

export const forgetPasswordFormSchema = z.object({
  identifer: z
    .string()
    .min(1, { message: "Username or email is required!" })
    .trim()
    .toLowerCase(),
})

export const resetPasswordFormSchema = z
  .object({
    password: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/gm, {
        message:
          "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine(data => data.password === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

export const personalInfoFormSchema = z.object({
  name: z.string(),
  username: z.string(),
  mobile: z.string(),
  dateOfBirth: z.date(),
  bio: z.string(),
})

export const changePasswordFormSchema = z
  .object({
    oldPassword: z.string().min(1, { message: "Old Password is required" }),
    newPassword: z
      .string()
      .min(1, { message: "Password is required" })
      .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[^\s]{8,}$/gm, {
        message:
          "Password must be at least 8 characters long, contain at least one lowercase letter, one uppercase letter, and one number.",
      }),
    confirmPassword: z
      .string()
      .min(1, { message: "Confirm Password is required" }),
  })
  .refine(data => data.newPassword === data.confirmPassword, {
    message: "Passwords do not match",
    path: ["confirmPassword"],
  })

const MAX_UPLOAD_SIZE = 1024 * 1024 * 10 // 10MB
const ACCEPTED_FILE_TYPES = [
  "image/png",
  "image/jpeg",
  "image/jpg",
  "image/webp",
]

const imgSchema = z
  .instanceof(File)
  .optional()
  .refine(file => {
    return !file || file.size <= MAX_UPLOAD_SIZE
  }, "File size must be less than 3MB")
  .refine(file => {
    if (!file) return null
    return ACCEPTED_FILE_TYPES.includes(file.type)
  }, "File must be a PNG/JPEG/JPG file")

export const profilePhotoUPloadFormSchema = z.object({
  profilePhoto: imgSchema,
})

export const createTripFormSchema = z.object({
  images: z
    .custom<FileList>()
    .refine(fileList => {
      if (!fileList?.length || fileList.length === 0) return false
      return Array.from(fileList).every(file => file.size <= MAX_UPLOAD_SIZE)
    }, "Trip images is required!")
    .refine(fileList => {
      if (!fileList?.length || fileList.length === 0) return false
      return Array.from(fileList).every(file => file.size <= MAX_UPLOAD_SIZE)
    }, "Each file size should be less than 1GB.")
    .refine(fileList => {
      if (!fileList?.length || fileList.length === 0) return false
      return Array.from(fileList).every(file =>
        ACCEPTED_FILE_TYPES.includes(file.type)
      )
    }, "Only these types are allowed: .jpg, .jpeg, .png, .webp"),
  destination: z.string().min(1, { message: "Destination is required" }),
  description: z.string().min(1, { message: "Description is required" }),
  startDate: z.date({ required_error: "Start date is required" }),
  endDate: z.date({ required_error: "Start date is required" }),
  tripType: z.string().min(1, { message: "Trip type is required" }),
  budget: z.string().min(1, { message: "Budget is required" }),
})
