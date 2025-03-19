import { Content } from "@/components/products/content";
import Sidebar from "@/components/side-bar/content";

export default function ProductsPage() {
  return (
    <div className="min-h-screen p-4 lg:p-0 lg:flex">
      <Sidebar />
      <Content/>
    </div>
  );
}
