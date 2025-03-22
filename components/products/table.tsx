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
import { Product } from "@/types/Product/types"
import { getProducts } from "@/services/products/getProducts"
import { Loader2, Edit, Eye, Trash } from "lucide-react"
import { Error } from "../common/error"
import { Delete } from "./delete"

type ProductTableProps = {
    products: Product[]
    isLoading: boolean
    isCardView: boolean
    handleSetProduct: (product: Product[]) => void
    disableLoading: () => void
    enableLoading: () => void
}

export const ProductTable: FC<ProductTableProps> = ({
    products,
    isLoading,
    isCardView,
    handleSetProduct,
    enableLoading,
    disableLoading,
}) => {
    const headers = ['Nome', 'Quantidade', 'Descrição', 'UM', 'Valor', 'Ações']
    const fields: (keyof Product)[] = ['name', 'quantity', 'description', 'unitMeasure', 'amount']

    const [currentPage, setCurrentPage] = useState(1)
    const [itemsPerPage] = useState(6)

    const indexOfLastItem = currentPage * itemsPerPage
    const indexOfFirstItem = indexOfLastItem - itemsPerPage
    const currentItems = products.slice(indexOfFirstItem, indexOfLastItem)

    const paginate = (pageNumber: number) => setCurrentPage(pageNumber)

    useEffect(() => {
        const fetchProducts = async () => {
            enableLoading()
            const productList = await getProducts()
            handleSetProduct(productList || [])
            disableLoading()
        }

        fetchProducts()
    }, [])

    const pageNumbers = []
    for (let i = 1; i <= Math.ceil(products.length / itemsPerPage); i++) {
        pageNumbers.push(i)
    }

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
                            {isLoading && (
                                <tr className="h-96">
                                    <td colSpan={6} className="p-4">
                                        <div className="flex h-full items-center justify-center">
                                            <Loader2 size={45} className="animate-spin text-gray-500" />
                                        </div>
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
                            {!isLoading && products.length > 0 && currentItems.map((item) => (
                                <TableRow key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                    {fields.map((field, index) => (
                                        <TableCell
                                            key={index}
                                            className={`p-3 text-center ${index === 0 ? 'font-medium' : ''}`}
                                        >
                                            {item[field]}
                                        </TableCell>
                                    ))}
                                    <TableCell className="p-3">
                                        <div className="flex gap-2 justify-center">
                                            <Button variant="outline" size="icon">
                                                <Edit className="text-lg" />
                                            </Button>
                                            <Button variant="outline" size="icon">
                                                <Eye className="text-lg" />
                                            </Button>
                                            <Delete id={item.id} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct}/>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                )}

                {isCardView && (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {!isLoading && products.length === 0 && <Error />}
                        {!isLoading && products.length > 0 && currentItems.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-semibold text-lg">{item.name}</h3>
                                <p className="text-gray-600 text-sm">{item.description}</p>
                                <div className="mt-3 text-sm">
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Unidade:</strong> {item.unitMeasure}</p>
                                    <p><strong>Valor:</strong> R${item.amount}</p>
                                </div>
                                <div className="mt-4 flex gap-3 justify-center">
                                    <Button variant="outline" size="icon">
                                        <Edit className="text-lg" />
                                    </Button>
                                    <Button variant="outline" size="icon">
                                        <Eye className="text-lg" />
                                    </Button>
                                    <Delete id={item.id} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct}/>
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
                                className="hover:cursor-pointer"
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
                                    className={`hover:cursor-pointer ${currentPage === number ? 'bg-gray-900 text-white hover:bg-gray-900 hover:text-white' : ''}`}
                                >
                                    {number}
                                </Button>
                            </li>
                        ))}
                        <li>
                            <Button
                                variant="outline"
                                className="hover:cursor-pointer"
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
