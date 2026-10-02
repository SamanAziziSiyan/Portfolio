#!/usr/bin/env bash
set -Eeuo pipefail

trap 'echo "Deployment failed at line $LINENO; inspect Docker Compose logs before retrying." >&2' ERR

usage() {
  echo "Usage: deploy.sh <main-commit-sha> | deploy.sh --rollback <earlier-main-commit-sha>" >&2
  exit 2
}

mode=deploy
if [[ "${1:-}" == "--rollback" ]]; then
  mode=rollback
  shift
fi
[[ $# -eq 1 && "$1" =~ ^[0-9a-f]{40}$ ]] || usage
target_sha="$1"

cd /srv/portfolio
[[ -f .env.production ]] || { echo "Missing /srv/portfolio/.env.production" >&2; exit 1; }
[[ -z "$(find .env.production -perm /077 -print)" ]] || { echo ".env.production must not be group/world accessible (chmod 600)." >&2; exit 1; }
[[ -z "$(git status --porcelain --untracked-files=normal)" ]] || { echo "Server checkout has uncommitted files; resolve them before deployment." >&2; exit 1; }

git fetch --no-tags origin main
remote_sha="$(git rev-parse refs/remotes/origin/main)"
if [[ "$mode" == deploy ]]; then
  [[ "$target_sha" == "$remote_sha" ]] || { echo "Requested commit is not the current origin/main commit; refusing a stale deployment." >&2; exit 1; }
else
  git merge-base --is-ancestor "$target_sha" "$remote_sha" || { echo "Rollback target is not an ancestor of origin/main." >&2; exit 1; }
fi

site_url="$(sed -n 's/^NEXT_PUBLIC_SITE_URL=//p' .env.production | tail -n 1)"
[[ "$site_url" == https://* && "$site_url" != *example.com* ]] || { echo "Set the real HTTPS NEXT_PUBLIC_SITE_URL in .env.production." >&2; exit 1; }

previous_sha="$(git rev-parse HEAD)"
git checkout --detach "$target_sha"
compose=(docker compose --env-file .env.production -f docker-compose.prod.yml)
"${compose[@]}" config --quiet
"${compose[@]}" build
"${compose[@]}" up -d --no-build --wait --wait-timeout 240

"${compose[@]}" exec -T frontend node -e "fetch('http://127.0.0.1:3000/').then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))"
"${compose[@]}" exec -T nginx wget -q -O /dev/null http://127.0.0.1/up
curl --fail --silent --show-error --location --max-time 20 "$site_url/" > /dev/null
curl --fail --silent --show-error --location --max-time 20 "$site_url/api/v1/projects" > /dev/null

echo "Deployment healthy: $target_sha (previous: $previous_sha; mode: $mode)"
