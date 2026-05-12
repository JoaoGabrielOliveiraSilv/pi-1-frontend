"use client"

import { useEffect } from "react"
import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/shared/components/ui/Modal"
import { FormField } from "@/shared/components/ui/form-field"
import { Button } from "../../../../components"
import { useUpdatePedido } from "../hooks/use-update-pedido"
import { editPedidoSchema, EditPedidoFormData } from "../schema"
import { Pedido, PEDIDO_STATUSES, PEDIDO_STATUS_LABELS } from "../types"
import { useMarmitas } from "@/features/marmitas/hooks/use-marmitas"

interface IModalEditPedidosProps {
    pedido: Pedido | null
    onClose: () => void
}

export function ModalEditPedidos({ pedido, onClose }: IModalEditPedidosProps) {
    const { mutate, loading } = useUpdatePedido()
    const { marmitas } = useMarmitas({ pageSize: 100 })
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<EditPedidoFormData>({
        resolver: zodResolver(editPedidoSchema),
    })
    const { fields, append, remove } = useFieldArray({ control, name: "itens" })

    useEffect(() => {
        if (pedido) {
            reset({
                status: pedido.status,
                dataEntrega: pedido.dataEntrega ? pedido.dataEntrega.slice(0, 10) : "",
                itens: pedido.itens.map((item) => ({
                    marmitaId: item.marmitaId,
                    quantidade: item.quantidade,
                })),
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
            status: data.status,
            dataEntrega: data.dataEntrega || null,
            itens: data.itens?.map((item) => ({
                marmitaId: Number(item.marmitaId),
                quantidade: Number(item.quantidade),
            })),
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

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-foreground">Marmitas</span>
                        {errors.itens?.message && (
                            <span className="text-xs text-red-500">{errors.itens.message}</span>
                        )}
                        {fields.map((field, index) => (
                            <div key={field.id} className="flex gap-2 items-start">
                                <div className="flex-1">
                                    <FormField
                                        type="select"
                                        label=""
                                        error={errors.itens?.[index]?.marmitaId?.message}
                                        selectProps={{ ...register(`itens.${index}.marmitaId`) }}
                                    >
                                        <option value="">Selecione uma marmita</option>
                                        {marmitas.map((m) => (
                                            <option key={m.idMarmita} value={m.idMarmita}>{m.descricao}</option>
                                        ))}
                                    </FormField>
                                </div>
                                <div className="w-24">
                                    <FormField
                                        label=""
                                        error={errors.itens?.[index]?.quantidade?.message}
                                        inputProps={{
                                            ...register(`itens.${index}.quantidade`),
                                            type: "number",
                                            min: 1,
                                            placeholder: "Qtd",
                                        }}
                                    />
                                </div>
                                <button
                                    type="button"
                                    onClick={() => remove(index)}
                                    disabled={fields.length === 1}
                                    className="mt-1 text-red-500 hover:text-red-700 disabled:opacity-30 disabled:cursor-not-allowed px-1"
                                    aria-label="Remover item"
                                >
                                    ✕
                                </button>
                            </div>
                        ))}
                        <button
                            type="button"
                            onClick={() => append({ marmitaId: 0, quantidade: 1 })}
                            className="text-sm text-primary hover:underline self-start"
                        >
                            + Adicionar marmita
                        </button>
                    </div>

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
