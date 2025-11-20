"use client";

import { useMemo } from "react";
import type { TokenCategoryId, TokenRow } from "../../lib/tokenTypes";
import { useTokenTableData } from "../../hooks/useTokenTableData";
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

const PRESETS: PresetId[] = ["P1", "P2", "P3"];
const CHAIN_FILTERS: ChainFilter[] = ["ALL", "Solana", "Ethereum", "BSC"];

function formatLargeCurrency(value: number): string {
  if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}m`;
  if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}k`;
  return `$${value.toFixed(0)}`;
}

function formatPrice(value: number): string {
  if (value < 1) return `$${value.toFixed(3)}`;
  return `$${value.toFixed(2)}`;
}

function formatChange(value: number): string {
  const sign = value > 0 ? "+" : "";
  return `${sign}${value.toFixed(1)}%`;
}

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
  const { data: rows = [] } = useTokenTableData({ category });
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
    <div className="overflow-hidden border border-slate-800/80 bg-[#020617]">
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 py-2">
        <span className="font-extrabold text-lg text-slate-50 strong ">
          {name}
        </span>

        <div className="sahil-ui flex items-center gap-2 rounded-md border border-slate-700/70 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-300 shadow-sm">
          <div className="flex items-center gap-1 rounded-sm bg-slate-950/80 px-2 py-0.5">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            <span className="font-mono text-[10px] text-slate-100">
              {rows.length}
            </span>
            <span className="text-[9px] text-slate-500">pairs</span>
          </div>

          <span className="h-4 w-px bg-slate-700/80" />

          <div className="flex items-center gap-1">
            {PRESETS.map((preset) => {
              const isActive = preset === activePreset;
              const base =
                "rounded-sm px-2 py-0.5 text-[10px] transition-colors";
              const activeClasses = "bg-slate-700/80 text-slate-100";
              const inactiveClasses =
                "text-slate-400 hover:bg-slate-800/80 hover:text-slate-100";

              return (
                <button
                  key={preset}
                  type="button"
                  onClick={() => dispatch(setActivePreset(preset))}
                  className={`${base} ${
                    isActive ? activeClasses : inactiveClasses
                  }`}
                >
                  {preset}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/40 px-3 py-1 text-[10px] text-slate-400">
        <button
          type="button"
          onClick={handlePriceSortClick}
          className="inline-flex items-center gap-1 rounded-sm px-2 py-0.5 hover:bg-slate-900/80 hover:text-slate-100"
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
            const activeClasses = "bg-slate-800 text-slate-50";
            const inactiveClasses =
              "text-slate-400 hover:bg-slate-900/80 hover:text-slate-100";

            return (
              <button
                key={chain}
                type="button"
                onClick={() => dispatch(setChainFilter(chain))}
                className={`${base} ${
                  isActive ? activeClasses : inactiveClasses
                }`}
              >
                {label}
              </button>
            );
          })}
        </div>
      </div>

      <div className="divide-y divide-slate-800/80">
        {visibleRows.map((row) => (
          <TokenCardRow key={row.id} row={row} />
        ))}
      </div>
    </div>
  );
}

interface TokenTableRowProps {
  row: TokenRow;
}

function TokenCardRow({ row }: TokenTableRowProps) {
  const isUp = row.change24h > 0;
  const changeColor = isUp
    ? "text-emerald-400"
    : row.change24h < 0
    ? "text-rose-400"
    : "text-slate-300";

  return (
    <article className="flex gap-3 px-3 py-3 text-xs text-slate-100">
      <div className="relative mt-1 h-14 w-14 overflow-hidden rounded-md bg-slate-900">
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-500/40 via-sky-500/30 to-indigo-500/30" />
        <div className="relative flex h-full w-full items-center justify-center text-[10px] font-semibold uppercase tracking-wide">
          {row.symbol.slice(0, 4)}
        </div>
      </div>

      <div className="flex min-w-0 flex-1 flex-col gap-1.5">
        <div className="flex items-start justify-between gap-2">
          <div className="min-w-0">
            <div className="flex items-center gap-1.5">
              <span className="truncate text-[13px] font-semibold leading-tight">
                {row.name}
              </span>
              <span className="rounded-md border border-slate-700/80 bg-slate-900/80 px-1.5 text-[10px] uppercase tracking-wide text-slate-200">
                {row.symbol}
              </span>
            </div>

            <div className="mt-0.5 flex flex-wrap items-center gap-2 text-[11px] text-slate-400">
              <span>2s</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>{row.chain}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>MC {formatLargeCurrency(row.liquidity * 3)}</span>
              <span className="h-1 w-1 rounded-full bg-slate-500" />
              <span>V {formatLargeCurrency(row.volume24h)}</span>
            </div>
          </div>

          <div className="text-right text-[11px] leading-tight">
            <div className="font-semibold text-slate-50">
              {formatPrice(row.price)}
            </div>
            <div className={`mt-0.5 tabular-nums ${changeColor}`}>
              {formatChange(row.change24h)}
            </div>
          </div>
        </div>

        <div className="mt-1 flex flex-wrap gap-1 text-[10px]">
          <MetricPill label="2m" value={row.change24h * 0.3} />
          <MetricPill label="20m" value={row.change24h * 0.6} />
          <MetricPill label="2h" value={row.change24h} />
          <MetricPill label="6h" value={row.change24h * 0.8} />
        </div>
      </div>
    </article>
  );
}

interface MetricPillProps {
  label: string;
  value: number;
}

function MetricPill({ label, value }: MetricPillProps) {
  const isUp = value > 0;
  const color =
    value === 0
      ? "bg-slate-900/80 text-slate-300"
      : isUp
      ? "bg-emerald-500/10 text-emerald-400"
      : "bg-rose-500/10 text-rose-400";

  return (
    <span
      className={`inline-flex items-center gap-1 rounded-md px-2 py-0.5 font-medium tabular-nums ${color}`}
    >
      <span className="text-[9px] text-slate-400">{label}</span>
      <span>
        {value > 0 ? "+" : ""}
        {value.toFixed(1)}%
      </span>
    </span>
  );
}
