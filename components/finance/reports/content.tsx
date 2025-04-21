"use client";

import React, { useState } from "react";
import { exportReport } from "@/utils/export";
import { Report } from "@/types/reports/types";
import { CommonTable } from "@/components/table/table";
import { fields, formatValue, headers } from "@/utils/report";

const mockData: Report[] = [
  {
    id: "1",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'coxinha',
    quantity: 5,
    amount: 0,
    expireDate: "2025-12-31",
    category: "Bebidas",
    supplier: "Fornecedor A",
  },
  {
    id: "2",
    createDateTime: new Date().toString(),
    type: "out",
    productName: 'risole',
    quantity: 20,
    amount: 0,
    expireDate: undefined,
    category: "Limpeza",
    supplier: "Fornecedor B",
  },
  {
    id: "3",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'vitamina',
    quantity: 8,
    amount: 0,
    expireDate: "2024-05-10",
    category: "Alimentos",
    supplier: "Fornecedor C",
  },
  {
    id: "14",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'coxinha',
    quantity: 5,
    amount: 0,
    expireDate: "2025-12-31",
    category: "Bebidas",
    supplier: "Fornecedor A",
  },
  {
    id: "25",
    createDateTime: new Date().toString(),
    type: "out",
    productName: 'risole',
    quantity: 20,
    amount: 0,
    expireDate: undefined,
    category: "Limpeza",
    supplier: "Fornecedor B",
  },
  {
    id: "36",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'vitamina',
    quantity: 8,
    amount: 0,
    expireDate: "2024-05-10",
    category: "Alimentos",
    supplier: "Fornecedor C",
  },
  {
    id: "17",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'coxinha',
    quantity: 5,
    amount: 0,
    expireDate: "2025-12-31",
    category: "Bebidas",
    supplier: "Fornecedor A",
  },
  {
    id: "28",
    createDateTime: new Date().toString(),
    type: "out",
    productName: 'risole',
    quantity: 20,
    amount: 0,
    expireDate: undefined,
    category: "Limpeza",
    supplier: "Fornecedor B",
  },
  {
    id: "39",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'vitamina',
    quantity: 8,
    amount: 0,
    expireDate: "2024-05-10",
    category: "Alimentos",
    supplier: "Fornecedor C",
  },
  {
    id: "111",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'coxinha',
    quantity: 5,
    amount: 0,
    expireDate: "2025-12-31",
    category: "Bebidas",
    supplier: "Fornecedor A",
  },
  {
    id: "212",
    createDateTime: new Date().toString(),
    type: "out",
    productName: 'risole',
    quantity: 20,
    amount: 0,
    expireDate: undefined,
    category: "Limpeza",
    supplier: "Fornecedor B",
  },
  {
    id: "313",
    createDateTime: new Date().toString(),
    type: "in",
    productName: 'vitamina',
    quantity: 8,
    amount: 0,
    expireDate: "2024-05-10",
    category: "Alimentos",
    supplier: "Fornecedor C",
  },
];

export const Content = () => {
  const [page, setPage] = useState(1);

  const handleExport = (format: string) => {
    exportReport(format, mockData);
  };

  const handlePageChange = (newPage: number) => {
    console.log("Página alterada para", newPage);
    setPage(newPage);
  };

  return (
    <div className="w-full p-4 space-y-4">
      <CommonTable
        data={mockData ?? []}
        fields={fields}
        headers={headers}
        formatValue={formatValue}
        currentPage={page}
        hasNextPage={false}
        onPageChange={handlePageChange}
        renderFilters={() => (<></>)}
        onExport={handleExport}
       />
    </div>
  );
};
