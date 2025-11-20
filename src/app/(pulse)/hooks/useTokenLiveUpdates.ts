"use client";

import { useEffect, useRef } from "react";
import { useDispatch } from "react-redux";
import { useQueryClient } from "@tanstack/react-query";
import type { AppDispatch } from "../../../redux/store";
import { setLastUpdateAt } from "../../../redux/slices/liveUpdatesSlice";
import type { TokenCategoryId, TokenRow, WebSocketMessage } from "../lib/tokenTypes";

export interface UseTokenLiveUpdatesOptions {
  category: TokenCategoryId;
}

export function useTokenLiveUpdates({ category }: UseTokenLiveUpdatesOptions) {
  const dispatch = useDispatch<AppDispatch>();
  const queryClient = useQueryClient();
  const wsRef = useRef<WebSocket | null>(null);

  useEffect(() => {
    // In a real app, this URL would come from env vars
    const wsUrl = "ws://localhost:3001";
    const ws = new WebSocket(wsUrl);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("WS Connected");
      dispatch(setLastUpdateAt(Date.now())); // Initial "connected" state
    };

    ws.onmessage = (event) => {
      try {
        const message: WebSocketMessage = JSON.parse(event.data);

        if (message.type === "price_update") {
          dispatch(setLastUpdateAt(message.timestamp));

          // Update React Query cache - ADD new token instead of updating
          queryClient.setQueryData<TokenRow[]>(
            ["tokenTable", category],
            (oldData) => {
              if (!oldData) return oldData;

              // Find if token already exists
              const existingToken = oldData.find((token) => token.id === message.tokenId);

              if (existingToken) {
                // Create a new token entry with updated data and new ID
                const newToken: TokenRow = {
                  ...existingToken,
                  id: `${message.tokenId}-${Date.now()}`, // Make it unique
                  price: message.price,
                  change24h: message.change24h,
                  volume24h: message.volume24h,
                  liquidity: message.liquidity,
                  receivedAt: Date.now(),
                };

                // Add to the beginning of the list
                return [newToken, ...oldData];
              }

              return oldData;
            }
          );
        }
      } catch (err) {
        console.error("Failed to parse WS message", err);
      }
    };

    ws.onclose = () => {
      console.log("WS Closed");
    };

    ws.onerror = (error) => {
      console.error("WS Error", error);
    };

    return () => {
      if (ws.readyState === WebSocket.OPEN || ws.readyState === WebSocket.CONNECTING) {
        ws.close();
      }
    };
  }, [category, dispatch, queryClient]);
}
