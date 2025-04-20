// components/report/content.tsx

"use client";

import React, { useState } from "react";
import { ReportTable, ReportItem } from "./table";
import { exportReport } from "@/utils/export";

const mockData: ReportItem[] = [
  {
    id: "1",
    type: "in",
    quantity: 5,
    minQuantity: 10,
    expireDate: "2025-12-31",
    category: "Bebidas",
    supplier: "Fornecedor A",
    lowTurnover: true,
  },
  {
    id: "2",
    type: "out",
    quantity: 20,
    minQuantity: 15,
    expireDate: undefined,
    category: "Limpeza",
    supplier: "Fornecedor B",
    lowTurnover: false,
  },
  {
    id: "3",
    type: "in",
    quantity: 8,
    minQuantity: 5,
    expireDate: "2024-05-10",
    category: "Alimentos",
    supplier: "Fornecedor C",
    lowTurnover: false,
  },
];

export const Content = () => {
  // const [data, setData] = useState<ReportItem[]>(mockData);
  const [page, setPage] = useState(1);
  // const [hasNextPage, setHasNextPage] = useState(false);

  const handleFilter = (formData: FormData) => {
    console.log("Filtro aplicado:", Object.fromEntries(formData.entries()));
  };

  const handleExport = (format: string) => {
    exportReport(format, mockData);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Página alterada para", newPage);
    setPage(newPage);
  };

  return (
    <div className="w-full p-4 space-y-4">
      <ReportTable
        data={mockData}
        currentPage={page}
        hasNextPage={false}
        onPageChange={handlePageChange}
        onFilter={handleFilter}
        onExport={handleExport}
      />
    </div>
  );
};
