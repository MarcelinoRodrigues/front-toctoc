import { API_BASE_URL } from "@/lib/api";
import { ProductState } from "@/types/Product/types";
import axios from "axios";

type UpdateProductProps = {
    id: string;
    product: ProductState;
};

export const updateProduct = async ({ id, product }: UpdateProductProps) => {
    const token = localStorage.getItem("token");

    try {
        const response = await axios.put(
            `${API_BASE_URL}/Product/update/${id}`,
            product,
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
