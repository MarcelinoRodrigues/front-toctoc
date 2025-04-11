import { MoreHorizontal } from "lucide-react";

type CommonTableProps<T> = {
  fetchData: () => Promise<T[]>;
  headers: string[];
  fields: (keyof T)[];
  formatValue: (field: keyof T, value: T[keyof T]) => React.ReactNode;
};

export async function CommonTable<T>({
  fetchData,
  headers,
  fields,
  formatValue,
}: CommonTableProps<T>) {
  const data = await fetchData();

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
            {data.map((item: T, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b hover:bg-gray-50 transition-colors"
              >
                {fields.map((field, colIndex) => {
                  const isTypeField = String(field).toLowerCase() === "type";
                  const typeValue = String(item[field]).toLowerCase();

                  const typeBgClass =
                    typeValue === "in"
                      ? "bg-green-50 text-green-600"
                      : typeValue === "out"
                      ? "bg-red-50 text-red-600"
                      : "";

                  return (
                    <td
                      key={colIndex}
                      className={`p-3 text-center ${colIndex === 0 ? "font-medium" : ""}`}
                    >
                      {isTypeField ? (
                        <span className={`text-sm px-2 py-0.5 rounded-full font-medium ${typeBgClass}`}>
                          {formatValue(field, item[field])}
                        </span>
                      ) : (
                        formatValue(field, item[field])
                      )}
                    </td>
                  );
                })}
                <td className="p-3 text-center text-gray-400">
                  <MoreHorizontal className="mx-auto" size={18} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex flex-col gap-4 md:hidden">
        {data.map((item: T, rowIndex) => (
          <div
            key={rowIndex}
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
              <MoreHorizontal className="text-gray-400" size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
