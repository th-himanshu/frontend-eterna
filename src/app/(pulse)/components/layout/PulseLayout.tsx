import type { ReactNode } from "react";
import { PulseHeader } from "./PulseHeader";

interface PulseLayoutProps {
  children: ReactNode;
}

export function PulseLayout({ children }: PulseLayoutProps) {
  return (
    <div className="min-h-screen bg-[rgb(2,6,23)] text-slate-100 flex justify-center">
      <div className="flex w-full flex-col gap-6 px-2 py-6 md:px-6">
        <PulseHeader />
        {children}
      </div>
    </div>
  );
}
