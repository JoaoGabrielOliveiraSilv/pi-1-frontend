"use client"

import { useEffect } from "react"
import { X } from "lucide-react"

export interface IModalProps {
    title: string
    children: React.ReactNode
    footer?: React.ReactNode
    onClose: () => void
    open: boolean
}

export function Modal({ open, onClose, title, children, footer }: IModalProps) {
    useEffect(() => {
        if (open) document.body.style.overflow = "hidden"
        else document.body.style.overflow = ""
        return () => { document.body.style.overflow = "" }
    }, [open])

    return (
        <div
            className={`fixed inset-0 z-50 flex items-end justify-center transition-opacity duration-300 md:items-center ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
        >
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div
                className={`relative z-10 flex w-full flex-col rounded-t-2xl bg-background shadow-xl transition-transform duration-300 ease-out md:max-w-lg md:rounded-xl ${open ? "translate-y-0" : "translate-y-full md:translate-y-0"}`}
            >
                <div className="flex justify-center pb-1 pt-3 md:hidden">
                    <div className="h-1 w-10 rounded-full bg-muted-foreground/30" />
                </div>
                <div className="flex items-center justify-between border-b border-border px-5 py-3">
                    <h2 className="text-lg font-bold tracking-tight text-foreground">{title}</h2>
                    <X size={16} className="cursor-pointer text-muted-foreground transition-colors hover:text-foreground" onClick={onClose} />
                </div>
                <div className="overflow-y-auto px-5 pt-4 pb-2 max-h-[60svh] md:max-h-[70vh]">
                    {children}
                </div>
                {footer != null && (
                    <div className="border-t border-border px-5 py-4">
                        {footer}
                    </div>
                )}
            </div>
        </div>
    )
}
