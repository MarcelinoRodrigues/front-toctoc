import { API_BASE_URL } from "@/lib/api";
import axios from "axios";
import { cookies } from "next/headers";
import https from "https";

export const getStock = async () => {
  const cookieStore = cookies()
  const token = (await cookieStore).get("jwt")?.value

  const agent = new https.Agent({ rejectUnauthorized: false, });

  await new Promise((resolve) => setTimeout(resolve, 500));

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
