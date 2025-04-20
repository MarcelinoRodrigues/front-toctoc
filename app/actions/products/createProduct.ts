"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { agent, API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function handleCreteProduct(form: FormData) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  const data = {
    name: form.get("name")?.toString() || "",
    amount:  Number(form.get("amount")) || 0,
    description: form.get("description")?.toString() || "",
    quantity: Number(form.get("quantity")) || 0,
    category: form.get("category")?.toString() || "",
    provider: form.get("provider")?.toString() || "",
    unitMeasure: form.get("unitMeasure")?.toString() || "UN",
  };

  await axios.post(`${API_BASE_URL}/Product/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    httpsAgent: agent,
  });

  revalidatePath("/products");
}
