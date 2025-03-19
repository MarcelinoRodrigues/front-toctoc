"use client";
import { useEffect, useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useAuth } from "@/hooks/useAuth";
import { Product } from "@/types/Product/types";
import { Content } from "@/components/products/content";

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
    <Content products={products}/>
  );
}
