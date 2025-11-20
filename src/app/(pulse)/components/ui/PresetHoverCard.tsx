"use client";

import React from "react";

interface PresetHoverCardProps {
    slippage: string;
    priority: string;
    bribe: string;
    mev: "Off" | "Reduced" | "Secure";
}

export function PresetHoverCard({
    slippage,
    priority,
    bribe,
    mev,
}: PresetHoverCardProps) {
    return (
        <div className="absolute top-full right-0 z-50 mt-2 w-32 rounded-lg border border-axiom-border bg-neutral-900 p-2 shadow-xl">
            <div className="flex flex-col gap-2">
                {/* Slippage */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-axiom-text-dim">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                        </svg>
                    </div>
                    <span className="font-mono font-medium text-axiom-text-main">{slippage}%</span>
                </div>

                {/* Priority */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-axiom-text-dim">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <path d="M3 22v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8" />
                            <path d="M6 12V7a5 5 0 0 1 10 0v5" />
                        </svg>
                    </div>
                    <span className="font-mono font-medium text-yellow-500">{priority}</span>
                </div>

                {/* Bribe */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-axiom-text-dim">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="8" cy="8" r="6" />
                            <path d="M18.09 10.37A6 6 0 1 1 10.34 18" />
                            <path d="M7 6h1v4" />
                            <path d="m16.71 13.88.7.71-2.82 2.82" />
                        </svg>
                    </div>
                    <span className="font-mono font-medium text-axiom-text-main">{bribe}</span>
                </div>

                {/* MEV */}
                <div className="flex items-center justify-between text-xs">
                    <div className="flex items-center gap-1.5 text-axiom-text-dim">
                        <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                            <circle cx="12" cy="12" r="10" />
                            <line x1="4.93" y1="4.93" x2="19.07" y2="19.07" />
                        </svg>
                    </div>
                    <span className="font-medium text-axiom-text-dim">{mev}</span>
                </div>
            </div>
        </div>
    );
}
