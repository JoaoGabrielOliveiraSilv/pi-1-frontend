"use client"

import { useState } from "react"
import { ModalMarmitas } from "./modal-marmitas"
import { ModalEditMarmitas } from "./modal-edit-marmitas"
import { MarmitaCard } from "./marmita-card"
import { FloatingActionButton, ListPageLayout } from "../../../../components"
import { Plus } from "lucide-react"
import { useMarmitas } from "../hooks/use-marmitas"
import { useDeleteMarmita } from "../hooks/use-delete-marmita"
import { Input } from "@/shared/components/ui/input"
import { Marmita } from "../types"
import { useDebounce } from "@/shared/hooks/use-debounce"

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
            <FloatingActionButton icon={Plus} label="Nova marmita" onClick={() => setModalOpen(true)} />
            <ListPageLayout
                title="Marmitas"
                description="Gerencie seu cardápio de marmitas."
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
                                onDelete={() => deleteMarmita(marmita.idMarmita)}
                            />
                        ))}
                    </div>
                )}
            </ListPageLayout>
        </>
    )
}
