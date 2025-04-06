"use client"

import { useAuth } from "@/hooks/useAuth"
import { Windownnw } from "./windonnw"
import { useCallback, useEffect, useState } from "react"
import { useTimeOutLoad } from "@/hooks/useTimeOutLoad"
import { getDashboard } from "@/services/dashboard/getDashboard"
import { Loader2 } from "lucide-react"
import { DashboardItem } from "@/types/dashboard/types"

export const Content = () => {
    useAuth()

    const [dashboard, setDashboard] = useState<DashboardItem[]>([])
    const [isLoading, setIsLoading] = useState(true)

    const enableLoading = useCallback(() => setIsLoading(true), []);
    const disableLoading = useCallback(() => setIsLoading(false), []);

    useTimeOutLoad(isLoading, disableLoading)

    useEffect(() => {
        const fetchProducts = async () => {
            enableLoading();
            try {
                const response = await getDashboard(); 
                setDashboard(response || []);
            } finally {
                disableLoading();
            }
        };

        fetchProducts();
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
                        <Windownnw key={index} title="Produtos" quantity={item.products} />
                    ))}
                </div>
            )}
        </div>
    )
}
