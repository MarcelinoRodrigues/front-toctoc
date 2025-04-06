import { API_BASE_URL } from "@/lib/api";
import axios from "axios";

export const getProducts = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_BASE_URL}/Product`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch {
        return null;
    }
};
