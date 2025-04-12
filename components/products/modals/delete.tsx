'use client'

import { deleteProduct } from "@/app/actions/products/deleteProduct"
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
import { useState } from "react"

type DeleteProps = {
  id: string
}

export const Delete = ({ id }: DeleteProps) => {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false)

  const handleDisableModal = () => setIsModalOpen(false)

  const handleDelete = async () => await deleteProduct(id)

  return (
    <Dialog open={isModalOpen} onOpenChange={(open) => { setIsModalOpen(open) }}>

      <DialogTrigger asChild>
        <Button variant="destructive" size="icon" className="hover:cursor-pointer">
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
          <Button onClick={handleDelete} className="hover:cursor-pointer">
            Sim
          </Button>
          <Button onClick={handleDisableModal} className="hover:cursor-pointer">
            Não
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
