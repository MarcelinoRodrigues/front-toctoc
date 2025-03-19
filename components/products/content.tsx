"use client";

import { Create } from "./create";
import { ProductTable } from "./table";
import { useAuth } from "@/hooks/useAuth";

export const Content = () => {
    useAuth();

    return (
        <main className="size-full p-4">
            <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
            <Create/>
            <ProductTable/>
        </main>
    );
};
