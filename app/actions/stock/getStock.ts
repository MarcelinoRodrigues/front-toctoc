// app/actions/getSales.ts
"use server"

import { cookies } from "next/headers"
import axios from "axios"
import { API_BASE_URL } from "@/lib/api"
import { agent } from "@/lib/utils"
import { Stock } from "@/types/stock/types"

export async function getStock(): Promise<Stock[]> {
  const cookieStore = cookies()
  const token = (await cookieStore).get("jwt")?.value

  const { data } = await axios.get(`${API_BASE_URL}/Stock`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
    httpsAgent: agent, 
  })

  return data
}
