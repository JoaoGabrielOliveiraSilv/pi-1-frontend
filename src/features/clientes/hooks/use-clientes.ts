"use client"

import { useQuery } from "@tanstack/react-query"
import { listClientes } from "../services"

interface UseClientesParams {
    page?: number
    pageSize?: number
    search?: string
}

export const clientesQueryKey = (params: UseClientesParams) => ["clientes", params]

export function useClientes({ page = 1, pageSize = 20, search }: UseClientesParams = {}) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: clientesQueryKey({ page, pageSize, search }),
        queryFn: () => listClientes({ page, pageSize, search }),
    })

    return {
        clientes: data?.data ?? [],
        meta: data?.meta ?? null,
        loading: isLoading,
        error: error?.message ?? null,
        refetch,
    }
}
