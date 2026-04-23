import { z } from "zod"

export const clienteSchema = z.object({
    nome: z.string().min(1, "Nome é obrigatório").max(255),
    endereco: z.string().min(1, "Endereço é obrigatório").max(255),
    telefone: z
        .string()
        .min(1, "Telefone é obrigatório")
        .transform((v) => v.replace(/\D/g, ""))
        .pipe(z.string().min(10, "Telefone inválido").max(12, "Telefone inválido")),
    obs: z.string().max(255).optional(),
})

export type ClienteFormData = z.input<typeof clienteSchema>
