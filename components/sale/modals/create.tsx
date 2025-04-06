import { FC, useState } from "react"
import { Button } from "@/components/ui/button"
import {
    Dialog,
    DialogContent,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Plus } from "lucide-react"
import { getProducts } from "@/services/products/getProducts"
import { validateRequiredSaleFields } from "@/lib/utils"
import { ValidatorError } from "@/components/common/validator-error"
import { Input } from "@/components/ui/input"
import { Sale, SaleState } from "@/types/Sale/types"

type CreateProps = {
    disableLoading: () => void
    enableLoading: () => void
    handleSetSale: (sale: Sale[]) => void
}

export const Create: FC<CreateProps> = ({
    enableLoading,
    disableLoading,
    handleSetSale,
}) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [sale, setSale] = useState<SaleState>({
        productId: 0,
        quantity: 0,
        payment: '',
        discount: null,
        amount: 0,
        origin: null,
        observation: null,
        additionalCost: null,
        unitMeasure: null
    })

    const resetProduct = () => {
        setSale({
            productId: 0,
            quantity: 0,
            payment: '',
            discount: null,
            amount: 0,
            origin: null,
            observation: null,
            additionalCost: null,
            unitMeasure: null
        })
        setErrors({})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setSale((prev) => ({ ...prev, [name]: value }))

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            if (!value || (["quantity", "amount"].includes(name) && Number(value) <= 0)) {
                newErrors[name] = "Campo obrigatório ou inválido!"
            } else {
                delete newErrors[name]
            }
            return newErrors
        })
    }

    const handleSubmit = async () => {
        const validationErrors = validateRequiredSaleFields(sale)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsModalOpen(false)
        enableLoading()

        //await createProduct(sale)

        disableLoading()
        resetProduct()
        const productList = await getProducts()
        handleSetSale(productList || [])
    }

    return (
        <Dialog open={isModalOpen} onOpenChange={setIsModalOpen}>
            <DialogTrigger asChild>
                <Button
                    variant="outline"
                    className="mb-1 hover:cursor-pointer"
                    onClick={() => setIsModalOpen(true)}
                >
                    <Plus />
                </Button>
            </DialogTrigger>
            <DialogContent className="sm:max-w-[425px]">
                <DialogHeader>
                    <DialogTitle>Criar venda</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ValidatorError validator={errors.name} error={errors.name} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">Nome</label>
                        <Input
                            name="name"
                            //value={sale.name}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    <ValidatorError validator={errors.quantity} error={errors.quantity} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="quantity" className="text-right">Quantidade</label>
                        <Input
                            name="quantity"
                            value={sale.quantity}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    <ValidatorError validator={errors.amount} error={errors.amount} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="amount" className="text-right">Preço</label>
                        <Input
                            name="amount"
                            value={sale.amount}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="observation" className="text-right">Observação</label>
                        <Input
                            name="observation"
                            value={sale.observation ?? ''}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="unitMeasure" className="text-right">Unidade de Medida</label>
                        <Input
                            name="unitMeasure"
                            value={sale.unitMeasure ?? ''}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>
                </div>
                <DialogFooter>
                    <Button className="hover:cursor-pointer" onClick={handleSubmit}>
                        Criar
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
