"use client"

import { useQuery } from "@tanstack/react-query"
import { apiClient, ApiRoute } from "@/shared/lib/api-client"
import { DashboardData } from "../types"

export function useDashboard() {
    const { data, isLoading, error } = useQuery({
        queryKey: ["dashboard"],
        queryFn: () => apiClient.get<DashboardData>(ApiRoute.Dashboard),
    })

    return {
        data: data ?? null,
        loading: isLoading,
        error: error?.message ?? null,
    }
}
