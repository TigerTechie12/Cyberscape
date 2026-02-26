import { useEffect, useRef, useCallback, useState } from "react";
import type { WsClientMessage, WsServerMessage } from "./types";

const WS_URL ="wss://cyberscape-1.onrender.com"

export function useWebSocket(
  onMessage: (msg: WsServerMessage) => void,
  enabled: boolean = true
) {
  const wsRef = useRef<WebSocket | null>(null)
  const onMessageRef = useRef(onMessage)
  onMessageRef.current = onMessage
  const [connected, setConnected] = useState(false)

  useEffect(() => {
    if (!enabled) return

    const ws = new WebSocket(WS_URL)
    wsRef.current = ws

    ws.onopen = () => {
      console.log("[WS] connected")
      setConnected(true)
    }

    ws.onmessage = (event) => {
      try {
        const data: WsServerMessage = JSON.parse(event.data)
        onMessageRef.current(data)
      } catch (err) {
        console.error("[WS] failed to parse message", err)
      }
    }

    ws.onerror = (err) => {
      console.error("[WS] error", err)
    }

    ws.onclose = () => {
      console.log("[WS] disconnected")
      setConnected(false)
    }

    return () => {
      ws.close()
      wsRef.current = null
      setConnected(false)
    }
  }, [enabled])

  const send = useCallback((msg: WsClientMessage) => {
    if (wsRef.current?.readyState === WebSocket.OPEN) {
      wsRef.current.send(JSON.stringify(msg))
    }
  }, [])

  return { send, connected }
}
