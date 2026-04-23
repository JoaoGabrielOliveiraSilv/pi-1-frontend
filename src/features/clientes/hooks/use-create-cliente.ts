"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createCliente, CreateClientePayload } from "../services"
import { clientesQueryKey } from "./use-clientes"

export function useCreateCliente() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (payload: CreateClientePayload) => createCliente(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: clientesQueryKey({}) })
            toast.success("Cliente criado com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return { mutate: mutateAsync, loading: isPending, error: error?.message ?? null }
}
