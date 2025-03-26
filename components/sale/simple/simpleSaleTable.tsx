"use client"

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
import { Loader2, Eye } from "lucide-react";
import { CreateOrEdit } from "./modals/createOrEdit";
import { ResponseProduct, SimpleSale } from "@/types/Sale/simple";
import { Error } from "@/components/common/error";
import { getSimpleSale } from "@/services/sale/simple/getSimpleSale";
import { GetProduct } from "@/types/Product/types";

type SimpleSaleTableProps = {
    sale: SimpleSale[];
    isLoading: boolean;
    isCardView: boolean;
    handleSetSale: (sale: SimpleSale[]) => void;
    disableLoading: () => void;
    enableLoading: () => void;
};

const HEADERS = ['Produto', 'Quantidade', 'Forma de Pagamento', 'Ações'];
const FIELDS: (keyof ResponseProduct)[] = ['productName', 'quantity', 'payment'];

export const SimpleSaleTable: FC<SimpleSaleTableProps> = ({
    sale,
    isLoading,
    isCardView,
    handleSetSale,
    enableLoading,
    disableLoading,
}) => {
    useEffect(() => {
        const fetchSales = async () => {
            enableLoading();
            try {
                const lstSimpleSale = await getSimpleSale();
                handleSetSale(lstSimpleSale || []);
            } finally {
                disableLoading();
            }
        };

        fetchSales();
    }, [enableLoading, disableLoading, handleSetSale]);

    if (isLoading) {
        return (
            <div className="flex justify-center items-center h-96">
                <Loader2 size={45} className="animate-spin text-gray-500" />
            </div>
        );
    }

    if (sale.length === 0) 
        return <Error />;

    console.log({sale})

    return (
        <div className="flex flex-col gap-6 p-1 h-[31rem]">
            <div className="overflow-x-auto flex-grow">
                {!isCardView ? (
                    <Table className="w-full border border-gray-200 rounded-lg shadow-sm">
                        <TableHeader className="bg-gray-100 text-gray-700 uppercase text-sm">
                            <TableRow>
                                {HEADERS.map((header, index) => (
                                    <TableHead key={index} className="p-3 border-b text-center">
                                        {header}
                                    </TableHead>
                                ))}
                            </TableRow>
                        </TableHeader>
                        <TableBody className="bg-white">
                            {sale.map((item) => (
                                <TableRow key={item.id} className="border-b hover:bg-gray-50 transition-colors">
                                    {FIELDS.map((field, index) => (
                                        <TableCell
                                            key={index}
                                            className={`p-3 text-center ${index === 0 ? 'font-medium' : ''}`}
                                        >
                                            {field === 'productName' ? item?.productName : item[field]}
                                        </TableCell>
                                    ))}
                                    <TableCell className="p-3">
                                        <div className="flex gap-2 justify-center">
                                            <CreateOrEdit
                                                isEdit={true}
                                                item={item}
                                                enableLoading={enableLoading}
                                                disableLoading={disableLoading}
                                                handleSetSale={handleSetSale}
                                            />
                                            <Button variant="outline" size="icon">
                                                <Eye className="text-lg" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                ) : (
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {sale.map((item) => (
                            <div
                                key={item.id}
                                className="border border-gray-200 rounded-lg p-4 bg-white shadow-sm hover:shadow-lg transition-shadow"
                            >
                                <h3 className="font-semibold text-lg">{item.productName}</h3>
                                <div className="mt-3 text-sm">
                                    <p><strong>Quantidade:</strong> {item.quantity}</p>
                                    <p><strong>Unidade:</strong> {item.payment}</p>
                                </div>
                                <div className="mt-4 flex gap-3 justify-center">
                                    <CreateOrEdit
                                        isEdit={true}
                                        item={item}
                                        enableLoading={enableLoading}
                                        disableLoading={disableLoading}
                                        handleSetSale={handleSetSale}
                                    />
                                    <Button variant="outline" size="icon">
                                        <Eye className="text-lg" />
                                    </Button>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};
