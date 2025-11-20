import { useEffect, useState, memo, useMemo, useCallback } from "react";
import type { TokenRow } from "../../lib/tokenTypes";
import { Tooltip } from "../ui/Tooltip";
import { Badge } from "../ui/Badge";
import { Modal } from "../ui/Modal";
import { formatLargeCurrency, formatTimeAgo } from "../../lib/formatters";
import Image from "next/image";

interface TokenCardProps {
  row: TokenRow;
}

// Pool of random token images
const TOKEN_IMAGES = [
  "https://api.dicebear.com/7.x/shapes/svg?seed=1",
  "https://api.dicebear.com/7.x/shapes/svg?seed=2",
  "https://api.dicebear.com/7.x/shapes/svg?seed=3",
  "https://api.dicebear.com/7.x/shapes/svg?seed=4",
  "https://api.dicebear.com/7.x/shapes/svg?seed=5",
  "https://api.dicebear.com/7.x/shapes/svg?seed=6",
  "https://api.dicebear.com/7.x/shapes/svg?seed=7",
  "https://api.dicebear.com/7.x/shapes/svg?seed=8",
  "https://api.dicebear.com/7.x/shapes/svg?seed=9",
  "https://api.dicebear.com/7.x/shapes/svg?seed=10",
];

function getRandomImage(tokenId: string): string {
  const hash = tokenId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  return TOKEN_IMAGES[hash % TOKEN_IMAGES.length];
}

// Generate bonding percentage and color based on token ID (consistent per token)
function getBondingInfo(tokenId: string): { percentage: number; color: string } {
  const hash = tokenId.split('').reduce((acc, char) => acc + char.charCodeAt(0), 0);
  const percentage = hash % 101; // 0-100

  // Interpolate between red and green
  const red = Math.round(255 * (1 - percentage / 100));
  const green = Math.round(255 * (percentage / 100));
  const color = `rgb(${red}, ${green}, 0)`;

  return { percentage, color };
}

