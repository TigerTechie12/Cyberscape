import { useEffect, useRef, useCallback } from "react"
import type { SpaceElement, Element } from "../types"

const TILE_SIZE = 32

interface GameCanvasProps {
  gridWidth: number
  gridHeight: number
  myPosition: { x: number; y: number }
  otherPlayers: Map<string, { x: number; y: number }>
  spaceElements: SpaceElement[]
  moveRejected?: boolean
  placementElement: Element | null
  onCanvasClick: (x: number, y: number) => void
}

function hashColor(str: string): string {
  let hash = 0
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash)
  }
  const hue = Math.abs(hash) % 360
  return `hsl(${hue}, 70%, 60%)`
}

export default function GameCanvas({
  gridWidth,
  gridHeight,
  myPosition,
  otherPlayers,
  spaceElements,
  moveRejected = false,
  placementElement,
  onCanvasClick,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const imageCache = useRef<Map<string, HTMLImageElement | null>>(new Map())
  const animFrameRef = useRef<number>(0)
  const hoverGrid = useRef<{ x: number; y: number } | null>(null)

  const propsRef = useRef({
    gridWidth,
    gridHeight,
    myPosition,
    otherPlayers,
    spaceElements,
    moveRejected,
    placementElement,
  })
  propsRef.current = {
    gridWidth,
    gridHeight,
    myPosition,
    otherPlayers,
    spaceElements,
    moveRejected,
    placementElement,
  }

  function getImage(url: string): HTMLImageElement | null {
    if (imageCache.current.has(url)) {
      return imageCache.current.get(url)!
    }
    imageCache.current.set(url, null)
    const img = new Image()
    img.src = url
    img.onload = () => imageCache.current.set(url, img)
    img.onerror = () => imageCache.current.set(url, null)
    return null
  }

  const screenToGrid = useCallback(
    (clientX: number, clientY: number) => {
      const canvas = canvasRef.current
      if (!canvas) return null
      const rect = canvas.getBoundingClientRect()
      const sx = clientX - rect.left
      const sy = clientY - rect.top

      const camX =
        propsRef.current.myPosition.x * TILE_SIZE -
        canvas.width / 2 +
        TILE_SIZE / 2
      const camY =
        propsRef.current.myPosition.y * TILE_SIZE -
        canvas.height / 2 +
        TILE_SIZE / 2

      const worldX = sx + camX
      const worldY = sy + camY

      return {
        x: Math.floor(worldX / TILE_SIZE),
        y: Math.floor(worldY / TILE_SIZE),
      }
    },
    []
  )

  function handleMouseMove(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!propsRef.current.placementElement) {
      hoverGrid.current = null
      return
    }
    hoverGrid.current = screenToGrid(e.clientX, e.clientY)
  }

  function handleMouseLeave() {
    hoverGrid.current = null
  }

  function handleClick(e: React.MouseEvent<HTMLCanvasElement>) {
    if (!propsRef.current.placementElement) return
    const grid = screenToGrid(e.clientX, e.clientY)
    if (!grid) return

    const el = propsRef.current.placementElement
    const gw = propsRef.current.gridWidth
    const gh = propsRef.current.gridHeight

    if (
      grid.x < 0 ||
      grid.y < 0 ||
      grid.x + el.width > gw ||
      grid.y + el.height > gh
    )
      return

    onCanvasClick(grid.x, grid.y)
  }

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext("2d")
    if (!ctx) return

    function render() {
      const {
        gridWidth: gw,
        gridHeight: gh,
        myPosition: my,
        otherPlayers: others,
        spaceElements: elements,
        moveRejected: rejected,
        placementElement: placeEl,
      } = propsRef.current

      canvas!.width = window.innerWidth
      canvas!.height = window.innerHeight
      const W = canvas!.width
      const H = canvas!.height

      ctx!.imageSmoothingEnabled = false

      const camX = my.x * TILE_SIZE - W / 2 + TILE_SIZE / 2
      const camY = my.y * TILE_SIZE - H / 2 + TILE_SIZE / 2

      ctx!.fillStyle = "#0f0f23"
      ctx!.fillRect(0, 0, W, H)

      ctx!.save()
      ctx!.translate(-camX, -camY)

      ctx!.fillStyle = "#1a1a2e"
      ctx!.fillRect(0, 0, gw * TILE_SIZE, gh * TILE_SIZE)

      ctx!.strokeStyle = "#2a2a4e"
      ctx!.lineWidth = 0.5
      for (let x = 0; x <= gw; x++) {
        ctx!.beginPath()
        ctx!.moveTo(x * TILE_SIZE, 0)
        ctx!.lineTo(x * TILE_SIZE, gh * TILE_SIZE)
        ctx!.stroke()
      }
      for (let y = 0; y <= gh; y++) {
        ctx!.beginPath()
        ctx!.moveTo(0, y * TILE_SIZE)
        ctx!.lineTo(gw * TILE_SIZE, y * TILE_SIZE)
        ctx!.stroke()
      }

      // placed elements
      for (const el of elements) {
        const ex = el.x * TILE_SIZE
        const ey = el.y * TILE_SIZE
        const ew = el.element.width * TILE_SIZE
        const eh = el.element.height * TILE_SIZE

        const img = getImage(el.element.imageUrl)
        if (img) {
          ctx!.drawImage(img, ex, ey, ew, eh)
        } else {
          ctx!.fillStyle = el.element.static ? "#4a5568" : "#d97706"
          ctx!.fillRect(ex, ey, ew, eh)
          ctx!.strokeStyle = el.element.static ? "#718096" : "#f59e0b"
          ctx!.lineWidth = 1
          ctx!.strokeRect(ex + 0.5, ey + 0.5, ew - 1, eh - 1)
        }
      }

      // ghost preview for placement
      if (placeEl && hoverGrid.current) {
        const gx = hoverGrid.current.x
        const gy = hoverGrid.current.y
        const ew = placeEl.width * TILE_SIZE
        const eh = placeEl.height * TILE_SIZE
        const px = gx * TILE_SIZE
        const py = gy * TILE_SIZE

        const isValid =
          gx >= 0 &&
          gy >= 0 &&
          gx + placeEl.width <= gw &&
          gy + placeEl.height <= gh

        ctx!.globalAlpha = 0.5
        const img = getImage(placeEl.imageUrl)
        if (img) {
          ctx!.drawImage(img, px, py, ew, eh)
        } else {
          ctx!.fillStyle = isValid ? "#10b981" : "#ef4444"
          ctx!.fillRect(px, py, ew, eh)
        }
        ctx!.globalAlpha = 1.0

        ctx!.strokeStyle = isValid ? "#10b981" : "#ef4444"
        ctx!.lineWidth = 2
        ctx!.setLineDash([4, 4])
        ctx!.strokeRect(px, py, ew, eh)
        ctx!.setLineDash([])
      }

      // other players
      others.forEach((pos, id) => {
        const px = pos.x * TILE_SIZE
        const py = pos.y * TILE_SIZE
        const color = hashColor(id)

        ctx!.fillStyle = color
        ctx!.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8)

        ctx!.strokeStyle = "#fff"
        ctx!.lineWidth = 1
        ctx!.strokeRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8)

        ctx!.fillStyle = "#fff"
        ctx!.font = "bold 8px monospace"
        ctx!.textAlign = "center"
        const label = id.length > 6 ? id.slice(0, 6) + ".." : id
        ctx!.fillText(label, px + TILE_SIZE / 2, py - 2)
      })

      // current player
      {
        const px = my.x * TILE_SIZE
        const py = my.y * TILE_SIZE

        if (rejected) {
          ctx!.shadowColor = "#ef4444"
          ctx!.shadowBlur = 16
          ctx!.fillStyle = "#ef4444"
        } else {
          ctx!.shadowColor = "#10b981"
          ctx!.shadowBlur = 10
          ctx!.fillStyle = "#10b981"
        }

        ctx!.fillRect(px + 3, py + 3, TILE_SIZE - 6, TILE_SIZE - 6)

        ctx!.shadowBlur = 0

        ctx!.strokeStyle = rejected ? "#fca5a5" : "#6ee7b7"
        ctx!.lineWidth = 2
        ctx!.strokeRect(px + 3, py + 3, TILE_SIZE - 6, TILE_SIZE - 6)

        ctx!.fillStyle = rejected ? "#fca5a5" : "#6ee7b7"
        ctx!.font = "bold 10px monospace"
        ctx!.textAlign = "center"
        ctx!.fillText("YOU", px + TILE_SIZE / 2, py - 4)
      }

      ctx!.strokeStyle = "#06b6d4"
      ctx!.lineWidth = 2
      ctx!.strokeRect(0, 0, gw * TILE_SIZE, gh * TILE_SIZE)

      ctx!.restore()

      animFrameRef.current = requestAnimationFrame(render)
    }

    animFrameRef.current = requestAnimationFrame(render)

    return () => {
      cancelAnimationFrame(animFrameRef.current)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="block h-screen w-screen"
      style={{
        imageRendering: "pixelated",
        cursor: placementElement ? "crosshair" : "default",
      }}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      onClick={handleClick}
    />
  )
}
