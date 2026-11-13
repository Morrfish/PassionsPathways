"""Checkfire — Chess Park assets (stylized toy, beveled low-poly), modelled from the Chess Park feature sheet.

Run headless:  blender -b --python park_assets.py -- <out_dir>
Writes park.glb plus preview renders. Units are metres; the game scales the park by 50 so the
duel happens on the inner surface (0.96 m square, 0.74 m high) of one stone chess table.
"""
import bpy, math, sys, os

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '.'
bpy.ops.wm.read_factory_settings(use_empty=True)
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'toykit.py')).read())
R = math.radians

# ---------------------------------------------------------------- palette (sampled from the reference)
STONE = mat('Stone', 0xcdbfa6, rough=0.92)
STONE_B = mat('StoneB', 0xbfae92, rough=0.92)
STONE_D = mat('StoneDark', 0xa69479, rough=0.92)
CHK_L = mat('CheckLight', 0xe8dcc3, rough=0.7)
CHK_D = mat('CheckDark', 0x3d3330, rough=0.7)
IRON = mat('Iron', 0x2c313c, metal=0.35, rough=0.45)
BOLT = mat('Bolt', 0x8c8f96, metal=0.6, rough=0.35)
WOOD = mat('BenchWood', 0xd9822b, rough=0.55)
WOOD_D = mat('BenchWoodDark', 0xbb6a20, rough=0.55)
SKIN = mat('Skin', 0xeab894, rough=0.65)
BLUSH = mat('Blush', 0xe39a86, rough=0.7)
EYE = mat('Eye', 0x2a201c, rough=0.3)
HAIR = mat('SilverHair', 0xe6e3dd, rough=0.75)
BROW = mat('Brow', 0xbcb6ad, rough=0.8)
FRAME = mat('Frames', 0x3a2c24, rough=0.4)
LENS = mat('Lens', 0xdfeff5, rough=0.05, alpha=0.35)
MOUTH = mat('Mouth', 0x9a4f45, rough=0.6)
OLIVE = mat('OliveJacket', 0x8a7d45, rough=0.8)
OLIVE_D = mat('OliveDark', 0x6e6337, rough=0.8)
CAP = mat('FlatCap', 0x6d4c36, rough=0.85)
SHIRT = mat('Shirt', 0xf1e6cf, rough=0.8)
TROUSER_M = mat('TrousersBrown', 0x5a4a3c, rough=0.85)
RUST = mat('RustCardigan', 0xc8642f, rough=0.85)
RUST_D = mat('RustDark', 0xa44f24, rough=0.85)
BLOUSE = mat('Blouse', 0xf3ead8, rough=0.8)
TROUSER_W = mat('TrousersNavy', 0x2f3752, rough=0.85)
SHOE = mat('Shoes', 0x3a2a22, rough=0.55)
WATER = mat('Water', 0x6fc7ea, metal=0.1, rough=0.05, alpha=0.45)
WATER_F = mat('WaterFoam', 0xd9f3ff, rough=0.2, alpha=0.75)
LAMP = mat('LampGlow', 0xffdf9a, emit=3.5)
TEAL = mat('BannerTeal', 0x1f8a86, rough=0.8)
ORANGE = mat('BannerOrange', 0xe8752a, rough=0.8)
CREAM = mat('Cream', 0xfaf0dc, rough=0.8)
BARK = mat('Bark', 0x7a4a2a, rough=0.9)
SOIL = mat('Soil', 0x5b3a24, rough=1.0)
LEAF = [mat('LeafGreen', 0x76a832, rough=0.9), mat('LeafLime', 0xa5c240, rough=0.9), mat('LeafDeep', 0x4f8a2c, rough=0.9)]
LEAF_A = [mat('LeafOrange', 0xe88b2a, rough=0.9), mat('LeafGold', 0xebb53e, rough=0.9), mat('LeafRust', 0xcc6a2a, rough=0.9)]
PETAL = mat('Petal', 0xf28a1d, rough=0.6)
PETAL_L = mat('PetalLight', 0xf6a640, rough=0.6)
POLLEN = mat('Pollen', 0xffd166, rough=0.6)
PIECE_W = mat('PieceIvory', 0xf2e6cc, rough=0.45)
PIECE_B = mat('PieceCharcoal', 0x2e2d31, rough=0.45)

