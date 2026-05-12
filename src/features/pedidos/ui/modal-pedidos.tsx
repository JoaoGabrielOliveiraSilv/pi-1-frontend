"use client"

import { useForm, useFieldArray } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/shared/components/ui/Modal"
import { FormField } from "@/shared/components/ui/form-field"
import { Button } from "../../../../components"
import { useCreatePedido } from "../hooks/use-create-pedido"
import { pedidoSchema, PedidoFormData } from "../schema"
import { useClientes } from "@/features/clientes/hooks/use-clientes"
import { useMarmitas } from "@/features/marmitas/hooks/use-marmitas"

interface IModalPedidosProps {
    open: boolean
    onClose: () => void
}

export function ModalPedidos({ open, onClose }: IModalPedidosProps) {
    const { mutate, loading } = useCreatePedido()
    const { clientes } = useClientes({ pageSize: 100 })
    const { marmitas } = useMarmitas({ pageSize: 100 })
    const { register, handleSubmit, reset, control, formState: { errors } } = useForm<PedidoFormData>({
        resolver: zodResolver(pedidoSchema),
        defaultValues: { itens: [{ marmitaId: 0, quantidade: 1 }] },
    })
    const { fields, append, remove } = useFieldArray({ control, name: "itens" })

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: PedidoFormData) {
        await mutate({
            clienteId: Number(data.clienteId),
            itens: data.itens.map((item) => ({
                marmitaId: Number(item.marmitaId),
                quantidade: Number(item.quantidade),
            })),
            dataEntrega: data.dataEntrega || undefined,
        })
        reset()
        onClose()
    }

    return (
        <Modal
            title="Novo pedido"
            open={open}
            onClose={handleClose}
            footer={<Button label="Salvar" className="w-full" type="submit" form="form-novo-pedido" disabled={loading} />}
        >
            <form id="form-novo-pedido" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        type="select"
                        label="Cliente *"
                        error={errors.clienteId?.message}
                        selectProps={{ ...register("clienteId") }}
                    >
                        <option value="">Selecione um cliente</option>
                        {clientes.map((c) => (
                            <option key={c.idClientes} value={c.idClientes}>{c.nome}</option>
                        ))}
                    </FormField>

                    <div className="flex flex-col gap-2">
                        <span className="text-sm font-medium text-foreground">Marmitas *</span>
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
