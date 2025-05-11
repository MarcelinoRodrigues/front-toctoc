'use client'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { ShoppingCart } from "lucide-react"

export const Cart = () => {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="mb-1 hover:cursor-pointer">
          <ShoppingCart />
        </Button>
      </DialogTrigger>

      <DialogContent className="max-w-md max-h-[90vh] overflow-y-auto w-[90%]">
        <DialogHeader>
          <DialogTitle>Filtros</DialogTitle>
        </DialogHeader>

        <form className="space-y-4">

          <div className="flex justify-end space-x-2 pt-4">
            <Button type="submit">
              Vender
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
