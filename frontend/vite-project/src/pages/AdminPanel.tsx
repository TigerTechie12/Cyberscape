import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";
import AdminElements from "../components/AdminElements";
import AdminAvatars from "../components/AdminAvatars";
import AdminMaps from "../components/AdminMaps";

type Tab = "elements" | "avatars" | "maps";

export default function AdminPanel() {
  const [tab, setTab] = useState<Tab>("elements");
  const navigate = useNavigate();
  const { logout } = useAuth();

  const tabs: { key: Tab; label: string }[] = [
    { key: "elements", label: "Elements" },
    { key: "avatars", label: "Avatars" },
    { key: "maps", label: "Maps" },
  ];

  return (
    <div className="min-h-screen">
      {/* Top bar */}
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <div className="flex items-center gap-4">
          <h1 className="text-2xl font-bold text-purple-400">
            CYBERSCAPE ADMIN
          </h1>
        </div>
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/dashboard")}
            className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-700"
          >
            Dashboard
          </button>
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

      {/* Tabs */}
      <div className="border-b border-gray-800">
        <div className="mx-auto flex max-w-6xl gap-1 px-6">
          {tabs.map((t) => (
            <button
              key={t.key}
              onClick={() => setTab(t.key)}
              className={`px-5 py-3 text-sm font-medium transition ${
                tab === t.key
                  ? "border-b-2 border-purple-500 text-purple-400"
                  : "text-gray-400 hover:text-gray-200"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>
      </div>

      {/* Tab content */}
      <main className="mx-auto max-w-6xl px-6 py-8">
        {tab === "elements" && <AdminElements />}
        {tab === "avatars" && <AdminAvatars />}
        {tab === "maps" && <AdminMaps />}
      </main>
    </div>
  );
}
