"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/shared/components/ui/Modal"
import { FormField } from "@/shared/components/ui/form-field"
import { Button } from "../../../../components"
import { useUpdatePedido } from "../hooks/use-update-pedido"
import { editPedidoSchema, EditPedidoFormData } from "../schema"
import { Pedido, PEDIDO_STATUSES, PEDIDO_STATUS_LABELS } from "../types"

interface IModalEditPedidosProps {
    pedido: Pedido | null
    onClose: () => void
}

export function ModalEditPedidos({ pedido, onClose }: IModalEditPedidosProps) {
    const { mutate, loading } = useUpdatePedido()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<EditPedidoFormData>({
        resolver: zodResolver(editPedidoSchema),
    })

    useEffect(() => {
        if (pedido) {
            reset({
                quantidadeMarmitas: String(pedido.quantidadeMarmitas),
                dataEntrega: pedido.dataEntrega ? pedido.dataEntrega.slice(0, 10) : "",
                status: pedido.status,
            })
        }
    }, [pedido, reset])

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: EditPedidoFormData) {
        if (!pedido) return
        await mutate(pedido.idPedidos, {
            quantidadeMarmitas: Number(data.quantidadeMarmitas),
            dataEntrega: data.dataEntrega || null,
            status: data.status,
        })
        reset()
        onClose()
    }

    return (
        <Modal
            title="Editar pedido"
            open={!!pedido}
            onClose={handleClose}
            footer={<Button label="Salvar" className="w-full" type="submit" form="form-editar-pedido" disabled={loading} />}
        >
            <form id="form-editar-pedido" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        type="select"
                        label="Status *"
                        error={errors.status?.message}
                        selectProps={{ ...register("status") }}
                    >
                        {PEDIDO_STATUSES.map((s) => (
                            <option key={s} value={s}>{PEDIDO_STATUS_LABELS[s]}</option>
                        ))}
                    </FormField>
                    <FormField
                        label="Quantidade *"
                        error={errors.quantidadeMarmitas?.message}
                        inputProps={{
                            ...register("quantidadeMarmitas"),
                            type: "number",
                            min: 1,
                        }}
                    />
                    <FormField
                        label="Data de entrega"
                        error={errors.dataEntrega?.message}
                        inputProps={{
                            ...register("dataEntrega"),
                            type: "date",
                        }}
                    />
                </div>
            </form>
        </Modal>
    )
}
