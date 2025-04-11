import { CreateSaleDialog } from "./modals/create"
import { Suspense } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { CommonTable } from "../table/table"
import { fields, formatValue, headers } from "@/utils/sale";
import { getSale } from "@/services/sale/getSales";

export const Content = () => {
  return (
    <main className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <CreateSaleDialog />
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