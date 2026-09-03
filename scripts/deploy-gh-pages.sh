#!/usr/bin/env bash
# OEP — Publica out/ en la rama gh-pages (GitHub Pages) sin tocar el árbol de trabajo.
# Uso: npm run build && bash scripts/deploy-gh-pages.sh
set -euo pipefail

ROOT="$(cd "$(dirname "$0")/.." && pwd)"
REMOTE="https://github.com/alfredosvaldo/oep-web.git"
TMP="$(mktemp -d)"
trap 'rm -rf "$TMP"' EXIT

[ -d "$ROOT/out" ] || { echo "No existe out/ — corre npm run build primero." >&2; exit 1; }
touch "$ROOT/out/.nojekyll"   # evita que Jekyll descarte _next/ al publicar

git clone -q --no-hardlinks "$ROOT" "$TMP/repo"
cd "$TMP/repo"
git checkout -q --orphan gh-pages
git rm -rf -q .
cp -R "$ROOT/out/." .
git add -A
git commit -q -m "Sitio estático $(date +%F.%H%M) (build local)"
git remote set-url origin "$REMOTE"
git push -q -f origin gh-pages
echo "OK — gh-pages actualizada. Sitio: https://alfredosvaldo.github.io/oep-web/"
