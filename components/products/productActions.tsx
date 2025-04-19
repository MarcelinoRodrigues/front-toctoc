'use client'

import { Delete } from "./modals/delete"
import { EditModal } from "./modals/edit"

type Props = {
  product: {
    id: string
    name: string
    amount: number
    description?: string
  }
  onDataUpdate: () => void 
}

export const ProductActions = ({ product, onDataUpdate }: Props) => {
  return (
    <div className="flex gap-2 justify-center">
      <EditModal product={product} onDataUpdate={onDataUpdate} />
      <Delete id={product.id} onDataUpdate={onDataUpdate} />
    </div>
  )
}
