"use client"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { FC, useEffect } from "react"
import { Product } from "@/types/Product/types"
import { getProducts } from "@/services/products/getProducts"
import { Loader2 } from "lucide-react"
import { Error } from "../common/error"
import { Delete } from "./delete"
import { CreateOrEdit } from "./modals/createOrEdit"

type ProductTableProps = {
  products: Product[]
  isLoading: boolean
  handleSetProduct: (product: Product[]) => void
  disableLoading: () => void
  enableLoading: () => void
}

export const ProductTable: FC<ProductTableProps> = ({
  products,
  isLoading,
  handleSetProduct,
  enableLoading,
  disableLoading,
}) => {
  const headers = ['Nome', 'Valor', 'Descrição', 'Ações']
  const fields: (keyof Product)[] = ['name', 'amount', 'description']

  useEffect(() => {
    const fetchProducts = async () => {
      enableLoading();
      try {
        const productList = await getProducts();
        handleSetProduct(productList || []);
      } finally {
        disableLoading();
      }
    };

    fetchProducts();
  }, [enableLoading, disableLoading, handleSetProduct]);

  return (
    <div className="flex flex-col gap-6 p-1 h-[31rem]">
      <div className="overflow-x-auto flex-grow">
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
            ) : products.length === 0 ? (
              <tr>
                <td colSpan={headers.length} className="text-center p-4">
                  <Error />
                </td>
              </tr>
            ) : (
              products.map((item) => (
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
                      <CreateOrEdit isEdit={true} item={item} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct} />
                      <Delete id={item.id} enableLoading={enableLoading} disableLoading={disableLoading} handleSetProduct={handleSetProduct} />
                    </div>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
