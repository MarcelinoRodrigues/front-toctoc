import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import https from "https";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const agent = new https.Agent({
  rejectUnauthorized: false,
});