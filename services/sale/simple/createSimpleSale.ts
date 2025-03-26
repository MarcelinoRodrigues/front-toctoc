import { RequestAPI } from "@/types/Sale/simple";
import axios from "axios";

export const createSimpleSale = async (SimpleSaleState: RequestAPI) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.post(
      "https://localhost:44323/api/SimpleSale/create",
      SimpleSaleState, 
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
