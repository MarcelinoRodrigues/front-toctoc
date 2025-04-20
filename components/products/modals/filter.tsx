'use client'

import { useTransition, useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Loader2, FilterIcon, ListFilterIcon } from "lucide-react"

type Props = {
  onSubmit: (formData: FormData) => void
}

export const FilterProductDialog = ({ onSubmit }: Props) => {
  const [isPending, startTransition] = useTransition()
  const [open, setOpen] = useState(false)

  const submitForm = (formData: FormData) => {
    startTransition(() => {
      onSubmit(formData)
      setOpen(false)
    })
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-1 hover:cursor-pointer">
          <ListFilterIcon />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto w-[90%]" removeClose={isPending}>
        {isPending ? (
          <div className="m-auto p-10">
            <Loader2 className="animate-spin h-12 w-12" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Filtros</DialogTitle>
            </DialogHeader>

            <form action={submitForm} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Produto</label>
                <input
                  type="text"
                  name="name"
                  className="mt-1 w-full border px-3 py-2 rounded"
                />
              </div>
              <div>
                <label className="block text-sm font-medium">Valor</label>
                <input
                  type="number"
                  name="amount"
                  className="mt-1 w-full border px-3 py-2 rounded"
                />
              </div>

              <div className="flex justify-end space-x-2 pt-4">
                <Button type="submit" disabled={isPending}>
                  <FilterIcon className="mr-2 h-4 w-4" />
                  Filtrar
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  )
}
