import type { ReactNode } from "react";
import { TopBar } from "@/components/layout/TopBar";

export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen bg-[radial-gradient(circle_at_top,_rgba(191,219,254,0.55),_transparent_30%),linear-gradient(180deg,#f8fbff_0%,#eff6ff_100%)]">
      <TopBar />
      <main className="mx-auto max-w-[1600px] px-4 py-8 sm:px-6">{children}</main>
    </div>
  );
}
