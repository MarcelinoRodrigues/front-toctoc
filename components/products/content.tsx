"use client";

import { useState } from "react";
import { Create } from "./create";
import { ProductTable } from "./table";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/types/Product/types";
import { useTimeOutLoad } from "@/hooks/useTimeOutLoad";

export const Content = () => {
    useAuth();

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const disableLoading = () => setIsLoading(false)
    const enableLoading = () => setIsLoading(true)
    const handleSetProduct = (product: Product[]) => setProducts(product)

    useTimeOutLoad(isLoading, disableLoading);

    return (
        <main className="size-full p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
            <Create disableLoading={disableLoading} enableLoading={enableLoading} handleSetProduct={handleSetProduct} />
            <ProductTable products={products} isLoading={isLoading} handleSetProduct={handleSetProduct} disableLoading={disableLoading} enableLoading={enableLoading} />
        </main>
    );
};
