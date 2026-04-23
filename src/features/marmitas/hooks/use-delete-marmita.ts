"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { deleteMarmita } from "../services"
import { marmitasQueryKey } from "./use-marmitas"

export function useDeleteMarmita() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (id: number) => deleteMarmita(id),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: marmitasQueryKey({}) })
            toast.success("Marmita removida com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return { mutate: mutateAsync, loading: isPending, error: error?.message ?? null }
}
