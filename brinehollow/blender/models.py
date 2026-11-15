"""Brinehollow's cast, modelled as flat-shaded low-poly shapes that ink well in the comic shader.

    blender -b --python blender/models.py -- assets

Follows reference/art-sheet.webp: conical straw hats, a bulky rope-slung Teal crew, a slimmer braided Rust crew,
a bearded Wickie with a rope coil, a caped Lantern-Bearer, a brass Foghorn on a timber tower, a stepped anchor block.

Writes assets/models.glb. Each model is one object standing on the origin, facing -Y (the game's +Z).
Material names carry the colour: c_RRGGBB is a flat colour, glow_RRGGBB is unlit, and team / team2 / hull
are recoloured per crew by the game.
"""
import bpy, math, sys, os

out = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else 'assets'
bpy.ops.wm.read_factory_settings(use_empty=True)

def M(name):
    m = bpy.data.materials.get(name)
    if m: return m
    m = bpy.data.materials.new(name); m.use_nodes = True
    h = name.split('_')[-1]
    if len(h) == 6:
        try:
            c = [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]
            m.node_tree.nodes['Principled BSDF'].inputs['Base Color'].default_value = (*c, 1)
        except ValueError: pass
    return m

P = []
def fin(m, smooth=False):
    o = bpy.context.object; o.data.materials.append(M(m))
    for p in o.data.polygons: p.use_smooth = smooth
    P.append(o); return o
def box(size, loc, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    bpy.context.object.scale = size; return fin(m)
def cyl(r1, r2, h, loc, m, rot=(0, 0, 0), v=8):
    bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r1, radius2=r2, depth=h, location=loc, rotation=rot); return fin(m)
def sph(r, loc, m, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=12, ring_count=7, radius=r, location=loc)
    bpy.context.object.scale = scale; return fin(m, True)
