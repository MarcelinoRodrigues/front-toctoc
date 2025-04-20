'use client'

import { useState, useTransition } from "react"
import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Loader2, Edit } from "lucide-react"
import { handleEditProduct } from "@/app/actions/products/editProduct"

type EditModalProps = {
  product: {
    id: string
    name: string
    amount: number
    description?: string
  },
  onCreateSuccess: () => void
}

export const EditModal = ({ product, onCreateSuccess }: EditModalProps) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState<boolean>(false)

  const submitForm = async (formData: FormData) => {
    startTransition(async () => {
      await handleEditProduct(formData, product.id)
      setOpen(false)
      onCreateSuccess()
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="outline"
          className="mb-1 hover:cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <Edit />
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto w-[90%]" removeClose={isPending}>
        {
          isPending ? (
            <div className="m-auto p-10">
              <Loader2 className="animate-spin" height={50} width={50} />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Editar produto</DialogTitle>
              </DialogHeader>
              <form action={submitForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Nome</label>
                  <input
                    type="text"
                    name="name"
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue={product.name}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Valor</label>
                  <input
                    type="number"
                    name="amount"
                    required
                    defaultValue={product.amount}
                    min={1}
                    className="mt-1 w-full border px-3 py-2 rounded"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Descrição</label>
                  <input
                    type="text"
                    name="description"
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue={product.description}
                  />
                </div>


                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit" disabled={isPending}>
                    Salvar
                  </Button>
                  <Button type="button" onClick={() => setOpen(false)} variant="outline">
                    Cancelar
                  </Button>
                </div>
              </form>
            </>
          )
        }
      </DialogContent >
    </Dialog >
  )
}
