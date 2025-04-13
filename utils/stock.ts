import { Stock } from "@/types/stock/types";

export const headers = [
  "Produto",
  "Quantidade",
  "Valor",
];

export const fields: (keyof Stock)[] = [
  "productName",
  "quantity",
  "amount"
];

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
