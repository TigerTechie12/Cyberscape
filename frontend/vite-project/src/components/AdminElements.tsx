import { useEffect, useState } from "react";
import { getElements, adminCreateElement, adminUpdateElement } from "../api";
import type { Element } from "../types";

export default function AdminElements() {
  const [elements, setElements] = useState<Element[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [imageUrl, setImageUrl] = useState("");
  const [width, setWidth] = useState(1);
  const [height, setHeight] = useState(1);
  const [isStatic, setIsStatic] = useState(false);
  const [creating, setCreating] = useState(false);

  // Inline update state
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editUrl, setEditUrl] = useState("");

  async function fetchElements() {
    try {
      const data = await getElements();
      setElements(data);
    } catch {
      setElements([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchElements();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      await adminCreateElement(imageUrl, width, height, isStatic);
      setImageUrl("");
      setWidth(1);
      setHeight(1);
      setIsStatic(false);
      fetchElements();
    } catch {
      alert("Failed to create element.");
    } finally {
      setCreating(false);
    }
  }

  async function handleUpdate(elementId: string) {
    try {
      await adminUpdateElement(elementId, editUrl);
      setEditingId(null);
      setEditUrl("");
      fetchElements();
    } catch {
      alert("Failed to update element.");
    }
  }

  return (
    <div className="space-y-6">
      {/* Create form */}
      <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Create Element
        </h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Image URL</label>
            <input
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="https://example.com/element.png"
            />
          </div>
          <div className="grid grid-cols-3 gap-4">
            <div>
              <label className="block text-sm text-gray-300">Width</label>
              <input
                type="number"
                required
                min={1}
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
                value={height}
                onChange={(e) => setHeight(Number(e.target.value))}
                className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              />
            </div>
            <div className="flex items-end">
              <label className="flex items-center gap-2 text-sm text-gray-300">
                <input
                  type="checkbox"
                  checked={isStatic}
                  onChange={(e) => setIsStatic(e.target.checked)}
                  className="h-4 w-4 rounded border-gray-600 bg-gray-800"
                />
                Static
              </label>
            </div>
          </div>
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition hover:bg-purple-500 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Element"}
          </button>
        </form>
      </div>

      {/* Element list */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">
          Existing Elements
        </h3>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : elements.length === 0 ? (
          <p className="text-gray-500">No elements yet.</p>
        ) : (
          <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {elements.map((el) => (
              <div
                key={el.id}
                className="rounded-lg border border-gray-700 bg-gray-900 p-4"
              >
                <div className="mb-2 flex h-20 items-center justify-center rounded bg-gray-800">
                  <img
                    src={el.imageUrl}
                    alt="element"
                    className="max-h-full max-w-full object-contain"
                    onError={(e) => {
                      (e.target as HTMLImageElement).style.display = "none";
                    }}
                  />
                </div>
                <p className="text-sm text-gray-300">
                  {el.width}x{el.height}{" "}
                  <span
                    className={
                      el.static ? "text-blue-400" : "text-amber-400"
                    }
                  >
                    {el.static ? "Static" : "Dynamic"}
                  </span>
                </p>
                <p className="truncate text-xs text-gray-500">{el.id}</p>

                {editingId === el.id ? (
                  <div className="mt-2 flex gap-2">
                    <input
                      value={editUrl}
                      onChange={(e) => setEditUrl(e.target.value)}
                      className="flex-1 rounded border border-gray-600 bg-gray-800 px-2 py-1 text-sm text-white focus:outline-none"
                      placeholder="New image URL"
                    />
                    <button
                      onClick={() => handleUpdate(el.id)}
                      className="rounded bg-green-600 px-3 py-1 text-sm text-white"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="rounded bg-gray-700 px-3 py-1 text-sm text-gray-300"
                    >
                      Cancel
                    </button>
                  </div>
                ) : (
                  <button
                    onClick={() => {
                      setEditingId(el.id);
                      setEditUrl(el.imageUrl);
                    }}
                    className="mt-2 text-sm text-cyan-400 hover:underline"
                  >
                    Update Image
                  </button>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
