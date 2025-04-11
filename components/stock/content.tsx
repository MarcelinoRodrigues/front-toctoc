import { Suspense } from "react"
import { SaleTableSkeleton } from "../common/skeletonTable"
import { StockTable } from "./table"
import { CreateStockDialog } from "./modals/create"

export const Content = () => {
  return (
    <main className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <CreateStockDialog />
      </div>
      <Suspense fallback={<SaleTableSkeleton />}>
        <StockTable />
      </Suspense>
    </main>
  )
}