"use client"

import { useCallback, useState } from "react"
import { ProductTable } from "./table"
import { Product } from "@/types/Product/types"
import { CreateOrEdit } from "./modals/createOrEdit"

const Content = () => {
    const [products, setProducts] = useState<Product[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const enableLoading = useCallback(() => setIsLoading(true), [])
    const disableLoading = useCallback(() => setIsLoading(false), [])
    const handleSetProduct = useCallback((products: Product[]) => {
        setProducts(products);
    }, [])

    return (
        <main className="w-full p-4">
            <div className="flex flex-col md:flex-row gap-4 items-start mb-6">
                <CreateOrEdit 
                    disableLoading={disableLoading} 
                    enableLoading={enableLoading} 
                    handleSetProduct={handleSetProduct} />
            </div>
            <ProductTable 
                products={products} 
                isLoading={isLoading} 
                handleSetProduct={handleSetProduct} 
                disableLoading={disableLoading} 
                enableLoading={enableLoading} 
            />
        </main>
    )
}

export default Content
