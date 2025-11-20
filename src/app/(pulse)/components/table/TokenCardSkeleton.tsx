export function TokenCardSkeleton() {
    return (
        <div className="flex gap-3 rounded-lg border border-axiom-border bg-axiom-card p-3">
            {/* Image Skeleton */}
            <div className="h-14 w-14 flex-shrink-0 animate-pulse rounded-md bg-neutral-800" />

            <div className="flex min-w-0 flex-1 flex-col gap-2">
                {/* Top Row Skeleton */}
                <div className="flex items-start justify-between">
                    <div className="flex flex-col gap-1">
                        <div className="h-4 w-24 animate-pulse rounded bg-neutral-800" />
                        <div className="h-3 w-16 animate-pulse rounded bg-neutral-800" />
                    </div>
                    <div className="flex flex-col items-end gap-1">
                        <div className="h-3 w-12 animate-pulse rounded bg-neutral-800" />
                        <div className="h-3 w-10 animate-pulse rounded bg-neutral-800" />
                    </div>
                </div>

                {/* Middle Row Skeleton */}
                <div className="flex items-center gap-3">
                    <div className="h-3 w-8 animate-pulse rounded bg-neutral-800" />
                    <div className="h-3 w-12 animate-pulse rounded bg-neutral-800" />
                    <div className="h-3 w-12 animate-pulse rounded bg-neutral-800" />
                    <div className="ml-auto h-3 w-16 animate-pulse rounded bg-neutral-800" />
                </div>

                {/* Bottom Row Skeleton */}
                <div className="flex gap-1.5">
                    <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-800" />
                    <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-800" />
                    <div className="h-5 w-16 animate-pulse rounded-full bg-neutral-800" />
                </div>
            </div>
        </div>
    );
}
