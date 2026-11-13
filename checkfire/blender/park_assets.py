"""Checkfire — Chess Park assets (stylized toy, beveled low-poly).

Run headless:  blender -b --python park_assets.py -- <out_dir>
Writes park.glb (one object per asset, named) and park_preview.png.
Units are metres; the game scales the park by 48 so the duel happens on top of a table.
Colours are given as sRGB hex and stored linear (the game converts back).
"""
import bpy, bmesh, math, sys, os
from mathutils import Vector

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '.'
bpy.ops.wm.read_factory_settings(use_empty=True)

exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'toykit.py')).read())

# ---------------------------------------------------------------- palette
STONE = mat('Stone', 0xc9bba3, rough=0.9)
STONE_D = mat('StoneDark', 0xa8987f, rough=0.9)
CHK_L = mat('CheckLight', 0xe9dcc2, rough=0.6)
CHK_D = mat('CheckDark', 0x3b3330, rough=0.6)
IRON = mat('Iron', 0x2f3440, metal=0.4, rough=0.45)
WOOD = mat('BenchWood', 0xd9822b, rough=0.6)
WOOD_D = mat('BenchWoodDark', 0xb3641c, rough=0.6)
SKIN = mat('Skin', 0xe8b48f, rough=0.7)
HAIR = mat('SilverHair', 0xe3e3e3, rough=0.8)
GLASS_F = mat('Frames', 0x2a2420, rough=0.4)
OLIVE = mat('OliveJacket', 0x7d7442, rough=0.8)
CAP = mat('FlatCap', 0x6b4b34, rough=0.85)
TROUSER_M = mat('TrousersBrown', 0x5c4a3b, rough=0.85)
RUST = mat('RustSweater', 0xc9622f, rough=0.8)
TROUSER_W = mat('TrousersNavy', 0x2d3550, rough=0.85)
SHOE = mat('Shoes', 0x2b211d, rough=0.6)
SHIRT = mat('Shirt', 0xf2ead8, rough=0.8)
WATER = mat('Water', 0x6cc6ec, metal=0.1, rough=0.05, alpha=0.6)
LAMP = mat('LampGlow', 0xffe2a0, emit=3.0)
TEAL = mat('BannerTeal', 0x1f8a86, rough=0.8)
ORANGE = mat('BannerOrange', 0xe8752a, rough=0.8)
CREAM = mat('Cream', 0xfaf0dc, rough=0.8)
BARK = mat('Bark', 0x7a4a2a, rough=0.9)
LEAF = [mat('LeafGreen', 0x6b9a2e, rough=0.9), mat('LeafLime', 0x9bb83a, rough=0.9), mat('LeafDeep', 0x4f7d2a, rough=0.9)]
LEAF_A = [mat('LeafOrange', 0xe58a2a, rough=0.9), mat('LeafGold', 0xe9b13b, rough=0.9), mat('LeafRust', 0xc8642a, rough=0.9)]
FLOWER = mat('FlowerOrange', 0xf28a1d, rough=0.7)
FLOWER_C = mat('FlowerCenter', 0xffd166, rough=0.7)
PIECE_W = mat('PieceIvory', 0xf2e6cc, rough=0.5)
PIECE_B = mat('PieceCharcoal', 0x2c2c31, rough=0.5)

# ---------------------------------------------------------------- stone chess table
def stone_table(name, with_inlay=True):
    # top slab made of four beveled rim blocks around a centre slab (matches the chunky block edge)
    box((1.12, 1.12, 0.12), (0, 0, 0.69), STONE, bevel=0.025)
    for i, (x, y, w, d) in enumerate([(0, 0.53, 1.12, 0.07), (0, -0.53, 1.12, 0.07), (0.53, 0, 0.07, 1.0), (-0.53, 0, 0.07, 1.0)]):
        box((w, d, 0.03), (x, y, 0.745), STONE_D, bevel=0.01)
    if with_inlay:
        s = 0.9 / 8
        for i in range(8):
            for j in range(8):
                box((s, s, 0.006), (-0.45 + s / 2 + i * s, -0.45 + s / 2 + j * s, 0.753), CHK_L if (i + j) % 2 else CHK_D)
    # pedestal: tapered octagon column with stepped base
    cyl(0.30, 0.10, (0, 0, 0.58), STONE_D, verts=8, bevel=0.015)
    cyl(0.22, 0.42, (0, 0, 0.32), STONE, verts=8, bevel=0.02, r2=0.25)
    cyl(0.34, 0.08, (0, 0, 0.09), STONE_D, verts=8, bevel=0.015)
    cyl(0.40, 0.06, (0, 0, 0.03), STONE, verts=8, bevel=0.015)
    return finish(name)

