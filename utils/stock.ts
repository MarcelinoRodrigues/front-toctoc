import { Stock } from "@/types/stock/types";

export const headers = [
  "Produto",
  "Quantidade",
  "Tipo",
  "Valor",
  "Ações",
];

export const fields: (keyof Stock)[] = [
  "productName",
  "quantity",
  "type",
  "amount"
];

export const formatType = (value: number | string) => {
  const paymentMapping: Record<string, string> = {
    in: "Entrada",
    out: "Saída",
  };
  return paymentMapping[String(value).toLowerCase()] || String(value);
};

export const formatValue = (field: string, value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return "-";

  if (field.toLowerCase() === "type") {
    return formatType(value);
  }

  if (field === "amount") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  }

  return String(value);
};
