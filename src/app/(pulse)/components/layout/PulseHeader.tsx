"use client";

import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../redux/store";
import { setSearchQuery } from "../../../../redux/slices/tokenTableSlice";

export function PulseHeader() {
  const dispatch = useDispatch<AppDispatch>();
  const search = useSelector(
    (state: RootState) => state.tokenTable.filters.searchQuery,
  );

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

      <div className="flex flex-1 flex-col gap-3 md:flex-row md:items-center md:justify-end">
        <div className="flex flex-1 items-center gap-2 md:max-w-md">
          <input
            value={search}
            onChange={(event) => dispatch(setSearchQuery(event.target.value))}
            className="h-9 w-full rounded-md border border-axiom-border bg-axiom-card px-3 text-xs text-axiom-text-main placeholder:text-axiom-text-dim focus:border-axiom-accent focus:outline-none focus:ring-1 focus:ring-axiom-accent"
            placeholder="Search by token, symbol, or address"
          />
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
      </div>
    </header>
  );
}
