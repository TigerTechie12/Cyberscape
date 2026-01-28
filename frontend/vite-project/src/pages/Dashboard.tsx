import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { getAllSpaces } from "../api";
import { useAuth } from "../AuthContext";
import type { SpaceListItem } from "../types";
import SpaceCard from "../components/SpaceCard";
import CreateSpaceModal from "../components/CreateSpaceModal";

export default function Dashboard() {
  const [spaces, setSpaces] = useState<SpaceListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const { logout, isAdmin } = useAuth();
  const navigate = useNavigate();

  async function fetchSpaces() {
    try {
      const data = await getAllSpaces();
      setSpaces(data);
    } catch {
      setSpaces([]);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    fetchSpaces();
  }, []);

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-cyan-400">CYBERSCAPE</h1>
        <div className="flex items-center gap-4">
          {isAdmin && (
            <button
              onClick={() => navigate("/admin")}
              className="rounded-lg bg-purple-600/20 px-4 py-2 text-sm text-purple-400 transition hover:bg-purple-600/30"
            >
              Admin Panel
            </button>
          )}
          <button
            onClick={() => {
              logout();
              navigate("/login");
            }}
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-700"
          >
            Logout
          </button>
        </div>
      </header>

      {/* Content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        <div className="mb-6 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-white">Your Spaces</h2>
          <button
            onClick={() => setShowModal(true)}
            className="rounded-lg bg-cyan-600 px-5 py-2 font-semibold text-white transition hover:bg-cyan-500"
          >
            + New Space
          </button>
        </div>

        {loading ? (
          <p className="text-gray-400">Loading spaces...</p>
        ) : spaces.length === 0 ? (
          <div className="flex flex-col items-center justify-center rounded-xl border border-dashed border-gray-700 py-20 text-gray-500">
            <p className="text-lg">No spaces yet</p>
            <p className="mt-1 text-sm">Create your first space to get started</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {spaces.map((space) => (
              <SpaceCard
                key={space.id}
                space={space}
                onDeleted={fetchSpaces}
              />
            ))}
          </div>
        )}
      </main>

      {showModal && (
        <CreateSpaceModal
          onClose={() => setShowModal(false)}
          onCreated={fetchSpaces}
        />
      )}
    </div>
  );
}
