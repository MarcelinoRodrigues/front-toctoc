interface PaginationProps<T extends { id: string }> {
  data: T[]
  currentPage: number
  hasNextPage: boolean | undefined
  onPageChange: (page: number) => void
}

export function Pagination<T extends { id: string }>({
  data,
  currentPage = 1,
  onPageChange,
  hasNextPage
}: PaginationProps<T>) {
  return (
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
  )
}