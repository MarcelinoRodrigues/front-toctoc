// app/actions/getProducts.ts
"use server"

import { cookies } from "next/headers"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"
import { Product } from "@/types/Product/types"
import { agent } from "@/lib/api"

export async function getProducts(): Promise<Product[]> {
  const cookieStore = cookies()
  const token = (await cookieStore).get("jwt")?.value

  const { data } = await axios.get(`${API_BASE_URL}/Product`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: agent,
  })

  return data
}
