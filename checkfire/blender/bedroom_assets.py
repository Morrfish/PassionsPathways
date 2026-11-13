"""Checkfire — Kid's Bedroom props (stylized toy, beveled low-poly).

Run headless:  blender -b --python bedroom_assets.py -- <out_dir>
Writes bedroom.glb and preview renders. Built directly in game units (Blender Z-up = game Y-up)
and sized to the existing collision boxes, so gameplay stays the same:
  ring 9x9 platform 0.9 high, corner posts at ±4.3, ropes at 1.25/1.6/1.95;
  train engine footprint ~1.8 (top 1.55), open car floor 0.55; robot collider 2.3 wide, 4.9 tall.
Limb parts are exported separately with pivots at the joints so the game can animate them.
"""
import bpy, math, sys, os

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '.'
bpy.ops.wm.read_factory_settings(use_empty=True)
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'toykit.py')).read())

TEAL = mat('ToyTeal', 0x1f8a86, rough=0.5)
TEAL_D = mat('ToyTealDark', 0x176b68, rough=0.5)
ORANGE = mat('ToyOrange', 0xf07a22, rough=0.45)
CREAM = mat('ToyCream', 0xf6e7c8, rough=0.6)
NAVY = mat('ToyNavy', 0x26324f, rough=0.6)
RED = mat('ToyRed', 0xc8382a, rough=0.45)
BLUE = mat('ToyBlue', 0x2f5c9a, rough=0.45)
YELLOW = mat('ToyYellowGlow', 0xffd34d, emit=2.5)
GREY = mat('ToyGrey', 0x8d939b, metal=0.5, rough=0.35)
DARK = mat('ToyDark', 0x22252c, rough=0.6)
WOOD = mat('BedWood', 0xb8743a, rough=0.6)
WOOD_D = mat('BedWoodDark', 0x8f5528, rough=0.6)
WHITE = mat('Pillow', 0xfbf6ec, rough=0.8)
SHADE = mat('LampShade', 0xffe9b8, rough=0.7, emit=0.6)

# ---------------------------------------------------------------- tin robot (front = -Y in Blender = +Z in game)
# body/head
box((2.0, 1.5, 1.7), (0, 0, 2.4), TEAL, bevel=0.12)
box((1.15, 0.12, 0.9), (0, -0.78, 2.45), ORANGE, bevel=0.06)
star(0.32, 0.08, (0, -0.86, 2.45), CREAM, rot=(math.radians(90), 0, 0))
box((1.6, 1.3, 0.4), (0, 0, 1.45), TEAL_D, bevel=0.08)                     # hips
box((0.5, 0.5, 0.3), (0, 0, 3.4), TEAL_D, bevel=0.05)                      # neck
box((1.5, 1.3, 1.15), (0, 0, 4.05), TEAL, bevel=0.14)                      # head
box((1.15, 0.1, 0.6), (0, -0.66, 4.05), DARK, bevel=0.05)                  # visor
for x in (-0.27, 0.27):
    box((0.28, 0.08, 0.32), (x, -0.71, 4.05), YELLOW, bevel=0.04)         # glowing eyes
for x in (-0.82, 0.82):
    cyl(0.28, 0.16, (x, 0, 4.05), ORANGE, verts=14, rot=(0, math.radians(90), 0), bevel=0.03)
cyl(0.05, 0.45, (0, 0, 4.85), DARK, verts=8)
uvs(0.16, (0, 0, 5.12), ORANGE, seg=12, rings=8)
finish('RobotBody')
for side in (-1, 1):   # legs, pivot at the hip
    x = side * 0.48
    box((0.6, 0.65, 1.0), (x, 0, 0.85), TEAL, bevel=0.08)
    box((0.85, 1.05, 0.38), (x, -0.12, 0.19), ORANGE, bevel=0.08)
    finish('RobotLegL' if side < 0 else 'RobotLegR', origin=(x, 0, 1.3))
