import Link from "next/link";

export function SidebarBrand() {
  return (
    <Link
      href="/"
      className="flex items-center gap-3 rounded-lg px-2 py-2 transition-colors hover:bg-sidebar-accent"
    >
      <span
        className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-primary-foreground text-sm font-semibold text-primary shadow-sm"
        aria-hidden
      >
        Logo
      </span>
      <div className="min-w-0 flex flex-col leading-tight">
        <span className="truncate text-sm font-semibold tracking-tight text-sidebar-foreground">
          PrepChef
        </span>
        <span className="truncate text-xs text-sidebar-foreground/70">
          Painel administrativo
        </span>
      </div>
    </Link>
  );
}
