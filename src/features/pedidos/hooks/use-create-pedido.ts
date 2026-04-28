"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createPedido, CreatePedidoPayload } from "../services"
import { pedidosQueryKey } from "./use-pedidos"

export function useCreatePedido() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (payload: CreatePedidoPayload) => createPedido(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pedidosQueryKey({}) })
            toast.success("Pedido criado com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return { mutate: mutateAsync, loading: isPending, error: error?.message ?? null }
}