# ---------------------------------------------------------------- stone chess table (inner surface 0.96 m at z 0.74)
def stone_table(name, with_inlay=True):
    box((1.12, 1.12, 0.1), (0, 0, 0.69), STONE, bevel=0.03)                      # slab
    box((1.02, 1.02, 0.05), (0, 0, 0.625), STONE_D, bevel=0.015)                 # underside lip
    seg = [(-0.32, 0.30), (0.0, 0.30), (0.32, 0.30)]                             # rim of carved blocks
    for side in range(4):
        for i, (c, L) in enumerate(seg):
            m = [STONE, STONE_B, STONE][i]
            if side < 2:
                box((L - 0.012, 0.08, 0.05), (c, (0.52 if side == 0 else -0.52), 0.765), m, bevel=0.012)
            else:
                box((0.08, L - 0.012, 0.05), ((0.52 if side == 2 else -0.52), c, 0.765), m, bevel=0.012)
    for sx in (-0.52, 0.52):
        for sy in (-0.52, 0.52):
            box((0.08, 0.08, 0.055), (sx, sy, 0.767), STONE_B, bevel=0.015)
    if with_inlay:
        box((0.86, 0.86, 0.008), (0, 0, 0.744), STONE_D, bevel=0.002)
        s = 0.8 / 8
        for i in range(8):
            for j in range(8):
                box((s - 0.004, s - 0.004, 0.006), (-0.4 + s / 2 + i * s, -0.4 + s / 2 + j * s, 0.749),
                    CHK_L if (i + j) % 2 else CHK_D, bevel=0.001, segs=1)
    cyl(0.25, 0.06, (0, 0, 0.6), STONE_D, verts=8, rot=(0, 0, R(22.5)))           # collar
    cyl(0.19, 0.46, (0, 0, 0.36), STONE, verts=8, rot=(0, 0, R(22.5)), bevel=0.02)  # chamfered column
    cyl(0.27, 0.07, (0, 0, 0.12), STONE_B, verts=8, rot=(0, 0, R(22.5)), bevel=0.015)
    box((0.62, 0.62, 0.09), (0, 0, 0.045), STONE, bevel=0.02)                     # base plinth
    return finish(name)

stone_table('StoneTable')
stone_table('StoneTableTop', with_inlay=False)

# ---------------------------------------------------------------- benches
def iron_side(x, back=False):
    box((0.07, 0.44, 0.06), (x, 0, 0.03), IRON, bevel=0.02)
    box((0.07, 0.07, 0.42), (x, 0.17, 0.24), IRON, bevel=0.02)
    box((0.07, 0.07, 0.42), (x, -0.17, 0.24), IRON, bevel=0.02)
    box((0.08, 0.46, 0.07), (x, 0, 0.44), IRON, bevel=0.02)
    for y in (0.12, -0.12):
        cyl(0.022, 0.09, (x, y, 0.44), BOLT, verts=10, rot=(0, R(90), 0))
    if back:
        tube([(x, -0.17, 0.44), (x, -0.22, 0.65), (x, -0.27, 0.88)], 0.035, IRON)
        tube([(x, 0.2, 0.46), (x, 0.22, 0.6), (x, 0.0, 0.66), (x, -0.18, 0.62)], 0.03, IRON)

def backless_bench():
    for x in (-0.42, 0.42):
        iron_side(x)
    for k in range(3):
        box((1.0, 0.12, 0.045), (0, 0.14 - k * 0.14, 0.495), WOOD if k != 1 else WOOD_D, bevel=0.015)
    return finish('BenchShort')

