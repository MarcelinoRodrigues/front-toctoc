'use client'

import { Delete } from "./modals/delete"

type Props = {
  product: {
    id: string
    name: string
    purchasePrice: number;
    sellingPrice: number;
    profit: number;
    description?: string
  }
  onCreateSuccess: () => void
}

export const ProductActions = ({ product, onCreateSuccess }: Props) => {
  return (
    <div className="flex gap-2 justify-center">
      {/* <EditModal product={product} onCreateSuccess={onCreateSuccess} /> */}
      <Delete id={product.id} onCreateSuccess={onCreateSuccess} />
    </div>
  )
}