stone_table('StoneTable')
stone_table('StoneTableTop', with_inlay=False)

# ---------------------------------------------------------------- park bench (iron sides, wood slats)
def bench():
    for x in (-0.62, 0.62):
        box((0.08, 0.5, 0.08), (x, 0.02, 0.04), IRON, bevel=0.015)      # foot
        box((0.07, 0.07, 0.42), (x, 0.17, 0.25), IRON, bevel=0.012)     # front leg
        box((0.07, 0.07, 0.8), (x, -0.16, 0.42), IRON, bevel=0.012, rot=(math.radians(-8), 0, 0))  # back leg/upright
        box((0.08, 0.42, 0.07), (x, 0.0, 0.44), IRON, bevel=0.012)      # arm/seat rail
        cyl(0.025, 0.09, (x, 0.12, 0.44), IRON, verts=8, rot=(0, math.radians(90), 0))   # bolt
    for k in range(3):
        box((1.42, 0.11, 0.035), (0, 0.15 - k * 0.13, 0.48), WOOD if k % 2 == 0 else WOOD_D, bevel=0.01)
    for k in range(2):
        box((1.42, 0.035, 0.11), (0, -0.2 - k * 0.025, 0.66 + k * 0.15), WOOD if k == 0 else WOOD_D, bevel=0.01,
            rot=(math.radians(-8), 0, 0))
    return finish('Bench')

bench()

# ---------------------------------------------------------------- metal chair for the background game
def chair():
    for x in (-0.2, 0.2):
        for y in (-0.18, 0.18):
            box((0.035, 0.035, 0.45), (x, y, 0.225), IRON)
    box((0.46, 0.42, 0.04), (0, 0, 0.46), IRON, bevel=0.01)
    for x in (-0.2, 0.2):
        box((0.035, 0.035, 0.45), (x, -0.2, 0.7), IRON)
    for k in range(3):
        box((0.44, 0.025, 0.06), (0, -0.2, 0.62 + k * 0.1), IRON)
    return finish('Chair')

chair()

# ---------------------------------------------------------------- seated older players (facing +Y)
def glasses(z, y):
    for x in (-0.045, 0.045):
        torus(0.032, 0.006, (x, y, z), GLASS_F, rot=(math.radians(90), 0, 0))
    box((0.03, 0.006, 0.006), (0, y, z), GLASS_F)

def seated_body(top, trousers, shoe=SHOE):
    for x in (-0.1, 0.1):
        box((0.13, 0.42, 0.13), (x, 0.17, 0.48), trousers, bevel=0.03)   # thigh
        box((0.12, 0.12, 0.44), (x, 0.36, 0.24), trousers, bevel=0.03)   # shin
        box((0.12, 0.22, 0.07), (x, 0.42, 0.035), shoe, bevel=0.02)      # shoe
    box((0.40, 0.25, 0.30), (0, -0.02, 0.58), top, bevel=0.05)           # hips/belly
    box((0.42, 0.26, 0.34), (0, -0.03, 0.86), top, bevel=0.06)           # chest
    uvs(0.08, (0, -0.02, 1.05), SKIN, scale=(1, 1, 0.8))                 # neck

