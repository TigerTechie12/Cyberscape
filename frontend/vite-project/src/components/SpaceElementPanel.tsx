import { useEffect, useState } from "react"
import { getElements, addSpaceElement, deleteSpaceElement } from "../api"
import type { Element, SpaceElement } from "../types"

interface Props {
  spaceId: string
  spaceElements: SpaceElement[]
  onChanged: () => void
  onClose: () => void
}

export default function SpaceElementPanel({
  spaceId,
  spaceElements,
  onChanged,
  onClose,
}: Props) {
  const [elements, setElements] = useState<Element[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedElementId, setSelectedElementId] = useState("")
  const [x, setX] = useState(0)
  const [y, setY] = useState(0)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    getElements()
      .then(setElements)
      .catch(() => setElements([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedElementId) return
    setAdding(true)
    try {
      await addSpaceElement(selectedElementId, spaceId, x, y)
      onChanged()
    } catch {
      alert("Failed to add element.")
    } finally {
      setAdding(false)
    }
  }

  async function handleDelete(spaceElementId: string) {
    try {
      await deleteSpaceElement(spaceElementId)
      onChanged()
    } catch {
      alert("Failed to delete element.")
    }
  }

  return (
    <div className="pointer-events-auto absolute right-4 top-16 z-10 w-80 max-h-[calc(100vh-5rem)] overflow-y-auto rounded-xl border border-gray-700 bg-gray-900/95 p-4 backdrop-blur">
      <div className="mb-3 flex items-center justify-between">
        <h3 className="text-sm font-semibold text-white">Space Elements</h3>
        <button
          onClick={onClose}
          className="rounded p-1 text-gray-400 hover:bg-gray-800 hover:text-white"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>

      <form onSubmit={handleAdd} className="mb-4 space-y-2 border-b border-gray-700 pb-4">
        <p className="text-xs font-medium text-gray-400">Add Element</p>
        {loading ? (
          <p className="text-xs text-gray-500">Loading elements...</p>
        ) : elements.length === 0 ? (
          <p className="text-xs text-gray-500">No elements available.</p>
        ) : (
          <select
            value={selectedElementId}
            onChange={(e) => setSelectedElementId(e.target.value)}
            className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-white focus:outline-none"
          >
            <option value="">Select element...</option>
            {elements.map((el) => (
              <option key={el.id} value={el.id}>
                {el.id.slice(0, 8)}... ({el.width}x{el.height}{el.static ? " static" : ""})
              </option>
            ))}
          </select>
        )}
        <div className="flex gap-2">
          <input
            type="number"
            value={x}
            onChange={(e) => setX(Number(e.target.value))}
            min={0}
            placeholder="X"
            className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-white focus:outline-none"
          />
          <input
            type="number"
            value={y}
            onChange={(e) => setY(Number(e.target.value))}
            min={0}
            placeholder="Y"
            className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-white focus:outline-none"
          />
        </div>
        <button
          type="submit"
          disabled={adding || !selectedElementId}
          className="w-full rounded bg-cyan-600 px-3 py-1 text-sm font-medium text-white transition hover:bg-cyan-500 disabled:opacity-50"
        >
          {adding ? "Adding..." : "Add Element"}
        </button>
      </form>

      <div>
        <p className="mb-2 text-xs font-medium text-gray-400">
          Placed Elements ({spaceElements.length})
        </p>
        {spaceElements.length === 0 ? (
          <p className="text-xs text-gray-500">No elements in this space.</p>
        ) : (
          <div className="space-y-1">
            {spaceElements.map((se) => (
              <div
                key={se.id}
                className="flex items-center justify-between rounded border border-gray-700 bg-gray-800 px-2 py-1"
              >
                <div className="min-w-0 flex-1">
                  <p className="truncate text-xs text-white">
                    {se.element.id.slice(0, 8)}...
                  </p>
                  <p className="text-xs text-gray-400">
                    ({se.x}, {se.y}) {se.element.width}x{se.element.height}
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(se.id)}
                  className="ml-2 rounded p-1 text-red-400 hover:bg-red-900/30"
                >
                  <svg className="h-3 w-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}
