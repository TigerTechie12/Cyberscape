import { useNavigate } from "react-router-dom"

export default function Instructions() {
  const navigate = useNavigate()

  return (
    <div className="min-h-screen text-gray-300">
      <header className="flex items-center justify-between border-b border-gray-800 px-6 py-4">
        <h1 className="text-2xl font-bold text-cyan-400">CYBERSCAPE</h1>
        <button
          onClick={() => navigate(-1)}
          className="rounded-lg bg-gray-800 px-4 py-2 text-sm text-gray-300 transition hover:bg-gray-700"
        >
          &larr; Back
        </button>
      </header>

      <main className="mx-auto max-w-3xl px-6 py-12 space-y-12">

        <div className="text-center">
          <h2 className="text-4xl font-bold text-cyan-400">How to Play</h2>
          <p className="mt-3 text-gray-400">
            Cyberscape is a real-time multiplayer virtual world. Create spaces,
            explore them, and hang out with others.
          </p>
        </div>

        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">Getting Started</h3>
          <ol className="list-decimal list-inside space-y-2 text-gray-400">
            <li>
              <span className="text-gray-200">Sign up</span> — Create an account as a{" "}
              <span className="text-cyan-400">User</span> or{" "}
              <span className="text-purple-400">Admin</span>.
            </li>
            <li>
              <span className="text-gray-200">Pick an avatar</span> — From your dashboard,
              choose an avatar to represent yourself in spaces.
            </li>
            <li>
              <span className="text-gray-200">Create a space</span> — Click{" "}
              <span className="text-cyan-400">+ New Space</span>, give it a name, set
              its dimensions (e.g. 20x20), or pick a preset map.
            </li>
            <li>
              <span className="text-gray-200">Enter the space</span> — Click on your space
              card to load it and join the live session.
            </li>
          </ol>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">Moving Around</h3>
          <p className="text-gray-400">
            Once inside a space you can move your character one tile at a time.
            Use either set of controls:
          </p>
          <div className="grid grid-cols-2 gap-4 text-center text-sm">
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-2">
              <p className="text-gray-400 font-medium">Arrow Keys</p>
              <div className="flex flex-col items-center gap-1">
                <kbd className="rounded bg-gray-700 px-3 py-1 text-white">&uarr;</kbd>
                <div className="flex gap-1">
                  <kbd className="rounded bg-gray-700 px-3 py-1 text-white">&larr;</kbd>
                  <kbd className="rounded bg-gray-700 px-3 py-1 text-white">&darr;</kbd>
                  <kbd className="rounded bg-gray-700 px-3 py-1 text-white">&rarr;</kbd>
                </div>
              </div>
            </div>
            <div className="rounded-lg border border-gray-700 bg-gray-800 p-4 space-y-2">
              <p className="text-gray-400 font-medium">WASD</p>
              <div className="flex flex-col items-center gap-1">
                <kbd className="rounded bg-gray-700 px-3 py-1 text-white">W</kbd>
                <div className="flex gap-1">
                  <kbd className="rounded bg-gray-700 px-3 py-1 text-white">A</kbd>
                  <kbd className="rounded bg-gray-700 px-3 py-1 text-white">S</kbd>
                  <kbd className="rounded bg-gray-700 px-3 py-1 text-white">D</kbd>
                </div>
              </div>
            </div>
          </div>
          <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
            <li>Movement is one tile per key press — no diagonal movement.</li>
            <li>You cannot move outside the space boundaries.</li>
            <li>Your current coordinates are shown in the top-right HUD.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">Multiplayer</h3>
          <p className="text-gray-400">
            Spaces are live — anyone who enters the same space appears on your screen in real-time.
          </p>
          <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
            <li>You spawn at a random position when you join.</li>
            <li>Other players' movements are synced instantly via WebSocket.</li>
            <li>The top-right HUD shows how many other players are currently in the space.</li>
            <li>When a player leaves, their avatar disappears from the map.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-gray-800 bg-gray-900 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-white">Placing Elements</h3>
          <p className="text-gray-400">
            Decorate your space by placing elements (objects / images) onto the grid.
          </p>
          <ol className="list-decimal list-inside space-y-2 text-gray-400 text-sm">
            <li>Click the <span className="text-cyan-400">Elements</span> button in the top-right corner.</li>
            <li>Pick an element from the side panel.</li>
            <li>Click any tile on the grid to place it there.</li>
            <li>
              Press{" "}
              <kbd className="rounded bg-gray-700 px-2 py-0.5 text-white text-xs">ESC</kbd>
              {" "}to cancel placement at any time.
            </li>
            <li>Existing elements can also be removed from the same panel.</li>
          </ol>
        </section>

        <section className="rounded-xl border border-cyan-900/40 bg-cyan-950/20 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-cyan-400">User</h3>
          <p className="text-gray-400 text-sm">Standard players can:</p>
          <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
            <li>Create, view, and delete their own spaces.</li>
            <li>Enter any of their spaces and move around in real-time.</li>
            <li>Choose and update their avatar from the dashboard.</li>
            <li>Place and remove elements inside their spaces.</li>
            <li>See other users who are present in the same space.</li>
          </ul>
        </section>

        <section className="rounded-xl border border-purple-900/40 bg-purple-950/20 p-6 space-y-4">
          <h3 className="text-xl font-semibold text-purple-400">Admin</h3>
          <p className="text-gray-400 text-sm">
            Admins manage the global content that all users can use. From the Admin Panel:
          </p>
          <div className="space-y-4">
            <div>
              <p className="text-sm font-medium text-purple-300 mb-1">Elements</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                <li>Create new elements with an image URL, width, height, and static flag.</li>
                <li>Update the image of any existing element.</li>
                <li>All elements appear in every user's element picker inside spaces.</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-purple-300 mb-1">Avatars</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                <li>Create avatars with an image URL and a display name.</li>
                <li>All avatars appear in the avatar selector on every user's dashboard.</li>
              </ul>
            </div>
            <div>
              <p className="text-sm font-medium text-purple-300 mb-1">Maps</p>
              <ul className="list-disc list-inside text-gray-400 space-y-1 text-sm">
                <li>Create preset maps with a name, dimensions, thumbnail, and default elements.</li>
                <li>When a user creates a space from a preset map, it is auto-populated with those elements.</li>
              </ul>
            </div>
          </div>
        </section>

        <div className="text-center">
          <button
            onClick={() => navigate("/login")}
            className="rounded-lg bg-cyan-600 px-8 py-3 font-semibold text-white transition hover:bg-cyan-500"
          >
            Start Playing
          </button>
        </div>

      </main>
    </div>
  )
}