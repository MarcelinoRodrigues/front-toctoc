import { API_BASE_URL } from "@/lib/api";
import axios from "axios";

export const getDashboard = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get(`${API_BASE_URL}/Dashboard`, {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch {
        return [{products: 0, sale: 0}];
    }
};
