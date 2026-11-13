"""Checkfire — Kid's Bedroom props (stylized toy, beveled low-poly), modelled from the Bedroom Interactive Props sheet.

Run headless:  blender -b --python bedroom_assets.py -- <out_dir>
Writes bedroom.glb and preview renders. Built directly in game units (Blender Z-up = game Y-up)
and sized to the existing collision boxes, so gameplay stays the same:
  ring 9x9 platform 0.9 high, corner posts at ±4.3, ropes at 1.25/1.6/1.95, stairs on the -Y side;
  train engine footprint ~1.8 (top 1.55), flatbed floor 0.55; robot collider 2.3 wide, 4.9 tall.
Robot limbs are exported separately with pivots at the joints so the game can animate them.
Front of the robot / train = -Y in Blender (= +Z in the game).
"""
import bpy, math, sys, os

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '.'
bpy.ops.wm.read_factory_settings(use_empty=True)
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'toykit.py')).read())
R = math.radians

TEAL = mat('ToyTeal', 0x22908b, rough=0.45)
TEAL_D = mat('ToyTealDark', 0x18706c, rough=0.45)
ORANGE = mat('ToyOrange', 0xf07a22, rough=0.4)
ORANGE_D = mat('ToyOrangeDark', 0xd0631a, rough=0.4)
CREAM = mat('ToyCream', 0xf6e7c8, rough=0.55)
NAVY = mat('ToyNavy', 0x26324f, rough=0.55)
RED = mat('ToyRed', 0xc9382b, rough=0.4)
BLUE = mat('ToyBlue', 0x2f5c9a, rough=0.4)
BLUE_L = mat('ToyBlueLight', 0x3d6fb0, rough=0.4)
YELLOW = mat('ToyYellowGlow', 0xffd34d, emit=2.5)
GREY = mat('ToyGrey', 0x9097a0, metal=0.55, rough=0.3)
DARK = mat('ToyDark', 0x22252c, rough=0.5)
VISOR = mat('ToyVisor', 0x1a2030, rough=0.25)
WOOD = mat('BedWood', 0xbd7a3e, rough=0.55)
WOOD_D = mat('BedWoodDark', 0x94592a, rough=0.55)
WHITE = mat('Pillow', 0xfbf6ec, rough=0.8)
SHADE = mat('LampShade', 0xffe3a6, rough=0.7, emit=0.8)
CURTAIN = mat('Curtain', 0x1f8a86, rough=0.85)
GLASS = mat('WindowSky', 0xbfe6f7, emit=0.6)

# ================================================================ ROBOT (front view / side view on the sheet)
box((1.9, 1.45, 1.55), (0, 0, 2.42), TEAL, bevel=0.16)                          # torso
for z in (2.0, 2.85):
    box((1.92, 1.47, 0.03), (0, 0, z), TEAL_D, bevel=0.01)                      # panel seams
box((1.1, 0.12, 0.85), (0, -0.74, 2.42), ORANGE, bevel=0.07)                    # chest plate
star(0.3, 0.06, (0, -0.81, 2.42), CREAM, rot=(R(90), 0, 0))
box((1.45, 1.2, 0.36), (0, 0, 1.5), DARK, bevel=0.08)                           # waist joint
cyl(0.32, 0.32, (0, 0, 3.3), DARK, verts=16)                                    # neck
box((1.5, 1.3, 1.12), (0, 0, 4.02), TEAL, bevel=0.2)                            # head
box((1.18, 0.12, 0.62), (0, -0.62, 4.04), VISOR, bevel=0.1)                     # visor
for x in (-0.27, 0.27):
    box((0.27, 0.1, 0.32), (x, -0.67, 4.04), YELLOW, bevel=0.08)                # eyes
for x in (-0.79, 0.79):
    cyl(0.3, 0.16, (x, 0, 4.02), ORANGE, verts=20, rot=(0, R(90), 0))          # ears
    cyl(0.17, 0.2, (x, 0, 4.02), ORANGE_D, verts=16, rot=(0, R(90), 0))
cyl(0.045, 0.5, (0, 0, 4.8), DARK, verts=8)
uvs(0.17, (0, 0, 5.12), ORANGE)                                                 # antenna ball
finish('RobotBody')
for side in (-1, 1):                                                            # legs, pivot at the hip
    x = side * 0.46
    box((0.56, 0.6, 0.52), (x, 0, 1.08), TEAL, bevel=0.1)
    box((0.48, 0.52, 0.18), (x, 0, 0.75), DARK, bevel=0.05)                     # knee
    box((0.56, 0.6, 0.45), (x, 0, 0.52), TEAL, bevel=0.1)
    box((0.86, 1.06, 0.36), (x, -0.13, 0.18), ORANGE, bevel=0.14)               # big orange feet
    finish('RobotLegL' if side < 0 else 'RobotLegR', origin=(x, 0, 1.32))
