import { ReportItem } from "@/types/reports/types";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { utils, writeFile } from "xlsx";
import { headers } from "./report";

export const exportReport = (format: string, data: ReportItem[]) => {
  if (!data || data.length === 0) {
    console.warn("Nenhum dado disponível para exportação.");
    return;
  }

  const tableData = data.map((item) => [
    item.type === "in" ? "Entrada" : "Saída",
    item.quantity,
    item.minQuantity,
    item.amount,
    item.expireDate ? new Date(item.expireDate).toLocaleDateString() : "—",
    item.category,
    item.supplier,
    item.lowTurnover ? "Sim" : "Não",
  ]);

  switch (format.toLowerCase()) {
    case "pdf": {
      const doc = new jsPDF();
      autoTable(doc, {
        head: [headers],
        body: tableData,
      });
      doc.save("relatorio.pdf");
      break;
    }

    case "csv": {
      const csvContent = [
        headers.join(","),
        ...tableData.map((row) => row.join(",")),
      ].join("\n");

      const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });
      const url = URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "relatorio.csv");
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      break;
    }

    case "excel": {
      const worksheet = utils.aoa_to_sheet([headers, ...tableData]);
      const workbook = utils.book_new();
      utils.book_append_sheet(workbook, worksheet, "Relatório");
      writeFile(workbook, "relatorio.xlsx");
      break;
    }

    default:
      console.warn("Formato não suportado:", format);
  }
};
