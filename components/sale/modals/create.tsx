'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, Plus, Settings } from "lucide-react"
import { handleCreteSale } from "@/app/actions/sale/CreateSale"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Product } from "@/types/Product/types"

interface CreateSaleDialogProps {
  products: Product[]
}

export const CreateSaleDialog = ({ products }: CreateSaleDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [unitAmount, setUnitAmount] = useState<number | null>(null)
  const [quantity, setQuantity] = useState<number>(1)

  const totalAmount = unitAmount !== null ? unitAmount * quantity : null

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

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto w-[90%]" removeClose={isPending}>
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
                  <label className="block text-sm font-medium">Preço</label>
                  <input
                    type="text"
                    className="mt-1 w-full border px-3 py-2 rounded bg-gray-100 text-gray-700 cursor-not-allowed"
                    value={totalAmount !== null ? `R$ ${totalAmount.toFixed(2).replace('.', ',')}` : ''}
                    readOnly
                  />
                  <input type="hidden" name="amount" value={totalAmount ?? ''} />
                </div>
                <div>
                  <label className="block text-sm font-medium">Pagamento</label>
                  <select
                    name="payment"
                    required
                    className="mt-1 w-full border px-3 py-2 rounded"
                    defaultValue="credit"
                  >
                    <option value="credit">Crédito</option>
                    <option value="debit">Débito</option>
                    <option value="pix">Pix</option>
                  </select>
                </div>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="opcionais">
                    <AccordionTrigger className="px-4 py-3 text-base font-semibold bg-muted hover:bg-muted/70 rounded-t-md flex items-center gap-2 hover:cursor-pointer">
                      <Settings className="h-4 w-4 text-muted-foreground" />
                      Campos opcionais
                    </AccordionTrigger>
                    <AccordionContent className="space-y-4">
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
                        <label className="block text-sm font-medium">Origem</label>
                        <input
                          type="text"
                          name="origin"
                          className="mt-1 w-full border px-3 py-2 rounded"
                          defaultValue="N/A"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Observação</label>
                        <input
                          type="text"
                          name="observation"
                          className="mt-1 w-full border px-3 py-2 rounded"
                          defaultValue="N/A"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium">Unidade de Medida</label>
                        <select
                          name="unitMeasure"
                          className="mt-1 w-full border px-3 py-2 rounded"
                          defaultValue="UN"
                        >
                          <option value="UN">Unidade (UN)</option>
                          <option value="KG">Quilograma (KG)</option>
                          <option value="G">Grama (G)</option>
                          <option value="L">Litro (L)</option>
                          <option value="ML">Mililitro (ML)</option>
                          <option value="CM">Centímetro (CM)</option>
                          <option value="MM">Milímetro (MM)</option>
                          <option value="M2">Metro quadrado (M²)</option>
                          <option value="M3">Metro cúbico (M³)</option>
                          <option value="PCT">Pacote (PCT)</option>
                          <option value="DZ">Dúzia (DZ)</option>
                          <option value="CX">Caixa (CX)</option>
                          <option value="SC">Saco (SC)</option>
                          <option value="T">Tonelada (T)</option>
                        </select>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

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
