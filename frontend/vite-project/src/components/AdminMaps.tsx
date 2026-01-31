import { useEffect, useState } from "react"
import { adminCreateMap, getMaps } from "../api"
import type { MapItem } from "../types"

interface DefaultElement {
  elementId: string
  x: number
  y: number
}

export default function AdminMaps() {
  const [maps, setMaps] = useState<MapItem[]>([])
  const [loading, setLoading] = useState(true)

  const [name, setName] = useState("")
  const [thumbnail, setThumbnail] = useState("")
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(20)
  const [elements, setElements] = useState<DefaultElement[]>([])
  const [creating, setCreating] = useState(false)
  const [lastMapId, setLastMapId] = useState<string | null>(null)

  async function fetchMaps() {
    try {
      const data = await getMaps()
      setMaps(data)
    } catch {
      setMaps([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchMaps()
  }, [])

  function addElement() {
    setElements([...elements, { elementId: "", x: 0, y: 0 }])
  }

  function removeElement(index: number) {
    setElements(elements.filter((_, i) => i !== index))
  }

  function updateElement(
    index: number,
    field: keyof DefaultElement,
    value: string | number
  ) {
    setElements(
      elements.map((el, i) => (i === index ? { ...el, [field]: value } : el))
    )
  }

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault()
    setCreating(true)
    setLastMapId(null)
    try {
      const dimensions = `${height}x${width}`
      const result = await adminCreateMap(
        thumbnail,
        dimensions,
        name,
        elements.filter((el) => el.elementId.trim() !== "")
      )
      setLastMapId(result.mapId)
      setName("")
      setThumbnail("")
      setWidth(20)
      setHeight(20)
      setElements([])
      fetchMaps()
    } catch {
      alert("Failed to create map.")
    } finally {
      setCreating(false)
    }
  }

  return (
    <div className="space-y-6">
      <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">Create Map</h3>

        <form onSubmit={handleCreate} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300">Map Name</label>
              <input
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="My Map"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">
                Thumbnail URL
              </label>
              <input
                required
                value={thumbnail}
                onChange={(e) => setThumbnail(e.target.value)}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
                placeholder="https://example.com/thumb.png"
              />
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm text-gray-300">Width</label>
              <input
                type="number"
                required
                min={1}
                max={99999}
                value={width}
                onChange={(e) => setWidth(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-300">Height</label>
              <input
                type="number"
                required
                min={1}
                max={99999}
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <div className="mb-2 flex items-center justify-between">
              <label className="text-sm font-medium text-gray-300">
                Default Elements
              </label>
              <button
                type="button"
                onClick={addElement}
                className="rounded bg-gray-700 px-3 py-1 text-sm text-gray-300 transition hover:bg-gray-600"
              >
                + Add Element
              </button>
            </div>

            {elements.length === 0 ? (
              <p className="text-sm text-gray-500">
                No default elements. Click "Add Element" to start.
              </p>
            ) : (
              <div className="space-y-2">
                {elements.map((el, i) => (
                  <div
                    key={i}
                    className="flex items-center gap-2 rounded-lg border border-gray-700 bg-gray-800 p-2"
                  >
                    <input
                      placeholder="Element ID"
                      value={el.elementId}
                      onChange={(e) =>
                        updateElement(i, "elementId", e.target.value)
                      }
                      className="flex-1 rounded border border-gray-600 bg-gray-900 px-3 py-1 text-sm text-white focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="X"
                      value={el.x}
                      onChange={(e) =>
                        updateElement(i, "x", Number(e.target.value))
                      }
                      className="w-20 rounded border border-gray-600 bg-gray-900 px-3 py-1 text-sm text-white focus:outline-none"
                    />
                    <input
                      type="number"
                      placeholder="Y"
                      value={el.y}
                      onChange={(e) =>
                        updateElement(i, "y", Number(e.target.value))
                      }
                      className="w-20 rounded border border-gray-600 bg-gray-900 px-3 py-1 text-sm text-white focus:outline-none"
                    />
                    <button
                      type="button"
                      onClick={() => removeElement(i)}
                      className="rounded p-1 text-red-400 hover:bg-red-900/30"
                    >
                      <svg
                        className="h-4 w-4"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M6 18L18 6M6 6l12 12"
                        />
                      </svg>
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition hover:bg-purple-500 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Map"}
          </button>
        </form>

        {lastMapId && (
          <div className="mt-4 rounded-lg border border-green-800 bg-green-900/20 p-3 text-sm text-green-400">
            Map created! ID: <code className="text-green-300">{lastMapId}</code>
          </div>
        )}
      </div>

      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">
          Existing Maps
        </h3>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : maps.length === 0 ? (
          <p className="text-gray-500">No maps yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {maps.map((map) => (
              <div
                key={map.id}
                className="rounded-lg border border-gray-700 bg-gray-900 p-4"
              >
                <div className="mb-2 flex h-24 items-center justify-center rounded bg-gray-800">
                  {map.thumbnail ? (
                    <img
                      src={map.thumbnail}
                      alt={map.name}
                      className="max-h-full max-w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none"
                      }}
                    />
                  ) : (
                    <span className="text-2xl text-gray-600">?</span>
                  )}
                </div>
                <p className="font-medium text-white">{map.name}</p>
                <p className="text-sm text-gray-300">
                  {map.width}x{map.height}
                </p>
                <p className="text-xs text-gray-500">
                  {map.mapElements.length} element{map.mapElements.length !== 1 ? "s" : ""}
                </p>
                <p className="truncate text-xs text-gray-500">{map.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
