"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updatePedido, UpdatePedidoPayload } from "../services"
import { pedidosQueryKey } from "./use-pedidos"

export function useUpdatePedido() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdatePedidoPayload }) =>
            updatePedido(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: pedidosQueryKey({}) })
            toast.success("Pedido atualizado com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return {
        mutate: (id: number, payload: UpdatePedidoPayload) => mutateAsync({ id, payload }),
        loading: isPending,
        error: error?.message ?? null,
    }
}