for side in (-1, 1):                                                            # arms, pivot at the shoulder
    x = side * 1.22
    uvs(0.36, (x, 0, 2.95), ORANGE, scale=(1, 1, 0.9))                          # shoulder ball
    box((0.42, 0.42, 0.62), (x, 0, 2.5), TEAL, bevel=0.09)
    box((0.52, 0.52, 0.48), (x, 0, 1.98), ORANGE, bevel=0.1)                    # bracer
    box((0.4, 0.4, 0.2), (x, 0, 1.66), DARK, bevel=0.05)                        # wrist
    for dy in (-1, 1):                                                          # U-shaped claw
        tube([(x, dy * 0.12, 1.6), (x, dy * 0.2, 1.45), (x, dy * 0.16, 1.28), (x, dy * 0.06, 1.24)], 0.065, TEAL, sides=10)
    finish('RobotArmL' if side < 0 else 'RobotArmR', origin=(x, 0, 2.95))

# ================================================================ BOXING RING (centred on the origin)
segs = 6
for side in range(4):                                                           # teal skirt blocks
    for k in range(segs):
        t = -4.5 + (k + 0.5) * 9 / segs
        x, y = (t, 4.42) if side == 0 else (t, -4.42) if side == 1 else (4.42, t) if side == 2 else (-4.42, t)
        sx, sy = (9 / segs - 0.08, 0.26) if side < 2 else (0.26, 9 / segs - 0.08)
        box((sx, sy, 0.62), (x, y, 0.31), TEAL if k % 2 else TEAL_D, bevel=0.07)
box((8.7, 8.7, 0.6), (0, 0, 0.3), TEAL_D, bevel=0.02)
box((9.35, 9.35, 0.24), (0, 0, 0.78), ORANGE, bevel=0.1)                        # padded orange edge
box((8.75, 8.75, 0.05), (0, 0, 0.9), NAVY, bevel=0.01)                          # mat
star(1.9, 0.02, (0, 0, 0.93), CREAM)
for sx in (-1, 1):
    for sy in (-1, 1):
        box((0.6, 0.6, 1.5), (sx * 4.3, sy * 4.3, 1.66), TEAL, bevel=0.12)      # padded posts
        box((0.74, 0.74, 0.26), (sx * 4.3, sy * 4.3, 2.5), ORANGE, bevel=0.1)
        for z in (1.25, 1.6, 1.95):                                             # turnbuckles (both directions)
            for ang in (0, 90):
                dx, dy = (-sx * 0.42, 0) if ang == 0 else (0, -sy * 0.42)
                cyl(0.09, 0.28, (sx * 4.3 + dx, sy * 4.3 + dy, z), GREY, verts=12,
                    rot=(0, R(90), 0) if ang == 0 else (R(90), 0, 0))
for k in range(3):                                                              # entry stairs (-Y side), 0.3 steps
    y = -4.65 - 0.7 * (2 - k) - 0.35
    box((2.6, 0.7, 0.3 * (k + 1)), (0, y, 0.15 * (k + 1)), TEAL_D, bevel=0.05)
    box((2.62, 0.74, 0.08), (0, y, 0.3 * (k + 1) - 0.02), ORANGE, bevel=0.035)
for x in (-1.42, 1.42):
    box((0.22, 2.4, 0.9), (x, -5.75, 0.55), TEAL, bevel=0.08, rot=(R(21), 0, 0))
finish('RingBase')
for name, (x, y, horiz) in {'RopeZP': (0, -4.3, True), 'RopeZN': (0, 4.3, True), 'RopeXP': (4.3, 0, False), 'RopeXN': (-4.3, 0, False)}.items():
    for k, z in enumerate((1.25, 1.6, 1.95)):                                   # thick padded ropes
        a, b = ((-3.85, y, z), (3.85, y, z)) if horiz else ((x, -3.85, z), (x, 3.85, z))
        capsule(0.12, a, b, ORANGE if k != 1 else CREAM, sides=14)
    finish(name, origin=(x, y, 0))

