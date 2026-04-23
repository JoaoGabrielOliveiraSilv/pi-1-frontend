"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { updateMarmita, UpdateMarmitaPayload } from "../services"
import { marmitasQueryKey } from "./use-marmitas"

export function useUpdateMarmita() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: ({ id, payload }: { id: number; payload: UpdateMarmitaPayload }) =>
            updateMarmita(id, payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: marmitasQueryKey({}) })
            toast.success("Marmita atualizada com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return {
        mutate: (id: number, payload: UpdateMarmitaPayload) => mutateAsync({ id, payload }),
        loading: isPending,
        error: error?.message ?? null,
    }
}
