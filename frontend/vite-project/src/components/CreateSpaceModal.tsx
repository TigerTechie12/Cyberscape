import { useEffect, useState } from "react"
import { createSpace, getMaps } from "../api"
import type { MapItem } from "../types"

interface Props {
  onClose: () => void
  onCreated: () => void
}

export default function CreateSpaceModal({ onClose, onCreated }: Props) {
  const [name, setName] = useState("")
  const [width, setWidth] = useState(20)
  const [height, setHeight] = useState(20)
  const [mapId, setMapId] = useState("")
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [maps, setMaps] = useState<MapItem[]>([])
  const [mapsLoading, setMapsLoading] = useState(true)

  useEffect(() => {
    getMaps()
      .then(setMaps)
      .catch(() => setMaps([]))
      .finally(() => setMapsLoading(false))
  }, [])

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError("")
    setLoading(true)
    try {
      const dimensions = `${height}x${width}`
      await createSpace(name, dimensions, mapId || undefined)
      onCreated()
      onClose()
    } catch {
      setError("Failed to create space.")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
      <div className="w-full max-w-md max-h-[90vh] overflow-y-auto rounded-xl border border-gray-700 bg-gray-900 p-6">
        <h2 className="mb-4 text-xl font-bold text-white">Create New Space</h2>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Space Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="My Space"
            />
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
            <label className="block text-sm text-gray-300 mb-2">
              Map Template (optional)
            </label>
            {mapsLoading ? (
              <p className="text-sm text-gray-500">Loading maps...</p>
            ) : maps.length === 0 ? (
              <p className="text-sm text-gray-500">No maps available. Create one from the Admin Panel.</p>
            ) : (
              <div className="grid grid-cols-3 gap-2">
                {maps.map((m) => (
                  <button
                    key={m.id}
                    type="button"
                    onClick={() => setMapId(mapId === m.id ? "" : m.id)}
                    className={`flex flex-col items-center gap-1 rounded-lg border p-2 transition ${
                      mapId === m.id
                        ? "border-cyan-500 bg-cyan-900/20"
                        : "border-gray-700 bg-gray-800 hover:border-gray-600"
                    }`}
                  >
                    {m.thumbnail ? (
                      <img
                        src={m.thumbnail}
                        alt={m.name}
                        className="h-12 w-12 rounded object-cover"
                        onError={(e) => {
                          (e.target as HTMLImageElement).style.display = "none"
                        }}
                      />
                    ) : (
                      <div className="flex h-12 w-12 items-center justify-center rounded bg-gray-700 text-xs text-gray-400">
                        {m.width}x{m.height}
                      </div>
                    )}
                    <span className="text-xs text-gray-300 truncate w-full text-center">
                      {m.name}
                    </span>
                  </button>
                ))}
              </div>
            )}
            {mapId && (
              <p className="mt-1 text-xs text-cyan-400">
                Selected: {maps.find((m) => m.id === mapId)?.name ?? mapId}
              </p>
            )}
          </div>

          {error && <p className="text-sm text-red-400">{error}</p>}

          <div className="flex justify-end gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-lg px-4 py-2 text-gray-400 transition hover:bg-gray-800"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="rounded-lg bg-cyan-600 px-6 py-2 font-semibold text-white transition hover:bg-cyan-500 disabled:opacity-50"
            >
              {loading ? "Creating..." : "Create"}
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
