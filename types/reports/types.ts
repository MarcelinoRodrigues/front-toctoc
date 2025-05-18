export type Report = {
  id: string;
  type: 'In' | 'Out';
  productName: string
  quantity: number;
  createDateTime: string
}