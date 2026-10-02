# Deployment and local infrastructure

`docker-compose.yml` is for local development. `docker-compose.prod.yml` builds a standalone Next.js server, PHP-FPM Laravel API, and internal Nginx API entrypoint with health checks. The SQLite database sits in a named volume. The API container applies migrations and idempotent content seeding at startup; it does not clear contact submissions.

Both Compose configurations bind public-facing services to loopback. Production uses host Nginx for HTTPS and routing to these ports. Set a final `NEXT_PUBLIC_SITE_URL` before building, keep a unique `APP_KEY` in the server-only `.env.production`, back up the SQLite volume, and configure a secure operator workflow for contact messages. Do not expose the SQLite file or source directories through Nginx. The internal API Nginx root is Laravel's `public/` only.

`docker compose config --quiet` validates local configuration after root `.env` is configured. GitHub Actions builds production images and, once the server is configured, runs `infrastructure/deploy/deploy.sh` over SSH. See [deployment instructions](../docs/deployment.md) for server setup, secrets, health checks, and rollback.
