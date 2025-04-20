"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { agent } from "@/lib/api";

export async function handleEditProduct(form: FormData, id: string) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  const data = {
    name: form.get("name")?.toString() || "",
    amount:  Number(form.get("amount")) || 0,
    description: form.get("description")?.toString() || "",
  };

  await axios.put(`${API_BASE_URL}/Product/update/${id}`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    httpsAgent: agent,
  });

  revalidatePath("/products");
}
