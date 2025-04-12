import { CreateSaleDialog } from "./modals/create"
import { Suspense } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { CommonTable } from "../table/table"
import { fields, formatValue, headers } from "@/utils/sale";
import { getSale } from "@/services/sale/getSales";
import { getProducts } from "@/services/products/getProducts";

export const Content = async () => {
  const products = await getProducts()

  return (
    <main className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <CreateSaleDialog products={products}/>
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CommonTable
          fetchData={getSale}
          fields={fields}
          headers={headers}
          formatValue={formatValue}
        />
      </Suspense>
    </main>
  )
}