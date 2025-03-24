import { ProductState } from "@/types/Product/types";
import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const validateInputs = (email: string, password: string, handleSetError?: (errorMessage: string) => void) => {
  if (!email.trim() || !password.trim()) {
    handleSetError!("Email e senha são obrigatórios.");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!emailRegex.test(email)) {
    handleSetError!("Por favor, insira um email válido.");
    return false;
  }
  return true;
}

export const validateRequiredFields = (product: ProductState) => {
  const errors: { [key: string]: string } = {}

  const requiredFields = ['name', 'quantity', 'amount']

  requiredFields.forEach(field => {
    if (!product[field as keyof ProductState] ||
      (['quantity', 'amount'].includes(field) && Number(product[field as keyof ProductState]) <= 0)) {
      errors[field] = "Campo obrigatório ou inválido!"
    }
  })

  return errors
}
