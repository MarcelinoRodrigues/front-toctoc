"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { FileBarChart, ClipboardList, Loader2, Settings } from "lucide-react";
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
          <ClipboardList />
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
              <DialogTitle>Gerar Relatórios</DialogTitle>
            </DialogHeader>
            <form action={submitForm} className="space-y-4">
              <div>
                <label className="block text-sm font-medium">Relatório</label>
                <input
                  type="date"
                  name="reportDay"
                  className="mt-1 w-full border px-3 py-2 rounded"
                  defaultValue={new Date().toLocaleDateString('en-CA')}
                />
              </div>

              <div>
                <label className="block text-sm font-medium">Tipo</label>
                <select name="type" className="mt-1 w-full border px-3 py-2 rounded" defaultValue="all">  
                <option value="all">Todos</option>
                <option value="in">Entrada</option>
                  <option value="out">Saída</option>
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
                  </AccordionContent>
                </AccordionItem>
              </Accordion>
              <div className="flex justify-end pt-4">
                <Button type="submit" disabled={isPending} className="flex items-center gap-2">
                  <FileBarChart />
                  Gerar
                </Button>
              </div>
            </form>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};
