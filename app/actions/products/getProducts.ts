"use server"

import { cookies } from "next/headers"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"
import { Product } from "@/types/Product/types"
import { agent } from "@/lib/api"

export async function getProducts(filters: Record<string, string>): Promise<{
  products: Product[]
  hasNextPage: boolean
}> {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get("jwt")?.value

    const { data } = await axios.get(`${API_BASE_URL}/Product`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: agent,
    })

    return {
      products: data.items ?? [],
      hasNextPage: data.hasNextPage ?? false,
    }
  } catch {
    return {
      products: [],
      hasNextPage: false,
    }
  }
}