def park_bench():
    for x in (-0.66, 0.66):
        iron_side(x, back=True)
    for k in range(3):
        box((1.45, 0.12, 0.045), (0, 0.14 - k * 0.14, 0.495), WOOD if k != 1 else WOOD_D, bevel=0.015)
    for k in range(2):
        box((1.45, 0.045, 0.12), (0, -0.23 - k * 0.025, 0.66 + k * 0.16), WOOD if k == 0 else WOOD_D, bevel=0.015, rot=(R(-12), 0, 0))
    return finish('Bench')

backless_bench()
park_bench()

def chair():
    for x in (-0.2, 0.2):
        tube([(x, 0.18, 0.0), (x, 0.18, 0.44)], 0.018, IRON)
        tube([(x, -0.18, 0.0), (x, -0.19, 0.44), (x, -0.21, 0.85)], 0.018, IRON)
    tube([(-0.2, 0.18, 0.44), (0.2, 0.18, 0.44)], 0.016, IRON)
    tube([(-0.21, -0.21, 0.85), (0.21, -0.21, 0.85)], 0.018, IRON)
    for k in range(4):
        box((0.44, 0.08, 0.025), (0, 0.15 - k * 0.1, 0.455), IRON, bevel=0.006)
    for k in range(3):
        box((0.42, 0.02, 0.055), (0, -0.2, 0.58 + k * 0.1), IRON, bevel=0.006)
    return finish('Chair')

chair()

# ---------------------------------------------------------------- seated older players (face +Y)
def face(z, y):
    for x in (-0.042, 0.042):
        uvs(0.013, (x, y + 0.002, z + 0.005), EYE, seg=8, rings=6)
        box((0.045, 0.012, 0.01), (x, y - 0.003, z + 0.045), BROW, bevel=0.003, rot=(0, R(-8 if x < 0 else 8), 0))
        torus(0.031, 0.006, (x, y + 0.008, z + 0.006), FRAME, rot=(R(90), 0, 0), seg=16, mseg=6)
        uvs(0.029, (x, y + 0.01, z + 0.006), LENS, seg=10, rings=6, scale=(1, 0.12, 1))
    box((0.03, 0.01, 0.008), (0, y + 0.01, z + 0.01), FRAME, bevel=0.002)
    uvs(0.024, (0, y + 0.02, z - 0.03), SKIN, seg=10, rings=8, scale=(1, 1.1, 1.1))
    for x in (-0.07, 0.07):
        uvs(0.018, (x, y - 0.012, z - 0.045), BLUSH, seg=8, rings=6, scale=(1, 0.4, 0.7))
    box((0.05, 0.01, 0.008), (0, y - 0.004, z - 0.072), MOUTH, bevel=0.003)

def seated_legs(trousers, spread=0.1):
    for x in (-spread, spread):
        capsule(0.065, (x, -0.02, 0.48), (x, 0.32, 0.47), trousers)
        capsule(0.058, (x, 0.34, 0.45), (x, 0.36, 0.1), trousers)
        box((0.11, 0.2, 0.08), (x, 0.4, 0.04), SHOE, bevel=0.03)

