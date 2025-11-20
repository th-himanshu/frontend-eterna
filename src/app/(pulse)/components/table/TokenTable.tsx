"use client";

type TokenCategoryId = "new_pairs" | "final_stretch" | "migrated";

interface TokenRow {
  id: string;
  name: string;
  symbol: string;
  chain: string;
  price: number;
  change24h: number;
  volume24h: number;
  liquidity: number;
}

const MOCK_ROWS: Record<TokenCategoryId, TokenRow[]> = {
  new_pairs: [
    {
      id: "new-1",
      name: "Pump Prime",
      symbol: "PUMP1",
      chain: "Solana",
      price: 1.01,
      change24h: 12.3,
      volume24h: 41000,
      liquidity: 16000,
    },
    {
      id: "new-2",
      name: "Neon Nova",
      symbol: "NNOV",
      chain: "Solana",
      price: 0.87,
      change24h: -8.4,
      volume24h: 80000,
      liquidity: 42000,
    },
    {
      id: "new-3",
      name: "Solaris",
      symbol: "SLRS",
      chain: "Solana",
      price: 2.34,
      change24h: 3.2,
      volume24h: 54000,
      liquidity: 21000,
    },
    {
      id: "new-4",
      name: "Aqua Byte",
      symbol: "AQBT",
      chain: "Solana",
      price: 0.12,
      change24h: -1.1,
      volume24h: 12000,
      liquidity: 6000,
    },
    {
      id: "new-5",
      name: "LumenX",
      symbol: "LMNX",
      chain: "Solana",
      price: 0.99,
      change24h: 0.0,
      volume24h: 30000,
      liquidity: 14000,
    },
    {
      id: "new-6",
      name: "OrbitOne",
      symbol: "ORB1",
      chain: "Ethereum",
      price: 5.2,
      change24h: 6.5,
      volume24h: 150000,
      liquidity: 80000,
    },
    {
      id: "new-7",
      name: "QuietFox",
      symbol: "QFOX",
      chain: "BSC",
      price: 0.034,
      change24h: -12.0,
      volume24h: 9000,
      liquidity: 4000,
    },
    {
      id: "new-8",
      name: "Meteor",
      symbol: "METR",
      chain: "Solana",
      price: 3.14,
      change24h: 1.4,
      volume24h: 72000,
      liquidity: 36000,
    },
    {
      id: "new-9",
      name: "CometTrail",
      symbol: "CMTT",
      chain: "Solana",
      price: 0.42,
      change24h: 8.8,
      volume24h: 45000,
      liquidity: 22000,
    },
    {
      id: "new-10",
      name: "GigaNode",
      symbol: "GIGN",
      chain: "Ethereum",
      price: 12.5,
      change24h: -2.2,
      volume24h: 210000,
      liquidity: 120000,
    },
    {
      id: "new-11",
      name: "PixelPup",
      symbol: "PXPP",
      chain: "Solana",
      price: 0.07,
      change24h: 4.1,
      volume24h: 8000,
      liquidity: 3500,
    },
    {
      id: "new-12",
      name: "FluxCap",
      symbol: "FLXC",
      chain: "BSC",
      price: 0.67,
      change24h: -0.5,
      volume24h: 18000,
      liquidity: 9000,
    },
    {
      id: "new-13",
      name: "VaporX",
      symbol: "VPRX",
      chain: "Solana",
      price: 0.21,
      change24h: 2.9,
      volume24h: 23000,
      liquidity: 11000,
    },
    {
      id: "new-14",
      name: "ByteWave",
      symbol: "BYWV",
      chain: "Solana",
      price: 1.8,
      change24h: 7.0,
      volume24h: 64000,
      liquidity: 30000,
    },
    {
      id: "new-15",
      name: "NebulaNine",
      symbol: "NB9",
      chain: "Ethereum",
      price: 0.5,
      change24h: -3.3,
      volume24h: 47000,
      liquidity: 25000,
    },
    {
      id: "new-16",
      name: "ArcHalo",
      symbol: "ARHL",
      chain: "Solana",
      price: 4.6,
      change24h: 10.2,
      volume24h: 98000,
      liquidity: 45000,
    },
    {
      id: "new-17",
      name: "TinyTitan",
      symbol: "TTTN",
      chain: "BSC",
      price: 0.015,
      change24h: -20.0,
      volume24h: 5000,
      liquidity: 2000,
    },
    {
      id: "new-18",
      name: "Prismatic",
      symbol: "PRSM",
      chain: "Solana",
      price: 2.0,
      change24h: 0.8,
      volume24h: 39000,
      liquidity: 17000,
    },
    {
      id: "new-19",
      name: "EchoChain",
      symbol: "ECHO",
      chain: "Ethereum",
      price: 0.95,
      change24h: 5.6,
      volume24h: 76000,
      liquidity: 34000,
    },
    {
      id: "new-20",
      name: "PulseWave",
      symbol: "PLSW",
      chain: "Solana",
      price: 0.73,
      change24h: -6.7,
      volume24h: 26000,
      liquidity: 13000,
    },
  ],
  final_stretch: [
    {
      id: "final-1",
      name: "MTXMAX",
      symbol: "MTXMAX",
      chain: "Solana",
      price: 1.57,
      change24h: 4.8,
      volume24h: 67000,
      liquidity: 37000,
    },
    {
      id: "final-2",
      name: "TrollBoy",
      symbol: "TROLL",
      chain: "Solana",
      price: 0.24,
      change24h: -3.1,
      volume24h: 22000,
      liquidity: 9000,
    },
    {
      id: "final-3",
      name: "FinalFront",
      symbol: "FFNT",
      chain: "Solana",
      price: 0.88,
      change24h: 2.2,
      volume24h: 31000,
      liquidity: 15000,
    },
    {
      id: "final-4",
      name: "Zenith",
      symbol: "ZNTH",
      chain: "Ethereum",
      price: 8.3,
      change24h: -1.8,
      volume24h: 120000,
      liquidity: 70000,
    },
    {
      id: "final-5",
      name: "Cinder",
      symbol: "CIND",
      chain: "Solana",
      price: 0.19,
      change24h: 0.6,
      volume24h: 14000,
      liquidity: 7000,
    },
    {
      id: "final-6",
      name: "Rift",
      symbol: "RIFT",
      chain: "BSC",
      price: 0.45,
      change24h: 3.7,
      volume24h: 28000,
      liquidity: 13000,
    },
    {
      id: "final-7",
      name: "Forge",
      symbol: "FORG",
      chain: "Solana",
      price: 3.2,
      change24h: -4.0,
      volume24h: 52000,
      liquidity: 26000,
    },
    {
      id: "final-8",
      name: "Magnetar",
      symbol: "MGNT",
      chain: "Solana",
      price: 1.12,
      change24h: 9.3,
      volume24h: 88000,
      liquidity: 46000,
    },
    {
      id: "final-9",
      name: "Aurora",
      symbol: "AURR",
      chain: "Ethereum",
      price: 0.66,
      change24h: -0.9,
      volume24h: 45000,
      liquidity: 21000,
    },
    {
      id: "final-10",
      name: "Skyline",
      symbol: "SKLN",
      chain: "Solana",
      price: 0.31,
      change24h: 1.0,
      volume24h: 19000,
      liquidity: 9000,
    },
    {
      id: "final-11",
      name: "Cobalt",
      symbol: "CBLT",
      chain: "Solana",
      price: 2.75,
      change24h: 12.0,
      volume24h: 101000,
      liquidity: 52000,
    },
    {
      id: "final-12",
      name: "Slate",
      symbol: "SLTE",
      chain: "BSC",
      price: 0.14,
      change24h: -6.4,
      volume24h: 8000,
      liquidity: 3800,
    },
    {
      id: "final-13",
      name: "Vector",
      symbol: "VCTR",
      chain: "Solana",
      price: 5.9,
      change24h: 2.5,
      volume24h: 133000,
      liquidity: 64000,
    },
    {
      id: "final-14",
      name: "Helix",
      symbol: "HELX",
      chain: "Ethereum",
      price: 0.78,
      change24h: -2.7,
      volume24h: 47000,
      liquidity: 23000,
    },
    {
      id: "final-15",
      name: "Quanta",
      symbol: "QNTX",
      chain: "Solana",
      price: 0.53,
      change24h: 7.9,
      volume24h: 68000,
      liquidity: 33000,
    },
    {
      id: "final-16",
      name: "Stratus",
      symbol: "STRS",
      chain: "Solana",
      price: 1.43,
      change24h: -0.2,
      volume24h: 26000,
      liquidity: 12000,
    },
    {
      id: "final-17",
      name: "Pioneer",
      symbol: "PNR1",
      chain: "BSC",
      price: 0.09,
      change24h: 0.4,
      volume24h: 11000,
      liquidity: 5000,
    },
    {
      id: "final-18",
      name: "Anchor",
      symbol: "ANCR",
      chain: "Solana",
      price: 2.2,
      change24h: -5.5,
      volume24h: 94000,
      liquidity: 47000,
    },
    {
      id: "final-19",
      name: "Mirror",
      symbol: "MIRR",
      chain: "Ethereum",
      price: 0.39,
      change24h: 3.3,
      volume24h: 36000,
      liquidity: 18000,
    },
    {
      id: "final-20",
      name: "Horizon",
      symbol: "HRZN",
      chain: "Solana",
      price: 0.27,
      change24h: 6.0,
      volume24h: 29000,
      liquidity: 14000,
    },
  ],
  migrated: [
    {
      id: "migrated-1",
      name: "TROLLBOY (migrated)",
      symbol: "TROLL",
      chain: "Solana",
      price: 1.24,
      change24h: 6.2,
      volume24h: 87000,
      liquidity: 51000,
    },
    {
      id: "migrated-2",
      name: "Ziggy",
      symbol: "ZIGGY",
      chain: "Solana",
      price: 0.62,
      change24h: 2.1,
      volume24h: 25000,
      liquidity: 15000,
    },
    {
      id: "migrated-3",
      name: "Atlas",
      symbol: "ATLS",
      chain: "Ethereum",
      price: 9.1,
      change24h: -1.0,
      volume24h: 200000,
      liquidity: 110000,
    },
    {
      id: "migrated-4",
      name: "Nomad",
      symbol: "NOMD",
      chain: "Solana",
      price: 0.48,
      change24h: 4.4,
      volume24h: 42000,
      liquidity: 20000,
    },
    {
      id: "migrated-5",
      name: "Pulse Migrant",
      symbol: "PMGT",
      chain: "BSC",
      price: 0.22,
      change24h: -2.2,
      volume24h: 16000,
      liquidity: 8000,
    },
    {
      id: "migrated-6",
      name: "Beacon",
      symbol: "BCON",
      chain: "Solana",
      price: 3.9,
      change24h: 5.5,
      volume24h: 99000,
      liquidity: 48000,
    },
    {
      id: "migrated-7",
      name: "Drift",
      symbol: "DRFT",
      chain: "Solana",
      price: 0.11,
      change24h: -7.3,
      volume24h: 7000,
      liquidity: 3000,
    },
    {
      id: "migrated-8",
      name: "Praxis",
      symbol: "PRXS",
      chain: "Ethereum",
      price: 1.95,
      change24h: 0.9,
      volume24h: 54000,
      liquidity: 26000,
    },
    {
      id: "migrated-9",
      name: "Signal",
      symbol: "SGNL",
      chain: "Solana",
      price: 0.75,
      change24h: 3.8,
      volume24h: 47000,
      liquidity: 23000,
    },
    {
      id: "migrated-10",
      name: "Quill",
      symbol: "QUIL",
      chain: "BSC",
      price: 0.03,
      change24h: -15.0,
      volume24h: 4000,
      liquidity: 1800,
    },
    {
      id: "migrated-11",
      name: "MigrateX",
      symbol: "MGX",
      chain: "Solana",
      price: 2.6,
      change24h: 8.1,
      volume24h: 83000,
      liquidity: 41000,
    },
    {
      id: "migrated-12",
      name: "Orbit Migrated",
      symbol: "ORMB",
      chain: "Ethereum",
      price: 6.7,
      change24h: -0.6,
      volume24h: 112000,
      liquidity: 56000,
    },
    {
      id: "migrated-13",
      name: "Lantern",
      symbol: "LANT",
      chain: "Solana",
      price: 0.29,
      change24h: 1.7,
      volume24h: 21000,
      liquidity: 10000,
    },
    {
      id: "migrated-14",
      name: "Echo Migrant",
      symbol: "ECHO",
      chain: "Solana",
      price: 1.02,
      change24h: -4.0,
      volume24h: 33000,
      liquidity: 16000,
    },
    {
      id: "migrated-15",
      name: "Vertex",
      symbol: "VRTX",
      chain: "Ethereum",
      price: 4.4,
      change24h: 2.0,
      volume24h: 76000,
      liquidity: 38000,
    },
    {
      id: "migrated-16",
      name: "Nimbus",
      symbol: "NMB",
      chain: "Solana",
      price: 0.56,
      change24h: 0.3,
      volume24h: 27000,
      liquidity: 13000,
    },
    {
      id: "migrated-17",
      name: "PulseCore",
      symbol: "PCOR",
      chain: "BSC",
      price: 0.08,
      change24h: -9.9,
      volume24h: 6000,
      liquidity: 2500,
    },
    {
      id: "migrated-18",
      name: "Helio",
      symbol: "HLIO",
      chain: "Solana",
      price: 2.15,
      change24h: 7.4,
      volume24h: 92000,
      liquidity: 47000,
    },
    {
      id: "migrated-19",
      name: "Mirror Migrated",
      symbol: "MMIR",
      chain: "Ethereum",
      price: 0.68,
      change24h: -1.5,
      volume24h: 38000,
      liquidity: 19000,
    },
    {
      id: "migrated-20",
      name: "Final Migrant",
      symbol: "FMIG",
      chain: "Solana",
      price: 0.34,
      change24h: 5.0,
      volume24h: 31000,
      liquidity: 15000,
    },
  ],
};

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

