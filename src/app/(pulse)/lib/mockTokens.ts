import type { TokenCategoryId, TokenRow } from "./tokenTypes";
import type { ChainFilter } from "../../../redux/slices/tokenTableSlice";

function getRandomRisk() {
  return {
    holders: Math.floor(Math.random() * 100),
    fundingRisk: {
      isScammer: Math.random() > 0.9,
      age: `${Math.floor(Math.random() * 12)}mo`,
    },
    sniperRisk: Math.floor(Math.random() * 100),
    insiderRisk: Math.floor(Math.random() * 100),
    bundlerRisk: Math.floor(Math.random() * 100),
    auditScore: `${Math.floor(Math.random() * 10)}/28`,
    description: "Multi-Tx Max",
  };
}

const createToken = (
  id: string,
  symbol: string,
  name: string,
  chain: ChainFilter,
  price: number,
  change24h: number,
  volume24h: number,
  liquidity: number
): TokenRow => ({
  id,
  symbol,
  name,
  chain,
  price,
  change24h,
  volume24h,
  liquidity,
  ...getRandomRisk(),
});

export const MOCK_TOKENS: Record<TokenCategoryId, TokenRow[]> = {
  new_pairs: [
    createToken("new-1", "PUMP1", "Pump Prime", "Solana", 1.01, 12.3, 41000, 16000),
    createToken("new-2", "NNOV", "Neon Nova", "Solana", 0.87, -8.4, 80000, 42000),
    createToken("new-3", "SLRS", "Solaris", "Solana", 2.34, 3.2, 54000, 21000),
    createToken("new-4", "AQBT", "Aqua Byte", "Solana", 0.12, -1.1, 12000, 6000),
    createToken("new-5", "LMNX", "LumenX", "Solana", 0.99, 0.0, 30000, 14000),
    createToken("new-6", "ORB1", "OrbitOne", "Ethereum", 5.2, 6.5, 150000, 80000),
    createToken("new-7", "QFOX", "QuietFox", "BSC", 0.034, -12.0, 9000, 4000),
    createToken("new-8", "METR", "Meteor", "Solana", 3.14, 1.4, 72000, 36000),
    createToken("new-9", "CMTT", "CometTrail", "Solana", 0.42, 8.8, 45000, 22000),
    createToken("new-10", "GIGN", "GigaNode", "Ethereum", 12.5, -2.2, 210000, 120000),
    createToken("new-11", "PXPP", "PixelPup", "Solana", 0.07, 4.1, 8000, 3500),
    createToken("new-12", "FLXC", "FluxCap", "BSC", 0.67, -0.5, 18000, 9000),
    createToken("new-13", "VPRX", "VaporX", "Solana", 0.21, 2.9, 23000, 11000),
    createToken("new-14", "BYWV", "ByteWave", "Solana", 1.8, 7.0, 64000, 30000),
    createToken("new-15", "NB9", "NebulaNine", "Ethereum", 0.5, -3.3, 47000, 25000),
    createToken("new-16", "ARHL", "ArcHalo", "Solana", 4.6, 10.2, 98000, 45000),
    createToken("new-17", "TTTN", "TinyTitan", "BSC", 0.015, -20.0, 5000, 2000),
    createToken("new-18", "PRSM", "Prismatic", "Solana", 2.0, 0.8, 39000, 17000),
    createToken("new-19", "ECHO", "EchoChain", "Ethereum", 0.95, 5.6, 76000, 34000),
    createToken("new-20", "PLSW", "PulseWave", "Solana", 0.73, -6.7, 26000, 13000),
  ],
  final_stretch: [
    createToken("final-1", "MTXMAX", "MTXMAX", "Solana", 1.57, 4.8, 67000, 37000),
    createToken("final-2", "TROLL", "TrollBoy", "Solana", 0.24, -3.1, 22000, 9000),
    createToken("final-3", "FFNT", "FinalFront", "Solana", 0.88, 2.2, 31000, 15000),
    createToken("final-4", "ZNTH", "Zenith", "Ethereum", 8.3, -1.8, 120000, 70000),
    createToken("final-5", "CIND", "Cinder", "Solana", 0.19, 0.6, 14000, 7000),
    createToken("final-6", "RIFT", "Rift", "BSC", 0.45, 3.7, 28000, 13000),
    createToken("final-7", "FORG", "Forge", "Solana", 3.2, -4.0, 52000, 26000),
    createToken("final-8", "MGNT", "Magnetar", "Solana", 1.12, 9.3, 88000, 46000),
    createToken("final-9", "AURR", "Aurora", "Ethereum", 0.66, -0.9, 45000, 21000),
    createToken("final-10", "SKLN", "Skyline", "Solana", 0.31, 1.0, 19000, 9000),
    createToken("final-11", "CBLT", "Cobalt", "Solana", 2.75, 12.0, 101000, 52000),
    createToken("final-12", "SLTE", "Slate", "BSC", 0.14, -6.4, 8000, 3800),
    createToken("final-13", "VCTR", "Vector", "Solana", 5.9, 2.5, 133000, 64000),
    createToken("final-14", "HELX", "Helix", "Ethereum", 0.78, -2.7, 47000, 23000),
    createToken("final-15", "QNTX", "Quanta", "Solana", 0.53, 7.9, 68000, 33000),
    createToken("final-16", "STRS", "Stratus", "Solana", 1.43, -0.2, 26000, 12000),
    createToken("final-17", "PNR1", "Pioneer", "BSC", 0.09, 0.4, 11000, 5000),
    createToken("final-18", "ANCR", "Anchor", "Solana", 2.2, -5.5, 94000, 47000),
    createToken("final-19", "MIRR", "Mirror", "Ethereum", 0.39, 3.3, 36000, 18000),
    createToken("final-20", "HRZN", "Horizon", "Solana", 0.27, 6.0, 29000, 14000),
  ],
  migrated: [
    createToken("migrated-1", "TROLL", "TROLLBOY (migrated)", "Solana", 1.24, 6.2, 87000, 51000),
    createToken("migrated-2", "ZIGGY", "Ziggy", "Solana", 0.62, 2.1, 25000, 15000),
    createToken("migrated-3", "ATLS", "Atlas", "Ethereum", 9.1, -1.0, 200000, 110000),
    createToken("migrated-4", "NOMD", "Nomad", "Solana", 0.48, 4.4, 42000, 20000),
    createToken("migrated-5", "PMGT", "Pulse Migrant", "BSC", 0.22, -2.2, 16000, 8000),
    createToken("migrated-6", "BCON", "Beacon", "Solana", 3.9, 5.5, 99000, 48000),
    createToken("migrated-7", "DRFT", "Drift", "Solana", 0.11, -7.3, 7000, 3000),
    createToken("migrated-8", "PRXS", "Praxis", "Ethereum", 1.95, 0.9, 54000, 26000),
    createToken("migrated-9", "SGNL", "Signal", "Solana", 0.75, 3.8, 47000, 23000),
    createToken("migrated-10", "QUIL", "Quill", "BSC", 0.03, -15.0, 4000, 1800),
    createToken("migrated-11", "MGX", "MigrateX", "Solana", 2.6, 8.1, 83000, 41000),
    createToken("migrated-12", "ORMB", "Orbit Migrated", "Ethereum", 6.7, -0.6, 112000, 56000),
    createToken("migrated-13", "LANT", "Lantern", "Solana", 0.29, 1.7, 21000, 10000),
    createToken("migrated-14", "ECHO", "Echo Migrant", "Solana", 1.02, -4.0, 33000, 16000),
    createToken("migrated-15", "VRTX", "Vertex", "Ethereum", 4.4, 2.0, 76000, 38000),
    createToken("migrated-16", "NMB", "Nimbus", "Solana", 0.56, 0.3, 27000, 13000),
    createToken("migrated-17", "PCOR", "PulseCore", "BSC", 0.08, -9.9, 6000, 2500),
    createToken("migrated-18", "HLIO", "Helio", "Solana", 2.15, 7.4, 92000, 47000),
    createToken("migrated-19", "MMIR", "Mirror Migrated", "Ethereum", 0.68, -1.5, 38000, 19000),
    createToken("migrated-20", "FMIG", "Final Migrant", "Solana", 0.34, 5.0, 31000, 15000),
  ],
};

export function getMockTokens(category: TokenCategoryId): TokenRow[] {
  return MOCK_TOKENS[category];
}
