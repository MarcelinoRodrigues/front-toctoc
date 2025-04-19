"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { agent } from "@/lib/api";

export async function handleCreteStock(form: FormData) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  const data = {
    productId: form.get("productId")?.toString() || "",
    quantity: Number(form.get("quantity")),
    amount: Number(form.get("amount")),
  };

  await axios.post(`${API_BASE_URL}/Stock/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    httpsAgent: agent,
  });

  revalidatePath("/sale");
}
