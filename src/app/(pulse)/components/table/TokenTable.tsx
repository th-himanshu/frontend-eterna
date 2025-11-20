"use client";

import { useMemo } from "react";
import type { TokenCategoryId, TokenRow } from "../../lib/tokenTypes";
import { useTokenTableData } from "../../hooks/useTokenTableData";
import { useTokenLiveUpdates } from "../../hooks/useTokenLiveUpdates";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../redux/store";
import {
  setActivePreset,
  type PresetId,
} from "../../../../redux/slices/uiSlice";
import {
  setSort,
  setChainFilter,
  type SortKey,
  type SortDirection,
  type ChainFilter,
} from "../../../../redux/slices/tokenTableSlice";
import { TokenCard } from "./TokenCard";
import { TokenCardSkeleton } from "./TokenCardSkeleton";

const PRESETS: PresetId[] = ["P1", "P2", "P3"];
const CHAIN_FILTERS: ChainFilter[] = ["ALL", "Solana", "Ethereum", "BSC"];

function applySortAndFilters(
  rows: TokenRow[],
  options: {
    sortBy: SortKey;
    sortDirection: SortDirection;
    chain: ChainFilter;
    searchQuery: string;
  }
): TokenRow[] {
  const { sortBy, sortDirection, chain, searchQuery } = options;

  let filtered = rows;

  if (chain !== "ALL") {
    filtered = filtered.filter((row) => row.chain === chain);
  }

  if (searchQuery.trim().length > 0) {
    const query = searchQuery.trim().toLowerCase();
    filtered = filtered.filter((row) =>
      `${row.name} ${row.symbol}`.toLowerCase().includes(query)
    );
  }

  const sorted = [...filtered].sort((a, b) => {
    const getValue = (row: TokenRow): number => {
      switch (sortBy) {
        case "price":
          return row.price;
        case "change24h":
          return row.change24h;
        case "volume24h":
          return row.volume24h;
        case "liquidity":
          return row.liquidity;
        default:
          return 0;
      }
    };

    const aVal = getValue(a);
    const bVal = getValue(b);

    if (aVal === bVal) return 0;
    const diff = aVal - bVal;
    return sortDirection === "asc" ? (diff < 0 ? -1 : 1) : diff < 0 ? 1 : -1;
  });

  return sorted;
}

export interface TokenTableProps {
  category: TokenCategoryId;
  name: string;
}

export function TokenTable({ category, name }: TokenTableProps) {
  useTokenLiveUpdates({ category });
  const { data: rows = [], isLoading } = useTokenTableData({ category });
  const dispatch = useDispatch<AppDispatch>();
  const activePreset = useSelector((state: RootState) => state.ui.activePreset);
  const { sortBy, sortDirection, filters } = useSelector(
    (state: RootState) => state.tokenTable
  );

  const visibleRows = useMemo(
    () =>
      applySortAndFilters(rows, {
        sortBy,
        sortDirection,
        chain: filters.chain,
        searchQuery: filters.searchQuery,
      }),
    [rows, sortBy, sortDirection, filters.chain, filters.searchQuery]
  );

  const handlePriceSortClick = () => {
    const nextDirection: SortDirection =
      sortBy === "price" && sortDirection === "desc" ? "asc" : "desc";
    dispatch(setSort({ sortBy: "price", sortDirection: nextDirection }));
  };

  return (
    <div className="overflow-hidden border border-axiom-border bg-axiom-bg rounded-lg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-axiom-border bg-axiom-card px-3 py-2">
        <span className="font-bold text-lg text-axiom-text-main">
          {name}
        </span>

        <div className="flex items-center gap-2 rounded-md border border-axiom-border bg-axiom-bg px-2 py-1 text-[11px] text-axiom-text-dim shadow-sm">
          <div className="flex items-center gap-1 rounded-sm bg-axiom-card px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-axiom-green" />
            <span className="font-mono text-[10px] text-axiom-text-main">
              {isLoading ? "-" : rows.length}
            </span>
          </div>

          <span className="h-4 w-px bg-axiom-border" />

          <div className="flex items-center gap-1">
            {PRESETS.map((preset) => {
              const isActive = preset === activePreset;
              const base =
                "rounded-sm px-2 py-0.5 text-[10px] transition-colors";
              const activeClasses = "bg-axiom-border text-axiom-text-main";
              const inactiveClasses =
                "text-axiom-text-dim hover:bg-axiom-border/50 hover:text-axiom-text-main";

              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => dispatch(setActivePreset(preset))}
                  className={`${base} ${isActive ? activeClasses : inactiveClasses
                    }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="flex items-center justify-between border-b border-axiom-border bg-axiom-card/50 px-3 py-1 text-[10px] text-axiom-text-dim">
        <button
          type="button"
          onClick={handlePriceSortClick}
          className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 hover:bg-axiom-border/50 hover:text-axiom-text-main"
        >
          <span>Price</span>
          <span className="text-[9px]">
            {sortBy === "price" ? (sortDirection === "desc" ? "↓" : "↑") : ""}
          </span>
        </button>

        <div className="flex items-center gap-1">
          {CHAIN_FILTERS.map((chain) => {
            const isActive = filters.chain === chain;
            const label =
              chain === "ALL" ? "All" : chain === "BSC" ? "BSC" : chain;
            const base = "rounded-sm px-2 py-0.5 text-[10px]";
            const activeClasses = "bg-axiom-border text-axiom-text-main";
            const inactiveClasses =
              "text-axiom-text-dim hover:bg-axiom-border/50 hover:text-axiom-text-main";

            return (
              <button
                key={chain}
                type="button"
                onClick={() => dispatch(setChainFilter(chain))}
                className={`${base} ${isActive ? activeClasses : inactiveClasses
                  }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      {/* List */}
      <div className="flex flex-col gap-2 p-2 bg-axiom-bg">
        {isLoading ? (
          Array.from({ length: 5 }).map((_, i) => (
            <TokenCardSkeleton key={i} />
          ))
        ) : (
          visibleRows.map((row) => (
            <TokenCard key={row.id} row={row} />
          ))
        )}
      </div>
    </div>
  );
}
