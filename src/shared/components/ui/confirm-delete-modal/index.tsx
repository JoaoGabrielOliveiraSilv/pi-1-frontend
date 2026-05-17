"use client"

import { Modal } from "../Modal"

interface ConfirmDeleteModalProps {
    open: boolean
    title: string
    description: string
    onConfirm: () => void
    onCancel: () => void
    loading?: boolean
}

export function ConfirmDeleteModal({ open, title, description, onConfirm, onCancel, loading }: ConfirmDeleteModalProps) {
    return (
        <Modal
            title={title}
            open={open}
            onClose={onCancel}
            footer={
                <div className="flex gap-3">
                    <button
                        onClick={onCancel}
                        disabled={loading}
                        className="flex-1 rounded-md border border-border bg-background px-4 py-2 text-sm font-medium hover:bg-accent transition-colors disabled:opacity-50"
                    >
                        Cancelar
                    </button>
                    <button
                        onClick={onConfirm}
                        disabled={loading}
                        className="flex-1 rounded-md bg-destructive px-4 py-2 text-sm font-medium text-destructive-foreground hover:bg-destructive/90 transition-colors disabled:opacity-50"
                    >
                        {loading ? "Removendo..." : "Remover mesmo assim"}
                    </button>
                </div>
            }
        >
            <p className="text-sm text-muted-foreground">{description}</p>
        </Modal>
    )
}
