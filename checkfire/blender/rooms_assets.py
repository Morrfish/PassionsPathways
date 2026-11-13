"""Checkfire — props for the eight remaining rooms (stylized toy, beveled low-poly).

Library Table (L_), Diner Counter (D_), School Gym (G_), Toy Store (T_), Greenhouse (H_),
Arcade (C_), Attic (A_), Beach Boardwalk (B_). Modelled from the room descriptions in the
art brief (no reference sheets yet), sized to the game's existing collision boxes so
gameplay stays the same.

Run headless:  blender -b --python rooms_assets.py -- <out_dir> [--no-previews]
Writes rooms.glb plus one line-up render per room in blender/previews/.
Game units (fighters are ~2 tall). Blender Z-up = game Y-up; Blender -Y = game +Z ("front").
Background giants (bookshelf, stool, jukebox) are built at 1/10 size; the game scales them by 10.
"""
import bpy, math, sys, os

ARGS = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['.']
OUT = ARGS[0]
bpy.ops.wm.read_factory_settings(use_empty=True)
HERE = os.path.dirname(os.path.abspath(__file__))
exec(open(os.path.join(HERE, 'toykit.py')).read())
R = math.radians
cos, sin, pi = math.cos, math.sin, math.pi

# ---------------------------------------------------------------- palette
TEAL = mat('RmTeal', 0x1f8a86, rough=0.5)
TEAL_D = mat('RmTealDark', 0x176b68, rough=0.5)
ORANGE = mat('RmOrange', 0xf07a22, rough=0.45)
ORANGE_D = mat('RmOrangeDark', 0xcf6118, rough=0.45)
CREAM = mat('RmCream', 0xf6ead6, rough=0.6)
NAVY = mat('RmNavy', 0x1d2a44, rough=0.55)
RED = mat('RmRed', 0xcf3b2e, rough=0.45)
BLUE = mat('RmBlue', 0x2f5c9a, rough=0.45)
YELLOW = mat('RmYellow', 0xf6c445, rough=0.45)
GREEN = mat('RmGreen', 0x4f8a2c, rough=0.8)
GREEN_L = mat('RmGreenLight', 0x8fbf3f, rough=0.8)
GREEN_D = mat('RmGreenDeep', 0x2f6b34, rough=0.8)
PURPLE = mat('RmPurple', 0x6a4c93, rough=0.5)
PINK = mat('RmPink', 0xf2a3b3, rough=0.6)
WHITE = mat('RmWhite', 0xfbf7ee, rough=0.5)
PAGE = mat('RmPage', 0xf3e9cf, rough=0.9)
WOOD = mat('RmWood', 0xb9773f, rough=0.6)
WOOD_D = mat('RmWoodDark', 0x7a4a2a, rough=0.65)
WOOD_L = mat('RmWoodLight', 0xe0b77c, rough=0.6)
DARK = mat('RmDark', 0x23262e, rough=0.5)
GREY = mat('RmGrey', 0x9aa1ab, metal=0.3, rough=0.35)
CHROME = mat('RmChrome', 0xdfe6ec, metal=0.45, rough=0.22)
BRASS = mat('RmBrass', 0xd2a23a, metal=0.4, rough=0.3)
GLASS = mat('RmGlass', 0xdff3f7, rough=0.05, alpha=0.3)
WATER = mat('RmWater', 0x6fc7ea, metal=0.1, rough=0.05, alpha=0.6)
GLOW = mat('RmGlow', 0xffe2a0, emit=1.6)
GLOW_T = mat('RmGlowTeal', 0x2ec4b6, emit=2.6)
GLOW_O = mat('RmGlowOrange', 0xff8c32, emit=2.6)
GLOW_P = mat('RmGlowPink', 0xf15bb5, emit=2.4)
SCREEN = mat('RmScreen', 0x101a30, rough=0.2, emit=0.3)
TERRA = mat('RmTerracotta', 0xc0623a, rough=0.8)
TERRA_D = mat('RmTerracottaDark', 0x9d4c2b, rough=0.8)
SOIL = mat('RmSoil', 0x4a2f1b, rough=1.0)
STONE = mat('RmStone', 0xcdbfa6, rough=0.9)
CARD = mat('RmCardboard', 0xc1935c, rough=0.95)
CARD_D = mat('RmCardboardDark', 0xa27845, rough=0.95)
TAPE = mat('RmTape', 0xe6d3a4, rough=0.6)
BRICK = [mat('RmBrickA', 0x9a4230, rough=0.9), mat('RmBrickB', 0xb0553b, rough=0.9), mat('RmBrickC', 0x853726, rough=0.9)]
MORTAR = mat('RmMortar', 0x6b5b4b, rough=1.0)
SAND = mat('RmSand', 0xe6cc93, rough=1.0)
SAND_D = mat('RmSandDark', 0xd3b577, rough=1.0)
FUR = mat('RmFur', 0xa46f45, rough=1.0)
FUR_L = mat('RmFurLight', 0xdcb98c, rough=1.0)
DUCK = mat('RmDuck', 0xffd023, rough=0.35)
COFFEE = mat('RmCoffee', 0x3b2416, rough=0.2)
CRUST = mat('RmCrust', 0xd99a4e, rough=0.8)
LINEN = mat('RmLinen', 0xe9dfca, rough=0.95)
RUG = mat('RmRug', 0x8e2c2c, rough=1.0)
BOOKC = [RED, BLUE, GREEN_D, YELLOW, PURPLE, TEAL, ORANGE]
TOYC = [RED, YELLOW, TEAL, PURPLE, ORANGE, BLUE, GREEN_L]

def aim(rx, ry):
    """Direction the +Z axis points after an XYZ-euler rotation (rx, ry, 0)."""
    return Vector((cos(rx) * sin(ry), -sin(rx), cos(rx) * cos(ry)))

def rod(r, a, b, m, verts=10, r2=None):
    """Straight cylinder (or cone) from point a to point b."""
    a, b = Vector(a), Vector(b)
    d = b - a
    rot = d.to_track_quat('Z', 'Y').to_euler()
    return cyl(r, d.length, (a + b) / 2, m, verts=verts, bevel=0, rot=rot, r2=r2)

def fan(n, r, z, zc, mats, wob=0.0, name='fan'):
    """Umbrella canopy / pennant cone: n gores in alternating materials, apex at height zc."""
    bm = bmesh.new()
    apex = bm.verts.new((0, 0, zc))
    rim = [bm.verts.new((cos(i / (2 * n) * math.tau) * r * (1 - wob * (i % 2)), sin(i / (2 * n) * math.tau) * r * (1 - wob * (i % 2)), z + 0.12 * (i % 2)))
           for i in range(2 * n)]
    for i in range(n):
        a, b, c = rim[2 * i], rim[2 * i + 1], rim[(2 * i + 2) % (2 * n)]
        for tri in ((apex, a, b), (apex, b, c)):
            f = bm.faces.new(tri)
            f.material_index = i % len(mats)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = _obj_from_bm(bm, name)
    md = o.modifiers.new('sol', 'SOLIDIFY'); md.thickness = 0.06
    _fin(o, mats[0], flat=True)
    for m in mats[1:]:
        o.data.materials.append(m)
    return o

def gores(o, mats, n):
    """Recolour a sphere in n vertical stripes (beach ball)."""
    for m in mats[1:]:
        o.data.materials.append(m)
    for p in o.data.polygons:
        a = math.atan2(p.center.y - o.location.y, p.center.x - o.location.x) % math.tau
        p.material_index = int(a / math.tau * n) % len(mats)

# ================================================================ LIBRARY TABLE
def book(w, d, h, x, y, z, m, rz=0.0, band=BRASS):
    c, s = cos(rz), sin(rz)
    at = lambda dx, dy, dz: (x + dx * c - dy * s, y + dx * s + dy * c, z + dz)
    box((w - 0.14, d - 0.12, h * 0.7), at(0.04, 0.03, h / 2), PAGE, bevel=0.03, rot=(0, 0, rz), segs=1)
    box((w, d, h * 0.16), at(0, 0, h * 0.08), m, bevel=0.04, rot=(0, 0, rz), segs=1)
    box((w, d, h * 0.16), at(0, 0, h * 0.92), m, bevel=0.04, rot=(0, 0, rz), segs=1)
    box((w, 0.16, h), at(0, -d / 2 + 0.08, h / 2), m, bevel=0.06, rot=(0, 0, rz), segs=1)
    for bx in (-0.32, 0.32):
        box((w * 0.05, 0.18, h * 0.9), at(w * bx, -d / 2 + 0.08, h / 2), band, bevel=0.01, rot=(0, 0, rz), segs=1)

