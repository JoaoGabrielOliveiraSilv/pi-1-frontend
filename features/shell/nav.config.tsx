import type { LucideIcon } from "lucide-react";
import { UtensilsCrossed, Users } from "lucide-react";

export type ShellNavItem = {
  href: string;
  label: string;
  icon: LucideIcon;
};

export const shellNavItems: ShellNavItem[] = [
  { href: "/clientes", label: "Clientes", icon: Users },
  { href: "/marmitas", label: "Marmitas", icon: UtensilsCrossed },
];
