"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { FormField } from "@/shared/components/ui/form-field"
import { useLogin } from "@/features/auth/hooks/use-login"
import { loginSchema, LoginFormData } from "@/features/auth/schema"

export default function LoginPage() {
    const { login, loading } = useLogin()

    const { register, handleSubmit, formState: { errors } } = useForm<LoginFormData>({
        resolver: zodResolver(loginSchema),
    })

    return (
        <div className="w-full max-w-sm">
            <div className="rounded-xl border border-input bg-card p-8 shadow-sm">
                <div className="mb-8 text-center">
                    <h1 className="text-2xl font-semibold tracking-tight">Marmitas</h1>
                    <p className="mt-1 text-sm text-muted-foreground">Faça login para continuar</p>
                </div>

                <form onSubmit={handleSubmit((data) => login(data))} className="flex flex-col gap-4">
                    <FormField
                        label="Usuário"
                        error={errors.username?.message}
                        inputProps={{
                            ...register("username"),
                            placeholder: "Digite seu usuário",
                            autoComplete: "username",
                        }}
                    />

                    <FormField
                        label="Senha"
                        error={errors.password?.message}
                        inputProps={{
                            ...register("password"),
                            type: "password",
                            placeholder: "Digite sua senha",
                            autoComplete: "current-password",
                        }}
                    />

                    <button
                        type="submit"
                        disabled={loading}
                        className="mt-2 h-10 w-full rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-50"
                    >
                        {loading ? "Entrando..." : "Entrar"}
                    </button>
                </form>
            </div>
        </div>
    )
}
