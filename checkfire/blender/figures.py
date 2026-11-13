"""Checkfire — toy fighters for the six chess pieces, modelled after the knight on the UI reference sheet:
chunky cute proportions, big rounded helmet, cream armour plates, teal tabard with a rook emblem, dark joints.

Run headless:  blender -b --python figures.py -- <out_dir>
Writes figures.glb and previews. Game units; front = +Y in Blender (= -Z in game, the fighter's forward).
Team colours are applied in the game by swapping the materials named TeamMain / TeamAccent / TeamEmblem.
Parts: Fig_body_<p|n|b|r|q|k> (torso + head gear), Fig_leg (pivot at the hip), Fig_arm (pivot at the shoulder).
Sized to the existing hitboxes: body 0..1.45, head centre ~1.72.
"""
import bpy, math, sys, os

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '.'
bpy.ops.wm.read_factory_settings(use_empty=True)
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'toykit.py')).read())
R = math.radians

MAIN = mat('TeamMain', 0xefe2c6, rough=0.45)       # ivory armour (charcoal for black)
ACC = mat('TeamAccent', 0x1f8a86, rough=0.45)      # teal tabard / plume (orange for black)
EMB = mat('TeamEmblem', 0x26324f, rough=0.5)       # rook emblem on the tabard
JOINT = mat('Joint', 0x353a46, rough=0.5)
VISOR = mat('Visor', 0x161b28, rough=0.3)
GOLD = mat('Gold', 0xf2b134, metal=0.45, rough=0.3)
SHINE = mat('Shine', 0xfff7e6, rough=0.3)

def rook_emblem(y, z, s=1.0):
    box((0.15 * s, 0.03, 0.04 * s), (0, y, z - 0.08 * s), EMB, bevel=0.008)
    box((0.09 * s, 0.03, 0.12 * s), (0, y, z), EMB, bevel=0.008)
    box((0.13 * s, 0.03, 0.035 * s), (0, y, z + 0.07 * s), EMB, bevel=0.008)
    for dx in (-0.045, 0, 0.045):
        box((0.03 * s, 0.03, 0.04 * s), (dx * s, y, z + 0.1 * s), EMB, bevel=0.006)

def torso(wide=1.0, cape=False, robe=False, skirt=False):
    box((0.5 * wide, 0.36, 0.22), (0, 0, 0.84), JOINT, bevel=0.07)                  # hips
    box((0.66 * wide, 0.46, 0.5), (0, 0, 1.15), MAIN, bevel=0.14)                   # chest plate
    box((0.42 * wide, 0.06, 0.6), (0, 0.22, 1.03), ACC, bevel=0.03)                 # tabard
    rook_emblem(0.255, 1.12, 1.0)
    box((0.7 * wide, 0.5, 0.08), (0, 0, 0.93), JOINT, bevel=0.03)                   # belt
    box((0.11, 0.05, 0.08), (0, 0.255, 0.93), GOLD, bevel=0.02)
    for x in (-1, 1):                                                                # rounded pauldrons
        uvs(0.2, (x * 0.42 * wide, 0, 1.36), MAIN, scale=(1.15, 1.1, 0.75))
        box((0.3, 0.3, 0.05), (x * 0.42 * wide, 0, 1.27), ACC, bevel=0.02)
    cyl(0.13, 0.12, (0, 0, 1.44), JOINT, verts=14)                                   # neck
    if cape:
        box((0.62 * wide, 0.06, 0.95), (0, -0.28, 0.98), ACC, bevel=0.03, rot=(R(5), 0, 0))
    if robe or skirt:
        lathe([(0.27, 0.92), (0.33, 0.7), (0.38, 0.45), (0.0, 0.45)], ACC if robe else MAIN, steps=16)

def big_helm(r=0.34):
    uvs(r, (0, 0, 1.72), MAIN, seg=20, rings=14, scale=(1, 1.02, 1.05))
    torus(r * 0.98, 0.04, (0, 0, 1.6), MAIN, seg=24)                                 # lower rim

def visor_grill(z=1.7, w=0.4, bars=4):
    box((w, 0.16, 0.24), (0, 0.27, z), VISOR, bevel=0.06)
    for k in range(bars):
        box((0.035, 0.18, 0.26), (-w / 2 + (k + 1) * w / (bars + 1), 0.29, z), MAIN, bevel=0.012)
    box((w + 0.06, 0.18, 0.05), (0, 0.29, z + 0.14), MAIN, bevel=0.02)

