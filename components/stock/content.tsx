'use client'

import { useEffect, useState, useTransition } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { CreateStockDialog } from "./modals/create"
import { fields, formatValue, headers } from "@/utils/stock";
import { CommonTable } from "../table/table";
import { getProducts } from "@/app/actions/products/getProducts";
import { Stock } from "@/types/stock/types";
import { Product } from "@/types/Product/types";
import { getStock } from "@/app/actions/stock/getStock";

export const Content = ({ stock }:{stock: Stock[]}) => {
  const [data, setData] = useState(stock)
  const [isPending, startTransition] = useTransition()
  const [products, setProducts] = useState<Product[]>([])
  
    useEffect(() => {
      getStock().then(setData)
      getProducts().then(setProducts)
    }, [])

  return (
    <main className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <CreateStockDialog products={products} onCreateSuccess={() => {
                  startTransition(() => {
                    getStock().then(setData)
                  })
                }} />
      </div>
      {isPending ? (
              <TableSkeleton />
            ) : (
              <CommonTable
                data={data}
                fields={fields}
                headers={headers}
                formatValue={formatValue}
              />
            )}
    </main>
  )
}