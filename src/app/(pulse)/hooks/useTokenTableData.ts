"use client";

import { useQuery } from "@tanstack/react-query";
import type { TokenCategoryId, TokenRow } from "../lib/tokenTypes";
import { getMockTokens } from "../lib/mockTokens";

export interface UseTokenTableDataOptions {
  category: TokenCategoryId;
}

const queryKeys = {
  tokenTable: (category: TokenCategoryId) => ["tokenTable", category] as const,
};

export function useTokenTableData({ category }: UseTokenTableDataOptions) {
  return useQuery<TokenRow[]>({
    queryKey: queryKeys.tokenTable(category),
    queryFn: async () => getMockTokens(category),
    staleTime: 30_000,
  });
}
