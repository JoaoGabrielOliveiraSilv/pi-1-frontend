"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/shared/components/ui/Modal"
import { FormField } from "@/shared/components/ui/form-field"
import { Button } from "../../../../components"
import { useCreateCliente } from "../hooks/use-create-cliente"
import { clienteSchema, ClienteFormData } from "../schema"

interface IModalClientesProps {
    open: boolean
    onClose: () => void
}

function applyPhoneMask(value: string) {
    const digits = value.replace(/\D/g, "").slice(0, 11)
    if (digits.length <= 10) {
        return digits.replace(/(\d{2})(\d{4})(\d{0,4})/, "($1) $2-$3").trim()
    }
    return digits.replace(/(\d{2})(\d{5})(\d{0,4})/, "($1) $2-$3").trim()
}

export function ModalClientes({ open, onClose }: IModalClientesProps) {
    const { mutate, loading } = useCreateCliente()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<ClienteFormData>({
        resolver: zodResolver(clienteSchema),
    })

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: ClienteFormData) {
        await mutate({ nome: data.nome, endereco: data.endereco, telefone: data.telefone, obs: data.obs })
        reset()
        onClose()
    }

    return (
        <Modal title="Novo cliente" open={open} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        label="Nome *"
                        error={errors.nome?.message}
                        inputProps={{
                            ...register("nome"),
                            placeholder: "Ex: João Silva",
                        }}
                    />
                    <FormField
                        label="Endereço *"
                        error={errors.endereco?.message}
                        inputProps={{
                            ...register("endereco"),
                            placeholder: "Ex: Rua das Flores, 123",
                        }}
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
                        textAreaProps={{
                            ...register("obs"),
                            placeholder: "Alérgico a camarão",
                        }}
                    />
                    <Button label="Salvar" className="w-full" type="submit" disabled={loading} />
                </div>
            </form>
        </Modal>
    )
}