for side in (-1, 1):   # arms, pivot at the shoulder
    x = side * 1.25
    box((0.62, 0.62, 0.5), (x, 0, 2.95), ORANGE, bevel=0.08)               # shoulder cap
    box((0.45, 0.45, 0.7), (x, 0, 2.45), TEAL, bevel=0.06)
    box((0.55, 0.55, 0.45), (x, 0, 1.95), ORANGE, bevel=0.07)              # cuff
    box((0.42, 0.42, 0.25), (x, 0, 1.62), TEAL_D, bevel=0.04)
    for dy in (-0.14, 0.14):                                               # claw fingers
        box((0.14, 0.12, 0.38), (x, dy, 1.36), TEAL, bevel=0.03)
    finish('RobotArmL' if side < 0 else 'RobotArmR', origin=(x, 0, 2.95))

# ---------------------------------------------------------------- boxing ring (centred on origin)
segs = 6
for side in range(4):   # chunky teal skirt blocks
    for k in range(segs):
        t = -4.5 + (k + 0.5) * 9 / segs
        x, y = (t, 4.45) if side == 0 else (t, -4.45) if side == 1 else (4.45, t) if side == 2 else (-4.45, t)
        sx, sy = (9 / segs - 0.06, 0.2) if side < 2 else (0.2, 9 / segs - 0.06)
        box((sx, sy, 0.62), (x, y, 0.31), TEAL if k % 2 else TEAL_D, bevel=0.05)
box((8.8, 8.8, 0.6), (0, 0, 0.3), TEAL_D)
box((9.3, 9.3, 0.26), (0, 0, 0.77), ORANGE, bevel=0.07)                    # orange apron
box((8.7, 8.7, 0.04), (0, 0, 0.905), NAVY)                                  # mat
star(1.7, 0.02, (0, 0, 0.93), CREAM)
for sx in (-1, 1):
    for sy in (-1, 1):
        box((0.55, 0.55, 1.5), (sx * 4.3, sy * 4.3, 1.65), TEAL, bevel=0.07)
        box((0.68, 0.68, 0.24), (sx * 4.3, sy * 4.3, 2.48), ORANGE, bevel=0.07)
        for z in (1.25, 1.6, 1.95):
            box((0.62, 0.62, 0.1), (sx * 4.3, sy * 4.3, z), GREY, bevel=0.02)   # rope clamps
# entry stairs on the +Y side (game -Z): steps of 0.3 so you can walk up
for k in range(3):
    box((2.6, 0.7, 0.3 * (k + 1)), (0, -4.65 - 0.7 * (2 - k) - 0.35, 0.15 * (k + 1)), TEAL_D, bevel=0.03)
    box((2.6, 0.72, 0.06), (0, -4.65 - 0.7 * (2 - k) - 0.35, 0.3 * (k + 1) + 0.01), ORANGE, bevel=0.02)
for x in (-1.4, 1.4):
    box((0.2, 2.2, 1.0), (x, -5.75, 0.5), TEAL, bevel=0.05, rot=(math.radians(-20), 0, 0))
finish('RingBase')
# ropes per side, exported separately so they can stretch when you bounce
for name, (x, y, horiz) in {'RopeZP': (0, -4.3, True), 'RopeZN': (0, 4.3, True), 'RopeXP': (4.3, 0, False), 'RopeXN': (-4.3, 0, False)}.items():
    for k, z in enumerate((1.25, 1.6, 1.95)):
        cyl(0.075, 8.0, (x, y, z), ORANGE if k != 1 else CREAM, verts=10,
            rot=(0, math.radians(90), 0) if horiz else (math.radians(90), 0, 0))
    finish(name, origin=(x, y, 0))

