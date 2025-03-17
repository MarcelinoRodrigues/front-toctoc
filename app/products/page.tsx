"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/types/Product/types";

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
      } catch (err) {
        router.push("/login");
      }
    };

    fetchProducts();
  }, [router]);

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Lista de Produtos</h2>
      <Button onClick={handleLogout} className="mb-4 bg-red-500 hover:bg-red-600">
        Sair
      </Button>
      <ul className="space-y-2">
        {products.length === 0 ? (
          <p>Loading...</p>
        ) : (
          products.map((product) => (
            <li key={product.id} className="p-2 border rounded-lg shadow">
              {product.name} - R$ {product.amount.toFixed(2)}
            </li>
          ))
        )}
      </ul>
    </div>
  );
}
