import { useEffect, useState } from "react"
import { getElements, addSpaceElement, deleteSpaceElement } from "../api"
import type { Element, SpaceElement } from "../types"

interface Props {
  spaceId: string
  spaceElements: SpaceElement[]
  onChanged: () => void
  onClose: () => void
  selectedElement: Element | null
  onSelectElement: (el: Element | null) => void
}

export default function SpaceElementPanel({
  spaceId,
  spaceElements,
  onChanged,
  onClose,
  selectedElement,
  onSelectElement,
}: Props) {
  const [elements, setElements] = useState<Element[]>([])
  const [loading, setLoading] = useState(true)

  // manual placement fallback
  const [manualMode, setManualMode] = useState(false)
  const [manualX, setManualX] = useState(0)
  const [manualY, setManualY] = useState(0)
  const [adding, setAdding] = useState(false)

  useEffect(() => {
    getElements()
      .then(setElements)
      .catch(() => setElements([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleManualPlace(e: React.FormEvent) {
    e.preventDefault()
    if (!selectedElement) return
    setAdding(true)
    try {
      await addSpaceElement(selectedElement.id, spaceId, manualX, manualY)
      onChanged()
      onSelectElement(null)
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
      {/* Header */}
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

      {/* Element Browser */}
      <div className="mb-4 border-b border-gray-700 pb-4">
        <p className="mb-2 text-xs font-medium text-gray-400">Select Element to Place</p>
        {loading ? (
          <p className="text-xs text-gray-500">Loading elements...</p>
        ) : elements.length === 0 ? (
          <p className="text-xs text-gray-500">No elements available.</p>
        ) : (
          <div className="grid grid-cols-3 gap-2">
            {elements.map((el) => {
              const isSelected = selectedElement?.id === el.id
              return (
                <button
                  key={el.id}
                  type="button"
                  onClick={() => onSelectElement(isSelected ? null : el)}
                  className={`flex flex-col items-center gap-1 rounded-lg border p-2 transition ${
                    isSelected
                      ? "border-cyan-500 bg-cyan-900/30 ring-1 ring-cyan-500/50"
                      : "border-gray-700 bg-gray-800 hover:border-gray-500"
                  }`}
                >
                  <div className="relative flex h-12 w-12 items-center justify-center overflow-hidden rounded bg-gray-700">
                    <img
                      src={el.imageUrl}
                      alt=""
                      className="h-full w-full object-contain"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none"
                      }}
                    />
                  </div>
                  <span className="text-[10px] text-gray-400">
                    {el.width}x{el.height}
                  </span>
                  {el.static && (
                    <span className="rounded bg-yellow-900/40 px-1 text-[9px] text-yellow-400">
                      static
                    </span>
                  )}
                </button>
              )
            })}
          </div>
        )}

        {/* Selection feedback */}
        {selectedElement && (
          <div className="mt-3 rounded-lg border border-cyan-800 bg-cyan-900/20 p-2">
            <div className="flex items-center gap-2">
              <div className="flex h-8 w-8 items-center justify-center overflow-hidden rounded bg-gray-700">
                <img
                  src={selectedElement.imageUrl}
                  alt=""
                  className="h-full w-full object-contain"
                />
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-xs text-cyan-300">
                  {selectedElement.width}x{selectedElement.height}
                  {selectedElement.static ? " (static)" : ""}
                </p>
                <p className="text-[10px] text-cyan-400/70">
                  Click on canvas to place &middot; ESC to cancel
                </p>
              </div>
            </div>

            {/* Manual fallback toggle */}
            <button
              type="button"
              onClick={() => setManualMode(!manualMode)}
              className="mt-2 text-[10px] text-gray-500 underline hover:text-gray-400"
            >
              {manualMode ? "Hide manual entry" : "Enter coordinates manually"}
            </button>

            {manualMode && (
              <form onSubmit={handleManualPlace} className="mt-2 flex items-end gap-2">
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500">X</label>
                  <input
                    type="number"
                    value={manualX}
                    onChange={(e) => setManualX(Number(e.target.value))}
                    min={0}
                    className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-1 text-xs text-white focus:outline-none"
                  />
                </div>
                <div className="flex-1">
                  <label className="block text-[10px] text-gray-500">Y</label>
                  <input
                    type="number"
                    value={manualY}
                    onChange={(e) => setManualY(Number(e.target.value))}
                    min={0}
                    className="w-full rounded border border-gray-600 bg-gray-800 px-2 py-1 text-xs text-white focus:outline-none"
                  />
                </div>
                <button
                  type="submit"
                  disabled={adding}
                  className="rounded bg-cyan-600 px-3 py-1 text-xs font-medium text-white hover:bg-cyan-500 disabled:opacity-50"
                >
                  {adding ? "..." : "Place"}
                </button>
              </form>
            )}
          </div>
        )}
      </div>

      {/* Placed Elements */}
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
                className="flex items-center gap-2 rounded border border-gray-700 bg-gray-800 px-2 py-1"
              >
                <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center overflow-hidden rounded bg-gray-700">
                  <img
                    src={se.element.imageUrl}
                    alt=""
                    className="h-full w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none"
                    }}
                  />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-xs text-gray-300">
                    {se.element.width}x{se.element.height}
                    {se.element.static ? " static" : ""}
                  </p>
                  <p className="text-[10px] text-gray-500">
                    ({se.x}, {se.y})
                  </p>
                </div>
                <button
                  onClick={() => handleDelete(se.id)}
                  className="flex-shrink-0 rounded p-1 text-red-400 hover:bg-red-900/30"
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