def old_man():
    seated_body(OLIVE, TROUSER_M)
    box((0.09, 0.02, 0.1), (0, 0.11, 0.97), SHIRT)                       # shirt collar V
    uvs(0.13, (0, 0.0, 1.2), SKIN, seg=14, rings=10, scale=(0.95, 1, 1.05))   # head
    uvs(0.03, (0, 0.13, 1.18), SKIN)                                      # nose
    for x in (-0.13, 0.13):
        uvs(0.03, (x, 0, 1.2), SKIN, scale=(0.6, 1, 1.2))                 # ears
        uvs(0.05, (x * 0.85, -0.03, 1.17), HAIR, scale=(0.7, 1.2, 0.9))   # side hair
    box((0.09, 0.03, 0.025), (0, 0.125, 1.135), HAIR, bevel=0.01)         # moustache
    glasses(1.215, 0.125)
    cyl(0.145, 0.06, (0, -0.01, 1.31), CAP, verts=12, r2=0.12)            # flat cap
    box((0.2, 0.12, 0.025), (0, 0.13, 1.29), CAP, bevel=0.01, rot=(math.radians(10), 0, 0))
    # left arm: elbow on the table, hand under the chin (thinking)
    box((0.11, 0.11, 0.3), (-0.25, 0.0, 0.88), OLIVE, bevel=0.03)
    box((0.1, 0.1, 0.32), (-0.2, 0.12, 0.9), OLIVE, bevel=0.03, rot=(math.radians(-60), 0, math.radians(-20)))
    uvs(0.055, (-0.1, 0.13, 1.07), SKIN)
    # right arm resting forward
    box((0.11, 0.11, 0.3), (0.25, 0.0, 0.88), OLIVE, bevel=0.03)
    box((0.1, 0.3, 0.1), (0.24, 0.17, 0.75), OLIVE, bevel=0.03)
    uvs(0.055, (0.22, 0.33, 0.76), SKIN)
    return finish('OldMan')

def old_woman():
    seated_body(RUST, TROUSER_W)
    uvs(0.125, (0, 0.0, 1.2), SKIN, seg=14, rings=10, scale=(0.95, 1, 1.05))
    uvs(0.028, (0, 0.125, 1.18), SKIN)
    uvs(0.14, (0, -0.02, 1.25), HAIR, scale=(1.02, 1.0, 0.82))             # hair cap
    uvs(0.075, (0, -0.12, 1.3), HAIR)                                      # bun
    glasses(1.21, 0.12)
    # right arm reaching out to move a piece
    box((0.11, 0.11, 0.28), (0.24, 0.0, 0.9), RUST, bevel=0.03)
    box((0.1, 0.36, 0.1), (0.2, 0.2, 0.8), RUST, bevel=0.03, rot=(math.radians(-12), 0, math.radians(-15)))
    uvs(0.05, (0.14, 0.4, 0.83), SKIN)
    # left hand resting in lap
    box((0.11, 0.11, 0.28), (-0.24, 0.0, 0.88), RUST, bevel=0.03)
    box((0.1, 0.26, 0.1), (-0.2, 0.15, 0.74), RUST, bevel=0.03)
    uvs(0.05, (-0.17, 0.3, 0.72), SKIN)
    return finish('OldWoman')

old_man()
old_woman()

# small chess set for the background table (sits on its inlay)
def mini_pieces():
    s = 0.9 / 8
    layout = [('r', 0, 0), ('n', 1, 0), ('k', 4, 0), ('p', 2, 1), ('p', 5, 1), ('p', 6, 2),
              ('q', 3, 7), ('b', 5, 7), ('r', 7, 7), ('p', 1, 6), ('p', 3, 5), ('n', 4, 5)]
    for t, i, j in layout:
        m = PIECE_W if j < 4 else PIECE_B
        x, y = -0.45 + s / 2 + i * s, -0.45 + s / 2 + j * s
        h = {'p': 0.05, 'n': 0.07, 'b': 0.075, 'r': 0.065, 'q': 0.085, 'k': 0.09}[t]
        cyl(0.03, 0.015, (x, y, 0.765), m, verts=10)
        cyl(0.018, h, (x, y, 0.77 + h / 2), m, verts=8, r2=0.012)
        uvs(0.02 if t != 'k' else 0.022, (x, y, 0.775 + h), m, seg=8, rings=6)
    return finish('MiniChess')

mini_pieces()

