"use client"

import { useState } from "react"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteCliente } from "../services"
import { clientesQueryKey } from "./use-clientes"
import { ApiError } from "@/shared/lib/api-client"

export function useDeleteCliente() {
    const queryClient = useQueryClient()
    const [pendingId, setPendingId] = useState<number | null>(null)

    const { mutateAsync, isPending } = useMutation({
        mutationFn: ({ id, force }: { id: number; force?: boolean }) => deleteCliente(id, force),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: clientesQueryKey({}) })
            toast.success("Cliente removido com sucesso")
            setPendingId(null)
        },
        onError: (e: unknown, vars) => {
            if (e instanceof ApiError && e.code === 'HAS_PEDIDOS') {
                setPendingId(vars.id)
                return
            }
            setPendingId(null)
            toast.error(e instanceof Error ? e.message : 'Erro ao remover cliente')
        },
    })

    return {
        tryDelete: (id: number) => mutateAsync({ id }),
        confirmDelete: () => { if (pendingId !== null) mutateAsync({ id: pendingId, force: true }) },
        cancelDelete: () => setPendingId(null),
        needsConfirmation: pendingId !== null,
        loading: isPending,
    }
}
