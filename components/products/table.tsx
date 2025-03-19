import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Product, ProductTableProps } from "@/types/Product/types";
import { FC } from "react";
import { Footer } from "../common/table-footer";

export const ProductTable: FC<ProductTableProps> = ({ products }) => {
    const totalAmount = products.reduce((sum, item) => sum + item.amount, 0);

    const header = ['Nome', 'Quantidade', 'Descrição', 'UM', 'Valor']
    const row = ['name', 'quantity', 'description', 'unitMeasure', 'amount']

    return (
        <Table>
            <TableHeader>
                <TableRow>
                    {header.map((headerName, index) => (
                        <TableHead key={index}>{headerName}</TableHead>
                    ))}
                </TableRow>
            </TableHeader>
            <TableBody>
                {products.map((item) => (
                    <TableRow key={item.id}>
                        {row.map((field, index) => (
                            <TableCell key={index} className={index === 0 ? 'font-medium' : ''}>
                                {(item as Record<keyof Product, string | number>)[field as keyof Product]}
                            </TableCell>
                        ))}
                    </TableRow>
                ))}
            </TableBody>
            <Footer col={4} total={totalAmount}/>
        </Table>
    )
}
