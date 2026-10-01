# Deployment and local infrastructure

`docker-compose.yml` builds a Next.js server, a PHP-FPM Laravel API, and an Nginx API entrypoint. The SQLite database sits in a named volume. The API container applies migrations and idempotent content seeding at startup; it does not clear contact submissions.

The Compose port bindings are loopback-only for local development. To deploy publicly, place an HTTPS reverse proxy in front of Next.js and the API, set a final `NEXT_PUBLIC_SITE_URL` before building the frontend, set a unique private `APP_KEY`, back up the SQLite volume and configure a secure operator workflow for contact messages. Do not expose the SQLite file or source directories through Nginx. The supplied Nginx root is Laravel's `public/` only.

`docker compose config --quiet` validates the configuration when Docker is installed. `docker compose up --build -d` starts it after root `.env` is configured. Use `docker compose logs -f frontend api nginx` for diagnostics. CI tests source and migrations, but no automatic production deployment is configured because no hosting target or credentials were supplied.
