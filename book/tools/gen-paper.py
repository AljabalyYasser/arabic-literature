# ورق الصفحة صورة واحدة: اللون والإضاءة في الوسط والظل عند الحواف والحبيبات، فتُضمَّن في الـPDF مرة واحدة
import math
from pathlib import Path
from PIL import Image
ROOT = Path(__file__).parent.parent
W, H = 1004, 1417                      # 170×240 مم بنحو 150 نقطة في البوصة
paper = (0xef, 0xdc, 0xae)
img = Image.new('RGB', (W, H), paper)
px = img.load()
cx, cy = W / 2, H * 0.45
for y in range(H):
    for x in range(W):
        # إضاءة بيضاوية في الوسط (كالتدرج الأول في القالب القديم)
        d1 = math.hypot((x - cx) / (W * .58), (y - cy) / (H * .58))
        a1 = max(0.0, 1 - d1) * .65
        # ظل عند الحواف من 62% إلى 100% (كالتدرج الثاني)
        d2 = math.hypot((x - W / 2) / (W / 2 * 1.414), (y - H / 2) / (H / 2 * 1.414))
        a2 = min(1.0, max(0.0, (d2 - .62) / .38)) * .30
        r, g, b = paper
        r, g, b = r + (255 - r) * a1, g + (247 - g) * a1, b + (222 - b) * a1
        r, g, b = r + (120 - r) * a2, g + (78 - g) * a2, b + (25 - b) * a2
        px[x, y] = (int(r), int(g), int(b))
grain = Image.open(ROOT / 'assets' / 'grain.png').convert('RGBA')
gs = round(34 / 170 * W)               # الحبيبات بقياس 34 مم كما كانت
grain = grain.resize((gs, gs))
layer = Image.new('RGBA', (W, H))
for y in range(0, H, gs):
    for x in range(0, W, gs):
        layer.paste(grain, (x, y))
img = Image.alpha_composite(img.convert('RGBA'), layer).convert('RGB')
img.save(ROOT / 'assets' / 'paper.jpg', quality=82)