# ---------------------------------------------------------------- train (front = -Y in Blender = +Z in game)
box((1.4, 2.2, 0.32), (0, 0, 0.42), RED, bevel=0.05)                       # chassis
cyl(0.5, 1.45, (0, -0.35, 1.0), BLUE, verts=14, rot=(math.radians(90), 0, 0), bevel=0.03)   # boiler
for yb in (-0.95, -0.45, 0.1):
    cyl(0.53, 0.09, (0, yb, 1.0), ORANGE, verts=14, rot=(math.radians(90), 0, 0))
cyl(0.42, 0.06, (0, -1.09, 1.0), RED, verts=14, rot=(math.radians(90), 0, 0))
star(0.25, 0.04, (0, -1.13, 1.0), CREAM, rot=(math.radians(90), 0, 0))
cyl(0.16, 0.42, (0, -0.75, 1.68), RED, verts=10)                           # smokestack
cyl(0.3, 0.2, (0, -0.75, 1.98), ORANGE, verts=10, r2=0.18, rot=(math.pi, 0, 0))
box((0.3, 0.2, 0.3), (0, -1.0, 1.55), ORANGE, bevel=0.04)                  # headlamp housing
cyl(0.11, 0.06, (0, -1.11, 1.55), YELLOW, verts=10, rot=(math.radians(90), 0, 0))
box((1.35, 0.85, 1.05), (0, 0.65, 1.2), RED, bevel=0.06)                   # cab
for x in (-0.68, 0.68):
    box((0.03, 0.42, 0.42), (x, 0.65, 1.4), DARK)                          # windows
box((1.6, 1.05, 0.14), (0, 0.65, 1.78), BLUE, bevel=0.05)                  # roof
for k in range(5):                                                          # cowcatcher
    box((0.08, 0.38, 0.32), (-0.4 + k * 0.2, -1.22, 0.25), ORANGE, bevel=0.02, rot=(math.radians(-35), 0, 0))
for x in (-0.74, 0.74):
    for y in (-0.55, 0.55):
        cyl(0.32, 0.14, (x, y, 0.32), DARK, verts=14, rot=(0, math.radians(90), 0))
        cyl(0.2, 0.16, (x, y, 0.32), ORANGE, verts=12, rot=(0, math.radians(90), 0))
    box((0.05, 1.2, 0.08), (x * 1.08, 0, 0.32), GREY)                     # side rods
finish('TrainEngine')
# open flatbed car: floor at 0.55 (rideable), slatted orange sides
box((1.45, 1.9, 0.18), (0, 0, 0.46), NAVY, bevel=0.04)
box((1.5, 1.95, 0.14), (0, 0, 0.6), RED, bevel=0.04)
for x in (-0.72, 0.72):
    for k in range(2):
        box((0.08, 1.9, 0.14), (x, 0, 0.78 + k * 0.2), ORANGE, bevel=0.03)
    for y in (-0.85, 0.85):
        box((0.1, 0.1, 0.5), (x, y, 0.88), ORANGE, bevel=0.02)
for y in (-0.95, 0.95):
    box((1.4, 0.08, 0.14), (0, y, 0.78), ORANGE, bevel=0.03)
    box((0.8, 0.08, 0.08), (0, y * 1.02, 1.15), ORANGE, bevel=0.03)        # handles
    for x in (-0.4, 0.4):
        box((0.08, 0.08, 0.3), (x, y * 1.02, 1.0), ORANGE, bevel=0.02)
for x in (-0.74, 0.74):
    for y in (-0.55, 0.55):
        cyl(0.28, 0.14, (x, y, 0.28), DARK, verts=14, rot=(0, math.radians(90), 0))
        cyl(0.17, 0.16, (x, y, 0.28), ORANGE, verts=12, rot=(0, math.radians(90), 0))
box((0.16, 0.35, 0.12), (0, -1.1, 0.42), GREY)                             # coupler
finish('TrainCar')