export interface TokenTableProps {
  category: TokenCategoryId;
  name: string;
}

export function TokenTable({ category, name }: TokenTableProps) {
  const rows = MOCK_ROWS[category];

  return (
    <div className="overflow-hidden border border-slate-800/80 bg-[#020617]">
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-950/80 px-3 py-2">
        <span className="font-extrabold text-lg text-slate-50 strong ">
          {name}
        </span>

        <div className="flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/60 px-2 py-1 text-[11px] text-slate-300 shadow-sm">
          <div className="flex items-center gap-1 rounded-sm ">
            <div className="w-5 flex items-center justify-center gap-1">
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
              <span className="font-mono text-[10px] text-slate-100">0</span>
            </div>
            <span className="text-[9px] text-slate-500">logo</span>
          </div>

          <span className="h-4 w-px bg-slate-700/80" />

          <div className="flex items-center gap-1">
            <button
              type="button"
              className="rounded-sm hover:bg-slate-800/80 px-2 py-0.5 text-[10px] text-slate-100"
            >
              P1
            </button>
            <button
              type="button"
              className="rounded-sm px-2 py-0.5 text-[10px] text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
            >
              P2
            </button>
            <button
              type="button"
              className="rounded-sm px-2 py-0.5 text-[10px] text-slate-400 hover:bg-slate-800/80 hover:text-slate-100"
            >
              P3
            </button>
          </div>
        </div>
      </div>

      <div className="divide-y divide-slate-800/80">
        {rows.map((row) => (
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
