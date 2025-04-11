import { API_BASE_URL } from "@/lib/api";
import axios from "axios";
import { cookies } from "next/headers";
import { agent } from "@/lib/utils";

export const getDashboard = async () => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  try {
    const response = await axios.get(`${API_BASE_URL}/Dashboard`, {
      headers: {
        Authorization: `Bearer ${token}`
      },
      httpsAgent: agent,
    });

    return response.data;
  } catch {
    return [{ products: 0, sale: 0, stock: 0 }];
  }
};
