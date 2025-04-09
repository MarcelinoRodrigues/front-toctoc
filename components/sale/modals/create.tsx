'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { handleCreteSale } from "@/app/actions/CreateSale"
import { Loader2, Plus } from "lucide-react"

export const CreateSaleDialog = () => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()

  const submitForm = (formData: FormData) => {
    startTransition(async () => {
      await handleCreteSale(formData)
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-1 hover:cursor-pointer">
          <Plus />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto" removeClose={isPending}>
        {
          isPending ? (
            <div className="m-auto p-10">
              <Loader2 className="animate-spin" height={50} width={50} />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Nova Venda</DialogTitle>
              </DialogHeader>
              <form action={submitForm} className="space-y-4">

                <div>
                  <label className="block text-sm font-medium">Produto ID</label>
                  <input
                    type="text"
                    name="productId"
                    required
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue="3fa85f64-5717-4562-b3fc-2c963f66afa6"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Quantidade</label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    className="mt-1 w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Preço</label>
                  <input
                    type="number"
                    name="amount"
                    required
                    className="mt-1 w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Desconto</label>
                  <input
                    type="number"
                    name="discount"
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Custo adicional</label>
                  <input
                    type="number"
                    name="additionalCost"
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue={0}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Pagamento</label>
                  <input
                    type="text"
                    name="payment"
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue="credit"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Origem</label>
                  <input
                    type="text"
                    name="origin"
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue="n/a"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Observação</label>
                  <input
                    type="text"
                    name="observation"
                    className="mt-1 w-full border px-3 py-2 rounded"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium">Unidade de Medida</label>
                  <input
                    type="text"
                    name="unitMeasure"
                    required
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue="UN"
                  />
                </div>
                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit" disabled={isPending} className="hover:cursor-pointer">
                    Criar
                  </Button>
                </div>
              </form>
            </>
          )
        }
      </DialogContent>
    </Dialog>
  )
}
