"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteCliente } from "../services"
import { clientesQueryKey } from "./use-clientes"

export function useDeleteCliente() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (id: number) => deleteCliente(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: clientesQueryKey({}) })
            toast.success("Cliente removido com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return { mutate: mutateAsync, loading: isPending, error: error?.message ?? null }
}
