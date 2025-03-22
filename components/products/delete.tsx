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
import { Trash } from "lucide-react"
import { getProducts } from "@/services/products/getProducts"
import { Product } from "@/types/Product/types"
import { deleteProduct } from "@/services/products/deleteProduct"

type DeleteProps = {
  id: string
  disableLoading: () => void
  enableLoading: () => void
  handleSetProduct: (products: Product[]) => void
}

export const Delete: FC<DeleteProps> = ({
  id,
  enableLoading,
  disableLoading,
  handleSetProduct
}) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleDisableModal = () => setIsModalOpen(false)

  const handleDeleteProduct = async () => {
    setIsModalOpen(false)
    enableLoading()
    const response = await deleteProduct(id)
    disableLoading()

    if (response && response.mensagem === "Produto Excluido com sucesso!") {
      const productList = await getProducts()
      handleSetProduct(productList || [])
    }
  }

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open) }}>
      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="hover:cursor-pointer" onClick={() => setIsModalOpen(true)}>
            <Trash className="text-lg" />
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Excluir produto?</DialogTitle>
        </DialogHeader>
        <div className="grid gap-4 py-4">
            <p>Tem certeza que deseja excluir esse produto?</p>
        </div>
        <DialogFooter>
          <Button className="hover:cursor-pointer" onClick={handleDeleteProduct}>
            Sim
          </Button>
          <Button className="hover:cursor-pointer" onClick={handleDisableModal}>
            Não
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
