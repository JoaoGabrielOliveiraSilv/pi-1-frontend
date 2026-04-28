import { apiClient, ApiRoute } from "@/shared/lib/api-client"
import { Pedido, PedidoStatus, PaginatedResponse } from "./types"

interface RawPedido {
    idPedidos: number
    clientesIdClientes: number
    marmitasIdMarmita: number
    quantidadeMarmitas: number
    valorTotal: string
    dataPedido: string
    dataEntrega: string | null
    status: PedidoStatus
    cliente: {
        idClientes: number
        nome: string
        telefone: string
        endereco: string | null
        obs: string | null
    }
    marmita: {
        idMarmita: number
        descricao: string
        precoBase: string
        adicionalEmbalagem: string
        peso: string
    }
}

function mapPedido(raw: RawPedido): Pedido {
    return {
        idPedidos: raw.idPedidos,
        clienteId: raw.clientesIdClientes,
        marmitaId: raw.marmitasIdMarmita,
        quantidadeMarmitas: raw.quantidadeMarmitas,
        dataEntrega: raw.dataEntrega,
        status: raw.status,
        clienteNome: raw.cliente.nome,
        marmitaDescricao: raw.marmita.descricao,
    }
}

export interface CreatePedidoPayload {
    clienteId: number
    marmitaId: number
    quantidadeMarmitas: number
    dataEntrega?: string
}

export interface UpdatePedidoPayload {
    quantidadeMarmitas?: number
    dataEntrega?: string | null
    status?: PedidoStatus
}

export interface ListPedidosParams {
    page: number
    pageSize: number
    status?: PedidoStatus
    clienteId?: number
    marmitaId?: number
    search?: string
    dataInicio?: string
    dataFim?: string
}

export async function listPedidos(params: ListPedidosParams): Promise<PaginatedResponse<Pedido>> {
    const query: Record<string, string | number> = { page: params.page, pageSize: params.pageSize }
    if (params.status) query.status = params.status
    if (params.clienteId) query.clienteId = params.clienteId
    if (params.marmitaId) query.marmitaId = params.marmitaId
    if (params.search) query.search = params.search
    if (params.dataInicio) query.dataInicio = params.dataInicio
    if (params.dataFim) query.dataFim = params.dataFim
    const raw = await apiClient.get<PaginatedResponse<RawPedido>>(ApiRoute.Pedidos, query)
    return { ...raw, data: raw.data.map(mapPedido) }
}

export async function createPedido(payload: CreatePedidoPayload): Promise<void> {
    await apiClient.post(ApiRoute.Pedidos, payload)
}

export async function updatePedido(id: number, payload: UpdatePedidoPayload): Promise<void> {
    await apiClient.put(ApiRoute.Pedidos, id, payload)
}

export async function deletePedido(id: number): Promise<void> {
    await apiClient.delete(ApiRoute.Pedidos, id)
}
