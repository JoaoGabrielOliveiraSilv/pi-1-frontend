"use client"

import { useState } from "react"
import { ModalMarmitas } from "./modal-marmitas"
import { ModalEditMarmitas } from "./modal-edit-marmitas"
import { MarmitaCard } from "./marmita-card"
import { ListPageLayout } from "../../../../components"
import { Plus } from "lucide-react"
import { useMarmitas } from "../hooks/use-marmitas"
import { useDeleteMarmita } from "../hooks/use-delete-marmita"
import { Input } from "@/shared/components/ui/input"
import { Marmita } from "../types"
import { useDebounce } from "@/shared/hooks/use-debounce"
import { ConfirmDeleteModal } from "@/shared/components/ui/confirm-delete-modal"

export function MarmitasView() {
    const [modalOpen, setModalOpen] = useState(false)
    const [editingMarmita, setEditingMarmita] = useState<Marmita | null>(null)
    const [search, setSearch] = useState("")
    const debouncedSearch = useDebounce(search)
    const { marmitas, loading } = useMarmitas({ search: debouncedSearch })
    const { tryDelete, confirmDelete, cancelDelete, needsConfirmation, loading: deleting } = useDeleteMarmita()

    return (
        <>
            <ModalMarmitas open={modalOpen} onClose={() => setModalOpen(false)} />
            <ModalEditMarmitas marmita={editingMarmita} onClose={() => setEditingMarmita(null)} />
            <ConfirmDeleteModal
                open={needsConfirmation}
                title="Remover marmita"
                description="Esta marmita está associada a pedidos existentes. Ao removê-la, ela não aparecerá mais no cardápio, mas os pedidos existentes serão mantidos com seus dados preservados."
                onConfirm={confirmDelete}
                onCancel={cancelDelete}
                loading={deleting}
            />
            <ListPageLayout
                title="Marmitas"
                description="Gerencie seu cardápio de marmitas."
                headerAction={{
                    label: "Nova marmita",
                    icon: Plus,
                    onClick: () => setModalOpen(true)
                }}
            >
                <Input
                    placeholder="Buscar marmitas..."
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />
                {loading ? (
                    <p className="text-lg font-medium text-muted-foreground">Carregando...</p>
                ) : marmitas.length === 0 ? (
                    <p className="text-lg font-medium text-muted-foreground">Nenhuma marmita encontrada</p>
                ) : (
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
                        {marmitas.map((marmita) => (
                            <MarmitaCard
                                key={marmita.idMarmita}
                                marmita={marmita}
                                onEdit={() => setEditingMarmita(marmita)}
                                onDelete={() => tryDelete(marmita.idMarmita)}
                            />
                        ))}
                    </div>
                )}
            </ListPageLayout>
        </>
    )
}
