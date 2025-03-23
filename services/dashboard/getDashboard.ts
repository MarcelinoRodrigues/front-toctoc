import axios from "axios";

export const getDashboard = async () => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.get("https://localhost:44323/api/Dashboard", {
            headers: { Authorization: `Bearer ${token}` },
        });

        return response.data;
    } catch {
        return null;
    }
};
