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
}

export const ProductActions = ({ product }: Props) => {
  return (
    <div className="flex gap-2 justify-center">
      <EditModal product={product}/>
      <Delete id={product.id}/>
    </div>
  )
}
