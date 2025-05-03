import { Report } from "@/types/reports/types";

export const headers = [
  'Relatório',
  'Tipo',
  'Produto',
  'Quantidade',
  'Valor',
];

export const fields: (keyof Report)[] = [
  'createDateTime',
  'type',
  'productName',
  'quantity',
  'amount'
]

const type_labels: Record<Report["type"], string> = {
  In: "Entrada",
  Out: "Saída",
};

export const formatValue = <K extends keyof Report>(field: K, value: Report[K]): string | number => {

  if (field.includes("createDateTime")) {
    return new Date(value as string).toLocaleDateString("pt-BR");
  }

  if (field === "amount") {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(Number(value));
  }

  if(field === 'type'){
    return type_labels[value as Report["type"]] ?? value;
  }

  return value as string | number;
};