export const TokenCard = memo(function TokenCard({ row }: TokenCardProps) {
  const [timeAgo, setTimeAgo] = useState<string>("now");
  const [isFundingModalOpen, setIsFundingModalOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  // Memoize bonding info to avoid recalculation
  const bondingInfo = useMemo(() => getBondingInfo(row.id), [row.id]);

  // Update "time ago"
  useEffect(() => {
    const updateTime = () => {
      setTimeAgo(formatTimeAgo(row.receivedAt));
    };

    updateTime();
    const interval = setInterval(updateTime, 1000);
    return () => clearInterval(interval);
  }, [row.receivedAt]);

  // Memoized handlers
  const handleMouseEnter = useCallback(() => setIsHovered(true), []);
  const handleMouseLeave = useCallback(() => setIsHovered(false), []);

  return (
    <>
      <div
        className="group relative flex gap-3 rounded-lg border border-axiom-border bg-axiom-card p-3 transition-all hover:border-axiom-border-highlight hover:bg-axiom-card-hover"
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
      >
        {/* Bonding Percentage Overlay */}
        {isHovered && (
          <div className="absolute right-2 top-2 z-10 rounded-md bg-black/80 px-2 py-1 text-xs font-bold backdrop-blur-sm">
            <span style={{ color: bondingInfo.color }}>
              Bonding: {bondingInfo.percentage}%
            </span>
          </div>
        )}

        {/* Token Icon */}
        <div className="relative h-14 w-14 flex-shrink-0 overflow-hidden rounded-md border border-axiom-border bg-neutral-900">
          <div className="flex h-full w-full items-center justify-center text-xs font-bold text-neutral-700">
            <Image
              width={50}
              height={50}
              className="h-12 w-12 object-contain"
              src={getRandomImage(row.id)}
              alt={row.symbol}
            />
          </div>
          {/* Chain Icon Overlay */}
          <div className="absolute bottom-0 right-0 rounded-tl-md bg-axiom-card p-0.5">
            <div className="h-3 w-3 rounded-full bg-neutral-700" />
          </div>
        </div>

        <div className="flex min-w-0 flex-1 flex-col gap-2">
          {/* Top Row: Name & Main Stats */}
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2">
                <h3 className="truncate text-sm font-bold text-axiom-text-main">
                  {row.name}
                </h3>
                <span className="shrink-0 text-xs text-axiom-text-dim">
                  {row.symbol}
                </span>
              </div>
              <div className="mt-0.5 text-xs text-axiom-text-dim">
                {timeAgo}
              </div>
            </div>

            <div className="flex shrink-0 flex-col items-end gap-0.5">
              <div className="text-sm font-bold text-axiom-text-main">
                ${formatLargeCurrency(row.price)}
              </div>
              <div
                className={`text-xs font-semibold ${row.change24h >= 0 ? "text-axiom-green" : "text-axiom-red"
                  }`}
              >
                {row.change24h >= 0 ? "+" : ""}
                {row.change24h.toFixed(2)}%
              </div>
            </div>
          </div>

          {/* Middle Row: Volume & Liquidity */}
          <div className="flex items-center gap-4 text-[10px]">
            <div className="flex items-center gap-1">
              <span className="text-axiom-text-dim">Vol:</span>
              <span className="font-mono text-axiom-text-main">
                ${formatLargeCurrency(row.volume24h)}
              </span>
            </div>
            <div className="flex items-center gap-1">
              <span className="text-axiom-text-dim">Liq:</span>
              <span className="font-mono text-axiom-text-main">
                ${formatLargeCurrency(row.liquidity)}
              </span>
            </div>
          </div>

          {/* Bottom Row: Risk Metrics */}
          <div className="flex flex-wrap items-center gap-1.5">
            <Tooltip content={`Funding Risk - Age: ${row.fundingRisk.age}${row.fundingRisk.isScammer ? ' (Scammer)' : ''}`}>
              <Badge variant="warning" size="sm">
                F: {row.fundingRisk.age}
              </Badge>
            </Tooltip>
            <Tooltip content="Sniper Risk Score">
              <Badge variant="danger" size="sm">
                S: {row.sniperRisk}%
              </Badge>
            </Tooltip>
            <Tooltip content="Insider Risk Score">
              <Badge variant="warning" size="sm">
                I: {row.insiderRisk}%
              </Badge>
            </Tooltip>
            <Tooltip content="Bundler Risk Score">
              <Badge variant="neutral" size="sm">
                B: {row.bundlerRisk}%
              </Badge>
            </Tooltip>
            <Tooltip content="Audit Score">
              <button
                onClick={() => setIsFundingModalOpen(true)}
                className="cursor-pointer"
              >
                <Badge variant="success" size="sm">
                  A: {row.auditScore}
                </Badge>
              </button>
            </Tooltip>
          </div>
        </div>
      </div>

      {/* Funding Modal */}
      <Modal
        isOpen={isFundingModalOpen}
        onClose={() => setIsFundingModalOpen(false)}
        title={`${row.name} Details`}
      >
        <div className="space-y-4">
          <div>
            <h4 className="mb-2 text-sm font-semibold text-axiom-text-main">
              Risk Metrics
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-axiom-text-dim">Funding Risk:</span>
                <span className="font-mono text-axiom-text-main">
                  {row.fundingRisk.age} {row.fundingRisk.isScammer && '(Scammer)'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-axiom-text-dim">Sniper Risk:</span>
                <span className="font-mono text-axiom-text-main">
                  {row.sniperRisk}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-axiom-text-dim">Insider Risk:</span>
                <span className="font-mono text-axiom-text-main">
                  {row.insiderRisk}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-axiom-text-dim">Bundler Risk:</span>
                <span className="font-mono text-axiom-text-main">
                  {row.bundlerRisk}%
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-axiom-text-dim">Audit Score:</span>
                <span className="font-mono text-axiom-text-main">
                  {row.auditScore}
                </span>
              </div>
            </div>
          </div>

          <div>
            <h4 className="mb-2 text-sm font-semibold text-axiom-text-main">
              Token Information
            </h4>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-axiom-text-dim">Holders:</span>
                <span className="font-mono text-axiom-text-main">
                  {row.holders?.toLocaleString() || "N/A"}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-axiom-text-dim">Chain:</span>
                <span className="font-mono text-axiom-text-main">
                  {row.chain}
                </span>
              </div>
            </div>
          </div>

          {row.description && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-axiom-text-main">
                Description
              </h4>
              <p className="text-sm text-axiom-text-dim">{row.description}</p>
            </div>
          )}

          {row.socials && (
            <div>
              <h4 className="mb-2 text-sm font-semibold text-axiom-text-main">
                Social Links
              </h4>
              <div className="flex flex-wrap gap-2">
                {row.socials.twitter && (
                  <a
                    href={row.socials.twitter}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-axiom-accent hover:underline"
                  >
                    Twitter
                  </a>
                )}
                {row.socials.telegram && (
                  <a
                    href={row.socials.telegram}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-axiom-accent hover:underline"
                  >
                    Telegram
                  </a>
                )}
                {row.socials.website && (
                  <a
                    href={row.socials.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-xs text-axiom-accent hover:underline"
                  >
                    Website
                  </a>
                )}
              </div>
            </div>
          )}
        </div>
      </Modal>
    </>
  );
});
