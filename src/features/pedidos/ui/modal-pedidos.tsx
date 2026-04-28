"use client"

import { useForm } from "react-hook-form"
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
    const { register, handleSubmit, reset, formState: { errors } } = useForm<PedidoFormData>({
        resolver: zodResolver(pedidoSchema),
    })

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: PedidoFormData) {
        await mutate({
            clienteId: Number(data.clienteId),
            marmitaId: Number(data.marmitaId),
            quantidadeMarmitas: Number(data.quantidadeMarmitas),
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
                    <FormField
                        type="select"
                        label="Marmita *"
                        error={errors.marmitaId?.message}
                        selectProps={{ ...register("marmitaId") }}
                    >
                        <option value="">Selecione uma marmita</option>
                        {marmitas.map((m) => (
                            <option key={m.idMarmita} value={m.idMarmita}>{m.descricao}</option>
                        ))}
                    </FormField>
                    <FormField
                        label="Quantidade *"
                        error={errors.quantidadeMarmitas?.message}
                        inputProps={{
                            ...register("quantidadeMarmitas"),
                            type: "number",
                            min: 1,
                            placeholder: "1",
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
