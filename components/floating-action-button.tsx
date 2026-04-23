import type { LucideIcon } from "lucide-react"

export type FloatingActionButtonProps = {
  icon: LucideIcon
  label: string
  onClick?: () => void
}

export function FloatingActionButton({ icon: Icon, label, onClick }: FloatingActionButtonProps) {
  return (
    <button
      onClick={onClick}
      aria-label={label}
      className="fixed bottom-20 right-4 z-40 flex size-14 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg transition-transform hover:scale-105 active:scale-95 md:bottom-6 md:right-6"
    >
      <Icon className="size-6" />
    </button>
  )
}
