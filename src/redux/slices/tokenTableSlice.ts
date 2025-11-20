import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { TokenCategoryId } from "../../app/(pulse)/lib/tokenTypes";

export type SortKey = "price" | "change24h" | "volume24h" | "liquidity";
export type SortDirection = "asc" | "desc";
export type ChainFilter = "ALL" | "Solana" | "Ethereum" | "BSC";
export type PresetId = "P1" | "P2" | "P3";

interface ColumnState {
  sortBy: SortKey;
  sortDirection: SortDirection;
  filters: {
    chain: ChainFilter;
    searchQuery: string;
  };
  activePreset: PresetId;
}

export interface TokenTableState {
  columns: Record<TokenCategoryId, ColumnState>;
  favorites: string[]; // token ids
}

const defaultColumnState: ColumnState = {
  sortBy: "price",
  sortDirection: "desc",
  filters: {
    chain: "ALL",
    searchQuery: "",
  },
  activePreset: "P1",
};

const initialState: TokenTableState = {
  columns: {
    new_pairs: { ...defaultColumnState },
    final_stretch: { ...defaultColumnState },
    migrated: { ...defaultColumnState },
  },
  favorites: [],
};

const tokenTableSlice = createSlice({
  name: "tokenTable",
  initialState,
  reducers: {
    setSort(
      state,
      action: PayloadAction<{ category: TokenCategoryId; sortBy: SortKey; sortDirection: SortDirection }>
    ) {
      const { category, sortBy, sortDirection } = action.payload;
      if (state.columns[category]) {
        state.columns[category].sortBy = sortBy;
        state.columns[category].sortDirection = sortDirection;
      }
    },
    setChainFilter(state, action: PayloadAction<{ category: TokenCategoryId; chain: ChainFilter }>) {
      const { category, chain } = action.payload;
      if (state.columns[category]) {
        state.columns[category].filters.chain = chain;
      }
    },
    setSearchQuery(state, action: PayloadAction<{ category: TokenCategoryId; query: string }>) {
      const { category, query } = action.payload;
      if (state.columns[category]) {
        state.columns[category].filters.searchQuery = query;
      }
    },
    setActivePreset(state, action: PayloadAction<{ category: TokenCategoryId; preset: PresetId }>) {
      const { category, preset } = action.payload;
      if (state.columns[category]) {
        state.columns[category].activePreset = preset;
      }
    },
    toggleFavorite(state, action: PayloadAction<string>) {
      const id = action.payload;
      if (state.favorites.includes(id)) {
        state.favorites = state.favorites.filter((favId) => favId !== id);
      } else {
        state.favorites.push(id);
      }
    },
  },
});

export const { setSort, setChainFilter, setSearchQuery, setActivePreset, toggleFavorite } =
  tokenTableSlice.actions;

export default tokenTableSlice.reducer;