# ---------------------------------------------------------------- fountain plaza
def fountain():
    n = 10
    for i in range(n):   # chunky basin rim, block by block
        a = i / n * math.tau
        box((0.6, 0.28, 0.4), (math.cos(a) * 1.9, math.sin(a) * 1.9, 0.2), STONE if i % 2 else STONE_D, bevel=0.03,
            rot=(0, 0, a + math.pi / 2))
    cyl(1.85, 0.06, (0, 0, 0.3), WATER, verts=20)
    cyl(0.32, 0.7, (0, 0, 0.55), STONE_D, verts=8, bevel=0.02, r2=0.25)
    cyl(1.0, 0.16, (0, 0, 0.98), STONE, verts=12, bevel=0.03, r2=1.1)
    cyl(0.95, 0.04, (0, 0, 1.05), WATER, verts=12)
    cyl(0.18, 0.5, (0, 0, 1.3), STONE_D, verts=8, bevel=0.02)
    cyl(0.55, 0.12, (0, 0, 1.58), STONE, verts=10, bevel=0.025, r2=0.6)
    cyl(0.5, 0.03, (0, 0, 1.63), WATER, verts=10)
    cyl(0.07, 0.3, (0, 0, 1.78), STONE_D, verts=8)
    cyl(0.04, 0.35, (0, 0, 2.05), WATER, verts=6, r2=0.09)                 # top jet
    cyl(1.08, 0.6, (0, 0, 0.72), WATER, verts=12, r2=1.02)                 # falling water sheets
    cyl(0.6, 0.5, (0, 0, 1.33), WATER, verts=10, r2=0.56)
    return finish('Fountain')

fountain()

# ---------------------------------------------------------------- lamppost with rook banners
def rook_emblem(x, y, z, flip):
    off = 0.012 * flip
    box((0.12, 0.012, 0.035), (x, y + off, z - 0.09), CREAM)
    box((0.08, 0.012, 0.12), (x, y + off, z - 0.01), CREAM)
    box((0.11, 0.012, 0.03), (x, y + off, z + 0.065), CREAM)
    for dx in (-0.04, 0, 0.04):
        box((0.025, 0.012, 0.035), (x + dx, y + off, z + 0.095), CREAM)

def lamppost():
    cyl(0.12, 0.25, (0, 0, 0.125), IRON, verts=8, bevel=0.01)
    cyl(0.05, 3.0, (0, 0, 1.6), IRON, verts=8)
    cyl(0.08, 0.1, (0, 0, 3.1), IRON, verts=8)
    box((0.22, 0.22, 0.3), (0, 0, 3.3), LAMP)
    for x in (-0.11, 0.11):
        for y in (-0.11, 0.11):
            box((0.025, 0.025, 0.32), (x, y, 3.3), IRON)
    cyl(0.2, 0.12, (0, 0, 3.52), IRON, verts=4, r2=0.02, rot=(0, 0, math.pi / 4))
    box((0.7, 0.03, 0.03), (0, 0, 2.55), IRON)                                    # banner arm
    for side, m in ((-1, TEAL), (1, ORANGE)):
        box((0.26, 0.015, 0.55), (side * 0.2, 0, 2.27), m)
        box((0.26, 0.015, 0.05), (side * 0.2, 0, 1.98), m)
        rook_emblem(side * 0.2, 0, 2.3, 1)
        rook_emblem(side * 0.2, 0, 2.3, -1)
    return finish('Lamppost')

lamppost()

# ---------------------------------------------------------------- trees, bushes, flower beds
def tree(name, leaves, h=3.2):
    cyl(0.16, h * 0.6, (0, 0, h * 0.3), BARK, verts=7, r2=0.1)
    cyl(0.06, 0.8, (0.25, 0, h * 0.55), BARK, verts=6, rot=(0, math.radians(40), 0))
    for i, (x, y, z, r) in enumerate([(0, 0, 0.78, 0.95), (0.55, 0.2, 0.68, 0.7), (-0.5, -0.15, 0.7, 0.72), (0.1, 0.45, 0.62, 0.62), (0.05, -0.4, 0.9, 0.6), (0, 0, 1.0, 0.6)]):
        ico(r * h / 3.2, (x * h / 3.2, y * h / 3.2, z * h), leaves[i % 3], sub=1)
    return finish(name)

tree('TreeGreen', LEAF)
tree('TreeAutumn', LEAF_A, h=3.0)

