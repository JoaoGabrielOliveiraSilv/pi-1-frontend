import { z } from "zod"
import { PEDIDO_STATUSES } from "./types"

export const pedidoSchema = z.object({
    clienteId: z.coerce.number({ message: "Selecione um cliente" }).positive("Selecione um cliente"),
    marmitaId: z.coerce.number({ message: "Selecione uma marmita" }).positive("Selecione uma marmita"),
    quantidadeMarmitas: z.coerce
        .number({ message: "Quantidade inválida" })
        .int("Deve ser um número inteiro")
        .positive("Deve ser pelo menos 1"),
    dataEntrega: z.string().optional().nullable(),
})

export type PedidoFormData = z.input<typeof pedidoSchema>

export const editPedidoSchema = z.object({
    quantidadeMarmitas: z.coerce
        .number({ message: "Quantidade inválida" })
        .int("Deve ser um número inteiro")
        .positive("Deve ser pelo menos 1"),
    dataEntrega: z.string().optional(),
    status: z.enum(PEDIDO_STATUSES, { message: "Status inválido" }),
})

export type EditPedidoFormData = z.input<typeof editPedidoSchema>