def book_stack(name, n, big):
    W, Dp = (5.0, 3.6) if big else (3.6, 2.6)
    z = 0.0
    for i, h in enumerate([0.6, 1.0, 0.9, 0.8, 0.7][:n]):
        w = W - ((i * 37) % 10) / 10 * 0.5
        d = Dp - ((i * 53) % 8) / 10 * 0.4
        book(w, d, h, ((i * 17) % 5 - 2) * 0.05, ((i * 23) % 5 - 2) * 0.05, z, BOOKC[(i + n) % 7], rz=((i * 41) % 9 - 4) * 0.02)
        z += h
    return finish(name)

book_stack('L_stack5', 5, False)
book_stack('L_stackBig4', 4, True)
book_stack('L_stackBig3', 3, True)

for k in range(4):                                   # book stairs: step k is k+1 books high
    for j in range(k + 1):
        book(4.1 - 0.1 * (j % 2), 2.12, 0.85, 0.04 * ((j + k) % 3 - 1), 4 - 2.2 * k, j * 0.85, BOOKC[(k * 2 + j) % 7])
finish('L_stairs')

box((9.0, 6.0, 0.22), (0, 0, 0.11), NAVY, bevel=0.06)                    # open book
box((0.5, 6.0, 0.3), (0, 0, 0.15), NAVY, bevel=0.1)
for sx in (-1, 1):
    box((4.2, 5.6, 0.2), (sx * 2.2, 0, 0.3), PAGE, bevel=0.05, rot=(0, sx * 0.03, 0))
    box((4.1, 5.5, 0.1), (sx * 2.2, 0, 0.42), WHITE, bevel=0.03, rot=(0, sx * 0.03, 0))
    for i in range(8):
        box((3.3 if i % 4 != 3 else 2.0, 0.09, 0.02), (sx * 2.2 - (0 if i % 4 != 3 else 0.65), 2.1 - i * 0.6, 0.485), GREY, bevel=0, segs=1)
box((0.35, 6.6, 0.03), (0.6, -0.5, 0.5), ORANGE, bevel=0.01)             # ribbon bookmark
finish('L_openbook')

lathe([(0, 0), (1.12, 0), (1.22, 0.12), (1.3, 3.38), (1.24, 3.5), (1.12, 3.4), (1.06, 0.5), (0, 0.5)], TEAL, steps=24)
cyl(1.31, 0.5, (0, 0, 1.4), ORANGE, verts=24, bevel=0.05)
cyl(1.3, 0.14, (0, 0, 2.0), CREAM, verts=24, bevel=0.03)
for k, (rx, ry, col) in enumerate([(0.1, 0.12, YELLOW), (-0.12, 0.08, RED), (0.08, -0.14, BLUE), (-0.06, -0.1, GREEN_L)]):
    d = aim(rx, ry)
    base = Vector(((k % 2 - 0.5) * 0.7, (0.4 if k > 1 else -0.4), 0.6))
    cyl(0.19, 4.0, base + d * 2.0, col, verts=6, bevel=0, rot=(rx, ry, 0))
    cyl(0.19, 0.55, base + d * 4.27, WOOD_L, verts=6, bevel=0, rot=(rx, ry, 0), r2=0.06)
    cyl(0.06, 0.16, base + d * 4.6, DARK, verts=6, bevel=0, rot=(rx, ry, 0), r2=0.01)
finish('L_pencilcup')

box((14.0, 1.2, 0.16), (0, 0, 0.08), YELLOW, bevel=0.04)                 # ruler
for i in range(27):
    box((0.05, 0.5 if i % 5 == 0 else 0.28, 0.02), (-6.5 + i * 0.5, 0.6 - (0.25 if i % 5 == 0 else 0.14), 0.165), DARK, bevel=0, segs=1)
finish('L_ruler')

box((2.2, 1.3, 0.9), (0, 0, 0.45), PINK, bevel=0.14)                     # eraser in a paper sleeve
box((1.0, 1.34, 0.94), (0.2, 0, 0.45), BLUE, bevel=0.06)
box((0.12, 1.36, 0.96), (0.2, 0, 0.45), CREAM, bevel=0.02)
finish('L_eraser')

lathe([(0, 0), (2.0, 0), (2.15, 0.15), (2.05, 0.45), (0.5, 0.6), (0, 0.6)], NAVY, steps=24)   # desk lamp, head leans to +X
tube([(0, 0, 0.5), (0.5, 0, 4.4), (2.2, 0, 8.0)], 0.2, DARK)
for p in ((0, 0, 0.7), (0.5, 0, 4.4), (2.2, 0, 8.0)):
    uvs(0.36, p, BRASS, seg=12, rings=8)
hd = Vector((0.75, 0, -0.66)).normalized()
rod(1.7, Vector((2.2, 0, 8.0)) + hd * 2.3, Vector((2.2, 0, 8.0)) + hd * 0.1, TEAL, verts=20, r2=0.5)
uvs(0.6, Vector((2.2, 0, 8.0)) + hd * 1.6, GLOW, seg=12, rings=8)
finish('L_lamp')

# giant bookshelf for the room around the table (1/10 size, books face -Y)
box((9.0, 2.6, 22.0), (0, 0.2, 11.0), WOOD_D, bevel=0.12)
box((8.3, 0.4, 20.8), (0, -1.0, 11.0), DARK, bevel=0.02)
box((9.4, 3.0, 0.7), (0, 0.1, 21.9), WOOD, bevel=0.15)
box((9.2, 2.9, 0.6), (0, 0.1, 0.3), WOOD, bevel=0.12)
for r in range(6):
    z0 = 0.75 + r * 3.45
    box((8.5, 2.6, 0.22), (0, 0.0, z0 - 0.11), WOOD, bevel=0.05, segs=1)
    x = -4.05
    i = 0
    while x < 3.75:
        w = 0.38 + ((i * 7 + r * 5) % 5) * 0.09
        h = 2.2 + ((i * 11 + r * 3) % 6) * 0.17
        lean = 0.14 if (i + r * 2) % 9 == 8 else 0.0
        box((w - 0.05, 1.6, h), (x + w / 2 + lean * h / 2, -0.75, z0 + h / 2), BOOKC[(i * 3 + r) % 7] if (i + r) % 6 else CREAM, bevel=0.05, segs=1, rot=(0, lean, 0))
        x += w + lean * h
        i += 1
finish('L_shelf')

# ================================================================ DINER COUNTER
def bottle(name, m, cap, label):
    lathe([(0, 0), (0.92, 0), (1.03, 0.18), (1.03, 3.5), (0.92, 4.1), (0.5, 4.5), (0.42, 4.9), (0, 4.9)], m, steps=20)
    cyl(1.05, 1.5, (0, 0, 2.1), label, verts=20, bevel=0.04)
    cyl(0.6, 0.16, (0, -0.52, 2.1), m, verts=14, bevel=0.03, rot=(R(90), 0, 0))
    cyl(0.46, 0.3, (0, 0, 5.0), cap, verts=16, bevel=0.05)
    cyl(0.4, 0.75, (0, 0, 5.5), cap, verts=14, bevel=0, r2=0.1)
    return finish(name)

bottle('D_ketchup', RED, WHITE, CREAM)
bottle('D_mustard', YELLOW, ORANGE, CREAM)

def shaker(name, fill):
    lathe([(0, 0), (0.78, 0), (0.86, 0.12), (0.76, 2.3), (0.6, 2.4), (0, 2.4)], GLASS, steps=16)
    lathe([(0, 0.08), (0.74, 0.08), (0.7, 1.55), (0, 1.55)], fill, steps=16)
    lathe([(0.78, 2.3), (0.72, 2.75), (0.4, 2.95), (0, 2.98)], CHROME, steps=16)
    return finish(name)

shaker('D_salt', WHITE)
shaker('D_pepper', DARK)

lathe([(0, 0), (2.6, 0), (3.2, 0.28), (3.15, 0.36), (2.5, 0.2), (0, 0.2)], WHITE, steps=28)     # pie under a glass dome
lathe([(0, 0.2), (2.3, 0.2), (2.5, 0.8), (2.2, 0.95), (0, 1.05)], CRUST, steps=24)
for i in range(16):
    a = i / 16 * math.tau
    uvs(0.22, (cos(a) * 2.38, sin(a) * 2.38, 0.86), CRUST, seg=8, rings=6)
for i in range(5):
    box((4.2 - abs(i - 2) * 0.7, 0.26, 0.08), (0, -1.4 + i * 0.7, 1.05), WOOD_L, bevel=0.03, segs=1)
    box((0.26, 4.2 - abs(i - 2) * 0.7, 0.08), (-1.4 + i * 0.7, 0, 1.1), WOOD_L, bevel=0.03, segs=1)
lathe([(2.85, 0.3)] + [(cos(i / 10 * pi / 2) * 2.85, 0.3 + sin(i / 10 * pi / 2) * 2.5) for i in range(1, 11)], GLASS, steps=28)
uvs(0.28, (0, 0, 2.95), CHROME, seg=12, rings=8)
finish('D_pie')