# ================================================================ TRAIN
def wheel(x, y, z, r, m_rim=ORANGE):
    cyl(r, 0.16, (x, y, z), DARK, verts=24, rot=(0, R(90), 0), bevel=0.03)       # tyre
    cyl(r * 0.78, 0.2, (x, y, z), m_rim, verts=20, rot=(0, R(90), 0), bevel=0.02)  # rim
    for k in range(4):                                                          # spokes
        box((0.22, r * 1.25, 0.06), (x + (0.03 if x > 0 else -0.03), y, z), DARK, bevel=0.01, rot=(R(k * 45), 0, 0))
    cyl(r * 0.25, 0.24, (x, y, z), CREAM, verts=12, rot=(0, R(90), 0))           # hub

# engine
box((1.38, 2.2, 0.3), (0, 0, 0.5), RED, bevel=0.06)                             # running board / frame
cyl(0.5, 1.5, (0, -0.32, 1.02), BLUE, verts=20, rot=(R(90), 0, 0), bevel=0.04)  # boiler
for yb in (-0.95, -0.45, 0.05):
    cyl(0.535, 0.1, (0, yb, 1.02), ORANGE, verts=20, rot=(R(90), 0, 0))
cyl(0.46, 0.1, (0, -1.1, 1.02), RED, verts=20, rot=(R(90), 0, 0))              # face plate
torus(0.4, 0.05, (0, -1.15, 1.02), ORANGE, rot=(R(90), 0, 0))
star(0.27, 0.05, (0, -1.17, 1.02), CREAM, rot=(R(90), 0, 0))
lathe([(0.0, 1.45), (0.16, 1.45), (0.14, 1.85), (0.2, 1.9), (0.3, 2.08), (0.24, 2.12), (0.0, 2.12)], RED, loc=(0, -0.72, 0), steps=16)
torus(0.27, 0.05, (0, -0.72, 2.08), ORANGE)                                     # flared stack crown
box((0.36, 0.26, 0.34), (0, -1.0, 1.62), ORANGE, bevel=0.07)                    # headlamp housing
cyl(0.12, 0.06, (0, -1.13, 1.62), YELLOW, verts=16, rot=(R(90), 0, 0))
box((1.35, 0.9, 1.12), (0, 0.65, 1.22), RED, bevel=0.08)                        # cab
for x in (-0.68, 0.68):
    box((0.04, 0.46, 0.44), (x, 0.65, 1.45), DARK, bevel=0.02)                  # windows
    box((0.05, 0.56, 0.06), (x, 0.65, 1.7), ORANGE, bevel=0.015)
box((1.6, 1.1, 0.16), (0, 0.65, 1.84), BLUE_L, bevel=0.07)                      # rounded roof
box((1.4, 0.22, 0.1), (0, 0.65, 1.95), BLUE, bevel=0.04)
for k in range(5):                                                              # cowcatcher
    box((0.09, 0.42, 0.3), (-0.4 + k * 0.2, -1.25, 0.25), ORANGE, bevel=0.03, rot=(R(-38), 0, 0))
box((1.1, 0.12, 0.1), (0, -1.12, 0.42), ORANGE, bevel=0.03)
for x in (-0.76, 0.76):
    wheel(x, 0.6, 0.36, 0.36)
    wheel(x, 0.0, 0.36, 0.36)
    wheel(x, -0.7, 0.26, 0.24)
    box((0.06, 0.78, 0.09), (x * 1.13, 0.3, 0.3), GREY, bevel=0.02)            # coupling rod
    box((0.24, 0.18, 0.05), (x * 0.95, 1.05, 0.25), ORANGE, bevel=0.02)          # cab step
box((0.16, 0.35, 0.12), (0, 1.12, 0.42), GREY, bevel=0.03)
finish('TrainEngine')
# flatbed (floor 0.55, orange slatted rails, end handles)
box((1.42, 1.95, 0.2), (0, 0, 0.42), NAVY, bevel=0.05)
box((1.52, 2.02, 0.16), (0, 0, 0.6), RED, bevel=0.05)
for x in (-0.72, 0.72):
    for z in (0.82, 1.02):
        box((0.09, 1.92, 0.12), (x, 0, z), ORANGE, bevel=0.035)
    for y in (-0.88, -0.3, 0.3, 0.88):
        box((0.11, 0.11, 0.48), (x, y, 0.86), ORANGE_D if abs(y) < 0.5 else ORANGE, bevel=0.03)
