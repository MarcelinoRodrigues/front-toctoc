import { Product } from "@/types/Product/types"

export const headers = ['Nome','Valor de compra','Valor de venda', 'Lucro' ,'Descrição']

export const fields: (keyof Product)[] = ['name', 'purchasePrice' ,'sellingPrice', 'profit', 'description']

export const formatValue = (field: string, value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return "-";

  if (["purchasePrice", "sellingPrice", "profit"].includes(field)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
      minimumFractionDigits: 2,
    }).format(parseFloat(String(value)) || 0);
  }

  return String(value);
};