def mug(name, m, band):
    lathe([(0, 0), (1.15, 0), (1.25, 0.12), (1.3, 2.1), (1.24, 2.2), (1.14, 2.1), (1.1, 0.4), (0, 0.4)], m, steps=22)
    cyl(1.31, 0.4, (0, 0, 1.2), band, verts=22, bevel=0.04)
    cyl(1.12, 0.06, (0, 0, 1.98), COFFEE, verts=22, bevel=0)
    torus(0.62, 0.17, (1.5, 0, 1.15), m, rot=(R(90), 0, 0), seg=16, mseg=8)
    return finish(name)

mug('D_mugA', CREAM, TEAL)
mug('D_mugB', ORANGE, CREAM)

for k in range(4):
    lathe([(0, 0), (1.5, 0), (2.5, 0.16), (2.55, 0.24), (1.5, 0.12), (0, 0.12)], WHITE if k % 2 == 0 else CREAM, loc=(0, 0, k * 0.25), steps=24)
torus(2.2, 0.035, (0, 0, 0.955), TEAL, seg=24, mseg=6)
finish('D_plates')

box((4.0, 2.4, 2.9), (0, 0, 1.45), CHROME, bevel=0.3, segs=3)             # napkin dispenser
box((3.2, 2.5, 1.9), (0, 0, 1.4), NAVY, bevel=0.1)
box((2.6, 2.56, 0.5), (0, 0, 1.4), WHITE, bevel=0.05)
box((3.3, 1.7, 0.5), (0, 0, 3.0), WHITE, bevel=0.1)
finish('D_napkin')

box((3.0, 0.2, 3.2), (0, -0.36, 1.58), NAVY, bevel=0.06, rot=(R(-12), 0, 0))    # menu stand (A-frame)
box((3.0, 0.2, 3.2), (0, 0.36, 1.58), NAVY, bevel=0.06, rot=(R(12), 0, 0))
for sy in (-1, 1):
    rx = R(-12) * sy
    up = Vector((0, sin(rx) * -1, cos(rx)))
    o = Vector((0, sy * 0.47, 1.58)) + Vector((0, sy * 0.0, 0))
    box((2.5, 0.06, 2.7), o, CREAM, bevel=0.02, rot=(rx, 0, 0))
    box((2.0, 0.08, 0.36), o + up * 0.95 + Vector((0, sy * 0.02, 0)), ORANGE, bevel=0.02, rot=(rx, 0, 0))
    for i in range(4):
        box((1.9 if i % 2 == 0 else 1.3, 0.08, 0.1), o + up * (0.35 - i * 0.36) + Vector((0, sy * 0.02, 0)), TEAL_D, bevel=0, rot=(rx, 0, 0), segs=1)
finish('D_menu')

lathe([(0, 0), (1.0, 0), (0.85, 0.2), (0.24, 0.3), (0.2, 2.3), (0.5, 2.4), (0, 2.4)], CHROME, steps=20)     # counter stool (1/10)
torus(0.62, 0.05, (0, 0, 1.0), CHROME, seg=20, mseg=6)
for i in range(3):
    a = i / 3 * math.tau
    rod(0.04, (0.2 * cos(a), 0.2 * sin(a), 1.0), (0.6 * cos(a), 0.6 * sin(a), 1.0), CHROME, verts=6)
lathe([(0, 2.4), (1.08, 2.4), (1.14, 2.55), (1.1, 2.85), (0.8, 2.98), (0, 3.0)], RED, steps=24)
cyl(1.15, 0.14, (0, 0, 2.47), CHROME, verts=24, bevel=0.03)
finish('D_stool')

box((6.0, 4.0, 8.0), (0, 0, 4.0), WOOD_D, bevel=0.3)                      # jukebox (1/10), front -Y
cyl(3.0, 4.0, (0, 0, 8.0), WOOD_D, verts=28, bevel=0.3, rot=(R(90), 0, 0))
arc = lambda r, z0=8.0: [(cos(pi * i / 14) * r, -2.05, z0 + sin(pi * i / 14) * r) for i in range(15)]
tube([(2.55, -2.05, 1.2)] + arc(2.55) + [(-2.55, -2.05, 1.2)], 0.26, GLOW_O)
tube([(1.95, -2.05, 4.6)] + arc(1.95) + [(-1.95, -2.05, 4.6)], 0.2, GLOW_T)
box((3.4, 0.3, 2.3), (0, -2.0, 6.6), SCREEN, bevel=0.1)
for i in range(5):
    box((2.9, 0.34, 0.14), (0, -2.0, 5.8 + i * 0.4), CREAM, bevel=0.03, segs=1)
box((3.6, 0.3, 2.6), (0, -2.0, 2.9), CREAM, bevel=0.1)
for i in range(7):
    box((0.16, 0.36, 2.2), (-1.5 + i * 0.5, -2.0, 2.9), BRASS, bevel=0.04, segs=1)
box((4.6, 0.5, 0.5), (0, -2.0, 4.5), CHROME, bevel=0.12)
for i in range(6):
    cyl(0.16, 0.2, (-1.75 + i * 0.7, -2.3, 4.5), [RED, YELLOW, TEAL][i % 3], verts=10, rot=(R(90), 0, 0))
box((6.3, 4.3, 0.6), (0, 0, 0.3), DARK, bevel=0.12)
finish('D_jukebox')

# ================================================================ SCHOOL GYM
for i in range(4):                                   # bleachers: 4 rows, each 1.4 deep x 22 long, 0.9 rise (inner edge at x=0)
    x, top = 0.7 + 1.4 * i, 0.9 * (i + 1)
    box((1.36, 21.9, 0.16), (x, 0, top - 0.08), WOOD_L if i % 2 else WOOD, bevel=0.04)
    box((0.12, 21.7, top - 0.18), (x - 0.6, 0, (top - 0.16) / 2), NAVY, bevel=0.03, segs=1)
    for y in (-10.6, -5.3, 0, 5.3, 10.6):
        box((1.3, 0.22, top - 0.16), (x, y, (top - 0.16) / 2), TEAL_D, bevel=0.04, segs=1)
for y in (-10.95, 10.95):
    for z in (1.3, 2.3, 3.3):
        rod(0.07, (0.1, y, z * 0.3 + 0.9), (5.5, y, z + 1.5), GREY, verts=8)
    for i in range(5):
        rod(0.07, (0.1 + i * 1.35, y, 0.9 * min(i + 1, 4)), (0.1 + i * 1.35, y, 1.9 + i * 0.83), GREY, verts=8)
finish('G_bleacher')

def gym_mat(name, w, d, layers):
    for k in range(layers):
        box((w, d, 0.5), (0, 0, 0.25 + k * 0.5), BLUE if k % 2 == 0 else TEAL, bevel=0.1)
        for sx in (-0.25, 0.25):
            box((0.06, d + 0.02, 0.4), (sx * w, 0, 0.25 + k * 0.5), NAVY, bevel=0, segs=1)
    for sx in (-0.3, 0.3):
        box((0.5, 0.1, 0.16), (sx * w, -d / 2 - 0.03, layers * 0.5 - 0.25), DARK, bevel=0.03)
    return finish(name)

gym_mat('G_mat', 4.0, 3.0, 2)
gym_mat('G_matTall', 3.0, 4.0, 4)

box((1.2, 1.2, 0.12), (0, 0, 0.06), ORANGE, bevel=0.04)                   # traffic cone
lathe([(0.55, 0.1), (0.5, 0.16), (0.12, 1.16), (0.07, 1.2), (0, 1.2)], ORANGE, steps=16)
lathe([(0.405, 0.42), (0.415, 0.42), (0.315, 0.68), (0.305, 0.68)], WHITE, steps=16)
finish('G_cone')

for sx in (-1.4, 1.4):                               # ball cart
    for sy in (-0.9, 0.9):
        rod(0.07, (sx, sy, 0.25), (sx * 1.07, sy * 1.1, 1.75), GREY, verts=8)
        uvs(0.2, (sx, sy, 0.2), DARK, seg=10, rings=6)
for z, k in ((0.85, 1.0), (1.75, 1.07)):
    tube([(-1.4 * k, -0.9 * k * 1.03, z), (1.4 * k, -0.9 * k * 1.03, z), (1.4 * k, 0.9 * k * 1.03, z), (-1.4 * k, 0.9 * k * 1.03, z), (-1.4 * k, -0.9 * k * 1.03, z)], 0.07, TEAL, sides=8)
