'use client'

import { CommonTable } from "../table/table"
import { fields, formatValue, headers } from "@/utils/products"
import { ProductActions } from "./productActions"
import { useEffect, useState, useTransition } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { Create } from "./modals/create"
import { getProducts } from "@/app/actions/products/getProducts"
import { Product } from "@/types/Product/types"

export const Content = ({ initialProducts }: { initialProducts: Product[] }) => {
  const [data, setData] = useState<Product[]>(initialProducts)
  const [isPending, startTransition] = useTransition()

  useEffect(() => {
    getProducts().then(setData)
  }, [])

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
            () => <Create onDataUpdate={() => {
            startTransition(() => {
              getProducts().then(setData)
            })
          }}/>}
          renderActions={
            (item) => <ProductActions product={item} onDataUpdate={() => {
            startTransition(() => {
              getProducts().then(setData)
            })
          }}
          />}
        />
      )}
    </main>
  )
}