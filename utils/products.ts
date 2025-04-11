import { ProductState } from "@/types/Product/types"

export const validateRequiredFields = (product: ProductState) => {
  const errors: { [key: string]: string } = {}

  const requiredFields = ['name', 'amount']

  requiredFields.forEach(field => {
    if (!product[field as keyof ProductState] ||
      (['amount'].includes(field) && Number(product[field as keyof ProductState]) <= 0)) {
      errors[field] = "Campo obrigatório ou inválido!"
    }
  })

  return errors
}