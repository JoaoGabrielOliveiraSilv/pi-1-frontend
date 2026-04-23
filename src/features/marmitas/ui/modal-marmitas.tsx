"use client"

import { useForm, type Resolver } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { Modal } from "@/shared/components/ui/Modal"
import { FormField } from "@/shared/components/ui/form-field"
import { Button } from "../../../../components"
import { useCreateMarmita } from "../hooks/use-create-marmita"
import { marmitaSchema, MarmitaFormData } from "../schema"
import { CreateMarmitaPayload } from "../services"

interface IModalMarmitasProps {
    open: boolean
    onClose: () => void
}

function applyDecimalMask(value: string) {
    const cleaned = value.replace(/[^\d,]/g, "")
    const [intPart, ...rest] = cleaned.split(",")
    if (rest.length === 0) return intPart
    return intPart + "," + rest.join("").slice(0, 2)
}

export function ModalMarmitas({ open, onClose }: IModalMarmitasProps) {
    const { mutate, loading } = useCreateMarmita()
    const { register, handleSubmit, reset, setValue, formState: { errors } } = useForm<MarmitaFormData>({
        resolver: zodResolver(marmitaSchema) as unknown as Resolver<MarmitaFormData>,
    })

    function handleClose() {
        reset()
        onClose()
    }

    async function onSubmit(data: MarmitaFormData) {
        await mutate(data as unknown as CreateMarmitaPayload)
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
        <Modal title="Nova marmita" open={open} onClose={handleClose}>
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
                    <div className="flex flex-col gap-4 md:flex-row justify-between">
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
