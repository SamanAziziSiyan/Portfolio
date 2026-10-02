# GitHub to production deployment

`main` is the production source. A push runs frontend and Laravel checks, then builds the three production Docker images in GitHub Actions. Deployment stays **pending** until a Linux server is configured and the repository variable `DEPLOY_ENABLED` is set to `true`. A pending run is not a deployment.

## Server requirements

- Linux with Docker Engine, Docker Compose v2, Git, Bash, curl, host Nginx, Certbot with its Nginx plugin, and SSH access.
- A domain whose DNS A/AAAA records point to the server. Allow inbound TCP 80 and 443; SSH must be reachable by GitHub Actions. Do not open ports 3000, 8080, or 9000 publicly.
- A trusted dedicated `deploy` user with access to Docker. Docker group membership grants root-equivalent control; protect its SSH key and account accordingly.
- Durable disk space and a backup plan for the named SQLite volume. The database is not published as a network service.

## Initial setup

These commands assume `/srv/portfolio`, user `deploy`, default loopback ports 3000/8080, and a chosen domain such as `portfolio.example.com`. Replace the domain everywhere. The GitHub repository root is the project root.

1. Install the requirements and create the deployment account. Give that account Docker access, configure its `~/.ssh/authorized_keys` with the public half of a dedicated deployment key, and verify SSH key login. The private half is stored only as a GitHub Actions secret.
2. As the deployment user, clone the public repository:

   ```bash
   sudo mkdir -p /srv/portfolio
   sudo chown deploy:deploy /srv/portfolio
   git clone https://github.com/SamanAziziSiyan/portfolio.git /srv/portfolio
   cd /srv/portfolio
   ```

3. Create the server-only environment file. Never commit it or place it in a Docker image:

   ```bash
   umask 077
   cp .env.production.example .env.production
   chmod 600 .env.production
   ```

   Edit `APP_KEY` to a unique Laravel key (`base64:` followed by a generated 32-byte key), and set `NEXT_PUBLIC_SITE_URL` to the final `https://` origin with no trailing path. `FRONTEND_PORT` and `API_PORT` default to 3000 and 8080; if changed, update the host Nginx configuration too. Compose passes the key only at runtime. Laravel uses SQLite at `/app/backend/storage/db/portfolio.sqlite` in the `saman-portfolio-production_portfolio_db` named volume.

4. Start the stack for the first time. The API container caches Laravel configuration, applies **non-destructive** migrations, and reseeds reviewed public content at startup. It does not clear contact messages:

   ```bash
   docker compose --env-file .env.production -f docker-compose.prod.yml config --quiet
   docker compose --env-file .env.production -f docker-compose.prod.yml up -d --build --wait
   curl --fail http://127.0.0.1:3000/
   curl --fail http://127.0.0.1:8080/up
   ```

5. Configure host Nginx and HTTPS. Copy `infrastructure/nginx/portfolio-bootstrap.conf.example` to `/etc/nginx/sites-available/portfolio`, replace `portfolio.example.com`, enable the site, run `sudo nginx -t`, and reload Nginx. Request a certificate with `sudo certbot --nginx -d YOUR_DOMAIN`. Then replace the temporary site with `infrastructure/nginx/portfolio-site.conf.example`, replacing the domain in both `server_name` and certificate paths. Run `sudo nginx -t && sudo systemctl reload nginx`, then verify `https://YOUR_DOMAIN/` and `https://YOUR_DOMAIN/api/v1/projects`. The final site redirects HTTP to HTTPS, routes the public frontend and API, caches Next.js static assets, and adds basic security headers. Keep Certbot renewal enabled and test it with `sudo certbot renew --dry-run`.

6. Run one manual deployment check from `/srv/portfolio` after HTTPS works:

   ```bash
   bash infrastructure/deploy/deploy.sh "$(git rev-parse HEAD)"
   ```

## GitHub configuration

In `SamanAziziSiyan/portfolio` → Settings → Secrets and variables → Actions, set these **secrets**:

| Secret | Purpose |
| --- | --- |
| `DEPLOY_HOST` | Server DNS name or IP used for SSH |
| `DEPLOY_USER` | Dedicated deployment username |
| `DEPLOY_SSH_KEY` | Private key corresponding to the deploy user's authorized public key |
| `DEPLOY_KNOWN_HOSTS` | Pinned SSH host-key line for the server; verify its fingerprint through the server console before saving |

Set repository **variable** `DEPLOY_ENABLED=true` only after the server passes the manual check. Optionally set `DEPLOY_PORT` if SSH is not on 22. No application secret is needed in GitHub Actions: `.env.production` stays on the server. The Actions workflow uses strict host-key checking and never uploads the SSH private key to the server.

## Normal deployment and failure

`git push origin main` triggers `.github/workflows/deploy.yml`. The workflow reuses CI, builds production images, and sends the exact passing commit SHA and deployment script over SSH. The server verifies that SHA equals `origin/main`, checks for local changes, builds images, updates Compose services, waits for their health checks, and tests the public frontend and API. A failed check fails the workflow. The frontend and API ports are loopback-only; host Nginx is the public entry point.

If setup is incomplete, the workflow's **deployment-pending** job states that CI and image builds passed but nothing deployed. A failure during an enabled deployment may leave the previous containers running or a partial update; inspect `docker compose --env-file .env.production -f docker-compose.prod.yml logs --tail=200` and restore as needed. Migrations are forward-only; review schema compatibility before deploying a migration that an older app could not use.

## Rollback

Choose a previously healthy commit that contains `docker-compose.prod.yml`, then run on the server:

```bash
cd /srv/portfolio
git show origin/main:infrastructure/deploy/deploy.sh | bash -s -- --rollback PREVIOUS_COMMIT_SHA
```

The script accepts only an ancestor of current `origin/main`, rebuilds the old images, waits for health, and verifies public responses. It does not reverse database migrations or delete SQLite data. Back up the named volume independently before schema-changing deployments.