def tor(R_, r, loc, m, rot=(0, 0, 0), scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_torus_add(major_radius=R_, minor_radius=r, major_segments=12, minor_segments=5, location=loc, rotation=rot)
    bpy.context.object.scale = scale; return fin(m)
def done(name):
    bpy.ops.object.select_all(action='DESELECT')
    for o in P: o.select_set(True)
    bpy.context.view_layer.objects.active = P[0]
    bpy.ops.object.join(); o = bpy.context.object; o.name = name; o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.context.scene.cursor.location = (0, 0, 0); bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
    P.clear()

INK, WOOD, DARKWOOD, STEEL, SKIN = 'c_1c1c22', 'c_6b4a34', 'c_2c2630', 'c_8c8f90', 'c_e2b48a'
STRAW, STRAW2, ROPE, LEATHER, BRASS, STONE = 'c_d9b877', 'c_9c7a45', 'c_c9a36a', 'c_5a4030', 'c_d9a520', 'c_74747c'
LAMP = 'glow_ffb648'
R = math.radians

def hat(r, z):          # the woven conical hat every crew wears
    cyl(r, .03, r * .55, (0, 0, z + r * .275), STRAW, v=10)
    cyl(r, r * .96, .04, (0, 0, z), STRAW2, v=10)
    cyl(r * .55, r * .5, .03, (0, 0, z + r * .26), STRAW2, v=10)
def face(z, y, w):
    for s in (-1, 1):
        box((.07, .04, .04), (s * w, y, z), INK)
        box((.11, .04, .03), (s * w, y, z + .07), INK, rot=(0, s * R(-14), 0))
def harpoon_gun(x, y, z):
    box((.13, .8, .2), (x, y, z), WOOD)
    cyl(.06, .06, .55, (x, y - .62, z + .04), STEEL, rot=(R(90), 0, 0))
    cyl(.11, 0, .26, (x, y - 1.0, z + .04), BRASS, rot=(R(90), 0, 0), v=4)

# ---- Teal hero: broad and heavy, big cuffs, rope slung across the chest, gaff on the back
for s in (-1, 1):
    box((.32, .44, .28), (s * .25, -.05, .14), LEATHER)
    box((.3, .32, .42), (s * .25, 0, .5), 'c_2a2a30')
cyl(.68, .52, .72, (0, 0, .78), 'team')
cyl(.7, .69, .09, (0, 0, .44), 'team2')
cyl(.5, .6, .56, (0, 0, 1.33), 'team')
cyl(.55, .55, .11, (0, 0, 1.05), LEATHER)
box((.18, .07, .16), (0, -.55, 1.05), BRASS)
box((.1, .06, .5), (0, -.55, 1.33), 'team2')
cyl(.36, .42, .17, (0, 0, 1.64), 'team2')
sph(.26, (0, -.03, 1.74), SKIN)
face(1.74, -.28, .1)
hat(.66, 1.86)
box((.26, .28, .5), (-.7, -.02, 1.27), 'team', rot=(0, R(-8), 0))
box((.33, .33, .2), (-.74, -.02, .97), 'team2')
sph(.14, (-.75, -.04, .83), SKIN)
box((.26, .6, .26), (.64, -.3, 1.33), 'team', rot=(R(-6), 0, R(6)))
box((.33, .2, .33), (.62, -.64, 1.33), 'team2')
sph(.14, (.62, -.78, 1.33), SKIN)
harpoon_gun(.62, -.95, 1.3)
tor(.55, .09, (0, 0, 1.3), ROPE, rot=(R(90), R(38), 0), scale=(1, 1.15, 1))
tor(.55, .09, (.04, 0, 1.24), ROPE, rot=(R(90), R(46), 0), scale=(1, 1.15, 1))
cyl(.045, .045, 2.1, (-.2, .5, 1.25), DARKWOOD, rot=(0, R(14), 0))
tor(.16, .045, (-.56, .5, 2.26), STEEL, rot=(R(90), 0, 0))
done('hero_teal')

# ---- Rust hero: lean, flared coat, long braid, paddle on the back
for s in (-1, 1):
    box((.26, .38, .26), (s * .2, -.05, .13), LEATHER)
    box((.3, .32, .44), (s * .2, 0, .48), 'c_4a3a34')
cyl(.62, .34, .82, (0, 0, .82), 'team')
cyl(.64, .63, .08, (0, 0, .43), 'team2')
cyl(.34, .42, .5, (0, 0, 1.3), 'team')
cyl(.37, .37, .1, (0, 0, 1.05), LEATHER)
box((.15, .06, .14), (0, -.37, 1.05), BRASS)
box((.2, .14, .24), (.36, -.1, .96), 'c_7a5a40')
cyl(.26, .3, .14, (0, 0, 1.58), 'team2')
sph(.24, (0, -.03, 1.68), SKIN)
face(1.68, -.26, .09)
hat(.6, 1.8)
for i in range(5): sph(.1 - i * .008, (0, .26 + i * .05, 1.6 - i * .16), INK)
box((.26, .05, .1), (0, .5, .88), 'team2', rot=(0, R(20), 0))
box((.2, .22, .44), (-.5, -.02, 1.3), 'team', rot=(0, R(-10), 0))
box((.22, .24, .12), (-.54, -.02, 1.04), INK)
sph(.12, (-.55, -.04, .92), SKIN)
box((.2, .55, .2), (.48, -.28, 1.33), 'team', rot=(R(-6), 0, R(6)))
box((.22, .12, .22), (.46, -.6, 1.33), INK)
sph(.12, (.46, -.72, 1.33), SKIN)
harpoon_gun(.46, -.9, 1.3)
cyl(.045, .045, 1.5, (.12, .42, 1.35), WOOD, rot=(0, R(-22), 0))
box((.34, .06, .8), (-.3, .42, .55), 'c_8a7a6a', rot=(0, R(-22), 0))
done('hero_rust')

# ---- Wickie: a stout little lamplighter with a white beard and a rope coil on the back
for s in (-1, 1): box((.22, .3, .2), (s * .16, -.04, .1), LEATHER)
cyl(.44, .34, .62, (0, 0, .5), 'team')
cyl(.4, .4, .08, (0, 0, .5), LEATHER)
box((.12, .05, .1), (0, -.4, .5), BRASS)
sph(.22, (0, -.02, .97), SKIN)
face(.99, -.22, .08)
cyl(.2, .02, .34, (0, -.17, .8), 'c_f0ece0', rot=(R(180), 0, 0))
hat(.52, 1.08)
for i in range(3): tor(.3, .085, (0, .36 + i * .1, .62), ROPE, rot=(R(90), 0, 0))
for s in (-1, 1):
    box((.16, .18, .34), (s * .46, -.04, .58), 'team')
    sph(.09, (s * .47, -.06, .38), SKIN)
cyl(.03, .03, 1.1, (.5, -.14, .7), DARKWOOD)
sph(.08, (.5, -.14, 1.28), LAMP)
done('wickie')

# ---- Lantern-Bearer: caped, braided, holding the prize aloft
for s in (-1, 1):
    box((.24, .34, .24), (s * .18, -.04, .12), LEATHER)
    box((.24, .26, .34), (s * .18, 0, .4), 'c_4a3a34')
cyl(.66, .22, .86, (0, 0, .98), 'team')
cyl(.68, .67, .07, (0, 0, .57), 'team2')
cyl(.3, .34, .16, (0, 0, 1.42), 'team2')
sph(.24, (0, -.03, 1.56), SKIN)
face(1.56, -.26, .09)
hat(.6, 1.68)
for i in range(4): sph(.09, (0, .26 + i * .05, 1.48 - i * .15), INK)
box((.18, .2, .62), (.52, -.14, 1.55), 'team', rot=(R(18), R(14), 0))
sph(.11, (.6, -.25, 1.9), SKIN)
tor(.1, .025, (.6, -.25, 2.06), INK, rot=(R(90), 0, 0))
box((.34, .34, .06), (.6, -.25, 1.98), INK)
box((.3, .3, .4), (.6, -.25, 1.75), 'glow_ffc23f')
box((.36, .36, .06), (.6, -.25, 1.53), INK)
for a in (-1, 1):
    for b in (-1, 1): box((.035, .035, .4), (.6 + a * .16, -.25 + b * .16, 1.75), INK)
done('bearer')

# ---- Foghorn: a brass horn on a braced timber tower, on a stone footing
box((4.4, 4.4, 1.1), (0, 0, .55), STONE)
box((3.8, 3.8, .5), (0, 0, 1.35), 'c_5c5c66')
box((3, 3, 4.8), (0, 0, 4.0), 'c_4a4258')
for a in (-1, 1):
    for b in (-1, 1): box((.36, .36, 5.0), (a * 1.5, b * 1.5, 4.0), DARKWOOD)
for z in (1.9, 4.0, 6.2): box((3.3, 3.3, .22), (0, 0, z), DARKWOOD)
for s in (-1, 1):
    box((.16, .16, 3.4), (s * 1.56, 0, 3.0), DARKWOOD, rot=(R(52), 0, 0))
    box((.16, .16, 3.4), (0, 1.56, 3.0), DARKWOOD, rot=(0, R(s * 52), 0))
box((1.0, .12, 1.2), (0, -1.53, 3.2), LAMP)
box((1.2, .16, .14), (0, -1.55, 3.2), DARKWOOD); box((.14, .16, 1.4), (0, -1.55, 3.2), DARKWOOD)
box((3.5, 3.5, .5), (0, 0, 6.55), 'team')
cyl(2.7, .1, 1.5, (0, 0, 7.55), 'c_2c3040', v=4, rot=(0, 0, R(45)))
cyl(.16, .16, 3.4, (1.15, -1.62, 3.6), BRASS)
cyl(.16, .16, 1.3, (.6, -1.62, 5.3), BRASS, rot=(0, R(90), 0))
box((1.0, .7, .9), (0, -1.75, 5.45), 'c_b8862a')
cyl(.34, .34, 1.4, (0, -2.6, 5.5), BRASS, rot=(R(90), 0, 0), v=10)
cyl(1.75, .34, 2.4, (0, -4.3, 5.65), BRASS, rot=(R(84), 0, 0), v=12)
cyl(1.45, .25, 2.1, (0, -4.52, 5.67), 'c_3a2a12', rot=(R(84), 0, 0), v=12)
tor(1.75, .12, (0, -5.5, 5.78), 'c_f0c040', rot=(R(84), 0, 0))
done('foghorn')

# ---- anchor block: stepped stone with the great ring the chain runs from
box((3.6, 3.6, .7), (0, 0, .35), STONE)
box((2.8, 2.8, .7), (0, 0, 1.05), 'c_66666e')
box((2.84, 2.84, .22), (0, 0, 1.2), 'team')
box((2.0, 2.0, .7), (0, 0, 1.75), STONE)
tor(.75, .2, (0, 0, 2.7), 'c_6e4636', rot=(0, R(90), 0))
done('anchor')

# ---- reef crab
sph(1, (0, 0, .75), 'c_c94a30', scale=(1.35, 1, .55))
for s in (-1, 1):
    for i, y in enumerate((-.35, .15, .65)):
        box((.95, .13, .13), (s * 1.35, y, .5), 'c_9a3824', rot=(0, s * R(28), s * R(-15 + i * 15)))
    box((.7, .16, .16), (s * 1.05, -.75, .75), 'c_9a3824', rot=(0, 0, s * R(55)))
    sph(.44, (s * 1.3, -1.15, .85), 'c_e8703f', scale=(1, 1.3, .75))
    cyl(.05, .05, .5, (s * .35, -.75, 1.25), 'c_9a3824')
    sph(.14, (s * .35, -.75, 1.52), 'c_f4f0d8'); sph(.07, (s * .35, -.86, 1.54), INK)
done('crab')

# ---- buoy
cyl(1.1, .85, 1.2, (0, 0, .6), 'team', v=10)
cyl(.99, .95, .26, (0, 0, .72), 'c_f0ece0', v=10)
for a in range(4):
    x, y = math.cos(a * math.pi / 2 + .78) * .5, math.sin(a * math.pi / 2 + .78) * .5
    cyl(.05, .05, 1.5, (x * .6, y * .6, 1.9), INK, rot=(-y * .55, x * .55, 0))
cyl(.3, .3, .1, (0, 0, 2.62), INK)
sph(.3, (0, 0, 2.9), 'glow_ffffff')
done('buoy')

# ---- dock dressing
cyl(.34, .3, 5.8, (0, 0, -1.1), 'c_4a3a30')                       # piling, sunk to the seabed
cyl(.36, .36, .12, (0, 0, 1.84), 'c_6b5544')
for z in (1.1, 1.26, 1.42): tor(.37, .085, (0, 0, z), ROPE)
done('piling')
cyl(.42, .5, .5, (0, 0, .25), WOOD, v=10); cyl(.5, .42, .5, (0, 0, .75), WOOD, v=10)
for z in (.12, .5, .88): cyl(.5 if z == .5 else .45, .5 if z == .5 else .45, .07, (0, 0, z), 'c_2c2c34', v=10)
done('barrel')
box((.14, 1.3, .14), (0, -.6, 0), DARKWOOD)                         # street lamp on a wall bracket
box((.12, .12, .9), (0, -.1, -.4), DARKWOOD, rot=(R(45), 0, 0))
cyl(.02, .02, .3, (0, -1.15, -.2), INK)
cyl(.26, .05, .2, (0, -1.15, -.36), 'c_2c2c34', v=6)
box((.3, .3, .36), (0, -1.15, -.62), LAMP)
box((.34, .34, .05), (0, -1.15, -.82), 'c_2c2c34')
done('lamp')

# ---- ship (the crew's base): a timber hull, long axis on X, the lane meets it broadside
box((44, 16, 12), (0, 0, 4), 'hull')
for z in (1, 3.4, 5.8, 8.0): box((44.3, 16.3, .2), (0, 0, z), DARKWOOD)
box((44.5, 16.5, 1.4), (0, 0, 9.4), 'team')
box((45, 17, .7), (0, 0, 10.4), DARKWOOD)
for x in range(-18, 19, 6):
    for y in (-8.2, 8.2): box((1.5, .3, 1.5), (x, y, 6.7), LAMP)
box((14, 9, 5), (-8, 0, 13.2), 'c_4a4258')
box((14.5, 9.5, .6), (-8, 0, 15.9), DARKWOOD)
for x in (-12, -8, -4):
    for y in (-4.6, 4.6): box((2.2, .2, 1.6), (x, y, 13.6), LAMP)
for x in (-18, 10):
    cyl(.4, .25, 22, (x, 0, 21), WOOD)
    box((.35, 11, .35), (x, 0, 27), WOOD); box((.3, 8, .3), (x, 0, 22), WOOD)
    box((.1, 10, 4.4), (x + .2, 0, 24.6), 'c_c8b99a')
done('ship')

os.makedirs(out, exist_ok=True)
bpy.ops.export_scene.gltf(filepath=os.path.join(out, 'models.glb'), export_format='GLB', export_apply=True, export_yup=True)
print('wrote models.glb')
