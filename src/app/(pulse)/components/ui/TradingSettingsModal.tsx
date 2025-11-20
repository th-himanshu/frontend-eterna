"use client";

import React, { useState } from "react";
import { Modal } from "./Modal";

interface TradingSettingsModalProps {
    isOpen: boolean;
    onClose: () => void;
    presetId: string;
}

export function TradingSettingsModal({
    isOpen,
    onClose,    
}: TradingSettingsModalProps) {
    const [activeTab, setActiveTab] = useState<"buy" | "sell">("buy");
    const [mevMode, setMevMode] = useState<"off" | "reduced" | "secure">("off");
    const [autoFee, setAutoFee] = useState(false);

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Trading Settings">
            <div className="flex flex-col gap-5">
                {/* Tabs */}
                <div className="grid grid-cols-2 gap-1 rounded-lg bg-neutral-900 p-1">
                    <button
                        onClick={() => setActiveTab("buy")}
                        className={`rounded-md py-2 text-sm font-bold transition-all ${activeTab === "buy"
                                ? "bg-axiom-green/10 text-axiom-green"
                                : "text-axiom-text-dim hover:text-axiom-text-main"
                            }`}
                    >
                        Buy Settings
                    </button>
                    <button
                        onClick={() => setActiveTab("sell")}
                        className={`rounded-md py-2 text-sm font-bold transition-all ${activeTab === "sell"
                                ? "bg-axiom-red/10 text-axiom-red"
                                : "text-axiom-text-dim hover:text-axiom-text-main"
                            }`}
                    >
                        Sell Settings
                    </button>
                </div>

                {/* Main Inputs */}
                <div className="grid grid-cols-3 gap-3">
                    {/* Slippage */}
                    <div className="flex flex-col gap-1 rounded-lg border border-axiom-border bg-neutral-900 p-2">
                        <div className="flex items-center justify-center gap-1">
                            <input
                                type="text"
                                defaultValue="20"
                                className="w-full bg-transparent text-center font-mono text-lg font-bold text-axiom-text-main outline-none"
                            />
                            <span className="text-xs text-axiom-text-dim">%</span>
                        </div>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-axiom-text-dim">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                            </svg>
                            SLIPPAGE
                        </div>
                    </div>

                    {/* Priority */}
                    <div className="flex flex-col gap-1 rounded-lg border border-axiom-border bg-neutral-900 p-2">
                        <div className="flex items-center justify-center">
                            <input
                                type="text"
                                defaultValue="0.001"
                                className="w-full bg-transparent text-center font-mono text-lg font-bold text-axiom-text-main outline-none"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-axiom-text-dim">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <path d="M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
                                <path d="M6 12V7a5 5 0 0 1 10 0v5" />
                            </svg>
                            PRIORITY
                        </div>
                    </div>

                    {/* Bribe */}
                    <div className="flex flex-col gap-1 rounded-lg border border-axiom-border bg-neutral-900 p-2">
                        <div className="flex items-center justify-center">
                            <input
                                type="text"
                                defaultValue="0.01"
                                className="w-full bg-transparent text-center font-mono text-lg font-bold text-axiom-text-main outline-none"
                            />
                        </div>
                        <div className="flex items-center justify-center gap-1 text-[10px] text-axiom-text-dim">
                            <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                <circle cx="8" cy="8" r="6" />
                                <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                                <path d="M7 6h1v4" />
                                <path d="m16.71 13.88.7.71-2.82 2.82" />
                            </svg>
                            BRIBE
                        </div>
                    </div>
                </div>

                {/* Fees */}
                <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                        <div
                            className={`h-5 w-5 rounded border flex items-center justify-center transition-colors ${autoFee
                                    ? "bg-axiom-accent border-axiom-accent text-black"
                                    : "border-axiom-border bg-neutral-900"
                                }`}
                            onClick={() => setAutoFee(!autoFee)}
                        >
                            {autoFee && (
                                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3">
                                    <polyline points="20 6 9 17 4 12" />
                                </svg>
                            )}
                        </div>
                        <span className="text-sm font-medium text-axiom-text-main">Auto Fee</span>
                    </label>

                    <div className="flex-1 rounded-lg border border-axiom-border bg-neutral-900 px-3 py-2 flex items-center gap-2">
                        <span className="text-xs text-axiom-text-dim">MAX FEE</span>
                        <input
                            type="text"
                            defaultValue="0.1"
                            className="w-full bg-transparent font-mono text-sm font-bold text-axiom-text-main outline-none"
                        />
                    </div>
                </div>

                {/* MEV Mode */}
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm font-medium text-axiom-text-main">
                        MEV Mode
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" className="text-axiom-text-dim">
                            <circle cx="12" cy="12" r="10" />
                            <path d="M12 16v-4" />
                            <path d="M12 8h.01" />
                        </svg>
                    </div>
                    <div className="flex rounded-lg border border-axiom-border bg-neutral-900 p-0.5">
                        {(["off", "reduced", "secure"] as const).map((mode) => (
                            <button
                                key={mode}
                                onClick={() => setMevMode(mode)}
                                className={`flex items-center gap-1 rounded px-3 py-1.5 text-xs font-medium transition-all ${mevMode === mode
                                        ? "bg-axiom-accent/10 text-axiom-accent"
                                        : "text-axiom-text-dim hover:text-axiom-text-main"
                                    }`}
                            >
                                {mode === "off" && (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <circle cx="12" cy="12" r="10" />
                                        <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                                    </svg>
                                )}
                                {mode === "reduced" && (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                    </svg>
                                )}
                                {mode === "secure" && (
                                    <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                                        <path d="m9 12 2 2 4-4" />
                                    </svg>
                                )}
                                {mode.charAt(0).toUpperCase() + mode.slice(1)}
                            </button>
                        ))}
                    </div>
                </div>

                {/* RPC */}
                <div className="rounded-lg border border-axiom-border bg-neutral-900 px-3 py-2 flex items-center gap-2">
                    <span className="text-xs text-axiom-text-dim">RPC</span>
                    <input
                        type="text"
                        placeholder="https://..."
                        defaultValue="https://api.mainnet-beta.solana.com"
                        className="w-full bg-transparent font-mono text-sm text-axiom-text-dim outline-none focus:text-axiom-text-main"
                    />
                </div>

                <button
                    onClick={onClose}
                    className="mt-2 w-full rounded-lg bg-axiom-accent py-3 text-sm font-bold text-black hover:bg-axiom-accent/90"
                >
                    Continue
                </button>
            </div>
        </Modal>
    );
}
