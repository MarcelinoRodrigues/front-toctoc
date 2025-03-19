import axios from "axios";

export const getProducts = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("https://localhost:44323/api/Product", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch {
        return null;
    }
};
