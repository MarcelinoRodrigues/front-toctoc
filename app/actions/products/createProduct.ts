"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { agent } from "@/lib/utils";

export async function handleCreteProduct(form: FormData) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  const data = {
    name: form.get("name")?.toString() || "",
    amount:  Number(form.get("amount")) || 0,
    description: form.get("description")?.toString() || "",
  };

  await axios.post(`${API_BASE_URL}/Product/create`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    httpsAgent: agent,
  });

  revalidatePath("/sale");
}
