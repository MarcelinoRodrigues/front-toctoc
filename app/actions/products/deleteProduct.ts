"use server";

import { API_BASE_URL } from "@/lib/api";
import { cookies } from "next/headers";
import axios from "axios";
import { agent } from "@/lib/utils";
import { revalidatePath } from "next/cache";

export async function deleteProduct (id: string) {
  const cookieStore = cookies();
  const token = (await cookieStore).get("jwt")?.value;

  await axios.delete(
    `${API_BASE_URL}/Product?Id=${id}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
      httpsAgent: agent,
    }
  );

  revalidatePath("/products");
}
