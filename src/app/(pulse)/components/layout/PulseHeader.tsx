"use client";

export function PulseHeader() {
  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-md bg-axiom-accent/20 ring-1 ring-axiom-accent/60 flex items-center justify-center">
          <span className="text-axiom-accent font-bold text-lg">A</span>
        </div>
        <div>
          <div className="text-sm font-bold tracking-tight text-axiom-text-main">
            Axiom Pulse
          </div>
          <div className="text-xs text-axiom-text-dim">
            Token discovery & live trading metrics
          </div>
        </div>
      </div>

      <div className="flex items-center gap-2">
        <div className="inline-flex items-center gap-1 rounded-md border border-axiom-border bg-axiom-card px-3 py-1.5 text-xs text-axiom-text-dim">
          <span className="h-2 w-2 rounded-full bg-axiom-green animate-pulse" />
          <span>Live</span>
        </div>

        <button
          type="button"
          className="rounded-md bg-axiom-accent px-4 py-1.5 text-xs font-semibold text-white hover:bg-axiom-accent/90"
        >
          Connect Wallet
        </button>
      </div>
    </header>
  );
}
