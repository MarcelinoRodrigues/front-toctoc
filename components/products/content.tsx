'use client'

import { CommonTable } from "../table/table"
import { fields, formatValue, headers } from "@/utils/products"
import { ProductActions } from "./productActions"
import { useState, useTransition } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { Create } from "./modals/create"
import { getProducts } from "@/app/actions/products/getProducts"
import { Product } from "@/types/Product/types"
import { FilterProductDialog } from "./modals/filter"

interface ResponseProduct {
  products: Product[];
  hasNextPage: boolean;
}

export const Content = ({
  initialProducts
}: {
  initialProducts: ResponseProduct
}) => {
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState(initialProducts)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [filters, setFilters] = useState<Record<string, string>>({})

  const fetchPageData = (pageToLoad: number, appliedFilters = filters) => {
    startTransition(() => {
      getProducts({ ...appliedFilters, page: String(pageToLoad) }).then((res) => {
        setData(res)
        setHasNextPage(res.hasNextPage)
        setPage(pageToLoad)
      })
    })
  }

  const handleFilterSubmit = (formData: FormData) => {
    const newFilters: Record<string, string> = {}

    const name = formData.get("name")?.toString()
    const amount = formData.get("amount")?.toString()

    if (amount) newFilters.amount = amount
    if(name) newFilters.name = name

    setFilters(newFilters)
    fetchPageData(1, newFilters)
  }

  return (
    <main className="w-full p-4">
      {isPending ? (
        <TableSkeleton />
      ) : (
        <CommonTable
          data={data.products ?? []}
          fields={fields}
          headers={headers}
          formatValue={formatValue}
          renderCreate={() => (
            <Create
              onCreateSuccess={() => fetchPageData(1)}
            />
          )}
          renderFilters={() => (
            <FilterProductDialog onSubmit={handleFilterSubmit} />
          )}
          renderActions={
            (item) => <ProductActions product={item} onCreateSuccess={() => fetchPageData(1)}
            />}
          currentPage={page ?? 1}
          onPageChange={(newPage) => fetchPageData(newPage)}
          hasNextPage={hasNextPage}
        />
      )}
    </main>
  )
}