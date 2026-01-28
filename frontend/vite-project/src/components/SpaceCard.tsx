import { useNavigate } from "react-router-dom";
import { deleteSpace } from "../api";
import type { SpaceListItem } from "../types";

interface Props {
  space: SpaceListItem;
  onDeleted: () => void;
}

export default function SpaceCard({ space, onDeleted }: Props) {
  const navigate = useNavigate();

  async function handleDelete(e: React.MouseEvent) {
    e.stopPropagation();
    if (!confirm(`Delete space "${space.name}"?`)) return;
    try {
      await deleteSpace(space.id);
      onDeleted();
    } catch {
      alert("Failed to delete space.");
    }
  }

  return (
    <div
      onClick={() => navigate(`/space/${space.id}`)}
      className="group cursor-pointer rounded-xl border border-gray-800 bg-gray-900 p-4 transition hover:border-cyan-700 hover:bg-gray-800"
    >
      <div className="mb-3 flex h-32 items-center justify-center rounded-lg bg-gray-800 text-gray-600">
        {space.thumbnail ? (
          <img
            src={space.thumbnail}
            alt={space.name}
            className="h-full w-full rounded-lg object-cover"
          />
        ) : (
          <svg
            className="h-12 w-12"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M3.75 6A2.25 2.25 0 016 3.75h2.25A2.25 2.25 0 0110.5 6v2.25a2.25 2.25 0 01-2.25 2.25H6a2.25 2.25 0 01-2.25-2.25V6zM3.75 15.75A2.25 2.25 0 016 13.5h2.25a2.25 2.25 0 012.25 2.25V18a2.25 2.25 0 01-2.25 2.25H6A2.25 2.25 0 013.75 18v-2.25zM13.5 6a2.25 2.25 0 012.25-2.25H18A2.25 2.25 0 0120.25 6v2.25A2.25 2.25 0 0118 10.5h-2.25a2.25 2.25 0 01-2.25-2.25V6zM13.5 15.75a2.25 2.25 0 012.25-2.25H18a2.25 2.25 0 012.25 2.25V18A2.25 2.25 0 0118 20.25h-2.25A2.25 2.25 0 0113.5 18v-2.25z"
            />
          </svg>
        )}
      </div>

      <div className="flex items-center justify-between">
        <div>
          <h3 className="font-semibold text-white">{space.name}</h3>
          <p className="text-sm text-gray-400">
            {space.width} x {space.height}
          </p>
        </div>
        <button
          onClick={handleDelete}
          className="rounded-lg p-2 text-gray-500 opacity-0 transition hover:bg-red-900/50 hover:text-red-400 group-hover:opacity-100"
        >
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={1.5}
              d="M14.74 9l-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 01-2.244 2.077H8.084a2.25 2.25 0 01-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 00-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 013.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 00-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 00-7.5 0"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
