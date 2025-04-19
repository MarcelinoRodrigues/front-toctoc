"use server"

import { cookies } from "next/headers"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"
import { agent } from "@/lib/api"
import { Stock } from "@/types/stock/types"

export async function getStock(filters: Record<string, string>): Promise<{
  stock: Stock[]
  hasNextPage: boolean
}> {
  const cookieStore = cookies()
  const token = (await cookieStore).get("jwt")?.value

  const { data } = await axios.get(`${API_BASE_URL}/Stock`, {
    params: filters,
    headers: {
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: agent, 
  })

  return {
    stock: data.items ?? [],
    hasNextPage: data.hasNextPage ?? false,
  }
}
