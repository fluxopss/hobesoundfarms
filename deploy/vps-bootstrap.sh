#!/bin/sh
# VPS bootstrap for a new Next.js client site
# Usage: ./deploy/vps-bootstrap.sh clientdomain.com premium-site 3001
set -e
DOMAIN="$1"
APP_NAME="$2"
PORT="${3:-3001}"
APP_DIR="/var/www/$APP_NAME"

mkdir -p "$APP_DIR"
chown -R deploy:deploy "$APP_DIR"

cat > "/opt/edge/sites/${APP_NAME}.caddy" <<EOF
${DOMAIN} {
    encode gzip
    reverse_proxy localhost:${PORT}
}
EOF

docker exec edge-caddy caddy reload --config /etc/caddy/Caddyfile 2>/dev/null || true
echo "Caddy site block created for ${DOMAIN} -> localhost:${PORT}"
