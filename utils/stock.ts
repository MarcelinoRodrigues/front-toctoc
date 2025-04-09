import { Stock } from "@/types/stock/types";

export const headers = [
  "Produto",
  "Type",
  "Valor"
];

export const fields: (keyof Stock)[] = [
  "productName",
  "Type",
  "amount"
];

export const formatType = (value: number | string) => {
  const paymentMapping: Record<string, string> = {
    "0": "Credito",
    credit: "Credito",
    "1": "Debito",
    debit: "Debito",
    "2": "Pix",
    pix: "Pix",
  };
  return paymentMapping[String(value).toLowerCase()] || String(value);
};

export const formatValue = (field: string, value: string | number | null | undefined) => {
  if (value === null || value === undefined || value === "") return "-";

  if (field.toLowerCase() === "Type") {
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
