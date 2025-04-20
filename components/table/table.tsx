import { NotResult } from "../common/notResult";
import { ExportDropdown } from "../finance/reports/modals/exportDropdown";
import { MobileTable } from "./mobileTable";
import { Pagination } from "./pagination";

type CommonTableProps<T extends { id: string }> = {
  data: T[];
  headers: string[];
  fields: (keyof T)[];
  formatValue: (field: keyof T, value: T[keyof T]) => React.ReactNode;
  renderActions?: (item: T) => React.ReactNode;
  renderCreate?: () => React.ReactNode;
  renderFilters?: () => React.ReactNode;
  currentPage?: number;
  onPageChange?: (page: number) => void;
  hasNextPage?: boolean;
  onExport?: (format: string) => void;
};

export function CommonTable<T extends { id: string }>({
  data,
  headers,
  fields,
  formatValue,
  renderActions,
  renderCreate,
  renderFilters,
  currentPage = 1,
  onPageChange,
  hasNextPage,
  onExport,
}: CommonTableProps<T>) {

  return (
    <div className="flex flex-col gap-6 p-1">
      <div className="self-start flex items-center gap-2">
        {renderCreate && renderCreate()}
        {renderFilters && renderFilters()}
        {onExport && (
          <ExportDropdown options={['PDF', 'CSV', 'Excel']} onExport={onExport} />
        )}
      </div>

      <div className="hidden md:block overflow-x-auto min-h-[73vh] max-h-[73vh] overflow-y-auto rounded border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-gradient-to-r from-green-100 via-white to-green-50 text-green-900 uppercase text-xs font-semibold">
            <tr>
              {headers.map((header, i) => (
                <th key={i} className="p-4 text-center border-b border-gray-300">
                  {header}
                </th>
              ))}
              {renderActions && (
                <th className="p-4 text-center border-b border-gray-300">Ações</th>
              )}
            </tr>
          </thead>

          <tbody className="bg-white">
            {data?.length === 0 ? (
              <tr>
                <td
                  colSpan={headers?.length + (renderActions ? 1 : 0)}
                  className="text-center"
                >
                  <NotResult />
                </td>
              </tr>
            ) : (
              data.map((item: T, rowIndex) => (
                <tr key={rowIndex} className="border-b border-gray-100 hover:bg-green-50/30 transition">
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
                      <td key={colIndex} className={`p-4 text-center ${colIndex === 0 ? "font-semibold" : ""}`}>
                        {isTypeField ? (
                          <span className={`text-xs px-3 py-1 rounded-full font-medium inline-block ${typeBadgeStyle}`}>
                            {formatValue(field, item[field])}
                          </span>
                        ) : (
                          formatValue(field, item[field])
                        )}
                      </td>
                    );
                  })}

                  {renderActions && (
                    <td className="p-4 text-center">
                      {renderActions(item)}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>

      <MobileTable
        data={data ?? []}
        headers={headers}
        fields={fields}
        formatValue={formatValue}
        renderActions={renderActions}
      />

      {onPageChange && data?.length > 0 && (
        <Pagination
          data={data ?? []}
          currentPage={currentPage}
          onPageChange={onPageChange}
          hasNextPage={hasNextPage}
        />
      )}
    </div>
  );
}
