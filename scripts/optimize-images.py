#!/usr/bin/env python3
"""Convert Melisa's project screenshots to responsive WebP. Originals stay outside the repo."""
from __future__ import annotations
from pathlib import Path
from PIL import Image
import json, re, shutil

ROOT = Path(__file__).resolve().parents[1]
SRC = Path("/workspace/melisa/images")
OUT = ROOT / "public" / "projects"
BG = (255, 255, 255)

# (dest_folder, ordered source files, short alts later in TS)
PAWMATE = sorted(
    (SRC / "Pawmate").glob("Desktop - *.png"),
    key=lambda p: int(re.search(r"(\d+)", p.stem).group(1)),
)
MAZE_DIR = SRC / "maze usability test"
# Order by trailing number; skip the nearly-empty "Propuestas de mejora 1" title-only slide;
# put Conclusiones (unnumbered) last.
def maze_key(p: Path):
    m = re.search(r"(\d+)\s*$", p.stem)
    return int(m.group(1)) if m else 99
MAZE = sorted(
    [p for p in MAZE_DIR.glob("*.png") if "Propuestas de mejora 1" not in p.name],
    key=maze_key,
)
PUBLIC = [
    SRC / "Public services" / "Atomic design.png",
    SRC / "Public services" / "Pantalla Final.png",
]

SETS = {
    "pawmate": PAWMATE,
    "maze": MAZE,
    "public-services": PUBLIC,
}

SIZES = [640, 960, 1440, 1920]

def flatten(im: Image.Image) -> Image.Image:
    if im.mode in ("RGBA", "LA") or (im.mode == "P" and "transparency" in im.info):
        rgba = im.convert("RGBA")
        bg = Image.new("RGB", rgba.size, BG)
        bg.paste(rgba, mask=rgba.split()[-1])
        return bg
    return im.convert("RGB")

def save_webp(im: Image.Image, path: Path, quality=82):
    path.parent.mkdir(parents=True, exist_ok=True)
    im.save(path, "WEBP", quality=quality, method=6)

manifest = {}

for slug, files in SETS.items():
    dest = OUT / slug
    if dest.exists():
        shutil.rmtree(dest)
    dest.mkdir(parents=True)
    items = []
    for i, src in enumerate(files, 1):
        im = flatten(Image.open(src))
        w, h = im.size
        variants = {}
        used = set()
        for tw in SIZES:
            if tw >= w and tw != SIZES[0] and any(s >= w for s in used):
                # only emit one size at-or-above original
                continue
            if tw >= w:
                out_im = im
                ow, oh = w, h
            else:
                oh = round(h * (tw / w))
                out_im = im.resize((tw, oh), Image.Resampling.LANCZOS)
                ow, oh = tw, oh
            name = f"{i:02d}-{ow}.webp"
            q = 84 if tw <= 960 else 80
            save_webp(out_im, dest / name, quality=q)
            variants[str(ow)] = f"projects/{slug}/{name}"
            used.add(ow)
        # Always write a max-size equal to original if not already
        if str(w) not in variants:
            name = f"{i:02d}-{w}.webp"
            save_webp(im, dest / name, quality=80)
            variants[str(w)] = f"projects/{slug}/{name}"
        items.append({
            "id": f"{slug}-{i:02d}",
            "src": src.name,
            "width": w,
            "height": h,
            "variants": variants,  # width -> path
        })
        print(f"  {slug}/{i:02d} {w}x{h} -> {list(variants)}")
    manifest[slug] = items

# Also optimize existing hero assets to webp (keep jpg as fallback)
assets = ROOT / "public" / "assets"
for name in ("hero", "plant", "workspace"):
    jpg = assets / f"{name}.jpg"
    if jpg.exists():
        im = flatten(Image.open(jpg))
        save_webp(im, assets / f"{name}.webp", quality=86)
        print(f"  asset {name} {im.size}")

(OUT / "manifest.json").write_text(json.dumps(manifest, indent=2), encoding="utf-8")
print("\nDone. Manifest written.")
# sizes
import os
total = 0
for p in OUT.rglob("*.webp"):
    total += p.stat().st_size
print(f"Total project webp: {total/1024/1024:.2f} MB")
