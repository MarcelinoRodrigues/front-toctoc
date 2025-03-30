"use client"

import { Sale } from "@/types/Sale/types"
import { FC, useEffect, useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "../ui/table"
import { Eye, Loader2 } from "lucide-react"
import { Error } from "../common/error"
import { Button } from "../ui/button"
import { getSale } from "@/services/sale/getSales"

type SaleTableProps = {
    sale: Sale[]
    isLoading: boolean
    isCardView: boolean
    handleSetSale: (sale: Sale[]) => void
    disableLoading: () => void
    enableLoading: () => void
}

export const SaleTable: FC<SaleTableProps> = ({
    sale,
    isLoading,
    isCardView,
    handleSetSale,
    enableLoading,
    disableLoading,
}) => {
    const headers = ['Data', 'Produto', 'Quantidade', 'Valor', 'Desconto', 'Custo Adicional', 'Forma de Pagamento', 'Origem', 'Observação','Ações']
    const fields: (keyof Sale)[] = ['createDateTime', 'productName', 'quantity', 'amount', 'discount', 'additionalCost', 'payment', 'origin', 'observation']

    const [currentPage, setCurrentPage] = useState(1)
    const itemsPerPage = 6

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = sale.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => {
        if (pageNumber >= 1 && pageNumber <= Math.ceil(sale.length / itemsPerPage)) {
            setCurrentPage(pageNumber)
        }
    }

    useEffect(() => {
        const fetchProducts = async () => {
            enableLoading();
            try {
                const saleList = await getSale();
                handleSetSale(saleList || []);
            } finally {
                disableLoading();
            }
        };

        fetchProducts();
    }, [enableLoading, disableLoading, handleSetSale]);

    const pageNumbers = Array.from({ length: Math.ceil(sale.length / itemsPerPage) }, (_, i) => i + 1)

    const formatPayment = (value: number | string) => {
        const paymentMapping: Record<string, string> = {
            "0": "Credito",
            "credit": "Credito",
            "1": "Debito",
            "debit": "Debito",
            "2": "Pix",
            "pix": "Pix"
        }
    
        return paymentMapping[String(value).toLowerCase()] || value
    }

    const formatValue = (field: string, value: any) => {
        if (value === null) return "-"
    
        if (field.includes("createDateTime")) 
            return new Date(value).toLocaleDateString("pt-BR")

        if (field.toLowerCase() === "payment") 
            return formatPayment(value)
    
        if (["amount", "discount", "additionalCost"].includes(field)) {
            return new Intl.NumberFormat("pt-BR", {
                style: "currency",
                currency: "BRL",
            }).format(Number(value));
        }
    
        return value;
    };

    return (
        <div className="flex flex-col gap-6 p-1 h-[31rem]">
        <div className="overflow-x-auto flex-grow">
            {!isCardView && (
                <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
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
                        {isLoading ? (
                            <tr className="h-96">
                                <td colSpan={6} className="p-4">
                                    <div className="flex h-full items-center justify-center">
                                        <Loader2 size={45} className="animate-spin text-gray-500" />
                                    </div>
                                </td>
                            </tr>
                        ) : sale.length === 0 ? (
                            <tr>
                                <td colSpan={headers.length} className="text-center p-4">
                                    <Error />
                                </td>
                            </tr>
                        ) : (
                            currentItems.map((item) => (
                                <TableRow key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                    {fields.map((field, index) => (
                                        <TableCell
                                            key={index}
                                            className={`p-3 text-center ${index === 0 ? 'font-medium' : ''}`}
                                        >
                                            {formatValue(field, item[field])}
                                        </TableCell>
                                    ))}
                                    <TableCell className="p-3">
                                        <div className="flex gap-2 justify-center">
                                            {/* <CreateOrEdit isEdit={true} item={item} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct}/> */}
                                            <Button variant="outline" size="icon">
                                                <Eye className="text-lg" />
                                            </Button>
                                            {/* <Delete id={item.id} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct} /> */}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))
                        )}
                    </TableBody>
                </Table>
            )}

            {isCardView && (
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {!isLoading && sale.length === 0 && <Error />}
                    {!isLoading && sale.length > 0 && currentItems.map((item) => (
                        <div
                            key={item.id}
                            className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-shadow"
                        >
                            <h3 className="font-semibold text-lg">{item.productName}</h3>
                            <p className="text-gray-600 text-sm">{formatPayment(item.payment)}</p>
                            <div className="mt-3 text-sm">
                                <p><strong>Quantidade:</strong> {item.quantity}</p>
                                <p><strong>Unidade:</strong> {item.unitMeasure}</p>
                                <p><strong>Valor:</strong> R${item.amount}</p>
                            </div>
                            <div className="mt-4 flex gap-3 justify-center">
                                {/* <CreateOrEdit isEdit={true} item={item} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct}/> */}
                                <Button variant="outline" size="icon">
                                    <Eye className="text-lg" />
                                </Button>
                                {/* <Delete id={item.id} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct} /> */}
                            </div>
                        </div>
                    ))}
                </div>
            )}
        </div>
        <div className="flex justify-center mt-4">
            <nav>
                <ul className="flex items-center space-x-2">
                    <li>
                        <Button
                            variant="outline"
                            onClick={() => paginate(currentPage - 1)}
                            disabled={currentPage === 1}
                        >
                            Anterior
                        </Button>
                    </li>
                    {pageNumbers.map(number => (
                        <li key={number}>
                            <Button
                                variant="outline"
                                onClick={() => paginate(number)}
                                className={`hover:cursor-pointer ${currentPage === number ? 'bg-gray-900 text-white' : ''}`}
                            >
                                {number}
                            </Button>
                        </li>
                    ))}
                    <li>
                        <Button
                            variant="outline"
                            onClick={() => paginate(currentPage + 1)}
                            disabled={currentPage === pageNumbers.length}
                        >
                            Próximo
                        </Button>
                    </li>
                </ul>
            </nav>
        </div>
    </div>
    )
}