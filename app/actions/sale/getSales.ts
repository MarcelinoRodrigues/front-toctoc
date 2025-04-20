'use server'

import { cookies } from 'next/headers'
import axios from 'axios'
import { agent, API_BASE_URL } from '@/lib/api'
import { Sale } from '@/types/Sale/types'

export async function getSales(filters: Record<string, string>): Promise<{
  sales: Sale[]
  hasNextPage: boolean
}> {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get('jwt')?.value

    const { data } = await axios.get(`${API_BASE_URL}/Sale`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: agent,
    })

    return {
      sales: data.items ?? [],
      hasNextPage: data.hasNextPage ?? false,
    }
  } catch {
    return {
      sales: [],
      hasNextPage: false,
    }
  }
}