def crown(z, cross=False):
    lathe([(0.24, z), (0.28, z + 0.02), (0.28, z + 0.1), (0.24, z + 0.1)], GOLD, steps=20)
    for i in range(6):
        a = i / 6 * math.tau
        cyl(0.05, 0.13, (math.cos(a) * 0.24, math.sin(a) * 0.24, z + 0.16), GOLD, verts=8, r2=0.012)
        uvs(0.035, (math.cos(a) * 0.24, math.sin(a) * 0.24, z + 0.24), GOLD, seg=10, rings=6)
    if cross:
        box((0.06, 0.06, 0.28), (0, 0, z + 0.24), GOLD, bevel=0.015)
        box((0.18, 0.06, 0.06), (0, 0, z + 0.28), GOLD, bevel=0.015)

# ---- pawn: round sallet helm, T-slit, teal band
torso(1.0)
big_helm(0.33)
torus(0.34, 0.045, (0, 0, 1.76), ACC, seg=24)
box((0.36, 0.12, 0.07), (0, 0.29, 1.73), VISOR, bevel=0.03)
box((0.08, 0.12, 0.2), (0, 0.3, 1.64), VISOR, bevel=0.03)
uvs(0.05, (0, 0, 2.08), ACC)
finish('Fig_body_p')

# ---- knight: the reference look — great helm with grill visor and a big curved plume
torso(1.0)
big_helm(0.34)
visor_grill(1.7, 0.42, 4)
plume = [(0, 0.12, 2.0), (0, 0.02, 2.2), (0, -0.16, 2.26), (0, -0.32, 2.16), (0, -0.4, 1.98)]
tube(plume, lambda t: 0.12 * (1 - 0.5 * t) + 0.02, ACC, sides=12)
for i, p in enumerate(plume[:-1]):
    uvs(0.12 - i * 0.015, p, ACC)
finish('Fig_body_n')

# ---- bishop: tall mitre helm with a slit and a robe
torso(0.95, robe=True)
big_helm(0.32)
lathe([(0.3, 1.82), (0.26, 2.0), (0.17, 2.18), (0.06, 2.3), (0.0, 2.32)], MAIN, steps=20)
box((0.06, 0.4, 0.34), (0.05, 0.12, 2.06), VISOR, bevel=0.02, rot=(0, R(28), 0))
torus(0.31, 0.04, (0, 0, 1.84), ACC, seg=24)
box((0.36, 0.12, 0.08), (0, 0.28, 1.7), VISOR, bevel=0.03)
uvs(0.06, (0, 0, 2.34), ACC)
finish('Fig_body_b')

# ---- rook: bulky tower helm with battlements, wide armour
torso(1.2)
lathe([(0.0, 1.42), (0.34, 1.44), (0.36, 1.6), (0.34, 1.96), (0.38, 2.0), (0.38, 2.04), (0.0, 2.04)], MAIN, steps=12)
for i in range(4):
    a = i / 4 * math.tau + math.pi / 4
    box((0.16, 0.16, 0.16), (math.cos(a) * 0.26, math.sin(a) * 0.26, 2.12), MAIN, bevel=0.03)
torus(0.37, 0.045, (0, 0, 1.86), ACC, seg=12)
box((0.42, 0.14, 0.09), (0, 0.32, 1.72), VISOR, bevel=0.035)
finish('Fig_body_r')

# ---- queen: helm with crown, cape and skirt
torso(0.95, cape=True, skirt=True)
big_helm(0.32)
box((0.38, 0.12, 0.08), (0, 0.28, 1.72), VISOR, bevel=0.035)
crown(1.96)
finish('Fig_body_q')

# ---- king: great helm with a cross crown, cape, gold trim
torso(1.05, cape=True)
big_helm(0.34)
visor_grill(1.7, 0.38, 3)
crown(1.98, cross=True)
torus(0.31, 0.03, (0, 0, 1.42), GOLD, seg=20)
finish('Fig_body_k')

