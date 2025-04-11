import { API_BASE_URL } from "@/lib/api";
import axios from "axios";
import { cookies } from "next/headers";
import { agent } from "@/lib/utils";
import { Sale } from "@/types/Sale/types";

export const getSale = async (): Promise<Sale[]> => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  try {
    const response = await axios.get(`${API_BASE_URL}/Sale`, {
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
