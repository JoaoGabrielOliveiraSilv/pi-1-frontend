"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { ArrowLeft } from "lucide-react"
import { cn } from "@/shared/lib/cn"
import { usePedido } from "../hooks/use-pedido"
import { useDeletePedido } from "../hooks/use-delete-pedido"
import { ModalEditPedidos } from "./modal-edit-pedidos"
import { Pedido, PedidoStatus, PEDIDO_STATUS_LABELS } from "../types"

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
    if (!value) return null
    const [year, month, day] = value.slice(0, 10).split("-")
    return `${day}/${month}/${year}`
}

function formatCurrency(value: string) {
    return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
    return (
        <div className="rounded-lg border border-border bg-card p-5 flex flex-col gap-3">
            <h2 className="text-sm font-semibold text-muted-foreground uppercase tracking-wide">{title}</h2>
            {children}
        </div>
    )
}

function Row({ label, value }: { label: string; value: React.ReactNode }) {
    return (
        <div className="flex justify-between gap-4 text-sm">
            <span className="text-muted-foreground">{label}</span>
            <span className="font-medium text-foreground text-right">{value}</span>
        </div>
    )
}

export function PedidoDetailView({ id }: PedidoDetailViewProps) {
    const router = useRouter()
    const { pedido, loading, error } = usePedido(id)
    const { mutate: deletePedido } = useDeletePedido()
    const [editingPedido, setEditingPedido] = useState<Pedido | null>(null)

    function handleDelete() {
        if (!pedido) return
        deletePedido(pedido.idPedidos, {
            onSuccess: () => router.push("/pedidos"),
        })
    }

    return (
        <>
            <ModalEditPedidos pedido={editingPedido} onClose={() => setEditingPedido(null)} />
            <div className="flex flex-col gap-6 p-6 md:p-8 max-w-2xl mx-auto w-full">
                <div className="flex items-center gap-3">
                    <button
                        onClick={() => router.back()}
                        className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <ArrowLeft className="size-4" />
                        Voltar
                    </button>
                </div>

                {loading && (
                    <p className="text-sm text-muted-foreground">Carregando...</p>
                )}

                {error && (
                    <p className="text-sm text-destructive">{error}</p>
                )}

                {pedido && (
                    <>
                        <div className="flex items-center justify-between gap-4">
                            <div>
                                <h1 className="text-2xl font-semibold tracking-tight text-foreground">
                                    Pedido #{pedido.idPedidos}
                                </h1>
                                <p className="text-sm text-muted-foreground mt-0.5">
                                    Criado em {formatDate(pedido.dataPedido)}
                                </p>
                            </div>
                            <span className={cn("rounded-full px-3 py-1 text-sm font-semibold", STATUS_STYLES[pedido.status])}>
                                {PEDIDO_STATUS_LABELS[pedido.status]}
                            </span>
                        </div>

                        <Section title="Cliente">
                            <Row label="Nome" value={pedido.clienteNome} />
                            <Row label="Telefone" value={pedido.clienteTelefone} />
                            {pedido.clienteEndereco && (
                                <Row label="Endereço" value={pedido.clienteEndereco} />
                            )}
                        </Section>

                        <Section title="Itens">
                            {pedido.itens.map((item) => (
                                <div key={item.idPedidoItem} className="flex justify-between gap-4 text-sm">
                                    <span className="text-foreground">
                                        {item.quantidade}× {item.marmitaDescricao}
                                    </span>
                                    <span className="font-medium text-muted-foreground whitespace-nowrap">
                                        {formatCurrency(item.precoUnitario)} /un
                                    </span>
                                </div>
                            ))}
                            <div className="border-t border-border pt-3 flex justify-between text-sm font-semibold">
                                <span>Total</span>
                                <span>{formatCurrency(pedido.valorTotal)}</span>
                            </div>
                        </Section>

                        <Section title="Entrega">
                            <Row
                                label="Data de entrega"
                                value={pedido.dataEntrega ? formatDate(pedido.dataEntrega) : "Não definida"}
                            />
                        </Section>

                        <div className="flex gap-3">
                            <button
                                onClick={() => setEditingPedido(pedido)}
                                className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors"
                            >
                                Editar
                            </button>
                            <button
                                onClick={handleDelete}
                                className="flex-1 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors"
                            >
                                Excluir pedido
                            </button>
                        </div>
                    </>
                )}
            </div>
        </>
    )
}
