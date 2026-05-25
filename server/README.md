# Clubify Server

Node.js + Express backend for the Clubify university student activities app.

## Setup

```bash
cd server
npm install
node server.js
```

Copy the example env and fill in your credentials:

```bash
cp .env.example .env
```

Edit `.env` with your Supabase URL and service role key, then restart.

## Development (auto-reload)

```bash
npm run dev
```

## API Base URL

```
http://localhost:5000/api
```

## Endpoints

| Prefix | Description |
|---|---|
| `/api/auth` | register, login, logout, refresh, me |
| `/api/clubs` | club discovery and management |
| `/api/volunteer` | volunteer activities |
| `/api/applications` | club and volunteer applications |
| `/api/notifications` | user notifications |
| `/api/users` | profiles, favorites, preferences |
| `/api/admin` | super admin operations |
| `/api/upload` | file uploads (logo, cover, avatar) |
| `/api/feed` | activity feed |

## Architecture

```
server/
  src/
    config/      supabase, cors, multer, mailer, env
    middleware/  auth, requireRole, validate, errorHandler, notFound
    routes/      Express routers (one file per domain)
    controllers/ request/response handlers
    services/    business logic — replace TODO stubs with Supabase queries
    validators/  express-validator rule sets
    utils/       jwt helpers, response helpers, mock data
    uploads/     file upload destination (contents gitignored)
  app.js         Express app wiring
  server.js      entry point
```

## Notes

- All services return mock data. Replace each `// TODO: replace with Supabase query` comment with a real Supabase call when wiring up the database.
- `SUPABASE_SERVICE_ROLE_KEY` is a server-side secret — never expose it to the frontend.
- Refresh tokens are stored in httpOnly cookies; access tokens are returned in the response body and stored client-side.
