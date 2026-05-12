import { z } from "zod"
import { PEDIDO_STATUSES } from "./types"

const itemSchema = z.object({
    marmitaId: z.coerce.number({ message: "Selecione uma marmita" }).positive("Selecione uma marmita"),
    quantidade: z.coerce
        .number({ message: "Quantidade inválida" })
        .int("Deve ser um número inteiro")
        .positive("Deve ser pelo menos 1"),
})

export const pedidoSchema = z.object({
    clienteId: z.coerce.number({ message: "Selecione um cliente" }).positive("Selecione um cliente"),
    itens: z.array(itemSchema).min(1, "Adicione pelo menos uma marmita"),
    dataEntrega: z.string().optional().nullable(),
})

export type PedidoFormData = z.input<typeof pedidoSchema>

export const editPedidoSchema = z.object({
    itens: z.array(itemSchema).min(1, "Adicione pelo menos uma marmita").optional(),
    dataEntrega: z.string().optional(),
    status: z.enum(PEDIDO_STATUSES, { message: "Status inválido" }),
})

export type EditPedidoFormData = z.input<typeof editPedidoSchema>
