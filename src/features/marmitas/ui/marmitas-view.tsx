"use client"

import { useState } from "react"
import { ModalMarmitas } from "./modal-marmitas"
import { ModalEditMarmitas } from "./modal-edit-marmitas"
import { Button, CardList, ListPageLayout, ResourceRowCard, RowEditDeleteActions } from "../../../../components"
import { Plus } from "lucide-react"
import { useMarmitas } from "../hooks/use-marmitas"
import { useDeleteMarmita } from "../hooks/use-delete-marmita"
import { Input } from "@/shared/components/ui/input"
import { Marmita } from "../types"
import { useDebounce } from "@/shared/hooks/use-debounce"

function formatCurrency(value: number | string) {
    return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDecimal(value: number | string) {
    return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function MarmitasView() {
    const [modalOpen, setModalOpen] = useState(false)
    const [editingMarmita, setEditingMarmita] = useState<Marmita | null>(null)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const { marmitas, loading } = useMarmitas({ search: debouncedSearch })
    const { mutate: deleteMarmita } = useDeleteMarmita()

    return (
        <>
            <ModalMarmitas open={modalOpen} onClose={() => setModalOpen(false)} />
            <ModalEditMarmitas marmita={editingMarmita} onClose={() => setEditingMarmita(null)} />
            <ListPageLayout
                title="Marmitas"
                description="Gerencie seu cardápio de marmitas."
                headerAction={
                    <Button className="mt-4 shrink-0" icon={Plus} label="Nova marmita" onClick={() => setModalOpen(true)} />
                }
            >
                <Input
                    placeholder="Buscar marmitas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                <CardList
                    items={loading ? [] : marmitas}
                    getKey={(m) => m.idMarmita}
                    empty={
                        <p className="text-lg font-medium text-muted-foreground">
                            {loading ? "Carregando..." : "Nenhuma marmita encontrada"}
                        </p>
                    }
                    renderItem={(marmita) => (
                        <ResourceRowCard
                            title={marmita.descricao}
                            subtitle={formatCurrency(marmita.precoBase)}
                            description={`${formatDecimal(marmita.peso)} kg · embalagem ${formatCurrency(marmita.adicionalEmbalagem)}`}
                            actions={
                                <RowEditDeleteActions
                                    onEdit={() => setEditingMarmita(marmita)}
                                    onDelete={() => deleteMarmita(marmita.idMarmita)}
                                />
                            }
                        />
                    )}
                />
            </ListPageLayout>
        </>
    )
}
