type mobileProps<T extends { id: string }> = {
  data: T[]
  headers: string[];
  fields: (keyof T)[];
  formatValue: (field: keyof T, value: T[keyof T]) => React.ReactNode;
  renderActions?: (item: T) => React.ReactNode;
};

export const MobileTable = <T extends { id: string }> ({data, fields, headers, formatValue, renderActions}: mobileProps<T>) => {
  return (
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
                  className={`${isTypeField
                      ? `text-xs px-2 py-0.5 rounded-full font-medium ${typeBadgeStyle}`
                      : "text-gray-800"
                    }`}
                >
                  {formatValue(field, item[field])}
                </span>
              </div>
            );
          })}

          {renderActions && (
            <div className="pt-2 flex justify-end">
              {renderActions(item)}
            </div>
          )}
        </div>
      ))}
    </div>
  )
}