# ---- shared limbs (chunky, short)
box((0.25, 0.27, 0.36), (0, 0, 0.66), JOINT, bevel=0.08)                         # thigh
box((0.27, 0.29, 0.2), (0, 0.0, 0.43), MAIN, bevel=0.07)                          # knee guard
box((0.31, 0.44, 0.32), (0, 0.04, 0.17), MAIN, bevel=0.1)                         # boot
box((0.33, 0.46, 0.06), (0, 0.04, 0.02), JOINT, bevel=0.02)                       # sole
finish('Fig_leg', origin=(0, 0, 0.84))
box((0.2, 0.22, 0.3), (0, 0, 1.12), JOINT, bevel=0.07)                            # upper arm
box((0.26, 0.28, 0.28), (0, 0, 0.86), MAIN, bevel=0.09)                           # gauntlet
box((0.2, 0.22, 0.16), (0, 0.02, 0.68), JOINT, bevel=0.06)                        # hand
finish('Fig_arm', origin=(0, 0, 1.3))

# ---- first-person right hand gripping a blaster (the game mirrors it for the left hand).
# Pivot = the centre of the grip; the grip runs up/down (Z), forward = +Y, the forearm runs back and down toward the player.
box((0.1, 0.2, 0.24), (0.1, 0.0, -0.02), JOINT, bevel=0.04)                          # palm on the right of the grip
for i in range(4):                                                                  # fingers wrapped round the front
    box((0.2, 0.085, 0.052), (0.0, 0.115, 0.075 - i * 0.058), JOINT, bevel=0.022)
    box((0.07, 0.11, 0.052), (-0.085, 0.07, 0.075 - i * 0.058), JOINT, bevel=0.022)
box((0.075, 0.2, 0.075), (-0.075, 0.03, 0.135), JOINT, bevel=0.03, rot=(R(12), 0, 0))  # thumb along the left side
box((0.17, 0.12, 0.25), (0.11, -0.13, -0.03), JOINT, bevel=0.05)                     # wrist
box((0.27, 0.12, 0.32), (0.12, -0.24, -0.05), ACC, bevel=0.05, rot=(R(-18), 0, 0))    # cuff
capsule(0.135, (0.12, -0.32, -0.08), (0.34, -0.92, -0.36), MAIN)                     # gauntlet forearm, angled out and down
torus(0.14, 0.035, (0.23, -0.62, -0.22), ACC, rot=(R(70), 0, R(-20)), seg=14, mseg=6)   # armour band
capsule(0.11, (0.34, -0.92, -0.36), (0.62, -1.5, -0.72), JOINT)                      # sleeve back to the elbow
finish('Fig_hand')

bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'figures.glb'), export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True)

# ---------------------------------------------------------------- preview: both teams, all six
hide_sources()
TEAM_B = {'TeamMain': mat('B_Main', 0x3b3b42, rough=0.45), 'TeamAccent': mat('B_Acc', 0xf07a22, rough=0.45),
          'TeamEmblem': mat('B_Emb', 0xf6e7c8, rough=0.5)}
def figure(t, loc, team_b=False):
    w = 1.2 if t == 'r' else 1.0
    parts = [('Fig_body_' + t, (0, 0, 0))] + [('Fig_leg', (x * w, 0, 0.84)) for x in (-0.17, 0.17)] + \
            [('Fig_arm', (x * w, 0, 1.3)) for x in (-0.44, 0.44)]
    for n, piv in parts:
        o = place(n, (loc[0] + piv[0], loc[1] + piv[1], piv[2]), recolor=TEAM_B if team_b else None)
        if n == 'Fig_arm' and piv[0] > 0:
            o.rotation_euler = (R(-75), 0, 0)
for i, t in enumerate('pnbrqk'):
    figure(t, (5 - i * 2, 1.8), False)
    figure(t, (5 - i * 2, -0.8), True)
bpy.ops.mesh.primitive_plane_add(size=60, location=(0, 0, 0))
bpy.context.object.data.materials.append(mat('Floor', 0xe9d7b4, rough=0.9))
cam, aim = camera_at((0.5, 12, 3.2), (0, 0.4, 1.1), lens=38)
sun(rot=(50, 10, 160), energy=3.0)
preview_setup(OUT, 'figures_preview.png', res=(1400, 640), samples=80)
render()
aim.location = (3, 1.8, 1.4); cam.location = (2.6, 6.0, 1.9); cam.data.lens = 50
render(os.path.join(OUT, 'figures_knight.png'))
print('FIGURES DONE')
