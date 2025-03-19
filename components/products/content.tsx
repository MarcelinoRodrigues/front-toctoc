import { ProductTableProps } from "@/types/Product/types"
import Sidebar from "../side-bar/content"
import { Loader2 } from "lucide-react"
import { ProductTable } from "./table"
import { FC } from "react"

export const Content: FC<ProductTableProps> = ({products}) => {
    return(
        <div className="min-h-screen p-4 lg:p-0 lg:flex">
            <Sidebar />
            <main className="flex-1 p-4">
                <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
                {products.length === 0 ? (
                    <Loader2 className="animate-spin" />
                ) : (
                    <ProductTable products={products}/>
                )}
            </main>
        </div>
    )
}