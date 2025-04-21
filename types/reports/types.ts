export type Report = {
  id: string;
  type: 'in' | 'out';
  productName: string
  quantity: number;
  amount: number
  expireDate?: string; 
  createDateTime: string
}