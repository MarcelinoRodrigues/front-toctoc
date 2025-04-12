import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";
import { agent } from "@/lib/utils";
import { Product } from "@/types/Product/types";

export const getProducts = async (): Promise<Product[]> => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  try {
    const response = await axios.get(`${API_BASE_URL}/Product`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: agent,
    });

    return response.data;
  } catch {
    return [];
  }
};
