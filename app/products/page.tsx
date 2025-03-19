"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/types/Product/types";
import Sidebar from "@/components/side-bar/content";
import { ProductTable } from "@/components/products/table";
import { Loader2 } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const router = useRouter();
  useAuth();

  useEffect(() => {
    const fetchProducts = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        localStorage.removeItem("token");
        router.push("/login");
        return;
      }

      try {
        const response = await axios.get("https://localhost:44323/api/Product", {
          headers: { Authorization: `Bearer ${token}` },
        });

        setProducts(response.data);
      } catch {
        router.push("/login");
      }
    };

    fetchProducts();
  }, [router]);

  return (
    <div className="flex min-h-screen p-4 lg:p-0">
      <Sidebar />
      <main className="flex-1 p-4">
        <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
        {products.length === 0 ? (
            <Loader2 className="animate-spin" />
          ) : (
            <ProductTable products={products}/>
          )}
      </main>
    </div>
  );
}
