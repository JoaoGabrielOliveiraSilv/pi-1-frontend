"use client"

import { useRouter } from "next/navigation"
import { LogOut } from "lucide-react"
import { clearToken } from "@/shared/lib/auth"

export function LogoutButton() {
    const router = useRouter()

    function handleLogout() {
        clearToken()
        router.push('/login')
    }

    return (
        <button
            onClick={handleLogout}
            className="flex w-full gap-2 rounded-lg px-3 py-2 text-sm font-medium text-sidebar-foreground/70 transition-colors hover:bg-sidebar-accent hover:text-sidebar-accent-foreground"
        >
            <LogOut className="size-4" />
            Sair
        </button>
    )
}
