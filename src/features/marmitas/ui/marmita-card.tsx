import { RowEditDeleteActions } from "../../../../components"
import type { Marmita } from "../types"

interface MarmitaCardProps {
    marmita: Marmita
    onEdit: () => void
    onDelete: () => void
}

function formatCurrency(value: number | string) {
    return Number(value).toLocaleString("pt-BR", { style: "currency", currency: "BRL" })
}

function formatDecimal(value: number | string) {
    return Number(value).toLocaleString("pt-BR", { minimumFractionDigits: 2, maximumFractionDigits: 2 })
}

export function MarmitaCard({ marmita, onEdit, onDelete }: MarmitaCardProps) {
    return (
        <div className="flex flex-col gap-3 rounded-lg border border-border bg-card p-5">
            <div className="flex items-center justify-between gap-2">
                <span className="text-base font-semibold leading-tight text-foreground">
                    {marmita.descricao}
                </span>
                <RowEditDeleteActions onEdit={onEdit} onDelete={onDelete} />
            </div>
            <span className="text-2xl font-bold text-foreground">
                {formatCurrency(marmita.precoBase)}
            </span>
            <div className="flex flex-col gap-1 text-sm text-muted-foreground">
                <span>{formatDecimal(marmita.peso)} kg</span>
                <span>Embalagem: {formatCurrency(marmita.adicionalEmbalagem)}</span>
            </div>
        </div>
    )
}
