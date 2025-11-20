"use client";

import { useState } from "react";

export function PulseHeader() {
  const [search, setSearch] = useState("");

  return (
    <header className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex items-center gap-3">
        <div className="h-9 w-9 rounded-lg bg-indigo-500/20 ring-1 ring-indigo-500/60" />
        <div>
          <div className="text-sm font-semibold tracking-tight text-slate-50">
            Axiom Pulse
          </div>
          <div className="text-xs text-slate-400">
            Token discovery &amp; live trading metrics
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <div className="flex flex-1 items-center gap-2 md:max-w-md">
          <input
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            className="h-9 w-full rounded-md border border-slate-600/60 bg-slate-900/60 px-3 text-xs text-slate-100 placeholder:text-slate-500 focus:border-indigo-400 focus:outline-none focus:ring-1 focus:ring-indigo-400"
            placeholder="Search by token, symbol, or address"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            className="inline-flex items-center gap-1 rounded-full border border-slate-600/60 bg-slate-900/60 px-3 py-1.5 text-xs text-slate-100 hover:border-indigo-400 hover:bg-slate-900"
          >
            <span className="h-2.5 w-2.5 rounded-full bg-emerald-400" />
            <span>Mainnet</span>
          </button>

          <button
            type="button"
            className="inline-flex items-center justify-center rounded-full bg-indigo-500 px-3 py-1.5 text-xs font-medium text-white shadow-sm hover:bg-indigo-400"
          >
            Connect wallet
          </button>
        </div>
      </div>
    </header>
  );
}