def old_man():
    seated_legs(TROUSER_M)
    box((0.38, 0.26, 0.28), (0, -0.02, 0.6), OLIVE, bevel=0.07)
    box((0.42, 0.27, 0.32), (0, -0.04, 0.86), OLIVE, bevel=0.08)
    for x in (-0.06, 0.06):
        box((0.07, 0.02, 0.26), (x, 0.1, 0.84), OLIVE_D, bevel=0.01, rot=(0, R(-14 if x < 0 else 14), 0))
    box((0.08, 0.015, 0.06), (0, 0.09, 0.985), SHIRT, bevel=0.01)
    for z in (0.62, 0.72):
        uvs(0.014, (0.035, 0.115, z), FRAME, seg=8, rings=6)
    capsule(0.06, (0, -0.03, 1.0), (0, -0.02, 1.06), SKIN)
    uvs(0.125, (0, 0.0, 1.17), SKIN, scale=(0.95, 0.98, 1.08))
    for x in (-0.122, 0.122):
        uvs(0.03, (x, -0.005, 1.17), SKIN, scale=(0.5, 0.9, 1.2))
        uvs(0.05, (x * 0.9, -0.04, 1.16), HAIR, scale=(0.55, 1.2, 0.9))
    uvs(0.06, (0, -0.1, 1.15), HAIR, scale=(1.6, 0.6, 0.8))
    face(1.18, 0.118)
    box((0.1, 0.03, 0.025), (0, 0.118, 1.115), HAIR, bevel=0.012)
    lathe([(0.0, 1.27), (0.13, 1.255), (0.142, 1.29), (0.12, 1.33), (0.0, 1.335)], CAP, steps=20)
    box((0.2, 0.13, 0.022), (0, 0.12, 1.265), CAP, bevel=0.01, rot=(R(10), 0, 0))
    capsule(0.058, (-0.22, -0.02, 0.98), (-0.2, 0.16, 0.8), OLIVE)     # elbow forward...
    capsule(0.052, (-0.2, 0.16, 0.8), (-0.06, 0.15, 1.04), OLIVE)      # ...fist under the chin
    uvs(0.048, (-0.04, 0.15, 1.08), SKIN)
    capsule(0.058, (0.22, -0.02, 0.98), (0.24, 0.12, 0.78), OLIVE)
    capsule(0.052, (0.24, 0.12, 0.78), (0.18, 0.36, 0.77), OLIVE)
    uvs(0.048, (0.16, 0.4, 0.77), SKIN)
    return finish('OldMan')

def old_woman():
    seated_legs(TROUSER_W, 0.09)
    box((0.36, 0.25, 0.28), (0, -0.02, 0.6), RUST, bevel=0.07)
    box((0.4, 0.26, 0.31), (0, -0.04, 0.86), RUST, bevel=0.08)
    box((0.12, 0.02, 0.24), (0, 0.098, 0.86), BLOUSE, bevel=0.01)
    for x in (-0.07, 0.07):
        box((0.035, 0.02, 0.5), (x, 0.1, 0.72), RUST_D, bevel=0.01)
    for z in (0.62, 0.72, 0.82):
        uvs(0.014, (0.075, 0.115, z), CREAM, seg=8, rings=6)
    capsule(0.055, (0, -0.03, 1.0), (0, -0.02, 1.06), SKIN)
    uvs(0.12, (0, 0.0, 1.17), SKIN, scale=(0.95, 0.98, 1.06))
    for x in (-0.118, 0.118):
        uvs(0.026, (x, -0.005, 1.16), SKIN, scale=(0.5, 0.9, 1.2))
    uvs(0.132, (0, -0.02, 1.215), HAIR, scale=(1.0, 1.02, 0.78))
    for x in (-0.1, 0.1):
        uvs(0.06, (x, -0.02, 1.15), HAIR, scale=(0.6, 1.1, 1.0))
    uvs(0.075, (0, -0.13, 1.29), HAIR)
    torus(0.05, 0.012, (0, -0.12, 1.29), RUST, rot=(R(90), 0, 0))
    face(1.17, 0.114)
    capsule(0.055, (0.21, -0.02, 0.98), (0.23, 0.18, 0.84), RUST)      # reaching to move a piece
    capsule(0.05, (0.23, 0.18, 0.84), (0.13, 0.42, 0.82), RUST)
    uvs(0.045, (0.11, 0.46, 0.81), SKIN)
    capsule(0.055, (-0.21, -0.02, 0.98), (-0.22, 0.1, 0.74), RUST)     # hand in lap
    capsule(0.05, (-0.22, 0.1, 0.74), (-0.08, 0.24, 0.62), RUST)
    uvs(0.045, (-0.06, 0.27, 0.61), SKIN)
    return finish('OldWoman')

