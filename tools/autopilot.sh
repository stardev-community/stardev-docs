#!/data/data/com.termux/files/usr/bin/bash
# StarDev autopilot — regenerates SEO pages, pings IndexNow, logs visibility.
# Runs without accounts. Safe to run repeatedly (idempotent).
set -u
ROOT="/data/data/com.termux/files/home/proyek/stardev-docs"
KEYFILE="/data/data/com.termux/files/usr/tmp/opencode/indexnow.key"
LOG="$ROOT/marketing/index-log.csv"
KEY=$(cat "$KEYFILE" 2>/dev/null)
HOST="stardev-community.github.io"
SITE="https://$HOST/stardev-docs"

cd "$ROOT" || exit 1
node tools/gen-seo.mjs >/dev/null 2>&1

URLS=$(python3 - <<'PY'
import glob,os,re
site="https://stardev-community.github.io/stardev-docs"
slugs=sorted(os.path.dirname(p) for p in glob.glob("*/index.html") if os.sep not in os.path.dirname(p))
urls=[site+"/"]+[site+"/"+s+"/" for s in slugs]
print("\n".join(urls))
PY
)

BODY=$(URLS="$URLS" KEY="$KEY" python3 - <<'PY'
import json,os
urls=[u for u in os.environ["URLS"].splitlines() if u]
print(json.dumps({"host":"stardev-community.github.io","key":os.environ["KEY"],
 "keyLocation":"https://stardev-community.github.io/stardev-docs/%s.txt"%os.environ["KEY"],
 "urlList":urls}))
PY
)

for EP in https://api.indexnow.org/indexnow https://www.bing.com/indexnow https://yandex.com/indexnow https://search.seznam.cz/indexnow; do
  curl -s -m 25 -o /dev/null -X POST "$EP" -H "Content-Type: application/json; charset=utf-8" -d "$BODY"
done

# best-effort index probe (Bing blocks bots for site:, so this is informational only)
NA=$(curl -s -m 20 -A "Mozilla/5.0 (Windows NT 10.0; Win64; x64) Chrome/124.0 Safari/537.36" "https://www.bing.com/search?q=site%3A$HOST" | grep -o 'b_algo' | wc -l)

if [ ! -f "$LOG" ]; then echo "timestamp,urls_pinged,bing_b_algo_probe,note" > "$LOG"; fi
echo "$(date -Iseconds),$(echo "$URLS" | wc -l),$NA,probe unreliable for site: queries" >> "$LOG"
echo "autopilot done: $(echo "$URLS" | wc -l) urls pinged"
