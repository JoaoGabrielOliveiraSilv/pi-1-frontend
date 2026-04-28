import { PedidoStatus } from "@/features/pedidos/types"

export type PedidoRecente = {
    id: number
    clienteNome: string
    dataEntrega: string | null
    quantidadeMarmitas: number
    status: PedidoStatus
}

export type DashboardData = {
    totalPedidos: number
    pendentes: number
    entregues: number
    totalClientes: number
    pedidosRecentes: PedidoRecente[]
}
