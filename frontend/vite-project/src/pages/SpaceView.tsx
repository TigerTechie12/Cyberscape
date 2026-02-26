import { useEffect, useState, useCallback, useRef } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { getSpace, addSpaceElement, getUserAvatar } from "../api"
import { useAuth } from "../AuthContext"
import { useWebSocket } from "../useWebSocket"
import type { SpaceElement, Element, WsServerMessage } from "../types"
import GameCanvas from "../components/GameCanvas"
import SpaceElementPanel from "../components/SpaceElementPanel"

export default function SpaceView() {
  const { spaceId } = useParams<{ spaceId: string }>()
  const { token } = useAuth()
  const navigate = useNavigate()

  const [gridWidth, setGridWidth] = useState(0)
  const [gridHeight, setGridHeight] = useState(0)
  const [spaceElements, setSpaceElements] = useState<SpaceElement[]>([])
  const [mapImageUrl, setMapImageUrl] = useState<string | null>(null)
  const [spaceLoaded, setSpaceLoaded] = useState(false)
  const [showElementPanel, setShowElementPanel] = useState(false)

  const [myAvatarUrl, setMyAvatarUrl] = useState<string | null>(null)
  const [myPosition, setMyPosition] = useState({ x: 0, y: 0 })
  const [otherPlayers, setOtherPlayers] = useState<
    Map<string, { x: number, y: number }>
  >(new Map())
  const [joined, setJoined] = useState(false)
  const [moveRejected, setMoveRejected] = useState(false)

  const [selectedElement, setSelectedElement] = useState<Element | null>(null)

  const myPosRef = useRef(myPosition)
  myPosRef.current = myPosition
  const joinedRef = useRef(joined)
  joinedRef.current = joined
  const gridRef = useRef({ w: gridWidth, h: gridHeight })
  gridRef.current = { w: gridWidth, h: gridHeight }

  useEffect(() => {
    getUserAvatar().then((avatars) => {
      if (avatars[0]?.imageUrl) setMyAvatarUrl(avatars[0].imageUrl)
    }).catch(() => {})
  }, [])

  useEffect(() => {
    if (!spaceId) return
    getSpace(spaceId)
      .then((data) => {
        const parts = data.dimensions.split("x")
        setGridHeight(parseInt(parts[0], 10))
        setGridWidth(parseInt(parts[1], 10))
        setSpaceElements(data.spaceElements)
        setMapImageUrl(data.thumbnail)
        setSpaceLoaded(true)
      })
      .catch(() => {
        alert("Failed to load space.")
        navigate("/dashboard")
      })
  }, [spaceId, navigate])

  function reloadSpace() {
    if (!spaceId) return
    getSpace(spaceId).then((data) => {
      setSpaceElements(data.spaceElements)
    })
  }

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key === "Escape") {
        setSelectedElement(null)
      }
    }
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  async function handleCanvasPlace(x: number, y: number) {
    if (!selectedElement || !spaceId) return
    try {
      await addSpaceElement(selectedElement.id, spaceId, x, y)
      setSelectedElement(null)
      reloadSpace()
    } catch {
      alert("Failed to place element.")
    }
  }

  const handleWsMessage = useCallback((msg: WsServerMessage) => {
    switch (msg.type) {
      case "space-joined":
        setMyPosition(msg.payload.spawn)
        setOtherPlayers((prev) => {
          const map = new Map(prev)
          for (const user of msg.payload.users) {
            map.set(user.id, { x: user.x, y: user.y })
          }
          return map
        })
        setJoined(true)
        break

      case "user-joined":
        setOtherPlayers((prev) => {
          const map = new Map(prev)
          map.set(msg.payload.odunId, {
            x: msg.payload.x,
            y: msg.payload.y,
          })
          return map
        })
        break

      case "movement":
        setOtherPlayers((prev) => {
          const map = new Map(prev)
          map.set(msg.payload.odunId, {
            x: msg.payload.x,
            y: msg.payload.y,
          })
          return map
        })
        break

      case "movement-rejected":
        setMyPosition({
          x: msg.payload.x,
          y: msg.payload.y,
        })
        setMoveRejected(true)
        setTimeout(() => setMoveRejected(false), 300)
        break

      case "user-left":
        setOtherPlayers((prev) => {
          const map = new Map(prev)
          map.delete(msg.payload.odunId)
          return map
        })
        break
    }
  }, [])

  const { send, connected } = useWebSocket(handleWsMessage, spaceLoaded)

  const hasSentJoin = useRef(false)
  useEffect(() => {
    if (spaceLoaded && spaceId && token && connected && !hasSentJoin.current) {
      send({ type: "join", payload: { spaceId, token } })
      hasSentJoin.current = true
    }
  }, [spaceLoaded, spaceId, token, connected, send])


  const sendRef = useRef(send)
  sendRef.current = send

  useEffect(() => {
    function handleKeyDown(e: KeyboardEvent) {
      if (!joinedRef.current) return

      const pos = myPosRef.current
      const grid = gridRef.current
      let newX = pos.x
      let newY = pos.y

      switch (e.key) {
        case "ArrowUp":
        case "w":
          newY -= 1
          break
        case "ArrowDown":
        case "s":
          newY += 1
          break
        case "ArrowLeft":
        case "a":
          newX -= 1
          break
        case "ArrowRight":
        case "d":
          newX += 1
          break
        default:
          return
      }

      e.preventDefault()

      if (newX < 0 || newX >= grid.w || newY < 0 || newY >= grid.h) return

      setMyPosition({ x: newX, y: newY })
      sendRef.current({ type: "move", payload: { x: newX, y: newY } })
    }

    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [])

  if (!spaceLoaded) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-lg text-gray-400">Loading space...</p>
      </div>
    )
  }

  return (
    <div className="relative h-screen w-screen overflow-hidden">
      <GameCanvas
        gridWidth={gridWidth}
        gridHeight={gridHeight}
        myPosition={myPosition}
        myAvatarUrl={myAvatarUrl}
        otherPlayers={otherPlayers}
        spaceElements={spaceElements}
        moveRejected={moveRejected}
        placementElement={selectedElement}
        mapImageUrl={mapImageUrl}
        onCanvasClick={handleCanvasPlace}
      />

      <div className="pointer-events-none absolute inset-x-0 top-0 flex items-start justify-between p-4">
        <button
          onClick={() => navigate("/dashboard")}
          className="pointer-events-auto rounded-lg bg-gray-900/80 px-4 py-2 text-sm text-white backdrop-blur transition hover:bg-gray-800"
        >
          &larr; Back
        </button>

        <div className="flex items-center gap-2">
          {selectedElement && (
            <div className="rounded-lg bg-cyan-900/80 px-3 py-2 text-xs text-cyan-300 backdrop-blur">
              Placing element &middot; Click on grid &middot; ESC to cancel
            </div>
          )}
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
          <button
            onClick={() => setShowElementPanel((v) => !v)}
            className="pointer-events-auto rounded-lg bg-gray-900/80 px-4 py-2 text-sm text-cyan-400 backdrop-blur transition hover:bg-gray-800"
          >
            {showElementPanel ? "Close Elements" : "Elements"}
          </button>
        </div>
      </div>

      {showElementPanel && spaceId && (
        <SpaceElementPanel
          spaceId={spaceId}
          spaceElements={spaceElements}
          onChanged={reloadSpace}
          onClose={() => setShowElementPanel(false)}
          selectedElement={selectedElement}
          onSelectElement={setSelectedElement}
        />
      )}

      {!joined && spaceLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <p className="text-lg text-gray-300">Joining space...</p>
        </div>
      )}
    </div>
  )
}
