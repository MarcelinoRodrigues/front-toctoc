import { Product } from "@/types/Product/types"

export const headers = ['Nome', 'Valor', 'Descrição']

export const fields: (keyof Product)[] = ['name', 'amount', 'description']

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