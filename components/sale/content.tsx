import { SaleTable } from "./table"
import { CreateSaleDialog } from "./modals/create"
import { Suspense } from "react"
import { SaleTableSkeleton } from "./skeleton/sk-table"

export const Content = () => {
  return (
    <main className="w-full p-4">
      <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
        <CreateSaleDialog />
      </div>
      <Suspense fallback={<SaleTableSkeleton />}>
        <SaleTable />
      </Suspense>
    </main>
  )
}