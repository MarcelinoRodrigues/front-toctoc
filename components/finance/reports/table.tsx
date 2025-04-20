import React from 'react';
import { FilterReportDialog } from './modals/filterReportDialog';
import { ExportDropdown } from './modals/exportDropdown';
import { NotResult } from '@/components/common/notResult';
import { MobileTable } from '@/components/table/mobileTable';
import { Pagination } from '@/components/table/pagination';

export type ReportItem = {
  id: string;
  type: 'in' | 'out';
  quantity: number;
  minQuantity: number;
  expireDate?: string; // ISO string
  category: string;
  supplier: string;
  lowTurnover: boolean;
};

type ReportTableProps = {
  data?: ReportItem[];
  currentPage: number;
  hasNextPage: boolean;
  onPageChange: (page: number) => void;
  onFilter: (formData: FormData) => void;
  onExport: (format: string) => void;
};

export const ReportTable: React.FC<ReportTableProps> = ({
  data = [],
  currentPage,
  hasNextPage,
  onPageChange,
  onFilter,
  onExport,
}) => {
  const headers = [
    'Tipo',
    'Quantidade',
    'Qtd. Mínima',
    'Vencimento',
    'Categoria',
    'Fornecedor',
    'Giro Baixo',
  ];

  const formatValue = <K extends keyof ReportItem>(field: K, value: ReportItem[K]): string | number => {
    if (field === 'expireDate') {
      return value ? new Date(value as string).toLocaleDateString() : '—';
    }
    if (field === 'lowTurnover') {
      return value ? 'Sim' : 'Não';
    }
    return value as string | number;
  };
  

  return (
    <div className="flex-1 flex flex-col gap-4 p-1 w-full">
      {/* Toolbar: Filter + Export */}
      <div className="self-start flex items-center gap-2">
        <FilterReportDialog onSubmit={onFilter} />
        <ExportDropdown options={['PDF', 'CSV', 'Excel']} onExport={onExport} />
      </div>

      {/* Desktop Table */}
      <div className="hidden md:block w-full overflow-x-auto min-h-[73vh] max-h-[73vh] overflow-y-auto rounded border border-gray-200 shadow-sm bg-white">
        <table className="w-full text-sm text-gray-800">
          <thead className="bg-gradient-to-r from-green-100 via-white to-green-50 text-green-900 uppercase text-xs font-semibold">
            <tr>
              {headers.map((header, idx) => (
                <th key={idx} className="p-4 text-center border-b border-gray-300">
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white">
            {data.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="p-6 text-center">
                  <NotResult />
                </td>
              </tr>
            ) : (
              data.map((item) => {
                const rowBg = item.type === 'in' ? 'bg-green-50' : 'bg-red-50';
                return (
                  <tr key={item.id} className={`${rowBg} border-b border-gray-100 hover:bg-opacity-75 transition`}>
                    <td className="p-4 text-center font-medium capitalize">
                      {item.type === 'in' ? 'Entrada' : 'Saída'}
                    </td>
                    <td className="p-4 text-center">
                      {item.quantity}{' '}
                      {item.quantity <= item.minQuantity && (
                        <span className="text-red-600 font-semibold">(Mínimo)</span>
                      )}
                    </td>
                    <td className="p-4 text-center">{item.minQuantity}</td>
                    <td className="p-4 text-center">
                      {item.expireDate ? (
                        <span className={
                          new Date(item.expireDate) < new Date()
                            ? 'text-red-600 font-semibold'
                            : ''
                        }>
                          {formatValue('expireDate', item.expireDate)}
                        </span>
                      ) : (
                        '—'
                      )}
                    </td>
                    <td className="p-4 text-center">{item.category}</td>
                    <td className="p-4 text-center">{item.supplier}</td>
                    <td className="p-4 text-center">
                      {formatValue('lowTurnover', item.lowTurnover)}
                    </td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>

      {/* Mobile Table */}
      <div className="md:hidden w-full">
        <MobileTable
          data={data}
          headers={headers}
          fields={['type', 'quantity', 'minQuantity', 'expireDate', 'category', 'supplier', 'lowTurnover'] as (keyof ReportItem)[]}
          formatValue={formatValue}
        />
      </div>

      {/* Pagination */}
      {data.length > 0 && (
        <div className="mt-2 w-full">
          <Pagination
            data={data}
            currentPage={currentPage}
            onPageChange={onPageChange}
            hasNextPage={hasNextPage}
          />
        </div>
      )}
    </div>
  );
};
