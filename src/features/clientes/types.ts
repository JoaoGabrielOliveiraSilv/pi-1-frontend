export type { PaginatedMeta, PaginatedResponse } from "@/shared/types/pagination"

export type Cliente = {
  idClientes: number
  nome: string
  telefone: string
  endereco: string
  obs: string | null
}
