"use client"

import { useQuery } from "@tanstack/react-query"
import { listMarmitas } from "../services"

interface UseMarmitasParams {
    page?: number
    pageSize?: number
    search?: string
}

export const marmitasQueryKey = (params: UseMarmitasParams) => ["marmitas", params]

export function useMarmitas({ page = 1, pageSize = 20, search }: UseMarmitasParams = {}) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: marmitasQueryKey({ page, pageSize, search }),
        queryFn: () => listMarmitas({ page, pageSize, search }),
    })

    return {
        marmitas: data?.data ?? [],
        meta: data?.meta ?? null,
        loading: isLoading,
        error: error?.message ?? null,
        refetch,
    }
}
