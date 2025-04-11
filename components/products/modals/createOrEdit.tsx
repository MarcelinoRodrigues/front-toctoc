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
import { createProduct } from "@/services/products/createProduct"
import { updateProduct } from "@/services/products/updateProduct"
import { getProducts } from "@/services/products/getProducts"
import { Product, ProductState } from "@/types/Product/types"
import { ValidatorError } from "@/components/common/validator-error"
import { Input } from "@/components/ui/input"
import { validateRequiredFields } from "@/utils/products"

type CreateOrEditProps = {
    item?: Product
    isEdit?: boolean
    disableLoading: () => void
    enableLoading: () => void
    handleSetProduct: (products: Product[]) => void
}

export const CreateOrEdit: FC<CreateOrEditProps> = ({
    item,
    isEdit = false,
    enableLoading,
    disableLoading,
    handleSetProduct,
}) => {
    const [errors, setErrors] = useState<{ [key: string]: string }>({})
    const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
    const [product, setProduct] = useState<ProductState>({
        name: "",
        description: "",
        amount: 0,
    })

    useEffect(() => {
        if (item) {
            setProduct({
                name: item.name || "",
                description: item.description || "",
                amount: item.amount || 0,
            });
        }
    }, [item]);

    const resetProduct = () => {
        setProduct({
            name: "",
            description: "",
            amount: 0,
        })
        setErrors({})
    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        setProduct((prev) => ({ ...prev, [name]: value }))

        setErrors((prevErrors) => {
            const newErrors = { ...prevErrors }
            if (!value || (["amount"].includes(name) && Number(value) <= 0)) {
                newErrors[name] = "Campo obrigatório ou inválido!"
            } else {
                delete newErrors[name]
            }
            return newErrors
        })
    }

    const handleSubmit = async () => {
        const validationErrors = validateRequiredFields(product)
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors)
            return
        }

        setIsModalOpen(false)
        enableLoading()

        if (isEdit && item) {
            await updateProduct({ id: item.id, product });
        } else {
            await createProduct(product)
        }

        disableLoading()
        resetProduct()
        const productList = await getProducts()
        handleSetProduct(productList || [])
    }

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
                    <DialogTitle>{isEdit ? "Editar produto" : "Cadastrar produto"}</DialogTitle>
                </DialogHeader>
                <div className="grid gap-4 py-4">
                    <ValidatorError validator={errors.name} error={errors.name} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="name" className="text-right">Nome</label>
                        <Input
                            name="name"
                            value={product.name}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    <ValidatorError validator={errors.amount} error={errors.amount} />
                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="amount" className="text-right">Preço</label>
                        <Input
                            name="amount"
                            value={product.amount}
                            onChange={handleChange}
                            className="col-span-3"
                        />
                    </div>

                    <div className="grid grid-cols-4 items-center gap-4">
                        <label htmlFor="description" className="text-right">Descrição</label>
                        <Input
                            name="description"
                            value={product.description}
                            onChange={handleChange}
                            className="col-span-3"
                        />
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
