import { Content } from '@/components/sale/content'
import { getSales } from '@/app/actions/sale/getSales'
import { getProducts } from '@/app/actions/products/getProducts'

export default async function SalePage() {
  const sales = await getSales({})
  const products = await getProducts({})

  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Content initialSales={sales} initialProducts={products.products} />
    </div>
  );
}
