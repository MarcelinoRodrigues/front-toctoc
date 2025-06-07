'use client'

import { useState, useTransition } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { AlertCircle, Loader2, Plus, Settings } from "lucide-react"
import { handleCreteSale } from "@/app/actions/sale/CreateSale"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Product } from "@/types/Product/types"

interface CreateSaleDialogProps {
  products: Product[]
  onCreateSuccess: () => void
}

export const CreateSaleDialog = ({ products, onCreateSuccess }: CreateSaleDialogProps) => {
  const [open, setOpen] = useState(false)
  const [isPending, startTransition] = useTransition()
  const [unitAmount, setUnitAmount] = useState<number | null>(null)
  const [quantity, setQuantity] = useState<number>(1)
  const [errorMessage, setErrorMessage] = useState<string | null>(null);

  const totalAmount = unitAmount !== null ? unitAmount * quantity : null

  const submitForm = (formData: FormData) => {
    startTransition(async () => {
      const result = await handleCreteSale(formData);

      if (result.success) {
        setOpen(false);
        setErrorMessage(null);
        onCreateSuccess();
      } else {
        setErrorMessage(result.message ?? "Erro desconhecido.");
      }
    });
  };

  const handleResetModal = () => {
    setOpen(false)
    setErrorMessage(null)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-1 hover:cursor-pointer">
          <Plus />
        </Button>
      </DialogTrigger>

      {errorMessage ? (
        <DialogContent
          className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-2xl bg-white p-6 shadow-xl sm:w-[90%]"
          removeClose={true}
        >
          {errorMessage && (
            <div
              role="alert"
              className="flex items-start gap-3 rounded-lg border border-red-200 bg-red-50 p-4 text-sm text-red-700 sm:text-base"
            >
              <AlertCircle className="h-5 w-5 text-red-500 mt-0.5 shrink-0" />
              <span className="flex-1 leading-relaxed">{errorMessage}</span>
            </div>
          )}

          <div className="flex justify-end">
            <Button
              type="button"
              onClick={handleResetModal}
              variant="default"
            >
              OK
            </Button>
          </div>
        </DialogContent>

      ) : (
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
                          setUnitAmount(selectedProduct.sellingPrice)
                        } else {
                          setUnitAmount(null)
                        }
                      }}
                    >
                      <option value="" disabled>Selecione um produto</option>
                      {(products ?? []).map((product) => (
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
                      defaultValue={0}
                    >
                      <option value={0} >Dinheiro</option>
                      <option value={1}>Crédito</option>
                      <option value={2}>Débito</option>
                      <option value={3}>Pix</option>
                    </select>
                  </div>

                  <Accordion type="single" collapsible className="w-full">
                    <AccordionItem value="opcionais">
                      <AccordionTrigger className="px-4 py-3 text-base font-semibold bg-muted hover:bg-muted/70 rounded-t-md flex items-center gap-2 hover:cursor-pointer">
                        <Settings className="h-4 w-4 text-muted-foreground" />
                        Campos opcionais
                      </AccordionTrigger>
                      <AccordionContent className="space-y-4">
                        <div className="hidden">
                          <label className="block text-sm font-medium">Desconto</label>
                          <input
                            type="number"
                            name="discount"
                            className="mt-1 w-full border px-3 py-2 rounded"
                            defaultValue={0}
                          />
                        </div>
                        <div className="hidden">
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
                            defaultValue={0}
                          >
                            <option value={0}>Unidade (UN)</option>
                            <option value={1}>Quilograma (KG)</option>
                            <option value={2}>Grama (G)</option>
                            <option value={3}>Litro (L)</option>
                            <option value={4}>Mililitro (ML)</option>
                            <option value={5}>Centímetro (CM)</option>
                            <option value={6}>Milímetro (MM)</option>
                            <option value={7}>Metro quadrado (M²)</option>
                            <option value={8}>Metro cúbico (M³)</option>
                            <option value={9}>Pacote (PCT)</option>
                            <option value={10}>Dúzia (DZ)</option>
                            <option value={11}>Caixa (CX)</option>
                            <option value={12}>Saco (SC)</option>
                            <option value={13}>Tonelada (T)</option>
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
      )}
    </Dialog>
  )
}
