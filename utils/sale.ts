import { Sale } from "@/types/Sale/types";

export const formatPayment = (value: number | string) => {
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

  if (field.includes("createDateTime")) {
    return new Date(value).toLocaleDateString("pt-BR");
  }

  if (field.toLowerCase() === "payment") {
    return formatPayment(value);
  }

  if (["amount", "discount", "additionalCost"].includes(field)) {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  }

  return String(value);
};

export const headers = [
  "Data",
  "Produto",
  "Quantidade",
  "Valor",
  "Desconto",
  "Custo Adicional",
  "Forma de Pagamento",
  "Origem",
  "Observação",
];

export const fields: (keyof Sale)[] = [
  "createDateTime",
  "productName",
  "quantity",
  "amount",
  "discount",
  "additionalCost",
  "payment",
  "origin",
  "observation",
];
