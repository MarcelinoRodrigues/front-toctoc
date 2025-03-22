"use client"

import { useState } from "react"
import { Create } from "./create"
import { ProductTable } from "./table"
import { useAuth } from "@/hooks/useAuth"
import { Product } from "@/types/Product/types"
import { useTimeOutLoad } from "@/hooks/useTimeOutLoad"
import { Button } from "../ui/button"

export const Content = () => {
    useAuth()

    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCardView, setIsCardView] = useState(false)

    const disableLoading = () => setIsLoading(false)
    const enableLoading = () => setIsLoading(true)
    const handleSetProduct = (product: Product[]) => setProducts(product)

    useTimeOutLoad(isLoading, disableLoading)

    return (
        <main className="w-full p-4">
            <h2 className="text-2xl font-bold mb-6">Lista de Produtos</h2>
            <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
                <Create 
                    disableLoading={disableLoading} 
                    enableLoading={enableLoading} 
                    handleSetProduct={handleSetProduct} 
                />
                <div className="flex justify-start md:justify-end w-full md:w-auto">
                    <Button
                        variant="outline"
                        onClick={() => setIsCardView(!isCardView)}
                        className="w-full md:w-auto"
                    >
                        {isCardView ? 'Ver como Tabela' : 'Ver como Cartões'}
                    </Button>
                </div>
            </div>
            <ProductTable 
                products={products} 
                isLoading={isLoading} 
                isCardView={isCardView}
                handleSetProduct={handleSetProduct} 
                disableLoading={disableLoading} 
                enableLoading={enableLoading} 
            />
        </main>
    )
}
