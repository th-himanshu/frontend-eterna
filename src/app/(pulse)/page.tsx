import type { Metadata } from "next";
import { PulseLayout } from "./components/layout/PulseLayout";
import { TokenTable } from "./components/table/TokenTable";

export const metadata: Metadata = {
  title: "Axiom Pulse — Token Discovery",
  description:
    "Token discovery and trading metrics with tabs, filters, and real-time style updates.",
};

export default function PulsePage() {
  return (
    <PulseLayout>
      <main className="flex flex-col gap-6">
        <section className="grid grid-cols-3">
          <div className="flex flex-col gap-2">
            <TokenTable category="new_pairs" name="New Pairs" />
          </div>

          <div className="flex flex-col gap-2">
            <TokenTable category="final_stretch" name="Final Stretch" />
          </div>

          <div className="flex flex-col gap-2">
            <TokenTable category="migrated" name="Migrated" />
          </div>
        </section>
      </main>
    </PulseLayout>
  );
}
