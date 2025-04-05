"use client"

import { useCallback, useState } from "react"
import { CardView } from "../common/CardView"
import { Sale } from "@/types/Sale/types"
import { SaleTable } from "./table"
import { Create } from "./modals/create"

export const Content = () => {
    const [sale, setSale] = useState<Sale[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCardView, setIsCardView] = useState(false)

    const enableLoading = useCallback(() => setIsLoading(true), [])
    const disableLoading = useCallback(() => setIsLoading(false), [])
    const handleCardView = useCallback((card: boolean) => {
        setIsCardView(card)
    }, [])
    const handleSetSale = useCallback((sale: Sale[]) => {
        setSale(sale);
    }, [])

    return (
        <main className="w-full p-4">
            <h2 className="text-2xl font-bold mb-6">Lista de Vendas</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
                <Create
                    disableLoading={disableLoading}
                    enableLoading={enableLoading}
                    handleSetSale={handleSetSale} />
                <CardView
                    isCardView={isCardView}
                    handleCardView={handleCardView} />
            </div>
            <SaleTable
                sale={sale}
                isLoading={isLoading}
                isCardView={isCardView}
                handleSetSale={handleSetSale}
                disableLoading={disableLoading}
                enableLoading={enableLoading}
            />
        </main>
    )
}