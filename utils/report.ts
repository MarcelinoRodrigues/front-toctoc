import { Report } from "@/types/reports/types";

export const headers = [
  'Relatório',
  'Tipo',
  'Produto',
  'Quantidade',
  'Valor',
  'Vencimento'
];

export const fields: (keyof Report)[] = [
  'createDateTime',
  'type',
  'productName',
  'quantity',
  'amount',
  'expireDate'
]

const type_labels: Record<Report["type"], string> = {
  in: "Entrada",
  out: "Saída",
};

export const formatValue = <K extends keyof Report>(field: K, value: Report[K]): string | number => {
  if (field === 'expireDate') {
    return value ? new Date(value as string).toLocaleDateString() : '—';
  }

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