old_man()
old_woman()

def mini_pieces():
    s = 0.8 / 8
    layout = [('r', 0, 0), ('n', 1, 0), ('k', 4, 0), ('b', 5, 1), ('p', 2, 1), ('p', 5, 2), ('p', 6, 1),
              ('q', 3, 7), ('b', 2, 6), ('r', 7, 7), ('k', 4, 7), ('p', 1, 6), ('p', 3, 5), ('n', 4, 5), ('p', 6, 6)]
    for t, i, j in layout:
        m = PIECE_W if j < 4 else PIECE_B
        x, y = -0.4 + s / 2 + i * s, -0.4 + s / 2 + j * s
        h = {'p': 0.045, 'n': 0.06, 'b': 0.068, 'r': 0.055, 'q': 0.075, 'k': 0.082}[t]
        lathe([(0.0, 0.752), (0.028, 0.752), (0.03, 0.758), (0.018, 0.766), (0.013, 0.752 + h * 0.7), (0.02, 0.752 + h * 0.78),
               (0.012, 0.752 + h * 0.85), (0.0, 0.752 + h * 0.86)], m, loc=(x, y, 0), steps=12)
        uvs(0.016 if t != 'k' else 0.018, (x, y, 0.752 + h * 0.95), m, seg=10, rings=6)
        if t == 'k':
            box((0.008, 0.008, 0.03), (x, y, 0.752 + h + 0.02), m, bevel=0.002)
        if t == 'n':
            box((0.02, 0.035, 0.02), (x, y + 0.012, 0.752 + h * 0.9), m, bevel=0.005)
    return finish('MiniChess')

mini_pieces()

# ---------------------------------------------------------------- fountain plaza
def fountain():
    n = 12
    for i in range(n):
        a = i / n * math.tau
        box((0.98, 0.3, 0.36), (math.cos(a) * 1.9, math.sin(a) * 1.9, 0.18), STONE if i % 2 else STONE_B, bevel=0.035,
            rot=(0, 0, a + math.pi / 2))
        box((1.02, 0.36, 0.08), (math.cos(a) * 1.9, math.sin(a) * 1.9, 0.4), STONE_D, bevel=0.025, rot=(0, 0, a + math.pi / 2))
    cyl(1.82, 0.04, (0, 0, 0.28), WATER, verts=36, bevel=0)
    lathe([(0.0, 0.25), (0.34, 0.25), (0.3, 0.32), (0.22, 0.4), (0.18, 0.75), (0.24, 0.82), (0.0, 0.82)], STONE_D, steps=16)
    lathe([(0.0, 0.8), (0.3, 0.8), (0.9, 0.95), (1.08, 1.02), (1.1, 1.1), (1.0, 1.1), (0.85, 1.02), (0.0, 1.02)], STONE, steps=28)
    cyl(0.97, 0.02, (0, 0, 1.06), WATER, verts=28, bevel=0)
    lathe([(1.06, 1.08), (1.12, 0.9), (1.15, 0.6), (1.18, 0.3)], WATER, steps=28)
    lathe([(0.0, 1.0), (0.16, 1.0), (0.12, 1.08), (0.1, 1.45), (0.15, 1.5), (0.0, 1.5)], STONE_D, steps=14)
    lathe([(0.0, 1.48), (0.2, 1.48), (0.5, 1.58), (0.6, 1.64), (0.6, 1.7), (0.52, 1.7), (0.45, 1.64), (0.0, 1.64)], STONE, steps=24)
    cyl(0.5, 0.015, (0, 0, 1.67), WATER, verts=24, bevel=0)
    lathe([(0.58, 1.68), (0.62, 1.5), (0.64, 1.3), (0.66, 1.12)], WATER, steps=24)
    lathe([(0.0, 1.66), (0.07, 1.66), (0.05, 1.85), (0.09, 1.9), (0.0, 1.95)], STONE_D, steps=12)
    lathe([(0.0, 1.9), (0.035, 1.95), (0.05, 2.1), (0.09, 2.18), (0.0, 2.2)], WATER_F, steps=10)
    return finish('Fountain')

