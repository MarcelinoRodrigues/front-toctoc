import { Product, ProductState } from "../Product/types"

export type SimpleSale = {
    id: string
    produto: Product
    quantity: number
    payment: 'credit' | 'debit' | 'pix'
}

export type SimpleSaleState = {
    produto: Product
    quantity: number
    payment: 'credit' | 'debit' | 'pix'
}