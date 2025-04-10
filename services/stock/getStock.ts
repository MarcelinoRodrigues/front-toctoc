import { API_BASE_URL } from "@/lib/api";
import axios from "axios";
import { cookies } from "next/headers";
import { agent } from "@/lib/utils";
import { Stock } from "@/types/stock/types";

export const getStock = async (): Promise<Stock[]> => {
  const cookieStore = cookies()
  const token = (await cookieStore).get("jwt")?.value

  try {
    const response = await axios.get(`${API_BASE_URL}/Stock`, {
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
