import { createSlice, type PayloadAction } from "@reduxjs/toolkit";

export type SortKey = "price" | "change24h" | "volume24h" | "liquidity";
export type SortDirection = "asc" | "desc";
export type ChainFilter = "ALL" | "Solana" | "Ethereum" | "BSC";

interface FiltersState {
  chain: ChainFilter;
  searchQuery: string;
}

export interface TokenTableState {
  sortBy: SortKey;
  sortDirection: SortDirection;
  filters: FiltersState;
  favorites: string[]; // token ids
}

const initialState: TokenTableState = {
  sortBy: "price",
  sortDirection: "desc",
  filters: {
    chain: "ALL",
    searchQuery: "",
  },
  favorites: [],
};

const tokenTableSlice = createSlice({
  name: "tokenTable",
  initialState,
  reducers: {
    setSort(
      state,
      action: PayloadAction<{ sortBy: SortKey; sortDirection: SortDirection }>,
    ) {
      state.sortBy = action.payload.sortBy;
      state.sortDirection = action.payload.sortDirection;
    },
    setChainFilter(state, action: PayloadAction<ChainFilter>) {
      state.filters.chain = action.payload;
    },
    setSearchQuery(state, action: PayloadAction<string>) {
      state.filters.searchQuery = action.payload;
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

export const { setSort, setChainFilter, setSearchQuery, toggleFavorite } =
  tokenTableSlice.actions;

export default tokenTableSlice.reducer;
