"use client"

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { FC, useEffect, useState } from "react"
import { getProducts } from "@/services/products/getProducts"
import { Loader2, Eye } from "lucide-react"
import { CreateOrEdit } from "./modals/createOrEdit"
import { SimpleSale } from "@/types/Sale/simple"
import { Error } from "@/components/common/error"
import { getSimpleSale } from "@/services/sale/simple/getSimpleSale"

type SimpleSaleTableProps = {
    sale: SimpleSale[]
    isLoading: boolean
    isCardView: boolean
    handleSetSale: (sale: SimpleSale[]) => void
    disableLoading: () => void
    enableLoading: () => void
}

export const SimpleSaleTable: FC<SimpleSaleTableProps> = ({
    sale,
    isLoading,
    isCardView,
    handleSetSale,
    enableLoading,
    disableLoading,
}) => {
    const headers = ['Produto', 'Quantidade', 'Forma de Pagamento', 'Ações']
    const fields: (keyof SimpleSale)[] = ['produto', 'quantity', 'payment']

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
                const lstSimpleSale = await getSimpleSale();
                handleSetSale(lstSimpleSale || []);
            } finally {
                disableLoading();
            }
        };
    
        fetchProducts();
    }, [enableLoading, disableLoading, handleSetSale]); 
    

    const pageNumbers = Array.from({ length: Math.ceil(sale.length / itemsPerPage) }, (_, i) => i + 1)

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
                                                {field === 'produto' ? item.produto.name : item[field]}
                                            </TableCell>
                                        ))}
                                        <TableCell className="p-3">
                                            <div className="flex gap-2 justify-center">
                                                <CreateOrEdit isEdit={true} item={item} enableLoading={enableLoading} disableLoading={disableLoading} handleSetSale={handleSetSale}/>
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
                                <h3 className="font-semibold text-lg">{item.produto.name}</h3>
                                <div className="mt-3 text-sm">
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Unidade:</strong> {item.payment}</p>
                                </div>
                                <div className="mt-4 flex gap-3 justify-center">
                                    <CreateOrEdit isEdit={true} item={item} enableLoading={enableLoading} disableLoading={disableLoading} handleSetSale={handleSetSale}/>
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
