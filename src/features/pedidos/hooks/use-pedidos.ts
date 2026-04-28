"use client"

import { useQuery } from "@tanstack/react-query"
import { listPedidos } from "../services"
import { PedidoStatus } from "../types"

interface UsePedidosParams {
    page?: number
    pageSize?: number
    status?: PedidoStatus | ""
    clienteId?: number
    marmitaId?: number
    search?: string
    dataInicio?: string
    dataFim?: string
}

export const pedidosQueryKey = (params: UsePedidosParams) => ["pedidos", params]

export function usePedidos({ page = 1, pageSize = 20, status, clienteId, marmitaId, search, dataInicio, dataFim }: UsePedidosParams = {}) {
    const { data, isLoading, error, refetch } = useQuery({
        queryKey: pedidosQueryKey({ page, pageSize, status, clienteId, marmitaId, search, dataInicio, dataFim }),
        queryFn: () => listPedidos({
            page,
            pageSize,
            status: status || undefined,
            clienteId,
            marmitaId,
            search,
            dataInicio,
            dataFim,
        }),
    })

    return {
        pedidos: data?.data ?? [],
        meta: data?.meta ?? null,
        loading: isLoading,
        error: error?.message ?? null,
        refetch,
    }
}
