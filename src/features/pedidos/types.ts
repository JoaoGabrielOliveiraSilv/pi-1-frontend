export type { PaginatedMeta, PaginatedResponse } from "@/shared/types/pagination"

export type PedidoStatus = "PENDENTE" | "CONFIRMADO" | "PREPARANDO" | "ENTREGUE" | "CANCELADO"

export type Pedido = {
    idPedidos: number
    clienteId: number
    marmitaId: number
    quantidadeMarmitas: number
    dataEntrega: string | null
    status: PedidoStatus
    clienteNome: string
    marmitaDescricao: string
}

export const PEDIDO_STATUS_LABELS: Record<PedidoStatus, string> = {
    PENDENTE: "Pendente",
    CONFIRMADO: "Confirmado",
    PREPARANDO: "Preparando",
    ENTREGUE: "Entregue",
    CANCELADO: "Cancelado",
}

export const PEDIDO_STATUSES = ["PENDENTE", "CONFIRMADO", "PREPARANDO", "ENTREGUE", "CANCELADO"] as const
