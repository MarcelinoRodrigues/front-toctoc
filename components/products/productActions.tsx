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
  onCreateSuccess: () => void 
}

export const ProductActions = ({ product, onCreateSuccess }: Props) => {
  return (
    <div className="flex gap-2 justify-center">
      <EditModal product={product} onCreateSuccess={onCreateSuccess} />
      <Delete id={product.id} onCreateSuccess={onCreateSuccess} />
    </div>
  )
}
