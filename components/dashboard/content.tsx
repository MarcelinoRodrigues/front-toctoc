"use client"

import { Windownnw } from "./windonnw"
import { Fragment, useCallback, useEffect, useState } from "react"
import { getDashboard } from "@/services/dashboard/getDashboard"
import { Loader2 } from "lucide-react"
import { DashboardItem } from "@/types/dashboard/types"

export const Content = () => {
  const [dashboard, setDashboard] = useState<DashboardItem[]>([])
  const [isLoading, setIsLoading] = useState(true)

  const enableLoading = useCallback(() => setIsLoading(true), []);
  const disableLoading = useCallback(() => setIsLoading(false), []);

  useEffect(() => {
    const fetchDashboard = async () => {
      enableLoading();
      try {
        const response = await getDashboard();
        setDashboard(response || []);
      } finally {
        disableLoading();
      }
    };

    fetchDashboard();
  }, [enableLoading, disableLoading]);

  return (
    <div className="mx-auto border-8 border-gray-900 p-4 h-screen overflow-auto min-w-[50vw]">
      <h2 className="bg-gray-900 text-white rounded-2xl text-center">Dashboard</h2>
      {isLoading && (
        <div className="flex items-center justify-center h-[80%]">
          <Loader2 size={45} className="animate-spin text-white" />
        </div>
      )}
      {!isLoading && dashboard.length > 0 && (
        <div className="flex justify-between">
          {dashboard.map((item, index) => (
            <Fragment key={index}>
              <Windownnw title="Produtos" quantity={item.products} />
              <Windownnw title="Vendas" quantity={item.sales} />
              <Windownnw title="Estoque" quantity={item.stocks} />
            </Fragment>
          ))}
        </div>
      )}
    </div>
  )
}
