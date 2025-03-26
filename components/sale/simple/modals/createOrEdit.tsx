import { FC, useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Edit, Plus } from "lucide-react"
import { getProducts } from "@/services/products/getProducts"
import { ValidatorError } from "@/components/common/validator-error"
import { Input } from "@/components/ui/input"
import { CreateOrEditProps, ProductSelect, RequestAPI, SimpleSaleRequest, SimpleSaleState } from "@/types/Sale/simple"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { defaultProduct } from "@/lib/utils"
import { createSimpleSale } from "@/services/sale/simple/createSimpleSale"

export const CreateOrEdit: FC<CreateOrEditProps> = ({
    item,
    isEdit = false,
    enableLoading,
    disableLoading,
    handleSetSale,
}) => {
    const payments = ["credito", "debito", "pix"]
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [products, setProducts] = useState<{ id: string, name: string }[]>([])
    const [sale, setSale] = useState<SimpleSaleState>({
        produto: { id: "", productName: "" }, 
        payment: "pix",
        quantity: 0,
    });

    useEffect(() => {
        if (item) {
            setSale({
                produto: item.produto || { id: "", productName: "" },
                payment: item.payment || 'pix',
                quantity: item.quantity || 0,
            });
        }
    }, [item]);

    useEffect(() => {
        const fetchProducts = async () => {
            const productList = await getProducts()
            if (productList) {
                setProducts(productList)
            }
        }
        if (isModalOpen) fetchProducts()
    }, [isModalOpen])

    const handleProductChange = (productId: string) => {
        setSale((prev) => ({
            ...prev,
            produto: { ...prev.produto, id: productId },
        }));
    };

    const resetSale = () => {
        setSale({
            produto: { id: "", productName: "" },
            payment: "pix",
            quantity: 0,
        })
        setErrors({})
    }

    const paymentMapping: Record<string, number> = {
        "credit": 1,
        "debit": 2,
        "pix": 0
    };
    
    const handleSubmit = async () => {
        setIsModalOpen(false);
        enableLoading();

        const saleRequest = {
            productId: sale.produto.id,
            quantity: sale.quantity,
            payment: paymentMapping[sale.payment],
        } as RequestAPI;
    
        if (isEdit && item) {
            //await updateProduct({ id: item.id, product });
        } else {
            await createSimpleSale(saleRequest);
        }

        disableLoading()
        resetSale();
        const saleList = await getProducts();
        handleSetSale(saleList || []);
    };

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="mb-1 hover:cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    {isEdit ? <Edit className="text-lg" /> : <Plus />}
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>{isEdit ? "Editar venda" : "Cadastrar venda"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ValidatorError validator={errors.name} error={errors.name} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">Produto</label>
                        <div className="col-span-3">
                            <Select onValueChange={handleProductChange} value={sale.produto.id || ""}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione um produto" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2 overflow-y-auto max-h-60">
                                        {products.map((product) => (
                                            <SelectItem key={product.id} value={product.id}>
                                                {product.name}
                                            </SelectItem>
                                        ))}
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                    <ValidatorError validator={errors.quantity} error={errors.quantity} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="quantity" className="text-right">Quantidade</label>
                        <Input
                            name="quantity"
                            value={sale.quantity}
                            onChange={(e) => setSale((prev) => ({ ...prev, quantity: Number(e.target.value) }))}
                            className="col-span-3"
                        />
                    </div>
                    <ValidatorError validator={errors.payment} error={errors.payment} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="payment" className="text-right">Pagamento</label>
                        <div className="col-span-3">
                            <Select onValueChange={(value) => setSale(prev => ({
                                ...prev,
                                payment: value as "credit" | "debit" | "pix"
                            }))} value={sale.payment}>
                                <SelectTrigger className="w-full">
                                    <SelectValue placeholder="Selecione a forma de pagamento" />
                                </SelectTrigger>
                                <SelectContent>
                                    <div className="p-2 overflow-y-auto max-h-60">
                                        {payments.map((paymentOption) => (
                                            <SelectItem key={paymentOption} value={paymentOption}>
                                                {paymentOption.charAt(0).toUpperCase() + paymentOption.slice(1)} {/* Capitaliza a primeira letra */}
                                            </SelectItem>
                                        ))}
                                    </div>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>
                </div>
                <DialogFooter>
                    <Button className="hover:cursor-pointer" onClick={handleSubmit}>
                        {isEdit ? "Salvar" : "Criar"}
                    </Button>
                    {isEdit && (
                        <Button className="hover:cursor-pointer" onClick={() => setIsModalOpen(false)}>
                            Cancelar
                        </Button>
                    )}
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
