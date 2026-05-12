import { RowEditDeleteActions } from "../../../../components"
import { cn } from "@/shared/lib/cn"
import type { Pedido, PedidoStatus } from "../types"
import { PEDIDO_STATUS_LABELS } from "../types"

interface PedidoCardProps {
    pedido: Pedido
    onEdit: () => void
    onDelete: () => void
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

export function PedidoCard({ pedido, onEdit, onDelete }: PedidoCardProps) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
                <span className={cn("rounded-full px-2.5 py-0.5 text-xs font-semibold", STATUS_STYLES[pedido.status])}>
                    {PEDIDO_STATUS_LABELS[pedido.status]}
                </span>
                <RowEditDeleteActions onEdit={onEdit} onDelete={onDelete} />
            </div>
            <span className="text-base font-semibold text-foreground">
                Pedido #{pedido.idPedidos}
            </span>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                {pedido.itens.map((item) => (
                    <span key={item.idPedidoItem}>{item.quantidade}× {item.marmitaDescricao}</span>
                ))}
                {pedido.dataEntrega && (
                    <span>Entrega: {formatDate(pedido.dataEntrega)}</span>
                )}
            </div>
        </div>
    )
}
