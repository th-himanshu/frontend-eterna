import type { ReactNode } from "react";
import { PulseHeader } from "./PulseHeader";

interface PulseLayoutProps {
  children: ReactNode;
}

export function PulseLayout({ children }: PulseLayoutProps) {
  return (
    <div className="min-h-screen bg-[#020617] text-slate-100">
      <div className="mx-auto flex max-w-6xl flex-col gap-6 px-4 py-6">
        <PulseHeader />
        {children}
      </div>
    </div>
  );
}
