import { Suspense } from "react"
import { TableSkeleton } from "../common/skeletonTable"
import { CreateStockDialog } from "./modals/create"
import { fields, formatValue, headers } from "@/utils/stock";
import { CommonTable } from "../table/table";
import { getStock } from "@/services/stock/getStock";

export const Content = async () => {
  return (
    <main className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <CreateStockDialog />
      </div>
      <Suspense fallback={<TableSkeleton />}>
        <CommonTable
          fetchData={getStock}
          fields={fields}
          headers={headers}
          formatValue={formatValue}
        />
      </Suspense>
    </main>
  )
}