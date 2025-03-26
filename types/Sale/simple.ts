export type SimpleSale = {
    id: string
    productName: string;
    quantity: number
    payment: 'credit' | 'debit' | 'pix'
}

export type ProductSelect = {
    id: string
    productName: string
}

export type ResponseProduct = {
    productName: string;
    quantity: number;
    payment: string;
  }

export type SimpleSaleState = {
    produto: ProductSelect
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

export type SimpleSaleRequest = {
    request: RequestAPI
}

export type RequestAPI = {
    productId: string
    quantity: number
    payment:  number
}