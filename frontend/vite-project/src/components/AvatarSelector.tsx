import { useEffect, useState } from "react"
import { getAvatars, updateMetadata } from "../api"
import type { Avatar } from "../types"

export default function AvatarSelector() {
  const [avatars, setAvatars] = useState<Avatar[]>([])
  const [loading, setLoading] = useState(true)
  const [selectedId, setSelectedId] = useState<string | null>(null)
  const [saving, setSaving] = useState(false)

  useEffect(() => {
    getAvatars()
      .then((data) => {
        setAvatars(data)
      })
      .catch(() => setAvatars([]))
      .finally(() => setLoading(false))
  }, [])

  async function handleSelect(avatarId: string) {
    setSelectedId(avatarId)
    setSaving(true)
    try {
      await updateMetadata(avatarId)
    } catch {
      alert("Failed to update avatar.")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-sm text-gray-400">Loading avatars...</p>
  }

  if (avatars.length === 0) {
    return <p className="text-sm text-gray-500">No avatars available yet.</p>
  }

  return (
    <div className="flex flex-wrap gap-3">
      {avatars.map((avatar) => (
        <button
          key={avatar.id}
          onClick={() => handleSelect(avatar.id)}
          disabled={saving}
          className={`flex flex-col items-center gap-1 rounded-lg border p-3 transition ${
            selectedId === avatar.id
              ? "border-cyan-500 bg-cyan-900/20"
              : "border-gray-700 bg-gray-800 hover:border-gray-600"
          } disabled:opacity-50`}
        >
          <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gray-700">
            {avatar.imageUrl ? (
              <img
                src={avatar.imageUrl}
                alt={avatar.name ?? "avatar"}
                className="h-full w-full rounded-full object-cover"
                onError={(e) => {
                  (e.target as HTMLImageElement).style.display = "none"
                }}
              />
            ) : (
              <span className="text-lg text-gray-400">?</span>
            )}
          </div>
          <span className="text-xs text-gray-300">
            {avatar.name ?? "Unnamed"}
          </span>
        </button>
      ))}
    </div>
  )
}
