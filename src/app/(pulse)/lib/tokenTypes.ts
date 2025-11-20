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
  receivedAt?: number;

  // New Risk Metrics
  holders: number; // % of top 10 holders
  fundingRisk: {
    isScammer: boolean;
    age: string; // e.g., "4mo"
  };
  sniperRisk: number; // %
  insiderRisk: number; // %
  bundlerRisk: number; // %
  auditScore: string; // e.g., "6/28"

  // Additional Metadata
  description?: string;
  socials?: {
    telegram?: string;
    twitter?: string;
    website?: string;
  };
}

export interface WebSocketPriceUpdate {
  type: "price_update";
  tokenId: string;
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
  timestamp: number;
}

export type WebSocketMessage = WebSocketPriceUpdate;

