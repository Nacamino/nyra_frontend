import type { ReactNode } from "react";
import { Sidebar } from "./Sidebar.tsx";
import "../../styles/AppShell.css";


interface AppShellProps {
  children: ReactNode;
}

export function AppShell({ children }: AppShellProps) {
  return (
    <div className="app-shell">
      <Sidebar />

      <main className="app-content">
        {children}
      </main>
    </div>
  );
}