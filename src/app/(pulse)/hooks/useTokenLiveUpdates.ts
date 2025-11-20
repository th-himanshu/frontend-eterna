"use client";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "../../../redux/store";
import { setLastUpdateAt } from "../../../redux/slices/liveUpdatesSlice";
import type { TokenCategoryId } from "../lib/tokenTypes";

export interface UseTokenLiveUpdatesOptions {
  category: TokenCategoryId;
}

/**
 * Stub hook – no real WebSocket yet.
 *
 * This just updates `lastUpdateAt` on an interval when `isConnected` is true,
 * so the UI can already react to a "heartbeat" while we haven't wired a real
 * backend socket. Later we'll replace the interval body with actual
 * WebSocket message handling.
 */
export function useTokenLiveUpdates({ category }: UseTokenLiveUpdatesOptions) {
  const dispatch = useDispatch<AppDispatch>();
  const { isConnected, updateIntervalMs } = useSelector(
    (state: RootState) => state.liveUpdates,
  );

  useEffect(() => {
    if (!isConnected) return;

    const id = window.setInterval(() => {
      // For now we only record that an update "tick" happened.
      // In the real implementation, this is where we'd handle
      // incoming WebSocket messages for the given `category`.
      dispatch(setLastUpdateAt(Date.now()));
    }, updateIntervalMs);

    return () => window.clearInterval(id);
  }, [isConnected, updateIntervalMs, dispatch, category]);
}
