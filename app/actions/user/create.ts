"use server";

import axios, { AxiosError } from "axios";
import { agent, API_BASE_URL } from "@/lib/api";
import { revalidatePath } from "next/cache";
import { formatTaxNumber } from "@/utils/user";

export async function handleCreateUser(form: FormData) {
  try {
    const taxNumber = formatTaxNumber(form.get("taxNumber")?.toString() || "")
    
    const data = {
      name: form.get("name")?.toString() || "",
      taxNumber: taxNumber,
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
  } catch (err) {
    const error = err as AxiosError;

    const message =
      error.response?.data && typeof error.response.data === "object"
        ? (error.response.data as { message?: string; error?: string }).message ||
          (error.response.data as { message?: string; error?: string }).error ||
          "Erro ao criar usuário."
        : "Erro ao criar usuário.";

    throw new Error(message);
  }
}
