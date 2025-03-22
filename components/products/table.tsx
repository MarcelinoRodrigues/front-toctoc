"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { FC, useEffect } from "react";
import { Product } from "@/types/Product/types";
import { getProducts } from "@/services/products/getProducts";
import { Loader2, Edit, Eye, Trash } from "lucide-react";
import { Error } from "../common/error";

type ProductTableProps = {
    products: Product[]
    isLoading: boolean
    handleSetProduct: (product: Product[]) => void
    disableLoading: () => void
    enableLoading: () => void
}

export const ProductTable: FC<ProductTableProps> = ({ products, isLoading, handleSetProduct, enableLoading, disableLoading }) => {
    const headers = ['Nome', 'Quantidade', 'Descrição', 'UM', 'Valor', 'Ações'];
    const fields: (keyof Product)[] = ['name', 'quantity', 'description', 'unitMeasure', 'amount'];

    useEffect(() => {
        const fetchProducts = async () => {
            enableLoading()
            const productList = await getProducts();
            handleSetProduct(productList || []);
            disableLoading()
        };

        fetchProducts();
    }, []);

    return (
        <Table className="w-full border border-gray-200 rounded-lg shadow-sm overflow-auto">
            <TableHeader className="bg-gray-100 text-gray-700 uppercase text-sm">
                <TableRow>
                    {headers.map((headerName, index) => (
                        <TableHead key={index} className="p-3 border-b text-center">
                            {headerName}
                        </TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody className="bg-white">
                {isLoading && (
                    <tr>
                        <td colSpan={headers.length} className="text-center p-4">
                            <Loader2 className="animate-spin mx-auto size-7 text-gray-500" />
                        </td>
                    </tr>
                )}
                {!isLoading && products.length === 0 && (
                    <tr>
                        <td colSpan={headers.length} className="text-center p-4">
                            <Error />
                        </td>
                    </tr>
                )}
                {!isLoading && products.length > 0 && (products.map((item) => (
                    <TableRow
                        key={item.id}
                        className="border-b hover:bg-gray-50 transition-colors"
                    >
                        {fields.map((field, index) => (
                            <TableCell key={index} className={`p-3 text-center ${index === 0 ? 'font-medium' : ''}`}>
                                {item[field]}
                            </TableCell>
                        ))}
                        <TableCell className="p-3">
                            <div className="flex gap-2 justify-center">
                                <Button variant="outline" size="icon">
                                    <Edit className="size-4" />
                                </Button>
                                <Button variant="outline" size="icon">
                                    <Eye className="size-4" />
                                </Button>
                                <Button variant="destructive" size="icon">
                                    <Trash className="size-4" />
                                </Button>
                            </div>
                        </TableCell>
                    </TableRow>
                )))}
            </TableBody>
        </Table>
    );
};
