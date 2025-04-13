import { Product, ProductState } from "@/types/Product/types"

export const headers = ['Nome', 'Valor', 'Descrição']

export const fields: (keyof Product)[] = ['name', 'amount', 'description']

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

export const formatValue = (field: string, value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return "-";

  if (field === "amount") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  }

  return String(value);
};