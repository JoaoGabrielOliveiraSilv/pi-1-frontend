"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { shellNavItems } from "@/shared/nav.config"

export function BottomNav() {
  const pathname = usePathname()

  return (
    <nav
      className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-sidebar-border bg-sidebar-background md:hidden"
      aria-label="Navegação principal"
    >
      {shellNavItems.map((item) => {
        const active = pathname === item.href || pathname.startsWith(`${item.href}/`)
        return (
          <Link
            key={item.href}
            href={item.href}
            className={[
              "flex flex-1 flex-col items-center justify-center gap-1 py-3 text-xs font-medium transition-colors",
              active
                ? "text-primary"
                : "text-sidebar-foreground/60 hover:text-sidebar-foreground",
            ].join(" ")}
          >
            <item.icon className="size-5" />
            {item.label}
          </Link>
        )
      })}
    </nav>
  )
}
