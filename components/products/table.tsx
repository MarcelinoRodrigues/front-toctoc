"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Footer } from "../common/table-footer";
import { useEffect, useState, useMemo } from "react";
import { Product } from "@/types/Product/types";
import { useTimeOutLoad } from "@/hooks/useTimeOutLoad";
import { getProducts } from "@/services/products/getProducts";
import { Loader2 } from "lucide-react";
import { Card, CardTitle } from "../ui/card";

export const ProductTable = () => {
    const headers = ['Nome', 'Quantidade', 'Descrição', 'UM', 'Valor'];
    const fields: (keyof Product)[] = ['name', 'quantity', 'description', 'unitMeasure', 'amount'];

    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    const disableLoading = () => setIsLoading(false)

    useTimeOutLoad(isLoading, disableLoading);

    useEffect(() => {
        const fetchProducts = async () => {
            setIsLoading(true);
            const productList = await getProducts();
            setProducts(productList || []);
            setIsLoading(false);
        };

        fetchProducts();
    }, []);

    const totalAmount = useMemo(() =>
        products.reduce((sum, item) => sum + item.amount, 0),
        [products]
    );

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {headers.map((headerName, index) => (
                        <TableHead key={index}>{headerName}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {isLoading ? (
                    <tr>
                        <td colSpan={headers.length} className="text-center p-4">
                            <Loader2 className="animate-spin mx-auto" />
                        </td>
                    </tr>
                ) : products.length === 0 ? (
                    <tr>
                        <td colSpan={headers.length} className="text-center p-4">
                            <Card>
                                <CardTitle>Nenhum Resultado encontrado</CardTitle>
                            </Card>
                        </td>
                    </tr>
                ) : (
                    products.map((item) => (
                        <TableRow key={item.id}>
                            {fields.map((field, index) => (
                                <TableCell key={index} className={index === 0 ? 'font-medium' : ''}>
                                    {item[field]}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))
                )}
            </TableBody>
            <Footer col={4} total={totalAmount} />
        </Table>
    );
};
