import { useEffect, useRef } from "react";
import type { SpaceElement } from "../types";

const TILE_SIZE = 32;

interface GameCanvasProps {
  gridWidth: number;
  gridHeight: number;
  myPosition: { x: number; y: number };
  otherPlayers: Map<string, { x: number; y: number }>;
  spaceElements: SpaceElement[];
}

function hashColor(str: string): string {
  let hash = 0;
  for (let i = 0; i < str.length; i++) {
    hash = str.charCodeAt(i) + ((hash << 5) - hash);
  }
  const hue = Math.abs(hash) % 360;
  return `hsl(${hue}, 70%, 60%)`;
}

export default function GameCanvas({
  gridWidth,
  gridHeight,
  myPosition,
  otherPlayers,
  spaceElements,
}: GameCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageCache = useRef<Map<string, HTMLImageElement | null>>(new Map());
  const animFrameRef = useRef<number>(0);

  // Store props in refs so the render loop always sees latest values
  const propsRef = useRef({
    gridWidth,
    gridHeight,
    myPosition,
    otherPlayers,
    spaceElements,
  });
  propsRef.current = {
    gridWidth,
    gridHeight,
    myPosition,
    otherPlayers,
    spaceElements,
  };

  function getImage(url: string): HTMLImageElement | null {
    if (imageCache.current.has(url)) {
      return imageCache.current.get(url)!;
    }
    imageCache.current.set(url, null);
    const img = new Image();
    img.src = url;
    img.onload = () => imageCache.current.set(url, img);
    img.onerror = () => imageCache.current.set(url, null);
    return null;
  }

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function render() {
      const {
        gridWidth: gw,
        gridHeight: gh,
        myPosition: my,
        otherPlayers: others,
        spaceElements: elements,
      } = propsRef.current;

      // Resize canvas to fill window
      canvas!.width = window.innerWidth;
      canvas!.height = window.innerHeight;
      const W = canvas!.width;
      const H = canvas!.height;

      ctx!.imageSmoothingEnabled = false;

      // Camera: center on player
      const camX = my.x * TILE_SIZE - W / 2 + TILE_SIZE / 2;
      const camY = my.y * TILE_SIZE - H / 2 + TILE_SIZE / 2;

      // Clear
      ctx!.fillStyle = "#0f0f23";
      ctx!.fillRect(0, 0, W, H);

      ctx!.save();
      ctx!.translate(-camX, -camY);

      // --- Draw grid background ---
      ctx!.fillStyle = "#1a1a2e";
      ctx!.fillRect(0, 0, gw * TILE_SIZE, gh * TILE_SIZE);

      // Grid lines
      ctx!.strokeStyle = "#2a2a4e";
      ctx!.lineWidth = 0.5;
      for (let x = 0; x <= gw; x++) {
        ctx!.beginPath();
        ctx!.moveTo(x * TILE_SIZE, 0);
        ctx!.lineTo(x * TILE_SIZE, gh * TILE_SIZE);
        ctx!.stroke();
      }
      for (let y = 0; y <= gh; y++) {
        ctx!.beginPath();
        ctx!.moveTo(0, y * TILE_SIZE);
        ctx!.lineTo(gw * TILE_SIZE, y * TILE_SIZE);
        ctx!.stroke();
      }

      // --- Draw space elements ---
      for (const el of elements) {
        const ex = el.x * TILE_SIZE;
        const ey = el.y * TILE_SIZE;
        const ew = el.element.width * TILE_SIZE;
        const eh = el.element.height * TILE_SIZE;

        const img = getImage(el.element.imageUrl);
        if (img) {
          ctx!.drawImage(img, ex, ey, ew, eh);
        } else {
          // Fallback colored rectangle
          ctx!.fillStyle = el.element.static ? "#4a5568" : "#d97706";
          ctx!.fillRect(ex, ey, ew, eh);
          // Border
          ctx!.strokeStyle = el.element.static ? "#718096" : "#f59e0b";
          ctx!.lineWidth = 1;
          ctx!.strokeRect(ex + 0.5, ey + 0.5, ew - 1, eh - 1);
        }
      }

      // --- Draw other players ---
      others.forEach((pos, id) => {
        const px = pos.x * TILE_SIZE;
        const py = pos.y * TILE_SIZE;
        const color = hashColor(id);

        // Body
        ctx!.fillStyle = color;
        ctx!.fillRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);

        // Border
        ctx!.strokeStyle = "#fff";
        ctx!.lineWidth = 1;
        ctx!.strokeRect(px + 4, py + 4, TILE_SIZE - 8, TILE_SIZE - 8);

        // Label
        ctx!.fillStyle = "#fff";
        ctx!.font = "bold 8px monospace";
        ctx!.textAlign = "center";
        const label = id.length > 6 ? id.slice(0, 6) + ".." : id;
        ctx!.fillText(label, px + TILE_SIZE / 2, py - 2);
      });

      // --- Draw local player ---
      {
        const px = my.x * TILE_SIZE;
        const py = my.y * TILE_SIZE;

        // Glow effect
        ctx!.shadowColor = "#10b981";
        ctx!.shadowBlur = 10;

        // Body
        ctx!.fillStyle = "#10b981";
        ctx!.fillRect(px + 3, py + 3, TILE_SIZE - 6, TILE_SIZE - 6);

        ctx!.shadowBlur = 0;

        // Border
        ctx!.strokeStyle = "#6ee7b7";
        ctx!.lineWidth = 2;
        ctx!.strokeRect(px + 3, py + 3, TILE_SIZE - 6, TILE_SIZE - 6);

        // Label
        ctx!.fillStyle = "#6ee7b7";
        ctx!.font = "bold 10px monospace";
        ctx!.textAlign = "center";
        ctx!.fillText("YOU", px + TILE_SIZE / 2, py - 4);
      }

      // --- Draw border around the world ---
      ctx!.strokeStyle = "#06b6d4";
      ctx!.lineWidth = 2;
      ctx!.strokeRect(0, 0, gw * TILE_SIZE, gh * TILE_SIZE);

      ctx!.restore();

      animFrameRef.current = requestAnimationFrame(render);
    }

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      cancelAnimationFrame(animFrameRef.current);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="block h-screen w-screen"
      style={{ imageRendering: "pixelated" }}
    />
  );
}