def flower_bed():
    for i in range(7):
        x = -0.9 + i * 0.3
        ico(0.2, (x, 0.05 * (i % 2), 0.16), LEAF[i % 3], sub=1, scale=(1.2, 1, 0.8))
    for i in range(10):
        x = -0.95 + i * 0.21
        y = 0.12 * ((i % 3) - 1)
        cyl(0.07, 0.03, (x, y, 0.32 + 0.03 * (i % 2)), FLOWER, verts=6)
        cyl(0.025, 0.035, (x, y, 0.34 + 0.03 * (i % 2)), FLOWER_C, verts=6)
    return finish('FlowerBed')

flower_bed()

# ---------------------------------------------------------------- export + preview
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'park.glb'), export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True)

# preview layout (not exported)
def place(name, loc, rz=0, s=1.0):
    src = bpy.data.objects[name]
    o = src.copy()
    o.data = src.data
    bpy.context.collection.objects.link(o)
    o.location = loc
    o.rotation_euler = (0, 0, rz)
    o.scale = (s, s, s)
    o.hide_render = False
    return o

for o in list(bpy.data.objects):
    o.hide_render = True
place('StoneTable', (0, 0, 0))
place('Bench', (0, 1.0, 0), math.pi)
place('Bench', (0, -1.0, 0))
place('StoneTable', (1.9, 3.2, 0))
place('MiniChess', (1.9, 3.2, 0))
place('Chair', (1.25, 3.2, 0), -math.pi / 2)
place('OldMan', (1.25, 3.2, 0), -math.pi / 2)
place('Chair', (2.55, 3.2, 0), math.pi / 2)
place('OldWoman', (2.55, 3.2, 0), math.pi / 2)
place('Fountain', (-3.6, 5.6, 0))
place('Lamppost', (1.5, -1.3, 0))
place('Lamppost', (-2.3, 1.8, 0))
place('TreeGreen', (5.0, 6.5, 0))
place('TreeAutumn', (-6.5, 8.0, 0))
place('TreeGreen', (0.0, 9.0, 0), 1.0, 1.3)
place('TreeAutumn', (4.0, -2.5, 0), 2.0, 0.9)
place('FlowerBed', (-1.5, -0.3, 0), math.pi / 2)
place('FlowerBed', (1.5, 0.3, 0), math.pi / 2)
place('FlowerBed', (-0.8, 4.4, 0), 0.3)
bpy.ops.mesh.primitive_plane_add(size=40, location=(0, 0, 0))
g = bpy.context.object
g.data.materials.append(mat('Paving', 0xd8c7a6, rough=0.95))
bpy.ops.object.empty_add(location=(0.4, 1.8, 0.6))
aim = bpy.context.object
bpy.ops.object.camera_add(location=(3.6, -4.2, 2.3))
cam = bpy.context.object
cam.data.lens = 26
tc = cam.constraints.new('TRACK_TO'); tc.target = aim; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
bpy.context.scene.camera = cam
bpy.ops.object.light_add(type='SUN', location=(0, 0, 10), rotation=(math.radians(50), math.radians(10), math.radians(-35)))
bpy.context.object.data.energy = 3.2
bpy.context.object.data.color = (1.0, 0.9, 0.78)
w = bpy.data.worlds.new('Sky')
bpy.context.scene.world = w
w.use_nodes = True
w.node_tree.nodes['Background'].inputs[0].default_value = (*lin(0x9fd3f0), 1)
w.node_tree.nodes['Background'].inputs[1].default_value = 0.9
sc = bpy.context.scene
sc.render.engine = 'CYCLES'
sc.cycles.device = 'CPU'
sc.cycles.samples = 96
sc.cycles.use_denoising = False
sc.render.resolution_x = 1280
sc.render.resolution_y = 720
sc.view_settings.view_transform = 'Standard'
sc.render.filepath = os.path.join(OUT, 'park_preview.png')
bpy.ops.render.render(write_still=True)
# close-up of the two players
aim.location = (1.9, 3.2, 0.85)
cam.location = (3.3, 1.2, 1.5)
cam.data.lens = 40
sc.render.filepath = os.path.join(OUT, 'park_players.png')
bpy.ops.render.render(write_still=True)
print('PARK DONE')
