import { cookies } from "next/headers"; 
import https from 'https';
import axios from 'axios';

export const getDashboard = async () => {
    const cookieStore = cookies();
    const token = (await cookieStore).get("token")?.value;

    const agent = new https.Agent({
        rejectUnauthorized: false,
    });

    try {
        const response = await axios.get(`https://localhost:44323/api/Dashboard`, {
            headers: {
                Authorization: `Bearer ${token}`,
            },
            httpsAgent: agent,
        });

        return response.data;
    } catch {
        return null;
    }
};