for y in (-0.97, 0.97):
    box((1.4, 0.09, 0.12), (0, y, 0.82), ORANGE, bevel=0.035)
    tube([(-0.38, y * 1.03, 0.9), (-0.38, y * 1.03, 1.18), (0.38, y * 1.03, 1.18), (0.38, y * 1.03, 0.9)], 0.045, ORANGE, sides=8)
for x in (-0.74, 0.74):
    for y in (-0.55, 0.55):
        wheel(x, y, 0.3, 0.28)
box((0.16, 0.35, 0.12), (0, -1.12, 0.42), GREY, bevel=0.03)
finish('TrainCar')

# ================================================================ LOADING PLATFORM (floor 0.55, step toward +Y)
box((4.0, 1.8, 0.55), (0, 0, 0.275), TEAL, bevel=0.08)
box((4.12, 1.92, 0.1), (0, 0, 0.56), ORANGE, bevel=0.04)
box((1.4, 0.7, 0.28), (0, 1.25, 0.14), TEAL_D, bevel=0.05)
box((1.46, 0.74, 0.07), (0, 1.25, 0.28), ORANGE, bevel=0.03)
for x in (-1.9, 1.9):
    box((0.16, 0.16, 0.9), (x, 0, 1.05), TEAL, bevel=0.04)
    box((0.24, 0.24, 0.14), (x, 0, 1.52), ORANGE, bevel=0.05)
    capsule(0.05, (x, -0.7, 1.28), (x, 0.7, 1.28), ORANGE)
finish('LoadingPlatform')

# ================================================================ BED (collider 3.4 x 14 x 1.9, headboard at -Y)
box((3.5, 14.2, 0.6), (0, 0, 0.72), WOOD, bevel=0.1)
box((3.3, 13.8, 0.8), (0, 0, 1.42), WHITE, bevel=0.2)
box((3.62, 10.8, 0.26), (0, 1.6, 1.86), NAVY, bevel=0.12)                       # star duvet
box((3.62, 0.5, 0.26), (0, -3.65, 1.92), CREAM, bevel=0.1)                      # folded edge
for i, (x, y) in enumerate([(-0.9, -2.2), (0.8, -0.8), (-0.4, 0.8), (0.9, 2.3), (-0.9, 3.7), (0.3, 5.2), (-0.1, -1.6), (0.6, 4.2), (-1.0, 1.9), (0.2, 6.5)]):
    star(0.36 - 0.06 * (i % 2), 0.03, (x, y + 0.6, 2.0), CREAM, rot=(0, 0, i * 0.4))
box((2.6, 2.0, 0.5), (0, -5.5, 2.1), WHITE, bevel=0.22)                         # pillow
box((3.5, 0.6, 3.6), (0, -7.6, 2.0), WOOD, bevel=0.15)                          # headboard
box((3.0, 0.62, 0.3), (0, -7.6, 3.5), WOOD_D, bevel=0.1)
for x in (-1.75, 1.75):
    cyl(0.26, 4.4, (x, -7.6, 2.2), WOOD_D, verts=16)
    uvs(0.3, (x, -7.6, 4.5), WOOD_D)
    cyl(0.22, 2.4, (x, 6.95, 1.2), WOOD_D, verts=16)                            # footboard posts
    uvs(0.26, (x, 6.95, 2.45), WOOD_D)
box((3.3, 0.4, 1.3), (0, 6.95, 1.55), WOOD, bevel=0.12)
finish('Bed')
# dresser + lamp
box((3.4, 10.0, 1.9), (0, 0, 0.95), WOOD, bevel=0.1)
for k in range(3):
    for y in (-2.5, 2.5):
        box((0.08, 4.5, 0.5), (-1.7, y, 0.42 + k * 0.58), WOOD_D, bevel=0.04)
        uvs(0.11, (-1.78, y, 0.42 + k * 0.58), ORANGE)
