export type Product = {
  id: string;
  name: string;
  description?: string;
  purchasePrice: number;
  sellingPrice: number;
  profit: number;
  createDateTime: string;
}