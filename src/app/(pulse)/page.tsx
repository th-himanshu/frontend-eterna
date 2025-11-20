import type { Metadata } from "next";
import { PulseLayout } from "./components/layout/PulseLayout";

export const metadata: Metadata = {
  title: "Axiom Pulse — Token Discovery",
  description:
    "Token discovery and trading metrics with tabs, filters, and real-time style updates.",
};

export default function PulsePage() {
  return (
    <PulseLayout>
      <main className="flex flex-col gap-6">
        <section className="rounded-xl border border-white/5 bg-black/20 px-4 py-6">
          <h1 className="text-lg font-semibold tracking-tight text-white">
            Token discovery
          </h1>
          <p className="mt-1 text-sm text-white/70">
            We&apos;ll render the live token table, tabs, and filters here in the next
            steps.
          </p>
        </section>
      </main>
    </PulseLayout>
  );
}
