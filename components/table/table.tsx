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
      <div className="hidden md:block overflow-x-auto max-h-[85vh] overflow-y-auto rounded border border-gray-200 shadow-sm">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-gradient-to-r from-green-100 via-white to-green-50 text-green-900 uppercase text-xs font-semibold">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="p-4 text-center border-b border-gray-300">
                  {header}
                </th>
              ))}
            </tr>
          </thead>

          <tbody className="bg-white">
            {data.map((item: T, rowIndex) => (
              <tr
                key={rowIndex}
                className="border-b border-gray-100 hover:bg-green-50/30 transition"
              >
                {fields.map((field, colIndex) => {
                  const isTypeField = String(field).toLowerCase() === "type";
                  const typeValue = String(item[field]).toLowerCase();

                  const typeBadgeStyle =
                    typeValue === "in"
                      ? "bg-green-100 text-green-700"
                      : typeValue === "out"
                      ? "bg-red-100 text-red-700"
                      : "bg-gray-100 text-gray-600";

                  return (
                    <td
                      key={colIndex}
                      className={`p-4 text-center ${
                        colIndex === 0 ? "font-semibold" : ""
                      }`}
                    >
                      {isTypeField ? (
                        <span
                          className={`text-xs px-3 py-1 rounded-full font-medium inline-block ${typeBadgeStyle}`}
                        >
                          {formatValue(field, item[field])}
                        </span>
                      ) : (
                        formatValue(field, item[field])
                      )}
                    </td>
                  );
                })}

                <td className="p-4 text-center">
                  <button className="p-1 rounded-full hover:bg-gray-200 transition">
                    <MoreHorizontal className="text-gray-500" size={18} />
                  </button>
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
            className="border rounded-xl shadow bg-white p-4 space-y-3"
          >
            {fields.map((field, i) => {
              const isTypeField = String(field).toLowerCase() === "type";
              const typeValue = String(item[field]).toLowerCase();
              const typeBadgeStyle =
                typeValue === "in"
                  ? "bg-green-100 text-green-700"
                  : typeValue === "out"
                  ? "bg-red-100 text-red-700"
                  : "bg-gray-100 text-gray-600";

              return (
                <div key={i} className="flex justify-between items-center text-sm">
                  <span className="font-medium text-gray-600">{headers[i]}</span>
                  <span
                    className={`${
                      isTypeField
                        ? `text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeStyle}`
                        : "text-gray-800"
                    }`}
                  >
                    {formatValue(field, item[field])}
                  </span>
                </div>
              );
            })}
            <div className="pt-2 flex justify-end">
              <MoreHorizontal className="text-gray-400" size={18} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
