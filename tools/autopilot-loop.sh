#!/data/data/com.termux/files/usr/bin/bash
# Optional 24/7 loop. Start: nohup tools/autopilot-loop.sh >/dev/null 2>&1 &
# Stop: pkill -f autopilot-loop
ROOT="/data/data/com.termux/files/home/proyek/stardev-docs"
cd "$ROOT" || exit 1
while true; do
  tools/autopilot.sh >> marketing/autopilot.log 2>&1
  sleep 21600
done
