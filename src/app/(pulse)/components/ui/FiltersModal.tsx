"use client";

import { useState } from "react";
import { Modal } from "./Modal";

interface FiltersModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApply: (filters: FilterState) => void;
    currentFilters: FilterState;
}

export interface FilterState {
    category: "new_pairs" | "final_stretch" | "migrated";
    protocols: string[];
    quoteTokens: string[];
    searchKeywords: string;
    excludeKeywords: string;
    dexPaid: boolean;
    caEndsInPump: boolean;
    ageMin: string;
    ageMax: string;
    ageUnit: "m" | "h" | "d";
    top10HoldersMin: string;
    top10HoldersMax: string;
}

const PROTOCOLS = [
    { id: "pump", name: "Pump", icon: "🚀", color: "text-green-400" },
    { id: "mayhem", name: "Mayhem", icon: "🔴", color: "text-red-400" },
    { id: "bonk", name: "Bonk", icon: "🔥", color: "text-orange-400" },
    { id: "bags", name: "Bags", icon: "💰", color: "text-green-400" },
    { id: "moonshot", name: "Moonshot", icon: "🌙", color: "text-purple-400" },
    { id: "heaven", name: "Heaven", icon: "➖", color: "text-gray-400" },
    { id: "daos.fun", name: "Daos.fun", icon: "🌐", color: "text-blue-400" },
    { id: "candle", name: "Candle", icon: "🕯️", color: "text-orange-400" },
    { id: "sugar", name: "Sugar", icon: "🍬", color: "text-pink-400" },
    { id: "believe", name: "Believe", icon: "💎", color: "text-green-400" },
    { id: "jupiter", name: "Jupiter Studio", icon: "🪐", color: "text-orange-400" },
    { id: "moonit", name: "Moonit", icon: "⚡", color: "text-yellow-400" },
    { id: "boop", name: "Boop", icon: "😊", color: "text-blue-400" },
    { id: "launchlab", name: "LaunchLab", icon: "🔬", color: "text-cyan-400" },
    { id: "dynamic", name: "Dynamic BC", icon: "🔴", color: "text-red-400" },
    { id: "raydium", name: "Raydium", icon: "🌊", color: "text-gray-500" },
    { id: "meteora", name: "Meteora AMM", icon: "☄️", color: "text-gray-500" },
    { id: "meteora2", name: "Meteora AMM V2", icon: "☄️", color: "text-gray-500" },
    { id: "pump-amm", name: "Pump AMM", icon: "🚀", color: "text-gray-500" },
    { id: "orca", name: "Orca", icon: "🐋", color: "text-gray-500" },
];

const QUOTE_TOKENS = [
    { id: "sol", name: "SOL", icon: "◎", color: "text-cyan-400" },
    { id: "usdc", name: "USDC", icon: "💵", color: "text-blue-400" },
    { id: "usdt", name: "USDT", icon: "💰", color: "text-yellow-400" },
];

