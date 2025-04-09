import { SaleTable } from "./table"
import { CreateSaleDialog } from "./modals/create"

export const Content = () => {
    return (
        <main className="w-full p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
                <CreateSaleDialog/>
            </div>
            <SaleTable/>
        </main>
    )
}