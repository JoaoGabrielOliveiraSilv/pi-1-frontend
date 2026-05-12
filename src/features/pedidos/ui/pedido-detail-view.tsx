"use client"

import { useState } from "react"
import Link from "next/link"
import { ArrowLeft, Phone, MapPin } from "lucide-react"
import { cn } from "@/shared/lib/cn"
import { usePedido } from "../hooks/use-pedido"
import { useDeletePedido } from "../hooks/use-delete-pedido"
import { ModalEditPedidos } from "./modal-edit-pedidos"
import { Button } from "../../../../components"
import { PedidoStatus, PEDIDO_STATUS_LABELS } from "../types"
import { useRouter } from "next/navigation"

interface PedidoDetailViewProps {
    id: number
}

const STATUS_STYLES: Record<PedidoStatus, string> = {
    PENDENTE: "bg-yellow-100 text-yellow-800",
    CONFIRMADO: "bg-blue-100 text-blue-800",
    PREPARANDO: "bg-orange-100 text-orange-800",
    ENTREGUE: "bg-green-100 text-green-800",
    CANCELADO: "bg-red-100 text-red-800",
}

function formatDate(value: string | null) {
    if (!value) return "—"
    const [year, month, day] = value.slice(0, 10).split("-")
    return `${day}/${month}/${year}`
}

function formatBRL(value: string) {
    return `R$ ${parseFloat(value).toFixed(2).replace(".", ",")}`
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-3">
            <h2 className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">{title}</h2>
            {children}
        </div>
    )
}

export function PedidoDetailView({ id }: PedidoDetailViewProps) {
    const router = useRouter()
    const { pedido, loading } = usePedido(id)
    const { mutate: deletePedido } = useDeletePedido()
    const [editing, setEditing] = useState(false)

    async function handleDelete() {
        if (!confirm("Excluir este pedido?")) return
        await deletePedido(id)
        router.push("/pedidos")
    }

    if (loading) {
        return (
            <div className="flex items-center justify-center py-24 text-muted-foreground">
                Carregando...
            </div>
        )
    }

    if (!pedido) {
        return (
            <div className="flex flex-col items-center justify-center gap-4 py-24 text-muted-foreground">
                <p>Pedido não encontrado.</p>
                <Link href="/pedidos" className="text-primary underline text-sm">Voltar aos pedidos</Link>
            </div>
        )
    }

    const totalItens = pedido.itens.reduce((sum, i) => sum + i.quantidade, 0)

    return (
        <>
            {editing && (
                <ModalEditPedidos pedido={pedido} onClose={() => setEditing(false)} />
            )}

            <div className="mx-auto max-w-2xl px-4 py-6 flex flex-col gap-6">
                {/* Cabeçalho */}
                <div className="flex items-center gap-3">
                    <Link
                        href="/pedidos"
                        className="flex items-center gap-1 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="h-4 w-4" />
                        Pedidos
                    </Link>
                </div>

                <div className="flex items-start justify-between gap-4">
                    <div className="flex flex-col gap-2">
                        <h1 className="text-2xl font-bold text-foreground">Pedido #{pedido.idPedidos}</h1>
                        <span className={cn("self-start rounded-full px-3 py-1 text-sm font-semibold", STATUS_STYLES[pedido.status])}>
                            {PEDIDO_STATUS_LABELS[pedido.status]}
                        </span>
                    </div>
                    <div className="flex gap-2 shrink-0">
                        <Button label="Editar" onClick={() => setEditing(true)} />
                        <Button
                            label="Excluir"
                            className="bg-red-50 text-red-600 hover:bg-red-100 border border-red-200"
                            onClick={handleDelete}
                        />
                    </div>
                </div>

                {/* Cliente */}
                <Section title="Cliente">
                    <p className="text-base font-semibold text-foreground">{pedido.clienteNome}</p>
                    <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                        <span className="flex items-center gap-2">
                            <Phone className="h-3.5 w-3.5 shrink-0" />
                            {pedido.clienteTelefone}
                        </span>
                        {pedido.clienteEndereco && (
                            <span className="flex items-center gap-2">
                                <MapPin className="h-3.5 w-3.5 shrink-0" />
                                {pedido.clienteEndereco}
                            </span>
                        )}
                    </div>
                </Section>

                {/* Itens */}
                <Section title={`Itens do pedido (${totalItens} ${totalItens === 1 ? "unidade" : "unidades"})`}>
                    <div className="flex flex-col divide-y divide-border">
                        {pedido.itens.map((item) => {
                            const subtotal = parseFloat(item.precoUnitario) * item.quantidade
                            return (
                                <div key={item.idPedidoItem} className="flex items-center justify-between gap-4 py-3 first:pt-0 last:pb-0">
                                    <div className="flex flex-col">
                                        <span className="text-sm font-medium text-foreground">{item.marmitaDescricao}</span>
                                        <span className="text-xs text-muted-foreground">
                                            {item.quantidade}× {formatBRL(item.precoUnitario)} /un
                                        </span>
                                    </div>
                                    <span className="text-sm font-semibold text-foreground shrink-0">
                                        {formatBRL(subtotal.toString())}
                                    </span>
                                </div>
                            )
                        })}
                    </div>
                    <div className="flex items-center justify-between border-t border-border pt-3 mt-1">
                        <span className="text-sm font-semibold text-foreground">Total</span>
                        <span className="text-lg font-bold text-foreground">{formatBRL(pedido.valorTotal)}</span>
                    </div>
                </Section>

                {/* Datas */}
                <Section title="Datas">
                    <div className="flex flex-col gap-2 text-sm">
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Pedido criado em</span>
                            <span className="font-medium text-foreground">{formatDate(pedido.dataPedido)}</span>
                        </div>
                        <div className="flex justify-between">
                            <span className="text-muted-foreground">Entrega prevista</span>
                            <span className="font-medium text-foreground">{formatDate(pedido.dataEntrega)}</span>
                        </div>
                    </div>
                </Section>
            </div>
        </>
    )
}
