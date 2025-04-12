import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";
import { agent } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export const deleteProduct = async (id: string) => {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  try {
    const response = await axios.delete(
      `${API_BASE_URL}/Product?Id=${id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
        httpsAgent: agent,
      }
    );

    return response.data;
  } catch (error) {
    return null;
  }
  finally{
      revalidatePath("/products");
  }
};
