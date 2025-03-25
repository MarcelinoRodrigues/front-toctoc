import axios from "axios";

export const getSimpleSale = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("https://localhost:44323/api/SimpleSale", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch {
        return null;
    }
};
