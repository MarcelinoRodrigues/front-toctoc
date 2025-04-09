"use client"

import { useCallback, useState } from "react"
import { ProductTable } from "./table"
import { useAuth } from "@/hooks/useAuth"
import { Product } from "@/types/Product/types"
import { useTimeOutLoad } from "@/hooks/useTimeOutLoad"
import { CreateOrEdit } from "./modals/createOrEdit"
import { CardView } from "../common/CardView"

const Content = () => {
    useAuth()

    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [isCardView, setIsCardView] = useState(false)

    const enableLoading = useCallback(() => setIsLoading(true), [])
    const disableLoading = useCallback(() => setIsLoading(false), [])
    const handleCardView = useCallback((card: boolean) => {
        setIsCardView(card)
    },[])
    const handleSetProduct = useCallback((products: Product[]) => {
        setProducts(products);
    }, [])

    useTimeOutLoad(isLoading, disableLoading)

    return (
        <main className="w-full p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
                <CreateOrEdit 
                    disableLoading={disableLoading} 
                    enableLoading={enableLoading} 
                    handleSetProduct={handleSetProduct} />
                <CardView 
                    isCardView={isCardView} 
                    handleCardView={handleCardView}/>
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

export default Content
