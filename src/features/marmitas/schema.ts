import { z } from "zod"

function parseBrazilianDecimal(val: unknown) {
    if (typeof val === "string") return parseFloat(val.replace(",", "."))
    return val
}

export const marmitaSchema = z.object({
    descricao: z.string().min(1, "Descrição é obrigatória").max(255, "Máximo 255 caracteres"),
    precoBase: z.preprocess(
        parseBrazilianDecimal,
        z.number({ message: "Preço inválido" }).positive("Deve ser maior que zero"),
    ),
    adicionalEmbalagem: z.preprocess(
        parseBrazilianDecimal,
        z.number({ message: "Adicional inválido" }).min(0, "Mínimo 0,00").max(0.99, "Máximo 0,99"),
    ),
    peso: z.preprocess(
        parseBrazilianDecimal,
        z.number({ message: "Peso inválido" }).positive("Deve ser maior que zero"),
    ),
})

// Form holds string values; zodResolver preprocesses them to numbers on submit
export type MarmitaFormData = {
    descricao: string
    precoBase: string
    adicionalEmbalagem: string
    peso: string
}
