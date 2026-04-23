"use client"

import { useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"
import { createMarmita, CreateMarmitaPayload } from "../services"
import { marmitasQueryKey } from "./use-marmitas"

export function useCreateMarmita() {
    const queryClient = useQueryClient()

    const { mutateAsync, isPending, error } = useMutation({
        mutationFn: (payload: CreateMarmitaPayload) => createMarmita(payload),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: marmitasQueryKey({}) })
            toast.success("Marmita criada com sucesso")
        },
        onError: (e: Error) => toast.error(e.message),
    })

    return { mutate: mutateAsync, loading: isPending, error: error?.message ?? null }
}
