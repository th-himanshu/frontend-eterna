export type TokenCategoryId = "new_pairs" | "final_stretch" | "migrated";

export interface TokenRow {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
}
