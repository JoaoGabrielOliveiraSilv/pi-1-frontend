"use client"

import { ClipboardList, Clock, CheckCircle, Users, type LucideIcon } from "lucide-react"
import { cn } from "@/shared/lib/cn"
import { useDashboard } from "../hooks/use-dashboard"
import { PedidoRecente } from "../types"
import { PedidoStatus, PEDIDO_STATUS_LABELS } from "@/features/pedidos/types"

const STATUS_STYLES: Record<PedidoStatus, string> = {
    PENDENTE: "bg-yellow-100 text-yellow-800",
    CONFIRMADO: "bg-blue-100 text-blue-800",
    PREPARANDO: "bg-orange-100 text-orange-800",
    ENTREGUE: "bg-green-100 text-green-800",
    CANCELADO: "bg-red-100 text-red-800",
}

function formatDate(iso: string | null) {
    if (!iso) return null
    return new Date(iso).toLocaleDateString("pt-BR")
}

interface StatCardProps {
    label: string
    value: number | null
    icon: LucideIcon
    iconClassName: string
}

function StatCard({ label, value, icon: Icon, iconClassName }: StatCardProps) {
    return (
        <div className="flex items-center justify-between rounded-lg border border-border bg-card p-5">
            <div className="flex flex-col gap-1">
                <span className="text-sm text-muted-foreground">{label}</span>
                <span className="text-3xl font-bold text-foreground">
                    {value ?? "—"}
                </span>
            </div>
            <Icon className={cn("size-8 opacity-80", iconClassName)} />
        </div>
    )
}

function PedidoRecenteRow({ pedido }: { pedido: PedidoRecente }) {
    return (
        <div className="flex items-center justify-between gap-4 py-3 border-b border-border last:border-0">
            <div className="flex flex-col gap-0.5">
                <span className="text-sm font-semibold text-foreground">{pedido.clienteNome}</span>
                <span className="text-xs text-muted-foreground">
                    {pedido.dataEntrega ? `Entrega: ${formatDate(pedido.dataEntrega)} • ` : ""}
                    {pedido.quantidadeMarmitas}x
                </span>
            </div>
            <span className={cn("shrink-0 rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS_STYLES[pedido.status])}>
                {PEDIDO_STATUS_LABELS[pedido.status]}
            </span>
        </div>
    )
}

export function DashboardView() {
    const { data, loading } = useDashboard()

    return (
        <div className="flex flex-col gap-6 p-6 md:p-8">
            <div>
                <h1 className="text-2xl font-semibold tracking-tight text-foreground">Dashboard</h1>
                <p className="text-sm text-muted-foreground">Resumo geral do seu negócio</p>
            </div>

            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
                <StatCard
                    label="Total Pedidos"
                    value={loading ? null : (data?.totalPedidos ?? 0)}
                    icon={ClipboardList}
                    iconClassName="text-teal-500"
                />
                <StatCard
                    label="Pendentes"
                    value={loading ? null : (data?.pendentes ?? 0)}
                    icon={Clock}
                    iconClassName="text-yellow-500"
                />
                <StatCard
                    label="Entregues"
                    value={loading ? null : (data?.entregues ?? 0)}
                    icon={CheckCircle}
                    iconClassName="text-green-500"
                />
                <StatCard
                    label="Clientes"
                    value={loading ? null : (data?.totalClientes ?? 0)}
                    icon={Users}
                    iconClassName="text-blue-500"
                />
            </div>

            <div className="rounded-lg border border-border bg-card p-5">
                <h2 className="text-base font-semibold text-foreground mb-4">Pedidos Recentes</h2>
                {loading ? (
                    <p className="text-sm text-muted-foreground">Carregando...</p>
                ) : !data?.pedidosRecentes.filter(p => p.status === "PENDENTE" || p.status === "PREPARANDO").length ? (
                    <p className="text-sm text-muted-foreground">Nenhum pedido pendente ou em preparo</p>
                ) : (
                    <div>
                        {data.pedidosRecentes
                            .filter(p => p.status === "PENDENTE" || p.status === "PREPARANDO")
                            .map((pedido) => (
                                <PedidoRecenteRow key={pedido.id} pedido={pedido} />
                            ))}
                    </div>
                )}
            </div>
        </div>
    )
}
