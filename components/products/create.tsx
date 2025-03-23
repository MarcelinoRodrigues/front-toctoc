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
import { Input } from "../ui/input"
import { Plus } from "lucide-react"
import { createProduct } from "@/services/products/createProduct"
import { getProducts } from "@/services/products/getProducts"
import { Product, ProductState } from "@/types/Product/types"
import { ValidatorError } from "../common/validator-error"

type CreateProps = {
  disableLoading: () => void
  enableLoading: () => void
  handleSetProduct: (products: Product[]) => void
}

export const Create: FC<CreateProps> = ({
  enableLoading,
  disableLoading,
  handleSetProduct,
}) => {
  const [errors, setErrors] = useState<{ [key: string]: string }>({})
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)
  const [product, setProduct] = useState<ProductState>({
    name: "",
    quantity: 0,
    description: "",
    unitMeasure: "",
    amount: 0,
  })

  const resetProduct = () => {
    setProduct({
      name: "",
      quantity: 0,
      description: "",
      unitMeasure: "",
      amount: 0,
    })
    setErrors({})
  }

  const validateRequiredFields = (product: ProductState) => {
    const errors: { [key: string]: string } = {}

    const requiredFields = ['name', 'quantity', 'amount']

    requiredFields.forEach(field => {
      if (!product[field as keyof ProductState] ||
        (['quantity', 'amount'].includes(field) && Number(product[field as keyof ProductState]) <= 0)) {
        errors[field] = "Campo obrigatório ou inválido!"
      }
    })

    return errors
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setProduct((prev) => ({ ...prev, [name]: value }))

    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors }
      if (!value || (['quantity', 'amount'].includes(name) && Number(value) <= 0)) {
        newErrors[name] = "Campo obrigatório ou inválido!"
      } else {
        delete newErrors[name]
      }
      return newErrors
    })
  }

  const handleCreateProduct = async () => {
    const validationErrors = validateRequiredFields(product)

    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors)
      return
    }

    setIsModalOpen(false)
    resetProduct()
    enableLoading()
    const response = await createProduct(product)
    disableLoading()

    if (response && response.mensagem === "Produto cadastrado com sucesso!") {
      const productList = await getProducts()
      handleSetProduct(productList || [])
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open) }}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-1 hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
          <Plus />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Cadastrar produto</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <ValidatorError validator={errors.name} error={errors.name}/>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="name" className="text-right">Nome</label>
            <Input
              name="name"
              value={product.name}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <ValidatorError validator={errors.quantity} error={errors.quantity}/>
          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="quantity" className="text-right">Quantidade</label>
            <Input
              name="quantity"
              value={product.quantity}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>

          <ValidatorError validator={errors.amount} error={errors.amount}/>
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

          <div className="grid grid-cols-4 items-center gap-4">
            <label htmlFor="unitMeasure" className="text-right">Unidade de Medida</label>
            <Input
              name="unitMeasure"
              value={product.unitMeasure}
              onChange={handleChange}
              className="col-span-3"
            />
          </div>
        </div>
        <DialogFooter>
          <Button className="hover:cursor-pointer" onClick={handleCreateProduct}>
            Criar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
