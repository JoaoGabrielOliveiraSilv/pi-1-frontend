import { apiClient, ApiRoute } from "@/shared/lib/api-client"
import { Cliente, PaginatedResponse } from "./types"

export interface CreateClientePayload {
    nome: string
    endereco: string
    telefone: string
    obs?: string
}

export interface ListClientesParams {
    page: number
    pageSize: number
    search?: string
}

export async function createCliente(payload: CreateClientePayload): Promise<void> {
    await apiClient.post(ApiRoute.Clientes, payload)
}

export interface UpdateClientePayload {
    nome?: string
    endereco?: string
    telefone?: string
    obs?: string
}

export async function listClientes(params: ListClientesParams): Promise<PaginatedResponse<Cliente>> {
    const query: Record<string, string | number> = { page: params.page, pageSize: params.pageSize }
    if (params.search) query.search = params.search
    return apiClient.get<PaginatedResponse<Cliente>>(ApiRoute.Clientes, query)
}

export async function updateCliente(id: number, payload: UpdateClientePayload): Promise<void> {
    await apiClient.put(ApiRoute.Clientes, id, payload)
}

export async function deleteCliente(id: number, force?: boolean): Promise<void> {
    await apiClient.delete(ApiRoute.Clientes, id, force ? { force: 'true' } : undefined)
}
