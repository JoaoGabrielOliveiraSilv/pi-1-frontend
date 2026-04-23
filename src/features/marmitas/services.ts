import { apiClient, ApiRoute } from "@/shared/lib/api-client"
import { Marmita, PaginatedResponse } from "./types"

export interface CreateMarmitaPayload {
    descricao: string
    precoBase: number
    adicionalEmbalagem: number
    peso: number
}

export interface UpdateMarmitaPayload {
    descricao?: string
    precoBase?: number
    adicionalEmbalagem?: number
    peso?: number
}

export interface ListMarmitasParams {
    page: number
    pageSize: number
    search?: string
}

export async function listMarmitas(params: ListMarmitasParams): Promise<PaginatedResponse<Marmita>> {
    const query: Record<string, string | number> = { page: params.page, pageSize: params.pageSize }
    if (params.search) query.search = params.search
    return apiClient.get<PaginatedResponse<Marmita>>(ApiRoute.Marmitas, query)
}

export async function createMarmita(payload: CreateMarmitaPayload): Promise<void> {
    await apiClient.post(ApiRoute.Marmitas, payload)
}

export async function updateMarmita(id: number, payload: UpdateMarmitaPayload): Promise<void> {
    await apiClient.put(ApiRoute.Marmitas, id, payload)
}

export async function deleteMarmita(id: number): Promise<void> {
    await apiClient.delete(ApiRoute.Marmitas, id)
}
