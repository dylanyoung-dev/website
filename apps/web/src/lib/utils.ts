import { clsx, type ClassValue } from "clsx"
import { format, isValid } from "date-fns"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatPublishedDate(
  date: Date | string | null | undefined,
  formatStr = "MMMM dd, yyyy"
): string | null {
  if (date == null || date === "") return null
  const parsed = date instanceof Date ? date : new Date(date)
  if (!isValid(parsed)) return null
  return format(parsed, formatStr)
}


