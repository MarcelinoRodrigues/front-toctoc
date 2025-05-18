import { Content } from "@/components/products/content"
import { getProducts } from "../actions/products/getProducts"

export default async function ProductsPage() {
  const products = await getProducts({})

  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Content initialProducts={products} />
    </div>
  )
}