# ---------------------------------------------------------------- loading platform (floor height 0.55 to step into the car)
box((4.0, 1.8, 0.55), (0, 0, 0.275), TEAL, bevel=0.06)
box((4.1, 1.9, 0.08), (0, 0, 0.57), ORANGE, bevel=0.03)
box((1.4, 0.7, 0.28), (0, 1.25, 0.14), TEAL_D, bevel=0.04)                 # step
box((1.45, 0.72, 0.05), (0, 1.25, 0.29), ORANGE, bevel=0.02)
for x in (-1.9, 1.9):
    box((0.14, 0.14, 0.9), (x, 0, 1.0), TEAL, bevel=0.03)
    box((0.22, 0.22, 0.12), (x, 0, 1.48), ORANGE, bevel=0.03)
    box((0.08, 1.5, 0.08), (x, 0, 1.25), ORANGE, bevel=0.02)
finish('LoadingPlatform')

# ---------------------------------------------------------------- bed (fits collider 3.4 x 14 x 1.9; headboard at -Y)
box((3.5, 14.2, 0.7), (0, 0, 0.75), WOOD, bevel=0.08)                      # frame rail
box((3.3, 13.8, 0.75), (0, 0, 1.45), WHITE, bevel=0.15)                    # mattress
box((3.6, 10.6, 0.22), (0, 1.6, 1.87), NAVY, bevel=0.1)                    # duvet
for i, (x, y) in enumerate([(-0.9, -2.0), (0.8, -0.6), (-0.5, 1.2), (0.9, 2.6), (-0.9, 3.9), (0.3, 5.4), (-0.2, -0.9), (0.6, 4.4)]):
    star(0.38 - 0.06 * (i % 2), 0.03, (x, y + 0.6, 1.995), CREAM, rot=(0, 0, i * 0.4))
box((2.6, 2.0, 0.45), (0, -5.4, 2.1), WHITE, bevel=0.18)                   # pillow
box((3.5, 0.9, 4.4), (0, -7.6, 2.2), WOOD, bevel=0.12)                     # headboard
for x in (-1.75, 1.75):
    cyl(0.28, 4.6, (x, -7.6, 2.3), WOOD_D, verts=10, bevel=0.03)
    uvs(0.32, (x, -7.6, 4.75), WOOD_D, seg=10, rings=6, smooth=False)
for x in (-1.6, 1.6):
    for y in (-6.9, 6.9):
        box((0.3, 0.3, 0.45), (x, y, 0.22), WOOD_D, bevel=0.04)           # feet
finish('Bed')
# dresser (fits collider 3.4 x 10 x 1.9) with lamp
box((3.4, 10.0, 1.9), (0, 0, 0.95), WOOD, bevel=0.08)
for k in range(3):
    for y in (-2.5, 2.5):
        box((0.06, 4.6, 0.5), (-1.7, y, 0.4 + k * 0.58), WOOD_D, bevel=0.04)
        cyl(0.12, 0.1, (-1.76, y, 0.4 + k * 0.58), ORANGE, verts=10, rot=(0, math.radians(90), 0))
cyl(0.5, 0.25, (0, 3.2, 2.02), ORANGE, verts=12, bevel=0.03)
cyl(0.12, 1.1, (0, 3.2, 2.6), ORANGE, verts=8)
cyl(1.0, 1.0, (0, 3.2, 3.55), SHADE, verts=12, r2=0.55)
finish('Dresser')
# bookshelf with teal/orange bins (back wall decoration)
box((6.0, 1.5, 5.0), (0, 0, 2.5), WOOD, bevel=0.08)
for k in range(3):
    box((5.6, 1.3, 0.12), (0, -0.12, 0.6 + k * 1.5), WOOD_D)
    for i in range(2):
        box((1.6, 1.0, 0.95), (-1.6 + i * 3.2, -0.3, 1.15 + k * 1.5), TEAL if (i + k) % 2 else ORANGE, bevel=0.06)
    for i in range(6):
        box((0.22, 0.9, 0.9 - 0.1 * (i % 3)), (-0.6 + i * 0.25, -0.25, 1.1 - 0.05 * (i % 3) + k * 1.5), [RED, BLUE, CREAM, TEAL_D, ORANGE, NAVY][(i + k) % 6], bevel=0.02)
