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

export const formatNumber = (number: number) => {
  if (number < 1_000) {
    return number.toString()
  } else if (number < 1_000_000) {
    return (number / 1_000).toFixed(1) + "k"
  } else if (number < 1_000_000_000) {
    return (number / 1_000_000).toFixed(1) + "m"
  } else {
    return (number / 1_000_000_000).toFixed(1) + "b"
  }
}
