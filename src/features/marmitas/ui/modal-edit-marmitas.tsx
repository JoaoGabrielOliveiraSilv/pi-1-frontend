"use client"

import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/shared/components/ui/Modal"
import { FormField } from "@/shared/components/ui/form-field"
import { Button } from "../../../../components"
import { useUpdateMarmita } from "../hooks/use-update-marmita"
import { marmitaSchema, MarmitaFormData } from "../schema"
import { Marmita } from "../types"

interface IModalEditMarmitasProps {
    marmita: Marmita | null
    onClose: () => void
}

export function ModalEditMarmitas({ marmita, onClose }: IModalEditMarmitasProps) {
    const { mutate, loading } = useUpdateMarmita()
    const { register, handleSubmit, reset, formState: { errors } } = useForm<MarmitaFormData>({
        resolver: zodResolver(marmitaSchema),
    })

    useEffect(() => {
        if (marmita) {
            reset({
                descricao: marmita.descricao,
                precoBase: marmita.precoBase,
                adicionalEmbalagem: marmita.adicionalEmbalagem,
                peso: marmita.peso,
            })
        }
    }, [marmita, reset])

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: MarmitaFormData) {
        if (!marmita) return
        await mutate(marmita.idMarmita, data)
        reset()
        onClose()
    }

    return (
        <Modal title="Editar marmita" open={!!marmita} onClose={handleClose}>
            <form onSubmit={handleSubmit(onSubmit)}>
                <div className="flex flex-col gap-4">
                    <FormField
                        label="Descrição *"
                        error={errors.descricao?.message}
                        inputProps={{
                            ...register("descricao"),
                            placeholder: "Ex: Marmita Frango Grelhado",
                        }}
                    />
                    <div className="grid grid-cols-2 gap-4">
                        <FormField
                            label="Preço base (R$) *"
                            error={errors.precoBase?.message}
                            inputProps={{
                                ...register("precoBase"),
                                type: "number",
                                step: "0.01",
                                min: "0.01",
                                placeholder: "18.50",
                            }}
                        />
                        <FormField
                            label="Adicional embalagem (R$) *"
                            error={errors.adicionalEmbalagem?.message}
                            inputProps={{
                                ...register("adicionalEmbalagem"),
                                type: "number",
                                step: "0.01",
                                min: "0",
                                max: "0.99",
                                placeholder: "0.50",
                            }}
                        />
                    </div>
                    <FormField
                        label="Peso (kg) *"
                        error={errors.peso?.message}
                        inputProps={{
                            ...register("peso"),
                            type: "number",
                            step: "0.01",
                            min: "0.01",
                            placeholder: "0.80",
                        }}
                    />
                    <Button label="Salvar" className="w-full" type="submit" disabled={loading} />
                </div>
            </form>
        </Modal>
    )
}
