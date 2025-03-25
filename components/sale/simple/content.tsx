"use client"

import { CardView } from "@/components/common/CardView"
import { useAuth } from "@/hooks/useAuth"
import { useTimeOutLoad } from "@/hooks/useTimeOutLoad"
import { useCallback, useState } from "react"
import { CreateOrEdit } from "./modals/createOrEdit"
import { SimpleSale } from "@/types/Sale/simple"
import { SimpleSaleTable } from "./simpleSaleTable"

export const Content = () => {
    useAuth()
    const [sale, setSale] = useState<SimpleSale[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCardView, setIsCardView] = useState(false)

    const enableLoading = useCallback(() => setIsLoading(true), []);
    const disableLoading = useCallback(() => setIsLoading(false), []);
    const handleCardView = useCallback((card: boolean) => {
        setIsCardView(card)
    }, [])
    const handleSetSale = useCallback((sale: SimpleSale[]) => {
        setSale(sale);
    }, []);

    useTimeOutLoad(isLoading, disableLoading)

    return (
        <main className="w-full p-4">
            <h2 className="text-2xl font-bold mb-6">Vendas Simples</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
                <CreateOrEdit
                    disableLoading={disableLoading}
                    enableLoading={enableLoading}
                    handleSetSale={handleSetSale} />
                <CardView
                    isCardView={isCardView}
                    handleCardView={handleCardView} />
            </div>
            <SimpleSaleTable
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