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

export type CreateOrEditProps = {
    item?: SimpleSale
    isEdit?: boolean
    disableLoading: () => void
    enableLoading: () => void
    handleSetSale: (sale: SimpleSale[]) => void
}