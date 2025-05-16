"use server";

import axios from "axios";
import { agent, API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function handleCreateUser(form: FormData) {
  try {
    const data = {
      name: form.get("name")?.toString() || "",
      taxNumber: form.get("taxNumber")?.toString() || "",
      tel: form.get("tel")?.toString() || "",
      email: form.get("email")?.toString() || "",
      passwordHash: form.get("password")?.toString() || ""
    };

    await axios.post(`${API_BASE_URL}/User`, data, {
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
    },
    httpsAgent: agent,
  });

    revalidatePath("/");
  } catch{
    
  }
}
