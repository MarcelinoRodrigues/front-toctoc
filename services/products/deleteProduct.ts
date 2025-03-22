import axios from "axios";

export const deleteProduct = async (id: string) => {
  const token = localStorage.getItem("token");

  try {
    const response = await axios.delete(
        `https://localhost:44323/api/Product?Id=${id}`, 
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
