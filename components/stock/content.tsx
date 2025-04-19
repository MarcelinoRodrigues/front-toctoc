'use client'

import { useState, useTransition } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { CreateStockDialog } from "./modals/create"
import { fields, formatValue, headers } from "@/utils/stock";
import { CommonTable } from "../table/table";
import { Stock } from "@/types/stock/types";
import { Product } from "@/types/Product/types";
import { getStock } from "@/app/actions/stock/getStock";
import { FilterStockDialog } from "./modals/filter";

interface ResponseStock {
  stock: Stock[]
  hasNextPage: boolean
}

export const Content = ({
  initialStock,
  initialProducts
}: {
  initialStock: ResponseStock
  initialProducts: Product[]
}) => {
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState(initialStock)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [filters, setFilters] = useState<Record<string, string>>({})

  const fetchPageData = (pageToLoad: number, appliedFilters = filters) => {
    startTransition(() => {
      getStock({ ...appliedFilters, page: String(pageToLoad) }).then((res) => {
        setData(res)
        setHasNextPage(res.hasNextPage)
        setPage(pageToLoad)
      })
    })
  }

  const handleFilterSubmit = (formData: FormData) => {
    const newFilters: Record<string, string> = {}

    const quantity = formData.get("quantity")?.toString()
    const amount = formData.get("amount")?.toString()

    if (quantity) newFilters.quantity = quantity
    if (amount) newFilters.amount = amount

    setFilters(newFilters)
    fetchPageData(1, newFilters)
  }

  return (
    <main className="w-full p-4">
      {isPending ? (
        <TableSkeleton />
      ) : (
        <CommonTable
          data={data.stock}
          fields={fields}
          headers={headers}
          formatValue={formatValue}
          renderCreate={() => (
            <CreateStockDialog
              products={initialProducts}
              onCreateSuccess={() => fetchPageData(1)}
            />
          )}
          renderFilters={() => (
            <FilterStockDialog onSubmit={handleFilterSubmit} />
          )}
          currentPage={page ?? 1}
          onPageChange={(newPage) => fetchPageData(newPage)}
          hasNextPage={hasNextPage}
        />
      )}
    </main>
  )
}