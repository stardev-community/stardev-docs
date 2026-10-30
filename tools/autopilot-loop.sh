#!/data/data/com.termux/files/usr/bin/bash
# Always-on cycle: health check hourly, IndexNow ping every 6th cycle (6h).
ROOT="/data/data/com.termux/files/home/proyek/stardev-docs"
STATE="/data/data/com.termux/files/usr/tmp/opencode/autopilot.count"
cd "$ROOT" || exit 1
N=$(cat "$STATE" 2>/dev/null || echo 0)
while true; do
  N=$((N+1)); echo "$N" > "$STATE"
  if [ $((N % 6)) -eq 1 ]; then
    tools/autopilot.sh >> marketing/autopilot.log 2>&1
  else
    BAD=0
    for u in $(ls -d */ | sed 's#^#'"https://stardev-community.github.io/stardev-docs/"'#'); do
      C=$(curl -s -o /dev/null -m 15 -w "%{http_code}" "$u"); [ "$C" != "200" ] && BAD=$((BAD+1))
    done
    echo "$(date -Iseconds) health cycle $N bad=$BAD" >> marketing/autopilot.log
  fi
  sleep 3600
done
