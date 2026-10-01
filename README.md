# Saman Azizi Siyan — engineering portfolio

A production-oriented monorepo for a full stack engineering portfolio. The visitor experience is one page: a concise introduction, complete expandable career timeline, selected work with direct product links, engineering approach, and contact form. The CV has a separate document view and PDF download.

## Architecture

```text
frontend/       Next.js 16, React 19, TypeScript, Tailwind CSS 4
backend/        Laravel 12, PHP 8.2, REST API, SQLite
packages/content/  reviewed seed and read-only frontend fallback
docs/           audit, architecture, decisions, evidence
infrastructure/ Dockerfiles and Nginx API configuration
.github/        independent frontend/backend CI jobs
```

The Laravel API stores structured projects, technologies, evidence links, experiences and products in relational tables. It also validates, throttles and persists contact submissions. Next.js renders the public site on the server and calls the API when configured. The shared reviewed snapshot keeps the site readable during backend outages and seeds a new database; API data takes precedence at runtime. There is no public admin or authentication surface. [Architecture](docs/architecture.md) and [API contract](docs/api.md) describe the boundaries.

## Requirements

- Node.js 22, npm, PHP 8.2+, Composer 2, and PHP SQLite/mbstring extensions for local development; or Docker Compose.
- A generated Laravel `APP_KEY` for any running API.

## Quick start with Docker Compose

1. Copy `.env.example` to `.env` in the repository root.
2. Generate a key with `php -r "echo 'base64:'.base64_encode(random_bytes(32));"` and put the result in `APP_KEY=`. Use a unique key and keep `.env` private.
3. Run `docker compose up --build -d`.
4. Open `http://localhost:3000`. The API health endpoint is `http://localhost:8080/up`, and the project index API is `http://localhost:8080/api/v1/projects`.

Compose builds Next.js, PHP-FPM and Nginx. It migrates and seeds a named SQLite volume on startup. The published ports bind to loopback for local development. `docker compose down` stops services without deleting the database volume. Docker Desktop or another working Docker engine is required.

## Native local development

Run these from the repository root after installing dependencies:

```bash
composer --working-dir=backend install
npm ci
npm --prefix frontend ci
```

Copy `backend/.env.example` to `backend/.env`, then run `php backend/artisan key:generate`. Copy `frontend/.env.local.example` to `frontend/.env.local`. Ensure `backend/database/database.sqlite` exists (Laravel's scaffold creates it; otherwise create an empty file). Then:

```bash
php backend/artisan migrate --seed
npm run dev
```

The frontend is at `http://localhost:3000` and the Laravel API at `http://127.0.0.1:8000`. The frontend's server-side `PORTFOLIO_API_URL` points to that API. If the API is unavailable, pages render the reviewed content snapshot; the contact form reports unavailable rather than claiming delivery.

## Developer commands

| Command | Purpose |
| --- | --- |
| `npm run dev` | Run Next.js and Laravel together |
| `npm run test` | Frontend content-contract and Laravel feature tests |
| `npm run lint` | ESLint, TypeScript and Laravel Pint checks |
| `npm run format` | Apply Pint and ESLint fixes |
| `npm run build` | Production Next.js build |
| `npm run migrate` | Apply Laravel migrations |
| `npm run seed` | Refresh reviewed portfolio records without clearing contact submissions |
| `npm run docker:up` | Build and start local Compose services |
| `npm run docker:down` | Stop Compose services |

Run `php backend/artisan migrate:fresh --seed` only when deliberately resetting a disposable database: it deletes stored contact messages.

## Configuration

| Variable | Where | Purpose |
| --- | --- | --- |
| `APP_KEY` | root `.env` for Compose; `backend/.env` natively | Laravel encryption/signing key; required and private |
| `PORTFOLIO_API_URL` | frontend server environment | Internal API base URL; never a browser-exposed key |
| `NEXT_PUBLIC_SITE_URL` | frontend build/runtime | Public canonical and sitemap origin; set to final HTTPS origin on deployment |
| `FRONTEND_PORT`, `API_PORT` | root `.env` for Compose | Local loopback ports |
| `DB_DATABASE` | backend | SQLite file path |

Never commit `.env`, contact data, credentials or production keys. Root and application ignore rules exclude runtime state. Contact submissions are stored in SQLite with no public read endpoint. Operators can review them through protected server/database access; add a private delivery workflow before using the form as a business-critical inbox. The API rate-limits submissions to five per IP per hour and rejects a honeypot field. The Next.js route checks the browser origin and proxies to Laravel. See [security notes](docs/architecture.md#security-and-operations).

## Testing and CI

`npm run lint`, `npm run test`, and `npm run build` are the local gates. GitHub Actions installs each stack separately and runs frontend lint, typecheck, tests, build, plus Composer validation, Pint and Laravel tests. Laravel tests use in-memory SQLite and cover seeded API data, contact validation, honeypot rejection, persistence and rate limiting. The frontend test checks evidence classification, direct product links, complete career coverage and the real CV PDF.

## Deployment

Compose is a reproducible local stack, not a claim of an existing public deployment. For production, provide an HTTPS reverse proxy, set `NEXT_PUBLIC_SITE_URL` to the deployed origin at build and runtime, set a unique `APP_KEY`, make the SQLite volume durable and backed up, and restrict operator access to submissions. The provided Nginx service serves the API; the Next.js service runs separately. SQLite is intentionally suited to a single-instance, read-heavy portfolio. For multiple API replicas or materially higher write volume, migrate to PostgreSQL before scaling. See [deployment notes](infrastructure/README.md).

## Content and rights

The [content audit](docs/content-audit.md) records the current owner-published chronology, inspected evidence, unresolved contradictions and editorial exclusions. Public repositories are linked to their own scope notes. Proprietary employer source is not copied here. Blogina and Serione use public product-preview images from RTL Theme; check rights before deploying this local site. The downloadable CV is generated from the reviewed snapshot by `scripts/generate_cv.py` and stored at `frontend/public/Saman-Azizi-Siyan-CV.pdf`.

This repository is a local build. It has not been published or deployed by this task.
