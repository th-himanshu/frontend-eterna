"use client";

import { useEffect, useState } from "react";
import type { TokenRow } from "../../lib/tokenTypes";
import { Tooltip } from "../ui/Tooltip";
import { Badge } from "../ui/Badge";
import { Modal } from "../ui/Modal";

interface TokenCardProps {
  row: TokenRow;
}

export function TokenCard({ row }: TokenCardProps) {
  const [flash, setFlash] = useState<"green" | "red" | null>(null);
  const [timeAgo, setTimeAgo] = useState<string>("now");
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);

  // Detect price changes for flash effect
  useEffect(() => {
    setFlash(row.change24h >= 0 ? "green" : "red");
    const timer = setTimeout(() => setFlash(null), 300);
    return () => clearTimeout(timer);
  }, [row.price, row.change24h]);

  // Update "time ago"
  useEffect(() => {
    const updateTime = () => {
      if (!row.receivedAt) {
        setTimeAgo("");
        return;
      }
      const diff = Date.now() - row.receivedAt;
      const seconds = Math.floor(diff / 1000);
      if (seconds < 60) setTimeAgo(`${seconds}s`);
      else setTimeAgo(`${Math.floor(seconds / 60)}m`);
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [row.receivedAt]);

  const formatLargeCurrency = (value: number) => {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
  };

  return (
    <>
      <div className="group relative flex gap-3 rounded-lg border border-axiom-border bg-axiom-card p-3 transition-all hover:border-axiom-border-highlight hover:bg-axiom-card-hover">
        {/* Flash Overlay */}
        {flash && (
          <div
            className={`pointer-events-none absolute inset-0 rounded-lg opacity-10 ${
              flash === "green" ? "bg-axiom-green" : "bg-axiom-red"
            }`}
          />
        )}

        {/* Token Icon */}
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-axiom-border bg-neutral-900">
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-neutral-700">
            <img
            className="h-12 w-12 object-contain"
             src="data:image/webp;base64,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" alt="ben10" />
          </div>
          {/* Chain Icon Overlay */}
          <div className="absolute bottom-0 right-0 rounded-tl-md bg-axiom-card p-0.5">
            <div className="h-3 w-3 rounded-full bg-neutral-700" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {/* Top Row: Name & Main Stats */}
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-axiom-text-main">
                {row.symbol}
              </span>
              <span className="truncate text-xs text-axiom-text-dim">
                {row.name}
              </span>
              <button className="text-axiom-text-dim hover:text-axiom-text-main">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
                  <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path>
                </svg>
              </button>
            </div>

            <div className="flex flex-col items-end">
              <div className="flex items-center gap-1 text-xs">
                <span className="text-axiom-text-dim">MC</span>
                <span className="font-mono font-medium text-axiom-text-main">
                  {formatLargeCurrency(row.liquidity * 2)} {/* Mock MC */}
                </span>
              </div>
              <div className="flex items-center gap-1 text-[10px]">
                <span className="text-axiom-text-dim">V</span>
                <span className="font-mono text-axiom-text-main">
                  {formatLargeCurrency(row.volume24h)}
                </span>
              </div>
            </div>
          </div>

          {/* Middle Row: Metrics */}
          <div className="flex items-center gap-3 text-[10px] text-axiom-text-dim">
            <span className="text-axiom-green">{timeAgo}</span>

            <Tooltip content="Holders">
              <div className="flex items-center gap-1 hover:text-axiom-text-main cursor-help">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"></path>
                  <circle cx="9" cy="7" r="4"></circle>
                  <path d="M23 21v-2a4 4 0 0 0-3-3.87"></path>
                  <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
                </svg>
                <span>{row.holders}%</span>
              </div>
            </Tooltip>

            <Tooltip content="Audit Score">
              <div className="flex items-center gap-1 hover:text-axiom-text-main cursor-help">
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z"></path>
                </svg>
                <span className="text-yellow-500">{row.auditScore}</span>
              </div>
            </Tooltip>

            <div className="ml-auto flex items-center gap-2">
              <span className="text-[10px] text-axiom-text-dim">TX</span>
              <span className="font-mono text-axiom-text-main">22</span>
              <div className="h-1 w-8 rounded-full bg-neutral-800 overflow-hidden">
                <div className="h-full w-2/3 bg-axiom-green" />
              </div>
            </div>
          </div>

          {/* Bottom Row: Risk Badges */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Badge
              label="Sniper"
              value={`${row.sniperRisk}%`}
              variant={row.sniperRisk > 50 ? "danger" : "neutral"}
              icon={
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <circle cx="12" cy="12" r="10"></circle>
                  <line x1="22" y1="12" x2="18" y2="12"></line>
                  <line x1="6" y1="12" x2="2" y2="12"></line>
                  <line x1="12" y1="6" x2="12" y2="2"></line>
                  <line x1="12" y1="22" x2="12" y2="18"></line>
                </svg>
              }
            />

            <div
              onClick={() => setIsFundingModalOpen(true)}
              className="cursor-pointer"
            >
              <Badge
                label="Funding"
                value={`${row.fundingRisk.age}`}
                variant={row.fundingRisk.isScammer ? "danger" : "success"}
                icon={
                  <svg
                    width="8"
                    height="8"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                  >
                    <path d="M21 12V7H5a2 2 0 0 1 0-4h14v4"></path>
                    <path d="M3 5v14a2 2 0 0 0 2 2h16v-5"></path>
                    <path d="M18 12a2 2 0 0 0 0 4h4v-4Z"></path>
                  </svg>
                }
              />
            </div>

            <Badge
              label="Insider"
              value={`${row.insiderRisk}%`}
              variant={row.insiderRisk > 30 ? "warning" : "neutral"}
              icon={
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <rect
                    x="3"
                    y="11"
                    width="18"
                    height="11"
                    rx="2"
                    ry="2"
                  ></rect>
                  <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
                </svg>
              }
            />
            <Badge
              label="Bundler"
              value={`${row.bundlerRisk}%`}
              variant={row.bundlerRisk > 50 ? "danger" : "neutral"}
              icon={
                <svg
                  width="8"
                  height="8"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"></path>
                  <polyline points="3.27 6.96 12 12.01 20.73 6.96"></polyline>
                  <line x1="12" y1="22.08" x2="12" y2="12"></line>
                </svg>
              }
            />
          </div>
        </div>
      </div>

      <Modal
        isOpen={isFundingModalOpen}
        onClose={() => setIsFundingModalOpen(false)}
        title={`Funding Analysis: ${row.symbol}`}
      >
        <div className="flex flex-col gap-4">
          <div className="flex items-center justify-between rounded-lg bg-neutral-900 p-3">
            <span className="text-sm">Wallet Age</span>
            <span className="font-mono font-bold text-axiom-text-main">
              {row.fundingRisk.age}
            </span>
          </div>
          <div className="flex items-center justify-between rounded-lg bg-neutral-900 p-3">
            <span className="text-sm">Status</span>
            <span
              className={`font-bold ${
                row.fundingRisk.isScammer ? "text-red-500" : "text-green-500"
              }`}
            >
              {row.fundingRisk.isScammer ? "Suspicious" : "Verified"}
            </span>
          </div>
          <p className="text-xs leading-relaxed">
            This wallet was funded {row.fundingRisk.age} ago.
            {row.fundingRisk.isScammer
              ? " It shows patterns similar to known scammer wallets. Exercise extreme caution."
              : " It appears to be a legitimate wallet with no known suspicious history."}
          </p>
          <button
            className="mt-2 w-full rounded-lg bg-axiom-accent py-2 text-sm font-bold text-black hover:bg-axiom-accent/90"
            onClick={() =>
              window.open(`https://solscan.io/token/${row.id}`, "_blank")
            }
          >
            View on Solscan
          </button>
        </div>
      </Modal>
    </>
  );
}
