import type { ReactNode } from "react";

export type ListPageLayoutProps = {
  title: string;
  description: string;
  headerAction?: ReactNode;
  children: ReactNode;
};

export function ListPageLayout({
  title,
  description,
  headerAction,
  children,
}: ListPageLayoutProps) {
  return (
    <div className="flex flex-col gap-4 bg-background p-8">
      <div className="flex w-full">
        <div className="flex-1">
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {title}
          </h1>
          <p className="mt-2 max-w-prose text-sm text-muted-foreground">
            {description}
          </p>
        </div>
        {headerAction != null ? (
          <div className="flex flex-1 justify-end">{headerAction}</div>
        ) : null}
      </div>
      {children}
    </div>
  );
}
