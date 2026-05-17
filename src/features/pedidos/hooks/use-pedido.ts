"use client"

import { useQuery } from "@tanstack/react-query"
import { getPedidoById } from "../services"

export function usePedido(id: number) {
    const { data, isLoading, error } = useQuery({
        queryKey: ["pedidos", id],
        queryFn: () => getPedidoById(id),
    })

    return {
        pedido: data ?? null,
        loading: isLoading,
        error: error?.message ?? null,
    }
}
