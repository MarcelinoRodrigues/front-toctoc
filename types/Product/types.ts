export type Product = {
    id: string;
    name: string;
    description?: string;
    amount: number;
    quantity: number;
    unitMeasure: string;
    createDateTime: string;
}

export type ProductState = {
  name: string
  quantity: number
  description: string
  unitMeasure: string
  amount: number
}

export type ProductTableProps = {
    products: Product[]
}