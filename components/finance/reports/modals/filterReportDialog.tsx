"use client"

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FilterIcon, ListFilterIcon, Loader2 } from "lucide-react";
import { FC, useState, useTransition } from "react";

export type FilterReportDialogProps = {
  onSubmit: (formData: FormData) => void;
};

export const FilterReportDialog: FC<FilterReportDialogProps> = ({ onSubmit }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);

  const submitForm = (formData: FormData) => {
    startTransition(() => {
      onSubmit(formData);
      setOpen(false);
    });
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2">
          <ListFilterIcon />
          Filtrar
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-sm w-full" removeClose={isPending}>
        {isPending ? (
          <div className="flex justify-center p-10">
            <Loader2 className="animate-spin" />
          </div>
        ) : (
          <>
            <DialogHeader>
              <DialogTitle>Filtros de Relatório</DialogTitle>
            </DialogHeader>
            <form action={submitForm} className="space-y-4">
            <div>
                <label className="block text-sm font-medium">Relatório</label>
                <input
                  type="date"
                  name="createDate"
                  className="mt-1 w-full border px-3 py-2 rounded"
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Tipo</label>
                <select name="type" className="mt-1 w-full border px-3 py-2 rounded">
                  <option value="all">Todos</option>
                  <option value="in">Entrada</option>
                  <option value="out">Saída</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium">Quantidade</label>
                <input
                  type="number"
                  name="quantity"
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
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending} className="flex items-center gap-2">
                  <FilterIcon />
                  Aplicar
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
