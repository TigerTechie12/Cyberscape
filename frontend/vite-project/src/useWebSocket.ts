import { useEffect, useRef, useCallback } from "react";
import type { WsClientMessage, WsServerMessage } from "./types";

const WS_URL = "ws://localhost:3001";

export function useWebSocket(
  onMessage: (msg: WsServerMessage) => void,
  enabled: boolean = true
) {
  const wsRef = useRef<WebSocket | null>(null);
  const onMessageRef = useRef(onMessage);
  onMessageRef.current = onMessage;

  useEffect(() => {
    if (!enabled) return;

    const ws = new WebSocket(WS_URL);
    wsRef.current = ws;

    ws.onopen = () => {
      console.log("[WS] connected");
    };

    ws.onmessage = (event) => {
      try {
        const data: WsServerMessage = JSON.parse(event.data);
        onMessageRef.current(data);
      } catch (err) {
        console.error("[WS] failed to parse message", err);
      }
    };

    ws.onerror = (err) => {
      console.error("[WS] error", err);
    };

    ws.onclose = () => {
      console.log("[WS] disconnected");
    };

    return () => {
      ws.close();
      wsRef.current = null;
    };
  }, [enabled]);

  const send = useCallback((msg: WsClientMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg));
    }
  }, []);

  return { send };
}
