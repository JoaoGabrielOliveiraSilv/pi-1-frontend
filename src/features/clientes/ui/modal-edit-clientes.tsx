"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/shared/components/ui/Modal"
import { FormField } from "@/shared/components/ui/form-field"
import { Button } from "../../../../components"
import { useUpdateCliente } from "../hooks/use-update-cliente"
import { clienteSchema, ClienteFormData } from "../schema"
import { Cliente } from "../types"

interface IModalEditClientesProps {
    cliente: Cliente | null
    onClose: () => void
}

function applyPhoneMask(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11)
    if (digits.length <= 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim()
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim()
}

export function ModalEditClientes({ cliente, onClose }: IModalEditClientesProps) {
    const { mutate, loading } = useUpdateCliente()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ClienteFormData>({
        resolver: zodResolver(clienteSchema),
    })

    useEffect(() => {
        if (cliente) {
            reset({
                nome: cliente.nome,
                endereco: cliente.endereco,
                telefone: applyPhoneMask(cliente.telefone),
                obs: cliente.obs ?? "",
            })
        }
    }, [cliente, reset])

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: ClienteFormData) {
        if (!cliente) return
        await mutate(cliente.idClientes, { nome: data.nome, endereco: data.endereco, telefone: data.telefone, obs: data.obs })
        reset()
        onClose()
    }

    return (
        <Modal
            title="Editar cliente"
            open={!!cliente}
            onClose={handleClose}
            footer={<Button label="Salvar" className="w-full" type="submit" form="form-editar-cliente" disabled={loading} />}
        >
            <form id="form-editar-cliente" onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        label="Nome *"
                        error={errors.nome?.message}
                        inputProps={{ ...register("nome"), placeholder: "Ex: João Silva" }}
                    />
                    <FormField
                        label="Endereço *"
                        error={errors.endereco?.message}
                        inputProps={{ ...register("endereco"), placeholder: "Ex: Rua das Flores, 123" }}
                    />
                    <FormField
                        label="Telefone *"
                        error={errors.telefone?.message}
                        inputProps={{
                            ...register("telefone"),
                            placeholder: "Ex.: (13) 99999-9999",
                            onChange: (e) => {
                                const masked = applyPhoneMask(e.target.value)
                                setValue("telefone", masked, { shouldValidate: true })
                            },
                        }}
                    />
                    <FormField
                        type="textarea"
                        label="Observação"
                        error={errors.obs?.message}
                        textAreaProps={{ ...register("obs"), placeholder: "Alérgico a camarão" }}
                    />
                </div>
            </form>
        </Modal>
    )
}
