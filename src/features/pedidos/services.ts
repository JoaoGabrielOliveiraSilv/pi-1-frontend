import { apiClient, ApiRoute } from "@/shared/lib/api-client"
import { Pedido, PedidoItem, PedidoStatus, PaginatedResponse } from "./types"

interface RawPedidoItem {
    idPedidoItem: number
    quantidade: number
    precoUnitario: string
    marmitasIdMarmita: number
    marmita: {
        idMarmita: number
        descricao: string
        precoBase: string
        adicionalEmbalagem: string
        peso: string
    }
}

interface RawPedido {
    idPedidos: number
    clientesIdClientes: number
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
    itens: RawPedidoItem[]
}

function mapPedidoItem(raw: RawPedidoItem): PedidoItem {
    return {
        idPedidoItem: raw.idPedidoItem,
        marmitaId: raw.marmitasIdMarmita,
        marmitaDescricao: raw.marmita.descricao,
        quantidade: raw.quantidade,
        precoUnitario: raw.precoUnitario,
    }
}

function mapPedido(raw: RawPedido): Pedido {
    return {
        idPedidos: raw.idPedidos,
        clienteId: raw.clientesIdClientes,
        clienteNome: raw.cliente.nome,
        clienteTelefone: raw.cliente.telefone,
        clienteEndereco: raw.cliente.endereco,
        itens: raw.itens.map(mapPedidoItem),
        dataPedido: raw.dataPedido,
        dataEntrega: raw.dataEntrega,
        status: raw.status,
        valorTotal: raw.valorTotal,
    }
}

export interface PedidoItemPayload {
    marmitaId: number
    quantidade: number
}

export interface CreatePedidoPayload {
    clienteId: number
    itens: PedidoItemPayload[]
    dataEntrega?: string
}

export interface UpdatePedidoPayload {
    itens?: PedidoItemPayload[]
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

export async function getPedidoById(id: number): Promise<Pedido> {
    const raw = await apiClient.getById<RawPedido>(ApiRoute.Pedidos, id)
    return mapPedido(raw)
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
