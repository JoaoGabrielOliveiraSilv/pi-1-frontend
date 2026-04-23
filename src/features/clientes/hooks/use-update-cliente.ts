"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateCliente, UpdateClientePayload } from "../services"
import { clientesQueryKey } from "./use-clientes"

export function useUpdateCliente() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateClientePayload }) =>
            updateCliente(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: clientesQueryKey({}) })
            toast.success("Cliente atualizado com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return {
        mutate: (id: number, payload: UpdateClientePayload) => mutateAsync({ id, payload }),
        loading: isPending,
        error: error?.message ?? null,
    }
}
