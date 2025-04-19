import Sidebar from "@/components/side-bar/content";
import { Content } from "@/components/stock/content";
import { getStock } from "../actions/stock/getStock";

export default async function Stock() {
  const stock = await getStock()

  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Sidebar />
      <Content stock={stock} />
    </div>
  )
}