"use client"

import { useCallback, useState } from "react"
import { Create } from "./create"
import { ProductTable } from "./table"
import { useAuth } from "@/hooks/useAuth"
import { Product } from "@/types/Product/types"
import { useTimeOutLoad } from "@/hooks/useTimeOutLoad"
import { Button } from "../ui/button"
import { Table, LayoutGrid  } from 'lucide-react'

export const Content = () => {
    useAuth()

    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCardView, setIsCardView] = useState(false)

    const enableLoading = useCallback(() => setIsLoading(true), []);
    const disableLoading = useCallback(() => setIsLoading(false), []);
    const handleSetProduct = useCallback((products: Product[]) => {
        setProducts(products);
    }, []);

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
                        {isCardView ? <Table/> : <LayoutGrid/>}
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
