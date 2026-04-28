import type { LucideIcon } from "lucide-react";
import { ClipboardList, LayoutDashboard, UtensilsCrossed, Users } from "lucide-react";

export type ShellNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const shellNavItems: ShellNavItem[] = [
  { href: "/", label: "Dashboard", icon: LayoutDashboard },
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/marmitas", label: "Marmitas", icon: UtensilsCrossed },
  { href: "/pedidos", label: "Pedidos", icon: ClipboardList },
];
