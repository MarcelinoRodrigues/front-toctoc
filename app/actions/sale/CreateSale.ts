// CreateSale.tsx
"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { agent } from "@/lib/utils";

export async function handleCreteSale(form: FormData) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  const data = {
    productId: form.get("productId")?.toString() || "",
    quantity: Number(form.get("quantity")),
    payment: form.get("payment")?.toString() || "credit",
    discount: Number(form.get("discount")) || 0,
    amount: Number(form.get("amount")),
    origin: form.get("origin")?.toString() || "n/a",
    observation: form.get("observation")?.toString() || "",
    additionalCost: Number(form.get("additionalCost")) || 0,
    unitMeasure: form.get("unitMeasure")?.toString() || "UN",
  };

  await axios.post(`${API_BASE_URL}/Sale/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    httpsAgent: agent,
  });

  revalidatePath("/sale");
}
