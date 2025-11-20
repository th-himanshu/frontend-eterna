export function formatLargeCurrency(value: number): string {
    if (value >= 1_000_000) return `$${(value / 1_000_000).toFixed(1)}M`;
    if (value >= 1_000) return `$${(value / 1_000).toFixed(1)}K`;
    return `$${value.toFixed(2)}`;
}

export function formatPrice(price: number): string {
    return price < 1 ? price.toFixed(4) : price.toFixed(2);
}

export function formatTimeAgo(timestamp?: number): string {
    if (!timestamp) return "";
    const diff = Date.now() - timestamp;
    const seconds = Math.floor(diff / 1000);
    if (seconds < 60) return `${seconds}s`;
    return `${Math.floor(seconds / 60)}m`;
}
