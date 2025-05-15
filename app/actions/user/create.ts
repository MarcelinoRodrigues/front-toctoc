"use server";

import { cookies } from "next/headers";
import axios from "axios";
import { agent, API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";

export async function handleCreateUser(form: FormData) {
  try {
    const cookieStore = cookies();
    const token = (await cookieStore).get("jwt")?.value;

    const data = {
      name: form.get("name")?.toString() || "",
      taxNumber: form.get("taxNumber")?.toString() || "",
      tel: form.get("tel")?.toString() || "",
      email: form.get("email")?.toString() || "",
      passwordHash: form.get("password")?.toString() || ""
    };

    console.log(data)

    const headers: any = {
      "Content-Type": "application/json",
      Accept: "*/*"
    };

    if (token) headers.Authorization = `Bearer ${token}`;

    const response = await axios.post(`${API_BASE_URL}/User`, data, {
      headers,
      httpsAgent: agent,
    });

    revalidatePath("/");
  } catch (err: any) {
    throw err;
  }
}
