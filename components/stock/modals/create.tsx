'use client'

import { useEffect, useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Plus } from "lucide-react"
import { getProducts } from "@/services/products/getProducts"
import { handleCreteStock } from "@/app/actions/stock/createStock"

export const CreateStockDialog = () => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [products, setProducts] = useState<SelectProduct[]>([])
  const [unitAmount, setUnitAmount] = useState<number | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const totalAmount = unitAmount !== null ? unitAmount * quantity : null

  useEffect(() => {
    const fetchProducts = async () => {
      const data = await getProducts()
      if (data) setProducts(data)
    }
    fetchProducts()
  }, [])

  const submitForm = (formData: FormData) => {
    startTransition(async () => {
      await handleCreteStock(formData)
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

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto w-[90%]" removeClose={isPending}>
        {
          isPending ? (
            <div className="m-auto p-10">
              <Loader2 className="animate-spin" height={50} width={50} />
            </div>
          ) : (
            <>
              <DialogHeader>
                <DialogTitle>Nova Entrada de Estoque</DialogTitle>
              </DialogHeader>
              <form action={submitForm} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium">Produto</label>
                  <select
                    name="productId"
                    required
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue=""
                    onChange={(e) => {
                      const selectedProduct = products.find(p => p.id === e.target.value)
                      if (selectedProduct) {
                        setUnitAmount(selectedProduct.amount)
                      } else {
                        setUnitAmount(null)
                      }
                    }}
                  >
                    <option value="" disabled>Selecione um produto</option>
                    {products.map((product) => (
                      <option key={product.id} value={product.id}>
                        {product.name}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium">Tipo de movimentação</label>
                  <input
                    type="text"
                    className="mt-1 w-full border px-3 py-2 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                    value="Entrada"
                    readOnly
                  />
                  <input type="hidden" name="type" value="In" />
                </div>

                <div>
                  <label className="block text-sm font-medium">Quantidade</label>
                  <input
                    type="number"
                    name="quantity"
                    required
                    value={quantity}
                    min={1}
                    className="mt-1 w-full border px-3 py-2 rounded"
                    onChange={(e) => setQuantity(Number(e.target.value))}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium">Valor</label>
                  <input
                    type="text"
                    className="mt-1 w-full border px-3 py-2 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                    value={totalAmount !== null ? `R$ ${totalAmount.toFixed(2).replace('.', ',')}` : ''}
                    readOnly
                  />
                  <input type="hidden" name="amount" value={totalAmount ?? ''} />
                </div>

                <div className="flex justify-end space-x-2 pt-4">
                  <Button type="submit" disabled={isPending}>
                    Criar
                  </Button>
                  <Button type="button" onClick={() => setOpen(false)} variant="outline">
                    Cancelar
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