export function FiltersModal({
    isOpen,
    onClose,
    onApply,
    currentFilters,
}: FiltersModalProps) {
    const [filters, setFilters] = useState<FilterState>(currentFilters);
    const [activeTab, setActiveTab] = useState<"audit" | "metrics" | "socials">(
        "audit"
    );

    const toggleProtocol = (protocolId: string) => {
        setFilters((prev) => ({
            ...prev,
            protocols: prev.protocols.includes(protocolId)
                ? prev.protocols.filter((p) => p !== protocolId)
                : [...prev.protocols, protocolId],
        }));
    };

    const toggleQuoteToken = (tokenId: string) => {
        setFilters((prev) => ({
            ...prev,
            quoteTokens: prev.quoteTokens.includes(tokenId)
                ? prev.quoteTokens.filter((t) => t !== tokenId)
                : [...prev.quoteTokens, tokenId],
        }));
    };

    const handleApply = () => {
        onApply(filters);
        onClose();
    };

    const handleReset = () => {
        setFilters({
            ...currentFilters,
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
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose}>
            <div className="w-full max-w-2xl rounded-lg border border-axiom-border bg-axiom-card">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-axiom-border px-4 py-3">
                    <h2 className="text-lg font-bold text-axiom-text-main">Filters</h2>
                    <button
                        onClick={onClose}
                        className="text-axiom-text-dim hover:text-axiom-text-main"
                    >
                        ✕
                    </button>
                </div>

                {/* Category Tabs */}
                <div className="flex items-center justify-between border-b border-axiom-border px-4">
                    <div className="flex gap-6">
                        <button
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, category: "new_pairs" }))
                            }
                            className={`border-b-2 py-3 text-sm font-medium transition-colors ${filters.category === "new_pairs"
                                    ? "border-axiom-accent text-axiom-text-main"
                                    : "border-transparent text-axiom-text-dim hover:text-axiom-text-main"
                                }`}
                        >
                            New Pairs
                        </button>
                        <button
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, category: "final_stretch" }))
                            }
                            className={`border-b-2 py-3 text-sm font-medium transition-colors ${filters.category === "final_stretch"
                                    ? "border-axiom-accent text-axiom-text-main"
                                    : "border-transparent text-axiom-text-dim hover:text-axiom-text-main"
                                }`}
                        >
                            Final Stretch
                        </button>
                        <button
                            onClick={() =>
                                setFilters((prev) => ({ ...prev, category: "migrated" }))
                            }
                            className={`border-b-2 py-3 text-sm font-medium transition-colors ${filters.category === "migrated"
                                    ? "border-axiom-accent text-axiom-text-main"
                                    : "border-transparent text-axiom-text-dim hover:text-axiom-text-main"
                                }`}
                        >
                            Migrated
                        </button>
                    </div>
                    <button className="text-axiom-text-dim hover:text-axiom-text-main">
                        <svg
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                        >
                            <path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.2" />
                        </svg>
                    </button>
                </div>

                {/* Content */}
                <div className="max-h-[70vh] overflow-y-auto p-4">
                    {/* Protocols */}
                    <div className="mb-6">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-axiom-text-main">
                                Protocols
                            </h3>
                            <button
                                onClick={() => setFilters((prev) => ({ ...prev, protocols: [] }))}
                                className="text-xs text-axiom-text-dim hover:text-axiom-text-main"
                            >
                                Select All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {PROTOCOLS.map((protocol) => (
                                <button
                                    key={protocol.id}
                                    onClick={() => toggleProtocol(protocol.id)}
                                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${filters.protocols.includes(protocol.id)
                                            ? `border-${protocol.color.replace("text-", "")} ${protocol.color} bg-${protocol.color.replace("text-", "")}/10`
                                            : "border-axiom-border text-axiom-text-dim hover:border-axiom-border-highlight hover:text-axiom-text-main"
                                        }`}
                                >
                                    <span>{protocol.icon}</span>
                                    <span>{protocol.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Quote Tokens */}
                    <div className="mb-6">
                        <div className="mb-3 flex items-center justify-between">
                            <h3 className="text-sm font-medium text-axiom-text-main">
                                Quote Tokens
                            </h3>
                            <button
                                onClick={() => setFilters((prev) => ({ ...prev, quoteTokens: [] }))}
                                className="text-xs text-axiom-text-dim hover:text-axiom-text-main"
                            >
                                Unselect All
                            </button>
                        </div>
                        <div className="flex flex-wrap gap-2">
                            {QUOTE_TOKENS.map((token) => (
                                <button
                                    key={token.id}
                                    onClick={() => toggleQuoteToken(token.id)}
                                    className={`flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs transition-all ${filters.quoteTokens.includes(token.id)
                                            ? `${token.color} border-current bg-current/10`
                                            : "border-axiom-border text-axiom-text-dim hover:border-axiom-border-highlight hover:text-axiom-text-main"
                                        }`}
                                >
                                    <span>{token.icon}</span>
                                    <span>{token.name}</span>
                                </button>
                            ))}
                        </div>
                    </div>

                    {/* Search Keywords */}
                    <div className="mb-6 grid grid-cols-2 gap-4">
                        <div>
                            <label className="mb-2 block text-sm font-medium text-axiom-text-main">
                                Search Keywords
                            </label>
                            <input
                                type="text"
                                value={filters.searchKeywords}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        searchKeywords: e.target.value,
                                    }))
                                }
                                placeholder="keyword1, keyword2..."
                                className="w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main placeholder-axiom-text-dim focus:border-axiom-accent focus:outline-none"
                            />
                        </div>
                        <div>
                            <label className="mb-2 block text-sm font-medium text-axiom-text-main">
                                Exclude Keywords
                            </label>
                            <input
                                type="text"
                                value={filters.excludeKeywords}
                                onChange={(e) =>
                                    setFilters((prev) => ({
                                        ...prev,
                                        excludeKeywords: e.target.value,
                                    }))
                                }
                                placeholder="keyword1, keyword2..."
                                className="w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main placeholder-axiom-text-dim focus:border-axiom-accent focus:outline-none"
                            />
                        </div>
                    </div>

                    {/* Tabs */}
                    <div className="mb-4 flex gap-4 border-b border-axiom-border">
                        <button
                            onClick={() => setActiveTab("audit")}
                            className={`pb-2 text-sm font-medium ${activeTab === "audit"
                                    ? "border-b-2 border-axiom-accent text-axiom-text-main"
                                    : "text-axiom-text-dim hover:text-axiom-text-main"
                                }`}
                        >
                            Audit
                        </button>
                        <button
                            onClick={() => setActiveTab("metrics")}
                            className={`pb-2 text-sm font-medium ${activeTab === "metrics"
                                    ? "border-b-2 border-axiom-accent text-axiom-text-main"
                                    : "text-axiom-text-dim hover:text-axiom-text-main"
                                }`}
                        >
                            $ Metrics
                        </button>
                        <button
                            onClick={() => setActiveTab("socials")}
                            className={`pb-2 text-sm font-medium ${activeTab === "socials"
                                    ? "border-b-2 border-axiom-accent text-axiom-text-main"
                                    : "text-axiom-text-dim hover:text-axiom-text-main"
                                }`}
                        >
                            Socials
                        </button>
                    </div>

                    {/* Tab Content */}
                    {activeTab === "audit" && (
                        <div className="space-y-4">
                            {/* Checkboxes */}
                            <div className="grid grid-cols-2 gap-4">
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.dexPaid}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                dexPaid: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-axiom-border bg-axiom-bg text-axiom-accent focus:ring-axiom-accent"
                                    />
                                    <span className="text-sm text-axiom-text-main">Dex Paid</span>
                                </label>
                                <label className="flex items-center gap-2">
                                    <input
                                        type="checkbox"
                                        checked={filters.caEndsInPump}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                caEndsInPump: e.target.checked,
                                            }))
                                        }
                                        className="h-4 w-4 rounded border-axiom-border bg-axiom-bg text-axiom-accent focus:ring-axiom-accent"
                                    />
                                    <span className="text-sm text-axiom-text-main">
                                        CA ends in &apos;pump&apos;
                                    </span>
                                </label>
                            </div>

                            {/* Age */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-axiom-text-main">
                                    Age
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={filters.ageMin}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    ageMin: e.target.value,
                                                }))
                                            }
                                            placeholder="Min"
                                            className="flex-1 rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main placeholder-axiom-text-dim focus:border-axiom-accent focus:outline-none"
                                        />
                                        <select
                                            value={filters.ageUnit}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    ageUnit: e.target.value as "m" | "h" | "d",
                                                }))
                                            }
                                            className="rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main focus:border-axiom-accent focus:outline-none"
                                        >
                                            <option value="m">m</option>
                                            <option value="h">h</option>
                                            <option value="d">d</option>
                                        </select>
                                    </div>
                                    <div className="flex gap-2">
                                        <input
                                            type="text"
                                            value={filters.ageMax}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    ageMax: e.target.value,
                                                }))
                                            }
                                            placeholder="Max"
                                            className="flex-1 rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main placeholder-axiom-text-dim focus:border-axiom-accent focus:outline-none"
                                        />
                                        <select
                                            value={filters.ageUnit}
                                            onChange={(e) =>
                                                setFilters((prev) => ({
                                                    ...prev,
                                                    ageUnit: e.target.value as "m" | "h" | "d",
                                                }))
                                            }
                                            className="rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main focus:border-axiom-accent focus:outline-none"
                                        >
                                            <option value="m">m</option>
                                            <option value="h">h</option>
                                            <option value="d">d</option>
                                        </select>
                                    </div>
                                </div>
                            </div>

                            {/* Top 10 Holders % */}
                            <div>
                                <label className="mb-2 block text-sm font-medium text-axiom-text-main">
                                    Top 10 Holders %
                                </label>
                                <div className="grid grid-cols-2 gap-4">
                                    <input
                                        type="text"
                                        value={filters.top10HoldersMin}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                top10HoldersMin: e.target.value,
                                            }))
                                        }
                                        placeholder="Min"
                                        className="w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main placeholder-axiom-text-dim focus:border-axiom-accent focus:outline-none"
                                    />
                                    <input
                                        type="text"
                                        value={filters.top10HoldersMax}
                                        onChange={(e) =>
                                            setFilters((prev) => ({
                                                ...prev,
                                                top10HoldersMax: e.target.value,
                                            }))
                                        }
                                        placeholder="Max"
                                        className="w-full rounded-md border border-axiom-border bg-axiom-bg px-3 py-2 text-sm text-axiom-text-main placeholder-axiom-text-dim focus:border-axiom-accent focus:outline-none"
                                    />
                                </div>
                            </div>
                        </div>
                    )}

                    {activeTab === "metrics" && (
                        <div className="py-8 text-center text-sm text-axiom-text-dim">
                            Metrics filters coming soon...
                        </div>
                    )}

                    {activeTab === "socials" && (
                        <div className="py-8 text-center text-sm text-axiom-text-dim">
                            Socials filters coming soon...
                        </div>
                    )}
                </div>

                {/* Footer */}
                <div className="flex items-center justify-between border-t border-axiom-border px-4 py-3">
                    <div className="flex gap-2">
                        <button
                            onClick={handleReset}
                            className="rounded-md border border-axiom-border bg-axiom-bg px-4 py-2 text-sm font-medium text-axiom-text-main hover:bg-axiom-card"
                        >
                            Import
                        </button>
                        <button className="rounded-md border border-axiom-border bg-axiom-bg px-4 py-2 text-sm font-medium text-axiom-text-main hover:bg-axiom-card">
                            Export
                        </button>
                    </div>
                    <button
                        onClick={handleApply}
                        className="rounded-md bg-axiom-accent px-6 py-2 text-sm font-semibold text-white hover:bg-axiom-accent/90"
                    >
                        Apply All
                    </button>
                </div>
            </div>
        </Modal>
    );
}
