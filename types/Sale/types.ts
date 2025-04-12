export type Sale = {
  id: string;
  productId: number
  productName: string
  quantity: number
  payment: string
  discount: number
  amount: number
  origin: string
  observation: string
  additionalCost: number
  unitMeasure: string
  createDateTime: string
}

export type SaleState = {
  productId: number
  quantity: number
  payment: string
  discount: number | null
  amount: number
  origin: string | null
  observation: string | null
  additionalCost: number | null
  unitMeasure: string | null
}