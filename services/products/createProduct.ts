import axios from "axios";

export const createProduct = async (product: any) => {
  const token = localStorage.getItem("token");

  try {
    console.log(product)
    const response = await axios.post(
      "https://localhost:44323/api/Product/create",
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
