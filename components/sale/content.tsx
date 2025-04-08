import { SaleTable } from "./table"
import { Create } from "./modals/create"

export const Content = () => {
    return (
        <main className="w-full p-4">
            <h2 className="text-2xl font-bold mb-6">Lista de Vendas</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
                <Create/>
            </div>
            <SaleTable/>
        </main>
    )
}