export type Report = {
  id: string;
  type: 'In' | 'Out';
  productName: string
  quantity: number;
  amount: number
  createDateTime: string
}