lathe([(0.0, 1.9), (0.45, 1.9), (0.42, 2.05), (0.18, 2.2), (0.1, 2.9), (0.0, 2.9)], ORANGE, loc=(0, 3.2, 0), steps=16)
lathe([(0.55, 2.9), (0.9, 2.95), (0.98, 3.0), (0.62, 3.8), (0.55, 3.82)], SHADE, loc=(0, 3.2, 0), steps=20)
finish('Dresser')
# bookshelf with teal/orange bins
box((6.0, 1.5, 5.0), (0, 0, 2.5), WOOD, bevel=0.1)
box((5.6, 0.1, 4.6), (0, 0.68, 2.5), WOOD_D, bevel=0.02)
for k in range(3):
    box((5.6, 1.35, 0.14), (0, -0.07, 0.6 + k * 1.5), WOOD_D, bevel=0.03)
    for i in range(2):
        box((1.55, 1.0, 0.95), (-1.65 + i * 3.3, -0.25, 1.15 + k * 1.5), TEAL if (i + k) % 2 else ORANGE, bevel=0.08)
        box((0.5, 0.05, 0.14), (-1.65 + i * 3.3, -0.76, 1.3 + k * 1.5), CREAM, bevel=0.02)
    for i in range(6):
        box((0.22, 0.9, 0.95 - 0.1 * (i % 3)), (-0.6 + i * 0.25, -0.2, 1.12 - 0.05 * (i % 3) + k * 1.5),
            [RED, BLUE, CREAM, TEAL_D, ORANGE, NAVY][(i + k) % 6], bevel=0.03)
finish('Bookshelf')
# window with teal curtains + star poster (back-wall decorations, face -Y)
box((10.4, 0.3, 6.4), (0, 0, 0), WOOD, bevel=0.08)
box((9.6, 0.32, 5.6), (0, -0.02, 0), GLASS, bevel=0.02)
box((0.25, 0.4, 5.6), (0, -0.05, 0), WOOD, bevel=0.05)
box((9.6, 0.4, 0.25), (0, -0.05, 0.3), WOOD, bevel=0.05)
for x in (-5.4, 5.4):
    for k in range(4):
        box((0.6, 0.35, 7.4), (x + (k - 1.5) * 0.45, -0.4, -0.3), CURTAIN if k % 2 else TEAL_D, bevel=0.15)
capsule(0.09, (-7.2, -0.6, 3.6), (7.2, -0.6, 3.6), WOOD_D)
finish('Window')
box((3.4, 0.15, 4.2), (0, 0, 0), WOOD, bevel=0.06)
box((3.0, 0.17, 3.8), (0, -0.02, 0), TEAL, bevel=0.02)
star(1.15, 0.06, (0, -0.12, 0.1), ORANGE, rot=(R(90), 0, 0))
finish('StarPoster')

# ---------------------------------------------------------------- export + previews
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'bedroom.glb'), export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True)

from mathutils import Matrix
hide_sources()
def robot(loc, rz):
    for n in ('RobotBody', 'RobotLegL', 'RobotLegR', 'RobotArmL', 'RobotArmR'):
        src = bpy.data.objects[n]
        o = place(n, (0, 0, 0))
        o.matrix_world = Matrix.Translation(loc) @ Matrix.Rotation(rz, 4, 'Z') @ src.matrix_world
robot((-13, 2, 0), 0)
robot((-9.4, 2, 0), -math.pi / 2)
place('RingBase', (0, 3, 0))
for n in ('RopeZP', 'RopeZN', 'RopeXP', 'RopeXN'):
    src = bpy.data.objects[n]
    place(n, (src.location.x, src.location.y + 3, 0))
place('TrainEngine', (10.2, -2.6, 0), math.radians(90))
place('TrainCar', (12.55, -2.6, 0), math.radians(90))
place('LoadingPlatform', (11.4, -4.75, 0))
place('Bed', (-5.5, 13, 0), math.radians(90), 0.8)
place('Dresser', (9, 12, 0), math.radians(90), 0.8)
place('Bookshelf', (16, 9, 0), math.radians(-30), 0.8)
bpy.ops.mesh.primitive_plane_add(size=120, location=(0, 0, 0))
bpy.context.object.data.materials.append(mat('Floor', 0xb9773f, rough=0.75))
sun(rot=(45, 15, -30))
preview_setup(OUT, 'bedroom_preview.png', bg=0xf3e6cf)
cam, aim = camera_at((4, -26, 13), (0, 3, 1.2), lens=30)
render()
aim.location = (-11.2, 2, 2.6); cam.location = (-10, -9.5, 4.2); cam.data.lens = 38
render(os.path.join(OUT, 'bedroom_robot.png'))
aim.location = (11.3, -3.2, 0.9); cam.location = (17.5, -10.5, 4.0); cam.data.lens = 40
render(os.path.join(OUT, 'bedroom_train.png'))
aim.location = (0, 2, 1.4); cam.location = (6, -9, 5.5); cam.data.lens = 34
render(os.path.join(OUT, 'bedroom_ring.png'))
print('BEDROOM DONE')
