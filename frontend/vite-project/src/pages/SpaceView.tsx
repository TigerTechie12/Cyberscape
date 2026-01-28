import { useEffect, useState, useCallback, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { getSpace } from "../api";
import { useAuth } from "../AuthContext";
import { useWebSocket } from "../useWebSocket";
import type { SpaceElement, WsServerMessage } from "../types";
import GameCanvas from "../components/GameCanvas";

export default function SpaceView() {
  const { spaceId } = useParams<{ spaceId: string }>();
  const { token } = useAuth();
  const navigate = useNavigate();

  // Space data from HTTP
  const [gridWidth, setGridWidth] = useState(0);
  const [gridHeight, setGridHeight] = useState(0);
  const [spaceElements, setSpaceElements] = useState<SpaceElement[]>([]);
  const [spaceLoaded, setSpaceLoaded] = useState(false);

  // Game state from WebSocket
  const [myPosition, setMyPosition] = useState({ x: 0, y: 0 });
  const [otherPlayers, setOtherPlayers] = useState<
    Map<string, { x: number; y: number }>
  >(new Map());
  const [joined, setJoined] = useState(false);

  // Keep refs for keyboard handler
  const myPosRef = useRef(myPosition);
  myPosRef.current = myPosition;
  const joinedRef = useRef(joined);
  joinedRef.current = joined;
  const gridRef = useRef({ w: gridWidth, h: gridHeight });
  gridRef.current = { w: gridWidth, h: gridHeight };

  // Fetch space data on mount
  useEffect(() => {
    if (!spaceId) return;
    getSpace(spaceId)
      .then((data) => {
        const parts = data.dimensions.split("x");
        setGridHeight(parseInt(parts[0], 10));
        setGridWidth(parseInt(parts[1], 10));
        setSpaceElements(data.spaceElements);
        setSpaceLoaded(true);
      })
      .catch(() => {
        alert("Failed to load space.");
        navigate("/dashboard");
      });
  }, [spaceId, navigate]);

  // Handle WebSocket messages
  const handleWsMessage = useCallback((msg: WsServerMessage) => {
    switch (msg.type) {
      case "space-joined":
        setMyPosition(msg.payload.spawn);
        setOtherPlayers((prev) => {
          const map = new Map(prev);
          for (const user of msg.payload.users) {
            if (!map.has(user.id)) {
              map.set(user.id, { x: 0, y: 0 });
            }
          }
          return map;
        });
        setJoined(true);
        break;

      case "user-joined":
        setOtherPlayers((prev) => {
          const map = new Map(prev);
          map.set(msg.payload.odunId, {
            x: msg.payload.x,
            y: msg.payload.y,
          });
          return map;
        });
        break;

      case "movement":
        setOtherPlayers((prev) => {
          const map = new Map(prev);
          map.set(msg.payload.odunId, {
            x: msg.payload.x,
            y: msg.payload.y,
          });
          return map;
        });
        break;

      case "movement-rejected":
        setMyPosition({
          x: msg.payload.x,
          y: msg.payload.y,
        });
        break;

      case "user-left":
        setOtherPlayers((prev) => {
          const map = new Map(prev);
          map.delete(msg.payload.odunId);
          return map;
        });
        break;
    }
  }, []);

  const { send } = useWebSocket(handleWsMessage, spaceLoaded);

  // Send join message once WS is connected and space is loaded
  const hasSentJoin = useRef(false);
  useEffect(() => {
    if (spaceLoaded && spaceId && token && !hasSentJoin.current) {
      // Small delay to ensure WS is open
      const timer = setTimeout(() => {
        send({ type: "join", payload: { spaceId, token } });
        hasSentJoin.current = true;
      }, 300);
      return () => clearTimeout(timer);
    }
  }, [spaceLoaded, spaceId, token, send]);

  // Keyboard movement handler
  const sendRef = useRef(send);
  sendRef.current = send;

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!joinedRef.current) return;

      const pos = myPosRef.current;
      const grid = gridRef.current;
      let newX = pos.x;
      let newY = pos.y;

      switch (e.key) {
        case "ArrowUp":
        case "w":
          newY -= 1;
          break;
        case "ArrowDown":
        case "s":
          newY += 1;
          break;
        case "ArrowLeft":
        case "a":
          newX -= 1;
          break;
        case "ArrowRight":
        case "d":
          newX += 1;
          break;
        default:
          return;
      }

      e.preventDefault();

      // Clamp to grid bounds
      if (newX < 0 || newX >= grid.w || newY < 0 || newY >= grid.h) return;

      // Optimistic update
      setMyPosition({ x: newX, y: newY });
      sendRef.current({ type: "move", payload: { x: newX, y: newY } });
    }

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  if (!spaceLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-400">Loading space...</p>
      </div>
    );
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <GameCanvas
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        myPosition={myPosition}
        otherPlayers={otherPlayers}
        spaceElements={spaceElements}
      />

      {/* HUD Overlay */}
      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="pointer-events-auto rounded-lg bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-gray-800"
        >
          &larr; Back
        </button>

        <div className="rounded-lg bg-gray-900/80 px-4 py-2 text-sm text-gray-300 backdrop-blur">
          <span className="text-cyan-400">
            ({myPosition.x}, {myPosition.y})
          </span>
          <span className="mx-2 text-gray-600">|</span>
          <span>
            {otherPlayers.size} other{otherPlayers.size !== 1 ? "s" : ""} online
          </span>
          <span className="mx-2 text-gray-600">|</span>
          <span className="text-gray-500">
            {gridWidth}x{gridHeight}
          </span>
        </div>
      </div>

      {!joined && spaceLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <p className="text-lg text-gray-300">Joining space...</p>
        </div>
      )}
    </div>
  );
}
