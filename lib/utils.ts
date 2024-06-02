import { type ClassValue, clsx } from "clsx"
import { formatDate } from "date-fns"
import { twMerge } from "tailwind-merge"
import { convert } from "html-to-text"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatedDate = (date: string | Date): string => {
  return formatDate(new Date(date), "MMM d, yyyy")
}

export const getPlainText = (content: string): string | null => {
  if (!content) return null
  return convert(content, { wordwrap: null })
}
