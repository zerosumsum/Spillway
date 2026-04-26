"use client";

import { useEffect, useRef } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { useUserStore, type UserStore } from "../stores/useUserStore";
import { queryKeys, type AppNotification } from "./useApi";

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? "http://localhost:3001";

/**
 * Connects to the SSE /api/notifications/stream endpoint and pushes new
 * notifications into the TanStack Query cache so the UI updates immediately.
 *
 * The hook is a no-op when there is no auth token (unauthenticated users).
 * It automatically reconnects with exponential backoff if the connection drops.
 */
export function useNotificationStream() {
  const queryClient = useQueryClient();
  const token = useUserStore((s: UserStore) => s.authToken);
  const retryDelay = useRef(1_000);
  const abortRef = useRef<AbortController | null>(null);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!token) return;

    let cancelled = false;

    function connect() {
      if (cancelled) return;

      const url = `${API_URL}/api/notifications/stream`;
      const controller = new AbortController();
      abortRef.current = controller;

      function scheduleReconnect() {
        if (cancelled) return;
        const delay = Math.min(retryDelay.current, 30_000);
        retryDelay.current = Math.min(delay * 2, 30_000);
        timeoutRef.current = setTimeout(connect, delay);
      }

      fetch(url, {
        method: "GET",
        credentials: "include",
        signal: controller.signal,
        headers: {
          Authorization: `Bearer ${token}`,
          Accept: "text/event-stream",
        },
      })
        .then(async (res) => {
          if (!res.ok || !res.body) {
            throw new Error(`SSE connect failed (${res.status})`);
          }

          retryDelay.current = 1_000; // reset backoff on successful connect

          const reader = res.body.getReader();
          const decoder = new TextDecoder();
          let buffer = "";

          while (!cancelled) {
            const { value, done } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });

            // SSE events are separated by a blank line.
            const parts = buffer.split("\n\n");
            buffer = parts.pop() ?? "";

            for (const part of parts) {
              const lines = part.split("\n");
              for (const line of lines) {
                if (!line.startsWith("data:")) continue;
                const data = line.slice("data:".length).trim();
                if (!data) continue;

                try {
                  const payload = JSON.parse(data) as
                    | AppNotification
                    | { type: "init"; notifications: AppNotification[] };

                  queryClient.setQueryData(
                    queryKeys.notifications.all(),
                    (
                      prev: { notifications: AppNotification[]; unreadCount: number } | undefined,
                    ) => {
                      const existing = prev ?? { notifications: [], unreadCount: 0 };

                      if ("type" in payload && payload.type === "init") {
                        const ids = new Set(existing.notifications.map((n) => n.id));
                        const merged = [
                          ...payload.notifications.filter((n) => !ids.has(n.id)),
                          ...existing.notifications,
                        ].sort(
                          (a, b) =>
                            new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
                        );
                        const unreadCount = merged.filter((n) => !n.read).length;
                        return { notifications: merged, unreadCount };
                      }

                      const newNotif = payload as AppNotification;
                      const notifications = [newNotif, ...existing.notifications];
                      return {
                        notifications,
                        unreadCount: existing.unreadCount + (newNotif.read ? 0 : 1),
                      };
                    },
                  );
                } catch {
                  // Ignore malformed SSE messages
                }
              }
            }
          }
        })
        .catch(() => {
          if (!cancelled) {
            scheduleReconnect();
          }
        });
    }

    connect();

    return () => {
      cancelled = true;
      abortRef.current?.abort();
      abortRef.current = null;
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
    };
  }, [token, queryClient]);
}