finish('Bookshelf')

# ---------------------------------------------------------------- export
bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'bedroom.glb'), export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True)

# ---------------------------------------------------------------- preview renders
def place(name, loc, rz=0, s=1.0):
    src = bpy.data.objects[name]
    o = src.copy(); o.data = src.data
    bpy.context.collection.objects.link(o)
    o.location = loc; o.rotation_euler = (0, 0, rz); o.scale = (s, s, s); o.hide_render = False
    return o
for o in list(bpy.data.objects):
    o.hide_render = True
def robot(loc, rz):
    for n in ('RobotBody', 'RobotLegL', 'RobotLegR', 'RobotArmL', 'RobotArmR'):
        src = bpy.data.objects[n]
        o = place(n, src.location.copy(), 0)
        o.rotation_euler = (0, 0, 0)
        # rotate around the robot's own origin
        from mathutils import Matrix
        o.matrix_world = Matrix.Translation(loc) @ Matrix.Rotation(rz, 4, 'Z') @ src.matrix_world
robot((-13, 2, 0), 0)
robot((-9.5, 2, 0), -math.pi / 2)
place('RingBase', (0, 3, 0)); [place(n, bpy.data.objects[n].location + __import__('mathutils').Vector((0, 3, 0))) for n in ('RopeZP', 'RopeZN', 'RopeXP', 'RopeXN')]
place('TrainEngine', (10, -2.5, 0), math.radians(90))
place('TrainCar', (12.4, -2.5, 0), math.radians(90))
place('LoadingPlatform', (11.2, -4.7, 0))
place('Bed', (-5.5, 13, 0), math.radians(90), 0.8)
place('Dresser', (9, 12, 0), math.radians(90), 0.8)
place('Bookshelf', (16, 9, 0), math.radians(-30), 0.8)
bpy.ops.mesh.primitive_plane_add(size=120, location=(0, 0, 0))
bpy.context.object.data.materials.append(mat('Floor', 0xb07a45, rough=0.8))
bpy.ops.object.empty_add(location=(0, 3, 1.2)); aim = bpy.context.object
bpy.ops.object.camera_add(location=(4, -26, 13)); cam = bpy.context.object; cam.data.lens = 30
tc = cam.constraints.new('TRACK_TO'); tc.target = aim; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
bpy.context.scene.camera = cam
bpy.ops.object.light_add(type='SUN', location=(0, 0, 10), rotation=(math.radians(45), math.radians(15), math.radians(-30)))
bpy.context.object.data.energy = 3.2; bpy.context.object.data.color = (1.0, 0.92, 0.8)
w = bpy.data.worlds.new('Room'); bpy.context.scene.world = w; w.use_nodes = True
w.node_tree.nodes['Background'].inputs[0].default_value = (*lin(0xf3e6cf), 1); w.node_tree.nodes['Background'].inputs[1].default_value = 0.9
sc = bpy.context.scene
sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = 96; sc.cycles.use_denoising = False
sc.render.resolution_x = 1280; sc.render.resolution_y = 720; sc.view_settings.view_transform = 'Standard'
sc.render.filepath = os.path.join(OUT, 'bedroom_preview.png')
bpy.ops.render.render(write_still=True)
# close-up of robot + train
aim.location = (-1, 0, 2.0); cam.location = (-2, -15, 5.5); cam.data.lens = 28
sc.render.filepath = os.path.join(OUT, 'bedroom_props.png')
bpy.ops.render.render(write_still=True)
aim.location = (11.2, -3.2, 0.8); cam.location = (17.5, -10.5, 4.2); cam.data.lens = 40
sc.render.filepath = os.path.join(OUT, 'bedroom_train.png')
bpy.ops.render.render(write_still=True)
print('BEDROOM DONE')
