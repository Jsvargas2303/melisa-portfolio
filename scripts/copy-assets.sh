#!/usr/bin/env bash
# Copies + crops reference images from the agent store into public/assets
set -e; cd "$(dirname "$0")/.."
A=${1:-/cursor/stores/store-3ae0ccd9-2696-437a-9eff-eb040dc7662c/grok-bot/agents/f701f54a-5366-4622-b950-d374b32ddc3b/attachments}
mkdir -p public/assets
cp "$A/01M65N87QXD8E1EZCX40C8H3A8.png" public/assets/portrait.png
cp "$A/01M65J6SZYNT54JZMPJ2XNCQGD.png" public/assets/mockup.png
python3 - <<'P'
from PIL import Image
im=Image.open('public/assets/mockup.png').convert('RGB')
for n,b in {'plant':(1022,60,1224,433),'hero':(585,60,960,435),'workspace':(560,730,908,894),'pawmate':(480,470,705,684),'clarity':(870,465,1068,684),'raices':(1210,465,1410,684)}.items():
  im.crop(b).save(f'public/assets/{n}.jpg',quality=90)
P
echo "assets ready"
