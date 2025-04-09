export type Product = {
    id: string;
    name: string;
    description?: string;
    amount: number;
    createDateTime: string;
}

export type GetProduct = {
  id: string;
  productName: string;
  description?: string;
  amount: number;
  payment: string;
  createDateTime: string;
}

export type ProductState = {
  name: string
  description: string
  amount: number
}

export type ProductTableProps = {
    products: Product[]
}