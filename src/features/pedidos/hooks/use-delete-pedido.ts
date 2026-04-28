"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deletePedido } from "../services"
import { pedidosQueryKey } from "./use-pedidos"

export function useDeletePedido() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (id: number) => deletePedido(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pedidosQueryKey({}) })
            toast.success("Pedido removido com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return { mutate: mutateAsync, loading: isPending, error: error?.message ?? null }
}
