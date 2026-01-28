import { useEffect, useState } from "react";
import { getAvatars, adminCreateAvatar } from "../api";
import type { Avatar } from "../types";

export default function AdminAvatars() {
  const [avatars, setAvatars] = useState<Avatar[]>([]);
  const [loading, setLoading] = useState(true);

  // Create form
  const [imageUrl, setImageUrl] = useState("");
  const [name, setName] = useState("");
  const [creating, setCreating] = useState(false);

  async function fetchAvatars() {
    try {
      const data = await getAvatars();
      setAvatars(data);
    } catch {
      setAvatars([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchAvatars();
  }, []);

  async function handleCreate(e: React.FormEvent) {
    e.preventDefault();
    setCreating(true);
    try {
      await adminCreateAvatar(imageUrl, name);
      setImageUrl("");
      setName("");
      fetchAvatars();
    } catch {
      alert("Failed to create avatar.");
    } finally {
      setCreating(false);
    }
  }

  return (
    <div className="space-y-6">
      {/* Create form */}
      <div className="rounded-xl border border-gray-700 bg-gray-900 p-6">
        <h3 className="mb-4 text-lg font-semibold text-white">
          Create Avatar
        </h3>
        <form onSubmit={handleCreate} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-300">Name</label>
            <input
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="Avatar name"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-300">Image URL</label>
            <input
              required
              value={imageUrl}
              onChange={(e) => setImageUrl(e.target.value)}
              className="mt-1 w-full rounded-lg border border-gray-700 bg-gray-800 px-4 py-2 text-white focus:border-cyan-500 focus:outline-none"
              placeholder="https://example.com/avatar.png"
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="rounded-lg bg-purple-600 px-6 py-2 font-semibold text-white transition hover:bg-purple-500 disabled:opacity-50"
          >
            {creating ? "Creating..." : "Create Avatar"}
          </button>
        </form>
      </div>

      {/* Avatar list */}
      <div>
        <h3 className="mb-3 text-lg font-semibold text-white">
          Existing Avatars
        </h3>
        {loading ? (
          <p className="text-gray-400">Loading...</p>
        ) : avatars.length === 0 ? (
          <p className="text-gray-500">No avatars yet.</p>
        ) : (
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-4">
            {avatars.map((avatar) => (
              <div
                key={avatar.id}
                className="rounded-lg border border-gray-700 bg-gray-900 p-4 text-center"
              >
                <div className="mx-auto mb-2 flex h-16 w-16 items-center justify-center overflow-hidden rounded-full bg-gray-800">
                  {avatar.imageUrl ? (
                    <img
                      src={avatar.imageUrl}
                      alt={avatar.name || "avatar"}
                      className="h-full w-full object-cover"
                      onError={(e) => {
                        (e.target as HTMLImageElement).style.display = "none";
                      }}
                    />
                  ) : (
                    <span className="text-2xl text-gray-600">?</span>
                  )}
                </div>
                <p className="font-medium text-white">
                  {avatar.name || "Unnamed"}
                </p>
                <p className="truncate text-xs text-gray-500">{avatar.id}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
