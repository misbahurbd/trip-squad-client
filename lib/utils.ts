import { type ClassValue, clsx } from "clsx"
import { formatDate } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const formatedDate = (date: string | Date): string => {
  return formatDate(new Date(date), "MMM d, yyyy")
}
