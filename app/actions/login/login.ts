"use server";

import { cookies } from "next/headers";
import { agent, API_BASE_URL } from "@/lib/api";
import axios, { AxiosError } from "axios";

interface LoginResponseProsps {
  Token: string
  Paid: boolean
  Expired: boolean
}

export async function loginAction(formData: FormData): Promise<LoginResponseProsps & { error?: string }> {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) {
    return { Token: "", Paid: false, Expired: false, error: "Email e senha são obrigatórios." };
  }

  try {
    const response = await axios.post(
      `${API_BASE_URL}/Auth/login`,
      { email, senha: password },
      {
        headers: {
          "Content-Type": "application/json",
        },
        httpsAgent: agent,
      }
    );

    if (!response.data.token) {
      return { Token: "", Paid: false, Expired: false, error: "Token inválido recebido da API." };
    }

    const token = response.data.token;
    const expires = new Date();
    expires.setDate(expires.getDate() + 7);

    const cookieStore = cookies();
    (await cookieStore).set({
      name: "jwt",
      value: token,
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      expires: expires,
      path: "/",
    });

    return {
      Token: response?.data?.token,
      Paid: response?.data?.paid,
      Expired: response?.data?.expired,
    };
  } catch (err) {
    const error = err as AxiosError;

    const errorMessage =
      axios.isAxiosError(error) && error.response?.data && typeof error.response.data === "object"
        ? (error.response.data as { message?: string }).message || "Email ou senha inválidos."
        : "Erro ao realizar login.";

    return { Token: "", Paid: false, Expired: false, error: errorMessage };
  }
}
