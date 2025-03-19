export type Product = {
    id: string;
    tenantId: string;
    name: string;
    description?: string;
    amount: number;
    quantity: number;
    unitMeasure: string;
    createDateTime: string;
}

export type ProductTableProps = {
    products: Product[]
}