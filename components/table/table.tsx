import { NotResult } from "../common/notResult";
import { MobileTable } from "./mobileTable";

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
  hasNextPage
}: CommonTableProps<T>) {

  if (data.length === 0) {
    return (
      <div className="w-full flex justify-center items-center py-10">
        <NotResult />
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6 p-1">
      <div className="self-start flex items-center gap-2">
        {renderCreate && renderCreate()}
        {renderFilters && renderFilters()}
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
            {data.map((item: T, rowIndex) => (
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
            ))}
          </tbody>
        </table>
      </div>

      <MobileTable data={data} headers={headers} fields={fields} formatValue={formatValue} renderActions={renderActions} />
      {onPageChange && (
        <div className="flex justify-between items-center py-4 px-6 bg-gray-50 rounded-lg shadow-md border-t border-gray-200">
        <div className="flex items-center gap-4">
          <button
            onClick={() => onPageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Anterior
          </button>
          <span className="text-sm font-medium text-gray-700">
            Página {currentPage} de {hasNextPage ? currentPage + 1 : currentPage}
          </span>
          <button
            onClick={() => onPageChange(currentPage + 1)}
            disabled={!hasNextPage}
            className="px-4 py-2 rounded-lg border border-gray-300 bg-white text-gray-600 shadow-sm hover:bg-gray-200 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Próxima
          </button>
        </div>
        <div className="flex items-center gap-4">
          <span className="text-sm text-gray-500">Total de itens: {data.length}</span>
        </div>
      </div>
          
      )}
    </div>
  );
}

