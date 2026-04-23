"use client"

import { X } from "lucide-react"

export interface IModalProps {
    title: string
    children: React.ReactNode
    onClose: () => void
    open: boolean
}

export function Modal(props: IModalProps) {
    if (!props.open) return null

    return (
        <div className="min-h-full w-full justify-center items-center absolute top-0 left-0 bg-foreground/80 flex">
            <div className="w-lg min-h-80 bg-background flex flex-col rounded-xl overflow-hidden">
                <div className="w-full p-4 flex flex-row justify-between">
                    <h3 className="text-lg font-bold tracking-tight text-foreground items-center">
                        {props.title}
                    </h3>
                    <X size={16} className="self-center cursor-pointer text-muted-foreground hover:text-foreground transition-colors" onClick={props.onClose} />
                </div>
                <div className="w-full p-4">
                    {props.children}
                </div>
            </div>
        </div>
    )
}