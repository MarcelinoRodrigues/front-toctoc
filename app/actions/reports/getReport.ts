'use server'

import { cookies } from 'next/headers'
import axios from 'axios'
import { agent, API_BASE_URL } from '@/lib/api'
import { Report } from '@/types/reports/types'

export async function getReport(filters: Record<string, string>): Promise<{
  report: Report[]
  hasNextPage: boolean
}> {
  try {
    const cookieStore = cookies()
    const token = (await cookieStore).get('jwt')?.value

    const { data } = await axios.get(`${API_BASE_URL}/Report`, {
      params: filters,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      httpsAgent: agent,
    })

    return {
      report: data.items ?? [],
      hasNextPage: data.hasNextPage ?? false,
    }
  } catch {
    return {
      report: [],
      hasNextPage: false,
    }
  }
}
