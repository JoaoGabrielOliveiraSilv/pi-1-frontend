import { AppSidebar } from "./app-sidebar";
import { BottomNav } from "./bottom-nav";

type AppShellProps = {
  children: React.ReactNode;
};

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="flex min-h-screen flex-1">
      <AppSidebar />
      <div className="min-h-0 min-w-0 flex-1 overflow-auto bg-background pb-16 md:pb-0">
        {children}
      </div>
      <BottomNav />
    </div>
  );
}
