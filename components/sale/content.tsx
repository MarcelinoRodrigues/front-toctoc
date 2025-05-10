'use client'

import { useState, useTransition } from 'react'
import { CreateSaleDialog } from './modals/create'
import { CommonTable } from '../table/table'
import { TableSkeleton } from '../common/skeletonTable'
import { fields, formatValue, headers } from '@/utils/sale'
import { FilterSaleDialog } from './modals/filter'
import { Product } from '@/types/Product/types'
import { Sale } from '@/types/Sale/types'
import { getSales } from '@/app/actions/sale/getSales'
import { Cart } from '../cart/cart'

interface ResponseSale {
  sales: Sale[]
  hasNextPage: boolean
}

export const Content = ({
  initialSales,
  initialProducts,
}: {
  initialSales: ResponseSale
  initialProducts: Product[]
}) => {
  const [isPending, startTransition] = useTransition()

  const [data, setData] = useState(initialSales)
  const [page, setPage] = useState(1)
  const [hasNextPage, setHasNextPage] = useState(true)
  const [filters, setFilters] = useState<Record<string, string>>({})

  const fetchPageData = (pageToLoad: number, appliedFilters = filters) => {
    startTransition(() => {
      getSales({ ...appliedFilters, page: String(pageToLoad) }).then((res) => {
        setData(res)
        setHasNextPage(res.hasNextPage)
        setPage(pageToLoad)
      })
    })
  }

  const handleFilterSubmit = (formData: FormData) => {
    const newFilters: Record<string, string> = {}

    const date = formData.get("date")?.toString()
    const quantity = formData.get("quantity")?.toString()
    const amount = formData.get("amount")?.toString()
    const payment = formData.get("payment")?.toString()

    if (date) newFilters.date = date
    if (quantity) newFilters.quantity = quantity
    if (amount) newFilters.amount = amount
    if (payment && payment !== 'all') newFilters.payment = payment

    setFilters(newFilters)
    fetchPageData(1, newFilters)
  }

  return (
    <main className="w-full p-4 space-y-4">
      {isPending && <TableSkeleton />}
      {!isPending && (
        <CommonTable
          data={data.sales ?? []}
          fields={fields}
          headers={headers}
          formatValue={formatValue}
          renderCreate={() => (
            <CreateSaleDialog
              products={initialProducts}
              onCreateSuccess={() => fetchPageData(1)}
            />
          )}
          renderFilters={() => (
            <FilterSaleDialog onSubmit={handleFilterSubmit} />
          )}
          currentPage={page ?? 1}
          onPageChange={(newPage) => fetchPageData(newPage)}
          hasNextPage={hasNextPage}
        />
      )}
    </main>
  )
}
