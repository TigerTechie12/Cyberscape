# Cyberscape

A real-time multiplayer collaborative grid world where users create virtual spaces, place elements, and explore them together with avatar-based presence.

## The Idea

Cyberscape lets you build and inhabit 2D grid-based worlds with other people in real time. You pick an avatar, create a space (or start from a pre-built map template), furnish it with elements, and then share it — anyone who joins sees every other player moving around the grid live. Think of it as a lightweight collaborative metaverse: part world-builder, part multiplayer hangout.

Admins manage the content library (avatars, elements, map templates) that all users draw from when building their spaces.

## Features

- **Authentication** — JWT-based signup/signin with bcrypt-hashed passwords
- **Avatar selection** — choose from an admin-curated avatar library
- **Space creation** — create empty grids or start from a map template with preset element layouts
- **Element placement** — browse the element library, preview placement on the grid (green = valid, red = invalid), and click to place or remove
- **Real-time multiplayer** — join any space and see other users' avatars move live; WASD / arrow-key movement validated server-side
- **Admin panel** — manage elements (with dimensions and static/dynamic flags), avatars, and map templates

## Tech Stack

### Frontend
| Technology | Role |
|---|---|
| React 19 + TypeScript | UI framework |
| Vite | Build tool & dev server |
| React Router v7 | Client-side routing |
| Tailwind CSS v4 | Styling |
| Canvas API | Grid rendering (32 px tiles) |
| WebSocket (native) | Real-time multiplayer |
| Axios | REST API client |

### Backend — HTTP API
| Technology | Role |
|---|---|
| Node.js + Express 5 | REST API server |
| TypeScript | Language |
| JWT (`jsonwebtoken`) | Authentication tokens |
| bcrypt | Password hashing |
| Zod | Request validation |

### Backend — WebSocket Server
| Technology | Role |
|---|---|
| Node.js + `ws` | WebSocket server |
| TypeScript | Language |
| JWT | Token verification on connect |

### Data
| Technology | Role |
|---|---|
| PostgreSQL (Neon) | Primary database |
| Prisma v7 | ORM + migrations |

### Monorepo Packages
| Package | Contents |
|---|---|
| `@repo/db` | Prisma client + generated types |
| `common` | Shared Zod validation schemas |

## Project Structure

```
cyberscape/
├── backend/
│   ├── http/          # REST API (Express, port 3000)
│   └── websocket/     # WebSocket server (ws, port 3001)
├── frontend/
│   └── vite-project/  # React SPA
└── packages/
    ├── common/        # Shared Zod schemas
    └── db/            # Prisma schema & client
```

## Database Models

- **User** — credentials, role (User / Admin), avatar
- **Avatar** — name, image URL
- **Element** — image, dimensions, static flag
- **Space** — name, grid dimensions, owner
- **spaceElements** — element placements within a space (x, y)
- **Maps** — reusable map templates
- **mapElements** — default element placements for a template

## WebSocket Protocol

| Direction | Message | Payload |
|---|---|---|
| Client → Server | `join` | `{ spaceId, token }` |
| Client → Server | `move` | `{ x, y }` |
| Server → Client | `space-joined` | spawn coordinates + current players |
| Server → Client | `user-joined` | new user's position |
| Server → Client | `movement` | updated position |
| Server → Client | `movement-rejected` | original position (out-of-bounds or collision) |
| Server → Client | `user-left` | userId |

## Environment Variables

Create `.env` files in the relevant packages before running locally:

**`backend/http/.env`**
```
DATABASE_URL=...
JWT_SECRET=...
```

**`packages/db/.env`**
```
DATABASE_URL=...
```

## Getting Started

```bash
# Install all dependencies (from repo root)
npm install

# Run database migrations
cd packages/db && npx prisma migrate dev

# Start HTTP API
cd backend/http && npm run dev

# Start WebSocket server
cd backend/websocket && npm run dev

# Start frontend
cd frontend/vite-project && npm run dev
```

## Deployment

| Service | Platform |
|---|---|
| Frontend | Vercel (SPA rewrites via `vercel.json`) |
| HTTP API | Render |
| WebSocket | Render |
| Database | Neon (serverless PostgreSQL) |