box((2.7, 1.7, 0.08), (0, 0, 0.85), NAVY, bevel=0.02)
for k in range(6):
    uvs(0.46, ((k % 3 - 1) * 0.92, (k // 3 - 0.5) * 0.9, 1.35), [ORANGE, RED, BLUE][k % 3], seg=14, rings=10)
uvs(0.46, (0.3, 0, 1.95), ORANGE, seg=14, rings=10)
finish('G_ballcart')

for k in range(3):                                   # vaulting box
    box((3.4 - k * 0.24, 2.2 - k * 0.2, 0.62), (0, 0, 0.31 + k * 0.62), WOOD if k % 2 == 0 else WOOD_L, bevel=0.06)
    for sx in (-1, 1):
        box((0.5, 0.12, 0.2), (sx * 0.9, -(2.2 - k * 0.2) / 2, 0.35 + k * 0.62), DARK, bevel=0.04)
box((3.0, 1.9, 0.26), (0, 0, 1.97), TEAL, bevel=0.1, segs=3)
finish('G_vault')

box((6.0, 0.3, 4.0), (0, 0, 0), WHITE, bevel=0.1)                         # hoop, rim on +Y; origin = backboard centre
for sx in (-1, 1):
    box((0.14, 0.34, 1.6), (sx * 1.0, -0.0, -0.7), ORANGE, bevel=0.02)
    box((0.16, 0.34, 4.0), (sx * 2.92, 0, 0), TEAL, bevel=0.03)
box((2.14, 0.34, 0.14), (0, 0, 0.03), ORANGE, bevel=0.02)
box((2.14, 0.34, 0.14), (0, 0, -1.43), ORANGE, bevel=0.02)
box((0.5, 0.5, 0.3), (0, 0.3, -1.5), ORANGE_D, bevel=0.05)
torus(1.1, 0.09, (0, 1.55, -1.5), ORANGE, seg=24, mseg=8)
for i in range(10):
    a = i / 10 * math.tau
    rod(0.03, (cos(a) * 1.08, 1.55 + sin(a) * 1.08, -1.5), (cos(a + 0.3) * 0.62, 1.55 + sin(a + 0.3) * 0.62, -3.0), WHITE, verts=5)
    rod(0.03, (cos(a) * 1.08, 1.55 + sin(a) * 1.08, -1.5), (cos(a - 0.3) * 0.62, 1.55 + sin(a - 0.3) * 0.62, -3.0), WHITE, verts=5)
finish('G_hoop')

box((9.0, 0.5, 4.2), (0, 0, 0), NAVY, bevel=0.15)                          # scoreboard (front -Y)
box((8.4, 0.52, 0.7), (0, -0.02, 1.5), CREAM, bevel=0.05)
SEG = {'0': 'abcdef', '1': 'bc', '2': 'abged', '3': 'abgcd', '7': 'abc', '8': 'abcdefg'}
def digit(ch, x, z, m, s=1.0):
    P = {'a': (0, 0.8, 0.6, 0.14), 'g': (0, 0, 0.6, 0.14), 'd': (0, -0.8, 0.6, 0.14), 'f': (-0.37, 0.4, 0.14, 0.66),
         'b': (0.37, 0.4, 0.14, 0.66), 'e': (-0.37, -0.4, 0.14, 0.66), 'c': (0.37, -0.4, 0.14, 0.66)}
    for k in SEG[ch]:
        px, pz, w, h = P[k]
        box((w * s, 0.1, h * s), (x + px * s, -0.27, z + pz * s), m, bevel=0.02, segs=1)
digit('1', -3.3, -0.4, GLOW_T); digit('2', -2.1, -0.4, GLOW_T); digit('0', 2.1, -0.4, GLOW_O); digit('8', 3.3, -0.4, GLOW_O)
digit('3', 0, -0.5, GLOW, 0.7)
finish('G_scoreboard')

# ================================================================ TOY STORE
box((1.5, 12.0, 0.25), (0, 0, 0.125), TEAL, bevel=0.06)                   # shelf aisle 1.6 x 12 x 3.4 (long side on Y)
box((0.14, 11.8, 3.2), (0, 0, 1.75), CREAM, bevel=0.03)
for y in (-5.92, 5.92):
    box((1.6, 0.16, 3.4), (0, y, 1.7), CREAM, bevel=0.05)
for r in range(3):
    box((1.56, 11.8, 0.12), (0, 0, 1.25 + r * 1.05), CREAM, bevel=0.03, segs=1)
box((1.6, 12.0, 0.14), (0, 0, 3.33), TEAL, bevel=0.04)
for sx in (-1, 1):
    for r in range(3):
        for k in range(6):
            m = TOYC[(r * 3 + k + (sx > 0)) % 7]
            z0 = 0.25 + r * 1.05 if r == 0 else 1.31 + (r - 1) * 1.05
            h = 0.86 - ((k + r) % 3) * 0.08
            box((0.6, 1.6, h), (sx * 0.42, -5 + k * 2, z0 + h / 2), m, bevel=0.05, segs=1)
            box((0.06, 1.1, h * 0.55), (sx * 0.73, -5 + k * 2, z0 + h * 0.5), CREAM if (k + r) % 2 else GLASS, bevel=0.015, segs=1)
finish('T_shelf')

uvs(1.7, (0, 0, 1.45), DUCK, seg=20, rings=14, scale=(1, 1.08, 0.85))     # giant rubber duck, faces +Y
uvs(1.08, (0, 0.8, 3.15), DUCK, seg=18, rings=12)
uvs(0.8, (0, -1.5, 2.0), DUCK, seg=12, rings=8, scale=(0.7, 0.9, 0.7))
for sx in (-1, 1):
    uvs(0.9, (sx * 1.3, -0.2, 1.6), DUCK, seg=12, rings=8, scale=(0.4, 1.1, 0.7))
    uvs(0.17, (sx * 0.45, 1.68, 3.45), DARK, seg=10, rings=6)
    uvs(0.06, (sx * 0.47, 1.82, 3.5), WHITE, seg=6, rings=4)
box((0.95, 0.9, 0.18), (0, 1.95, 3.05), ORANGE, bevel=0.08, segs=3)
box((0.8, 0.7, 0.14), (0, 1.85, 2.88), ORANGE_D, bevel=0.06, segs=3)
finish('T_duck')

def brick(name, m, nx, ny, h, layers=1):
    for L in range(layers):
        box((nx * 0.8, ny * 0.8, h), (0, 0, h / 2 + L * h), m, bevel=0.05)
    for i in range(nx):
        for j in range(ny):
            cyl(0.26, 0.2, ((i - (nx - 1) / 2) * 0.8, (j - (ny - 1) / 2) * 0.8, h * layers + 0.1), m, verts=12, bevel=0.04)
    return finish(name)

brick('T_brickRed', RED, 4, 2, 1.2)
brick('T_brickBlue', BLUE, 4, 2, 1.2)
brick('T_brickTall', YELLOW, 2, 2, 1.2, layers=2)

uvs(1.5, (0, 0, 1.5), FUR, seg=18, rings=12, scale=(1, 0.92, 1))           # teddy bear, faces -Y
uvs(1.0, (0, -1.0, 1.45), FUR_L, seg=14, rings=10, scale=(1, 0.5, 1))
uvs(1.1, (0, -0.1, 3.5), FUR, seg=18, rings=12)
uvs(0.5, (0, -0.95, 3.3), FUR_L, seg=12, rings=8, scale=(1, 0.8, 0.8))
uvs(0.16, (0, -1.38, 3.42), DARK, seg=8, rings=6)
for sx in (-1, 1):
    uvs(0.42, (sx * 0.8, -0.05, 4.4), FUR, seg=12, rings=8, scale=(1, 0.6, 1))
    uvs(0.24, (sx * 0.8, -0.22, 4.4), FUR_L, seg=10, rings=6, scale=(1, 0.5, 1))
    uvs(0.13, (sx * 0.42, -0.98, 3.72), DARK, seg=8, rings=6)
    capsule(0.42, (sx * 1.2, -0.2, 2.5), (sx * 1.75, -0.75, 1.5), FUR)
    capsule(0.5, (sx * 0.8, -0.5, 0.55), (sx * 1.05, -1.5, 0.5), FUR)
    uvs(0.36, (sx * 1.08, -1.9, 0.5), FUR_L, seg=10, rings=6, scale=(1, 0.4, 1))
    box((0.7, 0.22, 0.5), (sx * 0.5, -0.92, 2.65), TEAL, bevel=0.1, rot=(0, sx * 0.3, 0))
uvs(0.2, (0, -1.0, 2.65), TEAL_D, seg=8, rings=6)
finish('T_teddy')

lathe([(0, 0), (0.1, 0.12), (0.9, 0.9), (1.2, 1.15), (0.9, 1.4), (0.3, 1.5), (0.14, 1.9), (0.2, 2.0), (0, 2.02)], TEAL, steps=20)   # spinning top
lathe([(1.0, 0.99), (1.21, 1.15), (1.0, 1.32), (1.21, 1.15)], ORANGE, steps=20)
lathe([(0.52, 0.53), (0.7, 0.7), (0.72, 0.72), (0.54, 0.55)], CREAM, steps=20)
finish('T_top')

box((1.5, 1.9, 0.22), (0, 0, 0.42), DARK, bevel=0.05)                     # closed train cargo car (top = 1.0)
box((1.46, 1.84, 0.5), (0, 0, 0.76), TEAL, bevel=0.08)
box((1.5, 0.12, 0.52), (0, 0, 0.76), ORANGE, bevel=0.02)
box((0.6, 0.6, 0.02), (0, 0.5, 1.012), CREAM, bevel=0)
for sx in (-0.8, 0.8):
    for sy in (-0.6, 0.6):
        cyl(0.28, 0.16, (sx, sy, 0.28), DARK, verts=14, rot=(0, R(90), 0), bevel=0.03)
        cyl(0.12, 0.18, (sx, sy, 0.28), YELLOW, verts=10, rot=(0, R(90), 0), bevel=0.02)
finish('T_car')

# ================================================================ GREENHOUSE
box((10.0, 2.0, 0.94), (0, 0, 0.47), WOOD, bevel=0.06)                    # raised planter 10 x 2 x 1
for z in (0.3, 0.7):
    box((10.06, 2.06, 0.05), (0, 0, z), WOOD_D, bevel=0, segs=1)
for sx in (-4.9, 4.9):
    for sy in (-0.9, 0.9):
        box((0.26, 0.26, 1.0), (sx, sy, 0.5), WOOD_D, bevel=0.05)
box((9.6, 1.7, 0.1), (0, 0, 0.93), SOIL, bevel=0.03)
for k in range(9):
    x, y = -4 + k, (k % 2 - 0.5) * 0.6
    if k % 2:
        rod(0.05, (x, y, 0.95), (x, y, 1.9), GREEN, verts=6)
        uvs(0.26, (x, y, 2.0), [PINK, YELLOW, ORANGE, WHITE, RED][k % 5], seg=10, rings=6, scale=(1, 1, 0.8))
        for a in (0.4, 2.6, 4.4):
            ico(0.28, (x + cos(a) * 0.25, y + sin(a) * 0.25, 1.25), GREEN_L, scale=(1, 0.5, 0.5))
    else:
        for j, a in enumerate((0, 1.3, 2.5, 3.8, 5.0)):
            ico(0.34, (x + cos(a) * 0.22, y + sin(a) * 0.22, 1.2 + (j % 2) * 0.28), [GREEN, GREEN_L, GREEN_D][(k + j) % 3], scale=(0.75, 0.75, 1.3))
finish('H_planter')

def pot(name, kind):
    lathe([(0, 0), (1.05, 0), (1.15, 0.1), (1.5, 2.0), (1.68, 2.02), (1.7, 2.38), (1.45, 2.4), (1.4, 2.15), (0, 2.15)], TERRA, steps=20)
    cyl(1.71, 0.12, (0, 0, 2.12), TERRA_D, verts=20, bevel=0.03)
    cyl(1.4, 0.1, (0, 0, 2.2), SOIL, verts=20, bevel=0)
    if kind == 'bush':
        for j, (x, y, z, r) in enumerate([(0, 0, 3.3, 1.5), (0.8, 0.3, 3.9, 0.95), (-0.7, -0.4, 3.8, 1.0), (0.1, -0.6, 4.2, 0.8), (-0.3, 0.7, 2.9, 0.9)]):
            ico(r, (x, y, z), [GREEN, GREEN_L, GREEN_D][j % 3], sub=2)
        for j, a in enumerate((0.3, 1.9, 3.4, 4.9)):
            uvs(0.24, (cos(a) * 1.25, sin(a) * 1.25, 3.5 + (j % 2) * 0.7), [PINK, YELLOW, ORANGE, WHITE][j], seg=8, rings=6)
    else:
        for j in range(7):
            a = j / 7 * math.tau
            tip = Vector((cos(a) * 1.7, sin(a) * 1.7, 3.4 + (j % 3) * 0.45))
            rod(0.07, (0, 0, 2.2), tip, GREEN_D, verts=6)
            ico(0.75, tip, [GREEN, GREEN_L][j % 2], sub=2, scale=(1, 1, 0.22))
        rod(0.08, (0, 0, 2.2), (0, 0, 4.2), GREEN_D, verts=6)
        ico(0.7, (0, 0, 4.3), GREEN_L, sub=2, scale=(1, 1, 0.3))
    return finish(name)

pot('H_potBush', 'bush')
pot('H_potLeafy', 'leafy')

box((2.5, 8.0, 0.2), (0, 0, 1.5), WOOD_L, bevel=0.05)                     # potting bench 2.5 x 8 x 1.6
box((2.3, 7.6, 0.14), (0, 0, 0.5), WOOD, bevel=0.04)
for sx in (-1.1, 1.1):
    for sy in (-3.8, 3.8):
        box((0.26, 0.26, 1.5), (sx, sy, 0.75), WOOD_D, bevel=0.05)
for i, y in enumerate((-2.9, -1.9, 2.0)):
    lathe([(0, 0), (0.34, 0), (0.5, 0.75), (0.56, 0.78), (0.56, 0.9), (0, 0.9)], TERRA, loc=(0.2 * (i - 1), y, 1.6), steps=12)
    ico(0.45, (0.2 * (i - 1), y, 2.75), [GREEN_L, GREEN, GREEN_D][i], sub=1)
lathe([(0, 0), (0.55, 0), (0.6, 0.1), (0.6, 0.9), (0.5, 1.0), (0, 1.0)], TEAL, loc=(0.2, 0.4, 1.6), steps=16)     # watering can
rod(0.1, (0.2, 0.9, 1.8), (0.2, 1.7, 2.6), TEAL, verts=8)
cyl(0.24, 0.12, (0.2, 1.74, 2.64), TEAL_D, verts=10, rot=(R(-45), 0, 0))
torus(0.38, 0.07, (0.2, -0.25, 2.25), TEAL_D, rot=(0, R(90), 0), seg=14, mseg=6)
for i, y in enumerate((-2.6, -1.2, 0.6, 2.4)):
    lathe([(0, 0), (0.4, 0), (0.5, 0.5), (0.5, 0.56), (0, 0.56)], TERRA_D if i % 2 else TERRA, loc=(-0.2, y, 0.57), steps=12)
box((0.9, 1.3, 0.7), (0.3, 3.1, 1.95), CREAM, bevel=0.15)                # seed bag
box((0.92, 0.6, 0.3), (0.3, 3.1, 1.95), GREEN, bevel=0.03)
finish('H_bench')

lathe([(0, -0.2), (0.4, -0.15), (0.85, 0.2), (0.95, 0.65), (0.9, 0.7), (0, 0.7)], WOOD_D, loc=(0, 0, -0.9), steps=14)    # hanging basket, origin at the plant
for j, (x, y, z, r) in enumerate([(0, 0, 0.1, 0.9), (0.6, 0.2, -0.3, 0.55), (-0.55, -0.3, -0.35, 0.55), (0.1, -0.6, -0.5, 0.45), (-0.2, 0.65, -0.45, 0.45)]):
    ico(r, (x, y, z), [GREEN, GREEN_L, GREEN_D][j % 3], sub=1)
for j, a in enumerate((0.5, 2.2, 4.0, 5.4)):
    uvs(0.2, (cos(a) * 0.75, sin(a) * 0.75, 0.25), [PINK, YELLOW, ORANGE, WHITE][j], seg=8, rings=6)
for i in range(3):
    a = i / 3 * math.tau
    rod(0.025, (cos(a) * 0.9, sin(a) * 0.9, -0.2), (0, 0, 2.2), DARK, verts=5)
rod(0.025, (0, 0, 2.2), (0, 0, 6.0), DARK, verts=5)
finish('H_basket')

lathe([(0, 0), (2.25, 0), (2.4, 0.15), (2.3, 0.95), (2.4, 1.05), (2.35, 1.2), (1.95, 1.2), (1.9, 0.5), (0, 0.5)], STONE, steps=24)   # fountain bed (top 1.2)
cyl(1.92, 0.1, (0, 0, 1.02), WATER, verts=24, bevel=0)
lathe([(0, 0.5), (0.5, 0.5), (0.3, 1.5), (0.9, 1.9), (0.95, 2.05), (0.2, 2.0), (0.16, 2.6), (0, 2.65)], STONE, steps=16)
cyl(0.8, 0.06, (0, 0, 1.98), WATER, verts=16, bevel=0)
for i in range(6):
    a = i / 6 * math.tau
    tube([(cos(a) * 0.1, sin(a) * 0.1, 2.6), (cos(a) * 0.4, sin(a) * 0.4, 2.75), (cos(a) * 0.7, sin(a) * 0.7, 2.0)], 0.04, WATER, sides=6)
finish('H_fountain')

# ================================================================ ARCADE
for sx in (-1.12, 1.12):                             # game cabinet 2.4 x 2.2 x 4.2, front -Y
    box((0.16, 2.2, 4.2), (sx, 0, 2.1), NAVY, bevel=0.05)
    box((0.18, 1.5, 0.3), (sx, 0.1, 1.0), TEAL, bevel=0.02, rot=(R(-20), 0, 0))
    box((0.18, 1.5, 0.3), (sx, 0.1, 1.5), ORANGE, bevel=0.02, rot=(R(-20), 0, 0))
box((2.1, 1.9, 4.0), (0, 0.12, 2.0), DARK, bevel=0.05)
box((2.1, 0.3, 0.7), (0, -0.92, 3.8), CREAM, bevel=0.06)                 # marquee (the game tints it)
box((2.1, 0.16, 1.7), (0, -0.82, 2.75), DARK, bevel=0.04, rot=(R(-10), 0, 0))
box((1.8, 0.1, 1.4), (0, -0.92, 2.75), SCREEN, bevel=0.06, rot=(R(-10), 0, 0))
box((2.1, 0.75, 0.2), (0, -0.98, 1.82), GREY, bevel=0.05, rot=(R(12), 0, 0))
rod(0.045, (-0.5, -1.05, 1.9), (-0.5, -1.08, 2.25), CHROME, verts=6)
uvs(0.13, (-0.5, -1.08, 2.3), RED, seg=10, rings=6)
for i, m in enumerate((YELLOW, TEAL, ORANGE)):
    cyl(0.1, 0.08, (0.2 + i * 0.3, -1.1 + (i % 2) * 0.12, 1.96), m, verts=10, bevel=0.02, rot=(R(12), 0, 0))
box((2.1, 0.1, 1.5), (0, -0.84, 0.9), NAVY, bevel=0.03)
box((0.5, 0.06, 0.7), (0, -0.9, 0.9), GREY, bevel=0.03)
box((0.08, 0.08, 0.26), (0, -0.93, 1.0), GLOW_O, bevel=0.01)
finish('C_cabinet')

box((6.0, 3.4, 0.5), (0, 0, 0.72), NAVY, bevel=0.14)                      # air hockey 6 x 3.4 x 1.0
box((5.5, 2.9, 0.06), (0, 0, 0.955), WHITE, bevel=0.01)
for s2, m in ((1, TEAL), (-1, ORANGE)):
    box((2.9, 0.22, 0.14), (s2 * 1.5, 1.58, 0.93), m, bevel=0.04)
    box((2.9, 0.22, 0.14), (s2 * 1.5, -1.58, 0.93), m, bevel=0.04)
    box((0.22, 3.38, 0.14), (s2 * 2.88, 0, 0.93), m, bevel=0.04)
    box((0.3, 1.1, 0.16), (s2 * 2.88, 0, 0.93), DARK, bevel=0.03)
    cyl(0.28, 0.1, (s2 * 1.6, 0.4 * s2, 0.99), m, verts=14, bevel=0.02)
    cyl(0.12, 0.2, (s2 * 1.6, 0.4 * s2, 1.02), m, verts=10, bevel=0.03)
box((0.06, 2.9, 0.02), (0, 0, 0.99), RED, bevel=0)
torus(0.6, 0.025, (0, 0, 0.99), RED, seg=20, mseg=4)
cyl(0.16, 0.05, (0.5, -0.6, 1.0), YELLOW, verts=12, bevel=0.01)
for sx in (-2.5, 2.5):
    for sy in (-1.3, 1.3):
        box((0.4, 0.4, 0.5), (sx, sy, 0.25), DARK, bevel=0.08)
finish('C_hockey')

box((3.0, 3.0, 1.5), (0, 0, 0.75), ORANGE, bevel=0.14)                    # claw machine 3 x 3 x 4.5
box((2.7, 2.7, 2.4), (0, 0, 2.7), GLASS, bevel=0.04)
for sx in (-1.38, 1.38):
    for sy in (-1.38, 1.38):
        box((0.22, 0.22, 2.5), (sx, sy, 2.7), NAVY, bevel=0.05)
box((3.0, 3.0, 0.6), (0, 0, 4.2), TEAL, bevel=0.12)
box((2.2, 0.1, 0.34), (0, -1.5, 4.2), GLOW, bevel=0.04)
box((2.4, 2.4, 0.06), (0, 0, 1.52), CREAM, bevel=0)
for k in range(7):
    uvs(0.4, ((k % 3 - 1) * 0.72, (k // 3 - 0.9) * 0.72, 1.9), TOYC[k], seg=10, rings=8)
uvs(0.4, (0.2, 0.1, 2.5), PINK, seg=10, rings=8)
rod(0.04, (0.3, 0.2, 3.9), (0.3, 0.2, 3.35), GREY, verts=6)
for i in range(3):
    a = i / 3 * math.tau
    tube([(0.3, 0.2, 3.35), (0.3 + cos(a) * 0.3, 0.2 + sin(a) * 0.3, 3.2), (0.3 + cos(a) * 0.2, 0.2 + sin(a) * 0.2, 2.95)], 0.035, GREY, sides=6)
box((1.4, 0.3, 0.3), (0.5, -1.55, 1.25), NAVY, bevel=0.06)
rod(0.04, (0.2, -1.6, 1.4), (0.2, -1.62, 1.7), CHROME, verts=6)
uvs(0.11, (0.2, -1.62, 1.75), RED, seg=8, rings=6)
box((0.8, 0.1, 0.5), (-0.8, -1.5, 0.6), DARK, bevel=0.03)
finish('C_claw')

box((8.0, 1.6, 1.2), (0, 0, 0.6), TEAL, bevel=0.1)                        # ticket counter 8 x 1.6 x 1.4
box((8.2, 1.8, 0.2), (0, 0, 1.3), CREAM, bevel=0.06)
for i in range(8):
    box((0.5, 0.06, 0.9), (-3.5 + i, -0.8, 0.6), ORANGE if i % 2 else YELLOW, bevel=0.02, segs=1)
box((7.6, 0.08, 0.5), (0, 0.8, 0.6), NAVY, bevel=0.02)
finish('C_counter')

cyl(1.6, 2.2, (0, 0, 1.1), DARK, verts=8, bevel=0.1, rot=(0, 0, R(22.5)))  # centre podium (top 2.4)
cyl(1.5, 0.2, (0, 0, 2.3), NAVY, verts=8, bevel=0.05, rot=(0, 0, R(22.5)))
torus(1.05, 0.08, (0, 0, 2.4), GLOW, seg=28, mseg=6)
for z, m in ((0.5, GLOW_T), (1.5, GLOW_O)):
    torus(1.5, 0.07, (0, 0, z), m, seg=8, mseg=6, rot=(0, 0, R(22.5)))
star(0.7, 0.06, (0, 0, 2.42), GLOW_P)
finish('C_podium')

# ================================================================ ATTIC
def carton(name, w, d, h, open_flaps=False, label=None):
    box((w, d, h - 0.02), (0, 0, (h - 0.02) / 2), CARD, bevel=0.05)
    if open_flaps:
        box((w - 0.1, d - 0.1, 0.04), (0, 0, h - 0.3), CARD_D, bevel=0)
        for sx in (-1, 1):
            box((w * 0.5, d, 0.05), (sx * (w / 2 + w * 0.2), 0, h + 0.1), CARD, bevel=0.02, rot=(0, -sx * R(28), 0))
    else:
        box((w * 0.18, d + 0.02, 0.03), (0, 0, h - 0.015), TAPE, bevel=0)
        for sy in (-1, 1):
            box((w * 0.18, 0.03, h * 0.3), (0, sy * (d / 2 + 0.005), h * 0.85), TAPE, bevel=0)
        box((0.02, d, 0.02), (0, 0, h - 0.005), CARD_D, bevel=0)
    if label:
        box((w * 0.4, 0.03, h * 0.28), (-w * 0.18, -d / 2 - 0.005, h * 0.45), CREAM, bevel=0)
        box((w * 0.3, 0.04, h * 0.05), (-w * 0.18, -d / 2 - 0.006, h * 0.5), label, bevel=0)
        box((w * 0.3, 0.03, h * 0.28), (w * 0.2, d / 2 + 0.005, h * 0.5), CREAM, bevel=0)
    return finish(name)

carton('A_box1', 3.0, 2.4, 2.2, label=ORANGE)
carton('A_box2', 2.6, 2.2, 1.2, label=TEAL)
carton('A_box3', 3.0, 3.0, 3.4, label=TEAL)
carton('A_box4', 2.4, 2.4, 1.1, open_flaps=True)

box((4.0, 2.4, 1.3), (0, 0, 0.65), WOOD_D, bevel=0.1)                     # old trunk 4 x 2.4 x 2.0
cyl(1.0, 3.9, (0, 0, 1.22), WOOD, verts=20, rot=(0, R(90), 0), bevel=0.08)
box((4.0, 2.4, 0.3), (0, 0, 1.3), WOOD, bevel=0.08)
for sx in (-1.4, 0, 1.4):
    box((0.24, 2.48, 1.36), (sx, 0, 0.68), BRASS, bevel=0.04)
    cyl(1.04, 0.24, (sx, 0, 1.22), BRASS, verts=20, rot=(0, R(90), 0), bevel=0.03)
box((0.5, 0.14, 0.6), (0, -1.24, 1.2), BRASS, bevel=0.05)
cyl(0.09, 0.2, (0, -1.3, 1.1), DARK, verts=8, rot=(R(90), 0, 0))
for sx in (-2.02, 2.02):
    torus(0.3, 0.06, (sx, 0, 0.9), DARK, rot=(0, R(90), 0), seg=12, mseg=6)
    for sy in (-1.12, 1.12):
        box((0.2, 0.3, 0.3), (sx * 0.985, sy, 0.15), BRASS, bevel=0.04)
finish('A_trunk')

cyl(0.5, 7.8, (0, 0, 0.5), RUG, verts=16, rot=(0, R(90), 0), bevel=0.06)   # rolled-up rug, 8 long
for sx in (-1, 1):
    for r in (0.38, 0.25, 0.12):
        torus(r, 0.05, (sx * 3.92, 0, 0.5), CREAM if r == 0.25 else TEAL_D, rot=(0, R(90), 0), seg=14, mseg=5)
    cyl(0.52, 0.12, (sx * 2.2, 0, 0.5), TAPE, verts=16, rot=(0, R(90), 0), bevel=0.02)
    for i in range(7):
        rod(0.03, (sx * 3.9, -0.42 + i * 0.14, 0.12), (sx * 4.1, -0.45 + i * 0.15, 0.03), CREAM, verts=4)
finish('A_rug')

box((2.8, 2.8, 10.0), (0, 0, 5.0), MORTAR, bevel=0)                       # brick chimney 3 x 3 x 10
for c in range(20):
    z = 0.25 + c * 0.5
    for side in range(4):
        for i in range(3):
            u = -1.0 + i * 1.0 + (0.5 if c % 2 else 0.0)
            if u > 1.3:
                continue
            m = BRICK[(c * 5 + side * 3 + i * 7) % 3]
            if side == 0:
                box((0.94, 0.3, 0.44), (u, -1.36, z), m, bevel=0.04, segs=1)
            elif side == 1:
                box((0.94, 0.3, 0.44), (-u, 1.36, z), m, bevel=0.04, segs=1)
            elif side == 2:
                box((0.3, 0.94, 0.44), (1.36, u, z), m, bevel=0.04, segs=1)
            else:
                box((0.3, 0.94, 0.44), (-1.36, -u, z), m, bevel=0.04, segs=1)
finish('A_chimney')

for sy in (-0.5, 0.5):                               # rocking horse (long side on X, head at +X); pivot on the floor
    tube([(cos(pi * (1.2 + 0.6 * i / 12)) * 2.6, sy, 2.62 + sin(pi * (1.2 + 0.6 * i / 12)) * 2.6) for i in range(13)], 0.13, WOOD_L)
    for sx in (-0.8, 0.8):
        capsule(0.17, (sx, sy * 0.8, 1.5), (sx * 1.35, sy, 0.3), RED)
for sx in (-1.1, 1.1):
    rod(0.07, (sx, -0.5, 0.2), (sx, 0.5, 0.2), WOOD_L, verts=8)
uvs(0.6, (0, 0, 1.75), RED, seg=16, rings=10, scale=(2.2, 0.85, 0.9))
capsule(0.36, (0.95, 0, 1.95), (1.5, 0, 2.9), RED)
uvs(0.42, (1.85, 0, 3.0), RED, seg=12, rings=8, scale=(1.5, 0.8, 0.8))
for sy in (-0.2, 0.2):
    box((0.12, 0.1, 0.34), (1.45, sy, 3.4), RED, bevel=0.04)
    uvs(0.07, (2.0, sy * 1.5, 3.12), DARK, seg=8, rings=6)
for i in range(5):
    uvs(0.2, (1.42 - i * 0.14, 0, 3.2 - i * 0.27), CREAM, seg=8, rings=6)
tube([(-1.25, 0, 1.9), (-1.7, 0, 1.9), (-1.95, 0, 1.2)], lambda t: 0.16 - 0.08 * t, CREAM)
box((0.9, 0.9, 0.16), (0, 0, 2.3), TEAL, bevel=0.07)
box((0.5, 0.94, 0.1), (0, 0, 2.2), BRASS, bevel=0.03)
rod(0.05, (1.55, -0.6, 2.75), (1.55, 0.6, 2.75), WOOD_L, verts=8)
finish('A_horse')

for i in range(3):                                   # dress form 1.6 x 1.6 x 4
    a = i / 3 * math.tau + 0.4
    rod(0.07, (0, 0, 0.5), (cos(a) * 0.75, sin(a) * 0.75, 0.05), WOOD_D, verts=8)
rod(0.08, (0, 0, 0.4), (0, 0, 2.0), WOOD_D, verts=8)
lathe([(0, 1.9), (0.55, 1.9), (0.72, 2.1), (0.62, 2.7), (0.5, 3.0), (0.8, 3.45), (0.72, 3.7), (0.3, 3.82), (0.22, 3.95), (0, 3.97)], LINEN, steps=16)
bpy.context.object.scale = (1.1, 0.75, 1)
cyl(0.24, 0.1, (0, 0, 4.0), WOOD, verts=12, bevel=0.03)
tube([(0.79, 0, 3.4), (0.2, -0.56, 2.9), (-0.66, 0, 2.6)], 0.035, YELLOW, sides=6)   # tape measure sash
finish('A_dressform')

torus(2.4, 0.3, (0, 0, 0), WOOD_D, rot=(R(90), 0, 0), seg=28, mseg=8)        # round window (front -Y)
cyl(2.4, 0.1, (0, 0.05, 0), GLOW, verts=28, rot=(R(90), 0, 0), bevel=0)
box((4.7, 0.2, 0.2), (0, -0.05, 0), WOOD_D, bevel=0.05)
box((0.2, 0.2, 4.7), (0, -0.05, 0), WOOD_D, bevel=0.05)
finish('A_window')

# ================================================================ BEACH BOARDWALK
for i in range(3):                                   # bench 5 x 1.6 x 1.0, back on +Y
    box((5.0, 0.44, 0.14), (0, -0.52 + i * 0.52, 0.93), TEAL if i != 1 else TEAL_D, bevel=0.04)
for i in range(2):
    box((5.0, 0.12, 0.5), (0, 0.72 + i * 0.07, 1.55 + i * 0.62), TEAL if i == 0 else TEAL_D, bevel=0.04, rot=(R(-8), 0, 0))
for sx in (-2.1, 2.1):
    box((0.2, 1.6, 0.14), (sx, 0, 0.07), WHITE, bevel=0.04)
    for sy in (-0.6, 0.6):
        box((0.18, 0.18, 0.86), (sx, sy, 0.43), WHITE, bevel=0.04)
    box((0.2, 1.6, 0.12), (sx, 0, 0.82), WHITE, bevel=0.04)
    tube([(sx, 0.62, 0.82), (sx, 0.72, 1.6), (sx, 0.84, 2.5)], 0.09, WHITE, sides=8)
    tube([(sx, -0.7, 0.9), (sx, -0.72, 1.4), (sx, 0.7, 1.45)], 0.07, WHITE, sides=8)
finish('B_bench')

lathe([(0, 0), (0.66, 0), (0.7, 0.1), (0.78, 1.9), (0.7, 1.95), (0, 1.95)], DARK, steps=16)     # trash can 1.5 x 2.2
for i in range(12):
    a = i / 12 * math.tau
    rod(0.09, (cos(a) * 0.71, sin(a) * 0.71, 0.12), (cos(a) * 0.79, sin(a) * 0.79, 1.9), TEAL, verts=6)
torus(0.79, 0.09, (0, 0, 1.95), TEAL_D, seg=20, mseg=6)
torus(0.73, 0.07, (0, 0, 0.9), TEAL_D, seg=20, mseg=6)
lathe([(0.8, 2.0), (0.6, 2.18), (0.25, 2.2), (0.25, 2.12)], WHITE, steps=16)
finish('B_trash')

lathe([(0, 0), (0.34, 0), (0.36, 0.2), (0.18, 0.5), (0.13, 1.0), (0.11, 5.2), (0.3, 5.35), (0.3, 5.45), (0, 5.45)], NAVY, steps=12)   # lamp post, 6 tall
uvs(0.42, (0, 0, 5.8), GLOW, seg=14, rings=10)
lathe([(0.34, 6.05), (0.14, 6.25), (0, 6.3)], NAVY, steps=12)
finish('B_lamp')

def umbrella(name, m):
    rod(0.08, (0, 0, 0), (0, 0, 5.3), WHITE, verts=8)
    fan(8, 3.2, 4.1, 5.2, [m, WHITE], wob=0.04)
    uvs(0.14, (0, 0, 5.32), m, seg=8, rings=6)
    return finish(name)

umbrella('B_umbrellaRed', RED)
umbrella('B_umbrellaTeal', TEAL)

def towel(name, a, b):
    for i in range(8):
        box((2.4, 0.5, 0.05), (0, -1.75 + i * 0.5, 0.03), a if i % 2 == 0 else b, bevel=0.015, segs=1)
    return finish(name)

towel('B_towelOrange', ORANGE, CREAM)
towel('B_towelTeal', TEAL, CREAM)

box((3.0, 3.0, 1.2), (0, 0, 0.6), SAND, bevel=0.14)                       # sandcastle 3 x 3 x 1.2 (+ towers)
box((0.8, 0.12, 0.8), (0, -1.5, 0.4), SAND_D, bevel=0.1)
cyl(0.4, 0.14, (0, -1.5, 0.8), SAND_D, verts=12, rot=(R(90), 0, 0), bevel=0)
for sx in (-1.2, 1.2):
    for sy in (-1.2, 1.2):
        cyl(0.5, 0.9, (sx, sy, 1.6), SAND, verts=12, bevel=0.05, r2=0.44)
        for i in range(4):
            a = i / 4 * math.tau + 0.4
            box((0.24, 0.24, 0.24), (sx + cos(a) * 0.33, sy + sin(a) * 0.33, 2.15), SAND_D, bevel=0.04, segs=1)
cyl(0.72, 1.2, (0, 0, 1.8), SAND, verts=14, bevel=0.06, r2=0.6)
cyl(0.62, 0.7, (0, 0, 2.75), SAND_D, verts=14, bevel=0, r2=0.05)
rod(0.03, (0, 0, 3.0), (0, 0, 3.9), WOOD_D, verts=5)
box((0.5, 0.03, 0.3), (0.27, 0, 3.72), ORANGE, bevel=0)
finish('B_castle')

def cooler(name, m):
    box((2.0, 1.4, 0.86), (0, 0, 0.43), m, bevel=0.1)
    box((2.06, 1.46, 0.32), (0, 0, 1.04), WHITE, bevel=0.1)
    box((2.02, 1.42, 0.08), (0, 0, 0.6), WHITE, bevel=0.02)
    tube([(-1.03, 0, 0.75), (-1.2, 0, 1.2), (0, 0, 1.55), (1.2, 0, 1.2), (1.03, 0, 0.75)], 0.06, DARK, sides=6)
    return finish(name)

cooler('B_coolerBlue', BLUE)
cooler('B_coolerRed', RED)

box((5.0, 2.0, 2.0), (0, 0, 1.0), YELLOW, bevel=0.1)                      # lemonade stand 5 x 2 x 2.2, front -Y
box((5.3, 2.3, 0.2), (0, 0, 2.1), WOOD_L, bevel=0.06)
for i in range(5):
    box((0.1, 0.06, 1.7), (-2.0 + i, -1.0, 1.0), ORANGE, bevel=0, segs=1)
for sx in (-2.45, 2.45):
    rod(0.09, (sx, 0.85, 2.2), (sx, 0.85, 4.2), WHITE, verts=8)
    rod(0.09, (sx, -0.85, 2.2), (sx, -0.85, 3.75), WHITE, verts=8)
for i in range(8):
    box((0.7, 2.7, 0.1), (-2.45 + i * 0.7, 0, 4.03), RED if i % 2 == 0 else WHITE, bevel=0.03, rot=(R(10), 0, 0), segs=1)
    cyl(0.35, 0.1, (-2.45 + i * 0.7, -1.33, 3.7), RED if i % 2 == 0 else WHITE, verts=12, rot=(R(90), 0, 0), bevel=0)
lathe([(0, 0), (0.4, 0), (0.48, 0.5), (0.36, 0.9), (0.4, 1.0), (0, 1.0)], GLASS, loc=(-1.4, -0.1, 2.2), steps=14)   # pitcher
lathe([(0, 0.04), (0.38, 0.04), (0.44, 0.5), (0.36, 0.75), (0, 0.75)], YELLOW, loc=(-1.4, -0.1, 2.2), steps=14)
torus(0.26, 0.05, (-0.95, -0.1, 2.75), GLASS, rot=(R(90), 0, 0), seg=12, mseg=5)
for i in range(3):
    lathe([(0, 0), (0.16, 0), (0.22, 0.5), (0, 0.5)], WHITE if i else TEAL, loc=(0.6 + i * 0.6, -0.3 + (i % 2) * 0.4, 2.2), steps=10)
for i in range(3):
    uvs(0.24, (-0.2 + (i % 2) * 0.4, 0.35 + (i // 2) * 0.3, 2.42 + (i // 2) * 0.3), YELLOW, seg=10, rings=8, scale=(1.2, 1, 1))
finish('B_stand')

for sx in (-1, 1):                                   # lifeguard chair 2.6 x 2.6 x 5.2
    for sy in (-1, 1):
        rod(0.12, (sx * 1.2, sy * 1.2, 0), (sx * 0.95, sy * 0.95, 4.9), WHITE, verts=8)
    rod(0.08, (sx * 1.14, -1.14, 1.2), (sx * 1.14, 1.14, 1.2), WHITE, verts=6)
    rod(0.1, (sx * 0.95, 0.95, 4.9), (sx * 0.95, 1.15, 7.0), WHITE, verts=8)
    box((0.2, 2.2, 0.16), (sx * 1.1, 0, 5.75), WHITE, bevel=0.05)
for i in range(5):
    rod(0.07, (-1.2 + i * 0.012, -1.2 + i * 0.05, 0.75 + i * 0.85), (1.2 - i * 0.012, -1.2 + i * 0.05, 0.75 + i * 0.85), WHITE, verts=6)
box((2.6, 2.6, 0.3), (0, 0, 5.0), RED, bevel=0.08)
box((2.6, 0.2, 1.9), (0, 1.08, 6.1), RED, bevel=0.07, rot=(R(-6), 0, 0))
box((1.3, 0.06, 0.34), (0, 0.95, 6.3), WHITE, bevel=0.02)
box((0.34, 0.06, 1.3), (0, 0.95, 6.3), WHITE, bevel=0.02)
torus(0.55, 0.17, (1.42, 0, 3.4), ORANGE, rot=(0, R(90), 0), seg=18, mseg=8)
for a in (0, 90, 180, 270):
    cyl(0.185, 0.24, (1.42, cos(R(a + 45)) * 0.55, 3.4 + sin(R(a + 45)) * 0.55), WHITE, verts=10, bevel=0, rot=(R(a + 45 + 90), 0, 0))
finish('B_guard')

b = uvs(0.8, (0, 0, 0), WHITE, seg=24, rings=12)                          # beach ball (origin at centre)
gores(b, [WHITE, RED, YELLOW, WHITE, TEAL, ORANGE], 6)
for z in (-0.79, 0.79):
    cyl(0.14, 0.03, (0, 0, z), CREAM, verts=10, bevel=0)
finish('B_ball')

# ================================================================ export + previews
names = sorted(o.name for o in bpy.data.objects)
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'rooms.glb'), export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True, export_texcoords=False)
tris = sum(len(p.vertices) - 2 for o in bpy.data.objects for p in o.data.polygons)
print('ROOMS EXPORTED', len(names), 'props,', tris, 'triangles')

if '--no-previews' not in ARGS:
    PREV = os.path.join(HERE, 'previews')
    hide_sources()
    bpy.ops.mesh.primitive_plane_add(size=400, location=(0, 0, 0))
    bpy.context.object.data.materials.append(mat('PrevFloor', 0xf1e4cc, rough=0.9))
    sun(rot=(48, 12, -30))
    preview_setup(PREV, 'rooms.png', res=(1600, 620), samples=40)
    cam, target = camera_at((0, -30, 12), (0, 0, 2), lens=40)
    lift = {'G_hoop': 3.4, 'G_scoreboard': 2.3, 'A_window': 2.8, 'H_basket': 1.3, 'B_ball': 0.8}
    y0 = 0
    for pre, title in (('L_', 'library'), ('D_', 'diner'), ('G_', 'gym'), ('T_', 'toystore'), ('H_', 'greenhouse'), ('C_', 'arcade'), ('A_', 'attic'), ('B_', 'beach')):
        x, tall = 0.0, 0.0
        for n in [n for n in names if n.startswith(pre)]:
            src = bpy.data.objects[n]
            w, d, h = src.dimensions
            o = place(n, (0, 0, 0))
            lo = min(v[0] for v in src.bound_box)
            o.location = (x - lo, y0, lift.get(n, 0))
            x += w + 1.2
            tall = max(tall, h)
        W = x - 1.2
        target.location = (W / 2, y0, tall * 0.4)
        dist = max(W * 1.2, tall * 2.6)
        cam.location = (W / 2, y0 - dist, dist * 0.42)
        render(os.path.join(PREV, 'rooms_%s.png' % title))
        y0 += 400
    print('ROOM PREVIEWS DONE')
