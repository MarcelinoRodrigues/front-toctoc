import { Content } from "@/components/stock/content";
import { getStock } from "../actions/stock/getStock";
import { getProducts } from "../actions/products/getProducts";

export default async function Stock() {
  const stock = await getStock({})
  const products = await getProducts({})

  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Content initialStock={stock} initialProducts={products.products} />
    </div>
  )
}