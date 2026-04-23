import { z } from "zod"

export const marmitaSchema = z.object({
    descricao: z.string().min(1, "Descrição é obrigatória").max(255, "Máximo 255 caracteres"),
    precoBase: z.coerce
        .number({ invalid_type_error: "Preço inválido" })
        .positive("Deve ser maior que zero"),
    adicionalEmbalagem: z.coerce
        .number({ invalid_type_error: "Adicional inválido" })
        .min(0, "Mínimo 0.00")
        .max(0.99, "Máximo 0.99"),
    peso: z.coerce
        .number({ invalid_type_error: "Peso inválido" })
        .positive("Deve ser maior que zero"),
})

export type MarmitaFormData = z.infer<typeof marmitaSchema>
