import Sidebar from "@/components/side-bar/content";
import { Content } from "@/components/stock/content";

export default function Stock() {
  return (
    <div className="h-screen w-screen p-4 lg:p-0 lg:flex">
      <Sidebar />
      <Content />
    </div>
  )
}