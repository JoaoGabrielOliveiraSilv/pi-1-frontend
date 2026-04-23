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
import { UpdateMarmitaPayload } from "../services"

interface IModalEditMarmitasProps {
    marmita: Marmita | null
    onClose: () => void
}

function applyDecimalMask(value: string) {
    const cleaned = value.replace(/[^\d,]/g, "")
    const [intPart, ...rest] = cleaned.split(",")
    if (rest.length === 0) return intPart
    return intPart + "," + rest.join("").slice(0, 2)
}

function toDecimalDisplay(value: number) {
    return value.toFixed(2).replace(".", ",")
}

export function ModalEditMarmitas({ marmita, onClose }: IModalEditMarmitasProps) {
    const { mutate, loading } = useUpdateMarmita()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<MarmitaFormData>({
        resolver: zodResolver(marmitaSchema),
    })

    useEffect(() => {
        if (marmita) {
            reset({
                descricao: marmita.descricao,
                precoBase: toDecimalDisplay(marmita.precoBase),
                adicionalEmbalagem: toDecimalDisplay(marmita.adicionalEmbalagem),
                peso: toDecimalDisplay(marmita.peso),
            })
        }
    }, [marmita, reset])

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: MarmitaFormData) {
        if (!marmita) return
        await mutate(marmita.idMarmita, data as unknown as UpdateMarmitaPayload)
        reset()
        onClose()
    }

    function decimalField(field: keyof MarmitaFormData) {
        return {
            ...register(field),
            onChange: (e: React.ChangeEvent<HTMLInputElement>) => {
                setValue(field, applyDecimalMask(e.target.value), { shouldValidate: true })
            },
        }
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
                                ...decimalField("precoBase"),
                                placeholder: "18,50",
                                inputMode: "decimal",
                            }}
                        />
                        <FormField
                            label="Adicional embalagem (R$) *"
                            error={errors.adicionalEmbalagem?.message}
                            inputProps={{
                                ...decimalField("adicionalEmbalagem"),
                                placeholder: "0,50",
                                inputMode: "decimal",
                            }}
                        />
                    </div>
                    <FormField
                        label="Peso (kg) *"
                        error={errors.peso?.message}
                        inputProps={{
                            ...decimalField("peso"),
                            placeholder: "0,80",
                            inputMode: "decimal",
                        }}
                    />
                    <Button label="Salvar" className="w-full" type="submit" disabled={loading} />
                </div>
            </form>
        </Modal>
    )
}
