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

export const Content = ({
  initialSales,
  initialProducts,
}: {
  initialSales: Sale[]
  initialProducts: Product[]
}) => {
  const [data, setData] = useState(initialSales)
  const [products] = useState(initialProducts)
  const [isPending, startTransition] = useTransition()

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

    startTransition(() => {
      getSales(newFilters).then(setData)
    })
  }

  return (
    <main className="w-full p-4">
      {isPending ? (
        <TableSkeleton />
      ) : (
        <CommonTable
          data={data}
          fields={fields}
          headers={headers}
          formatValue={formatValue}
          renderCreate={
            () => <CreateSaleDialog products={products} onCreateSuccess={() => {
              startTransition(() => {
                getSales({}).then(setData)
              })
            }} />}
          renderFilters={() => <FilterSaleDialog onSubmit={handleFilterSubmit} />}
        />
      )}
    </main>
  )
}
