import { Content } from "@/components/products/content"
import Sidebar from "@/components/side-bar/content"
import { getProducts } from "../actions/products/getProducts"

export default async function ProductsPage() {
  const products = await getProducts({})

  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Sidebar />
      <Content initialProducts={products} />
    </div>
  )
}
