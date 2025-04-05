import { API_BASE_URL } from "@/lib/api";
import axios from "axios";

export const getSale = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(
            `${API_BASE_URL}/Sale`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch {
        return [];
    }
};
