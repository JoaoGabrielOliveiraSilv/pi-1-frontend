export type { PaginatedMeta, PaginatedResponse } from "@/shared/types/pagination"

export type PedidoStatus = "PENDENTE" | "CONFIRMADO" | "PREPARANDO" | "ENTREGUE" | "CANCELADO"

export type PedidoItem = {
    idPedidoItem: number
    marmitaId: number
    marmitaDescricao: string
    quantidade: number
    precoUnitario: string
}

export type Pedido = {
    idPedidos: number
    clienteId: number
    clienteNome: string
    clienteTelefone: string
    clienteEndereco: string | null
    itens: PedidoItem[]
    dataPedido: string
    dataEntrega: string | null
    status: PedidoStatus
    valorTotal: string
}

export const PEDIDO_STATUS_LABELS: Record<PedidoStatus, string> = {
    PENDENTE: "Pendente",
    CONFIRMADO: "Confirmado",
    PREPARANDO: "Preparando",
    ENTREGUE: "Entregue",
    CANCELADO: "Cancelado",
}

export const PEDIDO_STATUSES = ["PENDENTE", "CONFIRMADO", "PREPARANDO", "ENTREGUE", "CANCELADO"] as const
