"use server";

import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { agent, API_BASE_URL } from "@/lib/api";
import axios from "axios";

export async function loginAction(formData: FormData) {
  const email = formData.get("email") as string;
  const password = formData.get("password") as string;

  if (!email || !password) return;

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
    return;
  }

  const token = response.data.token;
  const expires = new Date();
  expires.setDate(expires.getDate() + 7);

  const cookieStore = await cookies()
  cookieStore.set({
    name: 'jwt',
    value: token,
    httpOnly: true,
    secure: true,
    sameSite: 'strict',
    expires: expires,
    path: '/',
  })

  redirect("/dashboard");
}
