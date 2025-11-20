"use client";

import { useMemo, useState } from "react";
import type { TokenCategoryId, TokenRow } from "../../lib/tokenTypes";
import { useTokenTableData } from "../../hooks/useTokenTableData";
import { useTokenLiveUpdates } from "../../hooks/useTokenLiveUpdates";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../../redux/store";
import {
  setSort,
  setChainFilter,
  setSearchQuery,
  setActivePreset,
  type SortKey,
  type SortDirection,
  type ChainFilter,
  type PresetId,
} from "../../../../redux/slices/tokenTableSlice";
import { TokenCard } from "./TokenCard";
import { TokenCardSkeleton } from "./TokenCardSkeleton";
import { ErrorBoundary } from "../ui/ErrorBoundary";
import { TradingSettingsModal } from "../ui/TradingSettingsModal";
import { PresetHoverCard } from "../ui/PresetHoverCard";
import { FiltersModal, type FilterState } from "../ui/FiltersModal";

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

  // Select state specific to this category
  const columnState = useSelector(
    (state: RootState) => state.tokenTable.columns[category]
  );

  // Fallback to default values if columnState is undefined
  const { sortBy, sortDirection, filters, activePreset } = columnState || {
    sortBy: "price" as SortKey,
    sortDirection: "desc" as SortDirection,
    filters: { chain: "ALL" as ChainFilter, searchQuery: "" },
    activePreset: "P1" as PresetId,
  };

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

  const [hoveredPreset, setHoveredPreset] = useState<PresetId | null>(null);
  const [editingPreset, setEditingPreset] = useState<PresetId | null>(null);
  const [showFilters, setShowFilters] = useState(false);
  const [advancedFilters, setAdvancedFilters] = useState<FilterState>({
    category,
    protocols: [],
    quoteTokens: [],
    searchKeywords: "",
    excludeKeywords: "",
    dexPaid: false,
    caEndsInPump: false,
    ageMin: "",
    ageMax: "",
    ageUnit: "m",
    top10HoldersMin: "",
    top10HoldersMax: "",
  });

  const handlePriceSortClick = () => {
    const nextDirection: SortDirection =
      sortBy === "price" && sortDirection === "desc" ? "asc" : "desc";
    dispatch(
      setSort({ category, sortBy: "price", sortDirection: nextDirection })
    );
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setSearchQuery({ category, query: e.target.value }));
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-lg border border-axiom-border bg-axiom-bg">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-axiom-border bg-axiom-card px-3 py-2">
        {/* Search Bar */}
        <div className="relative w-48">
          <input
            type="text"
            placeholder="Search by ticker or name"
            value={filters.searchQuery}
            onChange={handleSearch}
            className="w-full rounded-full border border-axiom-border bg-axiom-bg px-3 py-1.5 text-xs text-axiom-text-main placeholder-axiom-text-dim outline-none focus:border-axiom-border-highlight"
          />
        </div>

        {/* Controls */}
        <div className="flex items-center gap-2">
          {/* Token Count & Chain Filter */}
          <div className="flex items-center rounded-full border border-axiom-border bg-axiom-bg px-1 py-0.5">
            <div className="flex items-center gap-1 px-2">
              <svg
                width="10"
                height="10"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                className="text-axiom-text-dim"
              >
                <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2"></polygon>
              </svg>
              <span className="font-mono text-xs font-bold text-axiom-text-main">
                {isLoading ? "-" : rows.length}
              </span>
            </div>
            <div className="h-4 w-px bg-axiom-border" />
            <button
              onClick={() =>
                dispatch(
                  setChainFilter({
                    category,
                    chain: filters.chain === "Solana" ? "ALL" : "Solana",
                  })
                )
              }
              className={`flex items-center gap-1 px-2 py-1 transition-colors ${filters.chain === "Solana"
                ? "text-axiom-accent"
                : "text-axiom-text-dim hover:text-axiom-text-main"
                }`}
            >
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
              >
                <path d="M2 12h20M2 6h20M2 18h20" />
              </svg>
            </button>
          </div>

          {/* Presets */}
          <div className="flex items-center rounded-full border border-axiom-border bg-axiom-bg px-1 py-0.5">
            {PRESETS.map((preset) => {
              const isActive = preset === activePreset;
              const base =
                "rounded-full px-3 py-1 text-xs font-medium transition-all relative";
              const activeClasses = "text-axiom-accent";
              const inactiveClasses =
                "text-axiom-text-dim hover:text-axiom-text-main";

              return (
                <div
                  key={preset}
                  className="relative"
                  onMouseEnter={() => setHoveredPreset(preset)}
                  onMouseLeave={() => setHoveredPreset(null)}
                >
                  <button
                    type="button"
                    onClick={() => {
                      if (isActive) {
                        setEditingPreset(preset);
                      } else {
                        dispatch(setActivePreset({ category, preset }));
                      }
                    }}
                    className={`${base} ${isActive ? activeClasses : inactiveClasses
                      }`}
                  >
                    {preset}
                  </button>

                  {hoveredPreset === preset && (
                    <PresetHoverCard
                      slippage="20"
                      priority="0.001"
                      bribe="0.01"
                      mev="Off"
                    />
                  )}
                </div>
              );
            })}
          </div>

          {/* Filter Icon */}
          <button
            onClick={() => setShowFilters(true)}
            className="flex h-8 w-8 items-center justify-center rounded-full border border-axiom-border bg-axiom-bg text-axiom-text-dim hover:border-axiom-border-highlight hover:text-axiom-text-main"
          >
            <svg
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
            >
              <line x1="4" y1="21" x2="4" y2="14"></line>
              <line x1="4" y1="10" x2="4" y2="3"></line>
              <line x1="12" y1="21" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12" y2="3"></line>
              <line x1="20" y1="21" x2="20" y2="16"></line>
              <line x1="20" y1="12" x2="20" y2="3"></line>
              <line x1="1" y1="14" x2="7" y2="14"></line>
              <line x1="9" y1="8" x2="15" y2="8"></line>
              <line x1="17" y1="16" x2="23" y2="16"></line>
            </svg>
          </button>
        </div>
      </div>

      {/* List */}
      <div className="flex-1 overflow-y-auto p-2">
        <ErrorBoundary
          fallback={
            <div className="p-4 text-center text-xs text-red-500">
              Failed to load tokens
            </div>
          }
        >
          <div className="flex flex-col gap-2">
            {isLoading
              ? Array.from({ length: 5 }).map((_, i) => (
                <TokenCardSkeleton key={i} />
              ))
              : visibleRows.map((row) => <TokenCard key={row.id} row={row} />)}
          </div>
        </ErrorBoundary>
      </div>

      <TradingSettingsModal
        isOpen={!!editingPreset}
        onClose={() => setEditingPreset(null)}
        presetId={editingPreset || ""}
      />

      <FiltersModal
        isOpen={showFilters}
        onClose={() => setShowFilters(false)}
        currentFilters={advancedFilters}
        onApply={(newFilters) => {
          setAdvancedFilters(newFilters);
          // TODO: Apply filters to the token list
        }}
      />
    </div>
  );
}
