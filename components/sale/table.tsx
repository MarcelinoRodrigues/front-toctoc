import { Eye } from "lucide-react";
import { Button } from "../ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { getSale } from "@/services/sale/getSales";
import { Sale } from "@/types/Sale/types";
import { fields, formatValue, headers } from "@/utils/sale";

export async function SaleTable() {
  const sales: Sale[] = await getSale();

  return (
    <div className="flex flex-col gap-6 p-1 h-[31rem]">
      <div className="overflow-x-auto flex-grow">
        <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <TableHeader className="bg-gray-100 text-gray-700 uppercase text-sm">
            <TableRow>
              {headers.map((headerName, index) => (
                <TableHead key={index} className="p-3 border-b text-center">
                  {headerName}
                </TableHead>
              ))}
            </TableRow>
          </TableHeader>
          <TableBody className="bg-white">
            {sales.map((item: Sale) => (
              <TableRow
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {fields.map((field, index) => (
                  <TableCell
                    key={index}
                    className={`p-3 text-center ${index === 0 ? "font-medium" : ""}`}
                  >
                    {formatValue(field, item[field])}
                  </TableCell>
                ))}
                <TableCell className="p-3">
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="icon">
                      <Eye className="text-lg" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}
