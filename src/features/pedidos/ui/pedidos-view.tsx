"use client"

import { useState } from "react"
import Link from "next/link"
import { ModalPedidos } from "./modal-pedidos"
import { ModalEditPedidos } from "./modal-edit-pedidos"
import { CardList, ListPageLayout, ResourceRowCard, RowEditDeleteActions } from "../../../../components"
import { Input } from "@/shared/components/ui/input"
import { Plus } from "lucide-react"
import { usePedidos } from "../hooks/use-pedidos"
import { useDeletePedido } from "../hooks/use-delete-pedido"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { cn } from "@/shared/lib/cn"
import { Pedido, PedidoStatus, PEDIDO_STATUSES, PEDIDO_STATUS_LABELS } from "../types"

type PeriodoFiltro = "" | "hoje" | "semanal" | "mensal"

function fmtLocal(d: Date) {
    const y = d.getFullYear()
    const m = String(d.getMonth() + 1).padStart(2, "0")
    const day = String(d.getDate()).padStart(2, "0")
    return `${y}-${m}-${day}`
}

function getDateRange(periodo: PeriodoFiltro): { dataInicio?: string; dataFim?: string } {
    if (!periodo) return {}
    const hoje = new Date()
    if (periodo === "hoje") {
        const s = fmtLocal(hoje)
        return { dataInicio: s, dataFim: s }
    }
    if (periodo === "semanal") {
        const domingo = new Date(hoje)
        domingo.setDate(hoje.getDate() - hoje.getDay())
        const sabado = new Date(hoje)
        sabado.setDate(hoje.getDate() + (6 - hoje.getDay()))
        return { dataInicio: fmtLocal(domingo), dataFim: fmtLocal(sabado) }
    }
    // mensal: dia 1 até último dia do mês
    const inicio = new Date(hoje.getFullYear(), hoje.getMonth(), 1)
    const fim = new Date(hoje.getFullYear(), hoje.getMonth() + 1, 0)
    return { dataInicio: fmtLocal(inicio), dataFim: fmtLocal(fim) }
}

const STATUS_STYLES: Record<PedidoStatus, string> = {
    PENDENTE: "bg-yellow-100 text-yellow-800",
    CONFIRMADO: "bg-blue-100 text-blue-800",
    PREPARANDO: "bg-orange-100 text-orange-800",
    ENTREGUE: "bg-green-100 text-green-800",
    CANCELADO: "bg-red-100 text-red-800",
}

function formatDate(value: string | null) {
    if (!value) return null
    const [year, month, day] = value.slice(0, 10).split("-")
    return `${day}/${month}/${year}`
}

const SELECT_CLASS = "flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 md:text-sm"

export function PedidosView() {
    const [modalOpen, setModalOpen] = useState(false)
    const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)
    const [statusFilter, setStatusFilter] = useState<PedidoStatus | "">("")
    const [periodoFilter, setPeriodoFilter] = useState<PeriodoFiltro>("")
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const { pedidos, loading } = usePedidos({
        status: statusFilter,
        search: debouncedSearch,
        ...getDateRange(periodoFilter),
    })
    const { mutate: deletePedido } = useDeletePedido()

    return (
        <>
            <ModalPedidos open={modalOpen} onClose={() => setModalOpen(false)} />
            <ModalEditPedidos pedido={editingPedido} onClose={() => setEditingPedido(null)} />
            <ListPageLayout
                title="Pedidos"
                description="Gerencie os pedidos dos seus clientes."
                headerAction={{
                    label: "Novo pedido",
                    icon: Plus,
                    onClick: () => setModalOpen(true),
                }}
            >
                <div className="flex flex-col gap-3 sm:flex-row sm:items-end">
                    <div className="flex flex-1 flex-col gap-1">
                        <label className="text-xs font-medium text-muted-foreground">Buscar</label>
                        <Input
                            placeholder="Nome do cliente..."
                            value={search}
                            onChange={(e) => setSearch(e.target.value)}
                        />
                    </div>
                    <div className="flex flex-col gap-1 sm:w-48">
                        <label className="text-xs font-medium text-muted-foreground">Status</label>
                        <select
                            value={statusFilter}
                            onChange={(e) => setStatusFilter(e.target.value as PedidoStatus | "")}
                            className={SELECT_CLASS}
                        >
                            <option value="">Todos</option>
                            {PEDIDO_STATUSES.map((s) => (
                                <option key={s} value={s}>{PEDIDO_STATUS_LABELS[s]}</option>
                            ))}
                        </select>
                    </div>
                    <div className="flex flex-col gap-1 sm:w-52">
                        <label className="text-xs font-medium text-muted-foreground">Entrega</label>
                        <select
                            value={periodoFilter}
                            onChange={(e) => setPeriodoFilter(e.target.value as PeriodoFiltro)}
                            className={SELECT_CLASS}
                        >
                            <option value="">Qualquer data</option>
                            <option value="hoje">Hoje</option>
                            <option value="semanal">Esta semana</option>
                            <option value="mensal">Este mês</option>
                        </select>
                    </div>
                </div>
                <CardList
                    items={loading ? [] : pedidos}
                    getKey={(p) => p.idPedidos}
                    empty={
                        <p className="text-lg font-medium text-muted-foreground">
                            {loading ? "Carregando..." : "Nenhum pedido encontrado"}
                        </p>
                    }
                    renderItem={(pedido) => (
                        <Link href={`/pedidos/${pedido.idPedidos}`} className="block">
                            <ResourceRowCard
                                title={`Pedido #${pedido.idPedidos}`}
                                subtitle={[
                                    pedido.clienteNome,
                                    pedido.itens.map((i) => `${i.quantidade}× ${i.marmitaDescricao}`).join(", "),
                                    pedido.dataEntrega ? `Entrega: ${formatDate(pedido.dataEntrega)}` : null,
                                ].filter(Boolean).join(" • ")}
                                actions={
                                    <div
                                        className="flex items-center gap-3"
                                        onClick={(e) => e.preventDefault()}
                                    >
                                        <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS_STYLES[pedido.status])}>
                                            {PEDIDO_STATUS_LABELS[pedido.status]}
                                        </span>
                                        <RowEditDeleteActions
                                            onEdit={() => setEditingPedido(pedido)}
                                            onDelete={() => deletePedido(pedido.idPedidos)}
                                        />
                                    </div>
                                }
                            />
                        </Link>
                    )}
                />
            </ListPageLayout>
        </>
    )
}
