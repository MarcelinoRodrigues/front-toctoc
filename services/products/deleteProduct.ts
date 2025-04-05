import { API_BASE_URL } from "@/lib/api";
import axios from "axios";

export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
        `${API_BASE_URL}/Product?Id=${id}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );

    return response.data;
  } catch (error) {
    return null;
  }
};
