import { getProducts } from "@/services/products/getProducts"
import { CommonTable } from "../table/table"
import { fields, formatValue, headers } from "@/utils/products"
import { ProductActions } from "./productActions"
import { Suspense } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { Create } from "./modals/create"

export const Content = async () => {
  return (
    <main className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <Create />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CommonTable
          fetchData={getProducts}
          headers={headers}
          fields={fields}
          formatValue={formatValue}
          renderActions={(id) => <ProductActions id={id} />}
        />
      </Suspense>
    </main>
  )
}