fountain()

# ---------------------------------------------------------------- lamppost with rook banners
def rook_emblem(x, y, z, face):
    d = 0.008 * face
    box((0.11, 0.008, 0.03), (x, y + d, z - 0.085), CREAM, bevel=0.003)
    box((0.07, 0.008, 0.11), (x, y + d, z - 0.015), CREAM, bevel=0.003)
    box((0.1, 0.008, 0.028), (x, y + d, z + 0.055), CREAM, bevel=0.003)
    for dx in (-0.035, 0, 0.035):
        box((0.022, 0.008, 0.032), (x + dx, y + d, z + 0.083), CREAM, bevel=0.003)

def lamppost():
    lathe([(0.0, 0.0), (0.16, 0.0), (0.16, 0.06), (0.12, 0.1), (0.12, 0.3), (0.08, 0.36), (0.06, 0.45), (0.045, 2.9),
           (0.07, 2.95), (0.07, 3.02), (0.0, 3.02)], IRON, steps=12)
    for x in (-0.12, 0.12):
        for y in (-0.12, 0.12):
            box((0.025, 0.025, 0.34), (x, y, 3.2), IRON, bevel=0.006)
    box((0.21, 0.21, 0.3), (0, 0, 3.2), LAMP, bevel=0.01)
    box((0.3, 0.3, 0.04), (0, 0, 3.03), IRON, bevel=0.01)
    cyl(0.23, 0.16, (0, 0, 3.45), IRON, verts=4, r2=0.04, rot=(0, 0, R(45)))
    uvs(0.035, (0, 0, 3.55), IRON, seg=10, rings=6)
    box((0.62, 0.03, 0.03), (0, 0, 2.62), IRON, bevel=0.008)
    for side, m in ((-1, TEAL), (1, ORANGE)):
        cx = side * 0.18
        uvs(0.02, (side * 0.31, 0, 2.62), IRON, seg=8, rings=6)
        box((0.24, 0.014, 0.5), (cx, 0, 2.35), m, bevel=0.004)
        for dx in (-0.06, 0.06):
            box((0.12, 0.014, 0.08), (cx + dx, 0, 2.08), m, bevel=0.004, rot=(0, R(30 if dx < 0 else -30), 0))
        rook_emblem(cx, 0, 2.38, 1)
        rook_emblem(cx, 0, 2.38, -1)
    return finish('Lamppost')

lamppost()

# ---------------------------------------------------------------- trees, flower beds
def tree(name, leaves, h=3.4, seed=1):
    import random
    rnd = random.Random(seed)
    tube([(0, 0, 0), (0.02, 0, h * 0.35), (-0.03, 0.02, h * 0.62)], lambda t: 0.17 - 0.08 * t, BARK, sides=8)
    tube([(0, 0, h * 0.4), (0.35, 0.1, h * 0.58), (0.55, 0.15, h * 0.66)], lambda t: 0.08 - 0.04 * t, BARK, sides=7)
    tube([(0, 0, h * 0.45), (-0.4, -0.1, h * 0.6)], lambda t: 0.07 - 0.03 * t, BARK, sides=7)
    blobs = [(0, 0, 0.8, 0.95), (0.6, 0.2, 0.7, 0.7), (-0.55, -0.15, 0.72, 0.72), (0.1, 0.5, 0.66, 0.65), (0.05, -0.45, 0.9, 0.62),
             (0, 0, 1.02, 0.62), (-0.35, 0.35, 0.86, 0.55), (0.45, -0.3, 0.92, 0.5)]
    for i, (x, y, z, r) in enumerate(blobs):
        k = h / 3.4
        ico(r * k * (0.95 + rnd.random() * 0.1), (x * k, y * k, z * h), leaves[i % 3], sub=1,
            scale=(1, 1, 0.85 + rnd.random() * 0.2))
    return finish(name)

