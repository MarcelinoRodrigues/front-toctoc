import { Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import { getStock } from "@/services/stock/getStock";
import { fields, formatValue, headers } from "@/utils/stock";
import { Stock } from "@/types/stock/types";

export async function StockTable() {
  const stock: Stock[] = await getStock()

  return (
    <div className="flex flex-col gap-6 p-1">
      <div className="hidden md:block overflow-x-auto max-h-[85vh] overflow-y-auto rounded border">
        <table className="w-full border border-gray-200 rounded-lg shadow-sm">
          <thead className="bg-gray-100 text-gray-700 uppercase text-sm">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="p-3 border-b text-center">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {stock.map((item) => (
              <tr
                key={item.id}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {fields.map((field, i) => (
                  <td
                    key={i}
                    className={`p-3 text-center ${i === 0 ? "font-medium" : ""}`}
                  >
                    {formatValue(field, item[field])}
                  </td>
                ))}
                <td className="p-3">
                  <div className="flex gap-2 justify-center">
                    <Button variant="outline" size="icon">
                      <Eye className="text-lg" />
                    </Button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {stock.map((item) => (
          <div
            key={item.id}
            className="border rounded-lg shadow-sm bg-white p-4 space-y-2"
          >
            {fields.map((field, i) => (
              <div key={i} className="flex justify-between text-sm">
                <span className="font-semibold text-gray-600">{headers[i]}</span>
                <span className="text-right text-gray-800">
                  {formatValue(field, item[field])}
                </span>
              </div>
            ))}

            <div className="pt-2 flex justify-end">
              <Button variant="outline" size="icon">
                <Eye className="text-lg" />
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