tree('TreeGreen', LEAF, seed=3)
tree('TreeAutumn', LEAF_A, h=3.1, seed=7)

def flower(x, y, z, s=1.0, m=PETAL):
    for i in range(5):
        a = i / 5 * math.tau
        uvs(0.035 * s, (x + math.cos(a) * 0.038 * s, y + math.sin(a) * 0.038 * s, z), m, seg=8, rings=6, scale=(1.2, 0.8, 0.35),
            rot=(0, 0, a))
    uvs(0.022 * s, (x, y, z + 0.01 * s), POLLEN, seg=8, rings=6, scale=(1, 1, 0.6))

def flower_bed():
    import random
    rnd = random.Random(11)
    box((2.1, 0.62, 0.16), (0, 0, 0.08), STONE, bevel=0.03)
    box((1.96, 0.5, 0.04), (0, 0, 0.17), SOIL, bevel=0.01)
    for i in range(8):
        ico(0.17 + rnd.random() * 0.05, (-0.85 + i * 0.245, (rnd.random() - 0.5) * 0.15, 0.3), LEAF[i % 3], sub=2,
            scale=(1.15, 1.0, 0.85))
    for i in range(14):
        flower(-0.92 + i * 0.14, (rnd.random() - 0.5) * 0.36, 0.44 + rnd.random() * 0.07, 1.0 + rnd.random() * 0.3,
               PETAL if i % 3 else PETAL_L)
    return finish('FlowerBed')

flower_bed()

# ---------------------------------------------------------------- export + previews
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'park.glb'), export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True)

hide_sources()
place('StoneTable', (0, 0, 0))
place('BenchShort', (0, 0.95, 0), math.pi)
place('BenchShort', (0, -0.95, 0))
place('StoneTable', (1.9, 3.3, 0))
place('MiniChess', (1.9, 3.3, 0))
place('Chair', (1.25, 3.3, 0), -math.pi / 2)
place('OldMan', (1.25, 3.3, 0), -math.pi / 2)
place('Chair', (2.55, 3.3, 0), math.pi / 2)
place('OldWoman', (2.55, 3.3, 0), math.pi / 2)
place('Fountain', (-3.4, 5.8, 0))
place('Lamppost', (1.4, -1.25, 0), 0.4)
place('Lamppost', (-2.0, 2.4, 0), 0.2)
place('Bench', (4.4, 1.6, 0), -math.pi / 2)
place('TreeGreen', (5.0, 6.5, 0))
place('TreeAutumn', (-6.0, 7.5, 0), 1.0)
place('TreeGreen', (0.4, 9.0, 0), 1.0, 1.3)
place('TreeAutumn', (-3.6, -2.2, 0), 2.0, 0.9)
place('FlowerBed', (-1.45, -0.2, 0), math.pi / 2)
place('FlowerBed', (1.45, 0.2, 0), math.pi / 2)
place('FlowerBed', (-0.6, 4.6, 0), 0.25)
bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
bpy.context.object.data.materials.append(mat('Paving', 0xd6c19c, rough=0.95))
cam, aim = camera_at((3.7, -4.3, 2.2), (0.3, 1.6, 0.55), lens=26)
sun()
preview_setup(OUT, 'park_preview.png', bg=0x9fd3f0)
render()
aim.location = (0, 0, 0.6); cam.location = (1.2, -1.9, 1.35); cam.data.lens = 32
render(os.path.join(OUT, 'park_table.png'))
aim.location = (1.9, 3.3, 0.85); cam.location = (3.1, 1.4, 1.35); cam.data.lens = 42
render(os.path.join(OUT, 'park_players.png'))
aim.location = (-3.4, 5.8, 1.0); cam.location = (-0.8, 1.8, 2.2); cam.data.lens = 34
render(os.path.join(OUT, 'park_fountain.png'))
print('PARK DONE')
