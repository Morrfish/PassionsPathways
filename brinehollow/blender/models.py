"""Brinehollow's cast, modelled as flat-shaded low-poly shapes that ink well in the comic shader.

    blender -b --python blender/models.py -- assets

Follows reference/art-sheet.webp, reference/tides-and-dock.webp and reference/props.webp: conical straw hats, a bulky rope-slung Teal crew, a slimmer braided Rust crew,
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
IRON, IRON2, RUST, WEED = 'c_33363f', 'c_4a5568', 'c_7a4a36', 'c_6f7a34'
R = math.radians

def hat(r, z):          # the woven conical hat every crew wears
    cyl(r, .03, r * .55, (0, 0, z + r * .275), STRAW, v=10)
    cyl(r, r * .96, .04, (0, 0, z), STRAW2, v=10)
    cyl(r * .55, r * .5, .03, (0, 0, z + r * .26), STRAW2, v=10)
def face(z, y, w):
    for s in (-1, 1):
        box((.07, .04, .04), (s * w, y, z), INK)
        box((.11, .04, .03), (s * w, y, z + .07), INK, rot=(0, s * R(-14), 0))
def lantern(x, y, z, k):      # caged storm lantern, base at z
    cyl(.2 * k, .25 * k, .09 * k, (x, y, z + .045 * k), IRON, v=8)
    cyl(.17 * k, .17 * k, .36 * k, (x, y, z + .27 * k), 'glow_ffb030', v=8)
    for i in range(4):
        a = i * math.pi / 2 + .78; box((.03 * k, .03 * k, .38 * k), (x + math.cos(a) * .2 * k, y + math.sin(a) * .2 * k, z + .27 * k), IRON)
    tor(.2 * k, .022 * k, (x, y, z + .27 * k), IRON)
    cyl(.26 * k, .12 * k, .11 * k, (x, y, z + .5 * k), IRON, v=8)
    cyl(.12 * k, .1 * k, .09 * k, (x, y, z + .6 * k), 'c_4a4a55', v=8)
    cyl(.15 * k, .02 * k, .07 * k, (x, y, z + .68 * k), IRON, v=8)
    tor(.13 * k, .022 * k, (x, y, z + .8 * k), IRON, rot=(R(90), 0, 0))
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
lantern(.6, -.25, 1.02, .95)
done('bearer')

# ---- Foghorn: a riveted brass horn on an iron pedestal, bracketed off a braced timber tower (reference/props.webp)
box((4.4, 4.4, 1.1), (0, 0, .55), STONE)
box((3.8, 3.8, .5), (0, 0, 1.35), 'c_5c5c66')
box((3, 3, 4.8), (0, 0, 4.0), 'c_4a4258')
for a in (-1, 1):
    for b in (-1, 1): box((.36, .36, 5.0), (a * 1.5, b * 1.5, 4.0), DARKWOOD)
for z in (1.9, 4.0, 6.2): box((3.3, 3.3, .22), (0, 0, z), DARKWOOD)
for s in (-1, 1):
    box((.16, .16, 3.4), (s * 1.56, 0, 3.0), DARKWOOD, rot=(R(52), 0, 0))
    box((.16, .16, 3.4), (0, 1.56, 3.0), DARKWOOD, rot=(0, R(s * 52), 0))
box((1.0, .12, 1.2), (-.6, -1.53, 3.0), LAMP)
box((1.2, .16, .14), (-.6, -1.55, 3.0), DARKWOOD); box((.14, .16, 1.4), (-.6, -1.55, 3.0), DARKWOOD)
box((3.5, 3.5, .5), (0, 0, 6.55), 'team')
cyl(2.7, .1, 1.5, (0, 0, 7.55), 'c_2c3040', v=4, rot=(0, 0, R(45)))
for s in (-1, 1): box((.1, .1, 5.2), (-1.75, s * .35, 3.6), WOOD)                 # ladder up the side
for z in range(6): box((.08, .7, .08), (-1.75, 0, 1.4 + z * .85), WOOD)
box((2.6, 2.4, .3), (0, -2.5, 4.45), DARKWOOD)                                    # bracket platform
for s in (-1, 1): box((.2, .2, 2.6), (s * 1.0, -2.2, 3.5), DARKWOOD, rot=(R(-48), 0, 0))
cyl(1.0, .5, 1.2, (0, -2.5, 5.2), IRON2, v=4, rot=(0, 0, R(45)))                   # iron pedestal
box((.8, 1.2, .5), (0, -2.5, 5.95), IRON2)
cyl(.5, .5, .8, (0, -1.6, 6.3), 'c_b8862a', rot=(R(90), 0, 0), v=10)                # valve housing
cyl(.34, .3, 1.7, (0, -2.8, 6.3), BRASS, rot=(R(-90), 0, 0), v=10)
cyl(.85, .34, 1.5, (0, -4.4, 6.3), BRASS, rot=(R(-90), 0, 0), v=12)
cyl(1.95, .85, 1.2, (0, -5.75, 6.3), BRASS, rot=(R(-90), 0, 0), v=12)
cyl(1.7, .7, 1.0, (0, -5.9, 6.3), 'c_3a2a12', rot=(R(-90), 0, 0), v=12)
tor(1.95, .1, (0, -6.35, 6.3), 'c_f0c040', rot=(R(90), 0, 0))
for y in (-2.2, -3.4): tor(.36, .08, (0, y, 6.3), IRON2, rot=(R(90), 0, 0))
cyl(.16, .16, 4.2, (1.15, -1.66, 3.9), BRASS)                                       # steam pipe
cyl(.16, .16, 1.0, (.7, -1.66, 6.0), BRASS, rot=(0, R(90), 0))
for z in (2.4, 4.2, 5.9): cyl(.22, .22, .16, (1.15, -1.66, z), 'c_b8862a')
for a in (-1, 1):
    for b in (-1, 1): sph(.07, (a * .3, -2.5 + b * .45, 6.22), BRASS)
done('foghorn')

# ---- anchor block: stepped riveted block with the great shackle the chain runs from
box((3.8, 3.8, .7), (0, 0, .35), IRON2)
box((3.0, 3.0, .8), (0, 0, 1.1), 'c_566070')
box((3.04, 3.04, .2), (0, 0, 1.3), 'team')
box((2.2, 2.2, .7), (0, 0, 1.85), IRON2)
for a in (-1, 1):
    for b in (-1, 1):
        sph(.1, (a * 1.6, b * 1.6, .72), BRASS); sph(.09, (a * 1.2, b * 1.2, 1.52), BRASS); sph(.08, (a * .8, b * .8, 2.22), BRASS)
tor(.8, .26, (0, 0, 3.05), RUST, rot=(0, R(90), 0), scale=(1.35, 1, 1))
for x, y in ((1.7, -1.9), (-1.5, -1.92), (1.92, .8)):
    for i in range(3): sph(.09, (x + i * .16, y, .25 + (i % 2) * .14), 'c_e6dcc4')
for x in (-.9, .5): cyl(.16, .02, 1.0, (x, -1.93, .9), WEED, rot=(R(180), 0, 0), v=5)
done('anchor')

# ---- one great chain link, rust-blotched (stands in the XZ plane, long axis up)
tor(.8, .26, (0, 0, 0), RUST, rot=(R(90), 0, 0), scale=(1, 1.45, 1))
for x, z in ((.75, .5), (-.8, -.3), (.2, 1.3), (-.3, -1.25)): sph(.2, (x, 0, z), 'c_b0622e', scale=(1, 1.45, 1))
done('link')

# ---- the lantern itself: a caged storm lantern with a vented cap and a ring handle
lantern(0, 0, 0, 1)
done('lantern')

# ---- reef crab: spiked shell, jointed legs, heavy cream-tipped claws
sph(1, (0, 0, .85), 'c_c8502f', scale=(1.4, 1.05, .5))
sph(1, (0, .02, .66), 'c_e6b98a', scale=(1.25, .95, .3))
for i in range(7):
    a = R(-150 + i * 20); cyl(.1, 0, .26, (math.cos(a) * 1.32, math.sin(a) * 1.0, .92), 'c_e8703f', rot=(0, R(90), a), v=5)
for s in (-1, 1):
    for i, y in enumerate((-.3, .1, .5, .85)):
        box((.8, .13, .13), (s * 1.55, y, 1.0), 'c_a83e26', rot=(0, s * R(-28), s * R(-12 + i * 12)))
        box((.85, .1, .1), (s * 2.05, y + (i - 1.5) * .12, .6), 'c_a83e26', rot=(0, s * R(62), s * R(-12 + i * 12)))
        cyl(.07, 0, .2, (s * 2.25, y + (i - 1.5) * .16, .12), 'c_f0dcb4', rot=(R(180), 0, 0), v=5)
    box((.75, .2, .2), (s * 1.1, -.85, .85), 'c_a83e26', rot=(0, 0, s * R(52)))
    sph(.5, (s * 1.35, -1.35, .8), 'c_d85a34', scale=(.9, 1.25, .7))
    cyl(.2, 0, .7, (s * 1.22, -2.1, .92), 'c_f0dcb4', rot=(R(100), 0, s * R(-8)), v=6)
    cyl(.15, 0, .6, (s * 1.45, -2.0, .62), 'c_f0dcb4', rot=(R(84), 0, s * R(10)), v=6)
    cyl(.06, .06, .45, (s * .35, -.85, 1.25), 'c_a83e26')
    sph(.15, (s * .35, -.85, 1.52), INK); sph(.05, (s * .31, -.97, 1.57), 'glow_ffffff')
done('crab')

# ---- a Pearl in its shell: what a cracked Reef Crab leaves behind
cyl(.12, .55, .2, (0, 0, .1), 'c_cdbba8', v=9)
cyl(.55, .5, .08, (0, .3, .45), 'c_e8dccb', rot=(R(-62), 0, 0), v=9)
sph(.27, (0, -.02, .42), 'glow_f4ecff')
sph(.08, (-.09, -.2, .52), 'glow_ffffff')
sph(.3, (.02, 0, .4), 'c_c9b8f0', scale=(1.04, 1.04, .9))
done('pearl')

# ---- Teal banking buoy: round riveted belly, teardrop cage with the lamp inside, ring on top
sph(1.1, (0, 0, .8), 'team', scale=(1, 1, .78))
cyl(.5, 1.0, .5, (0, 0, .2), 'team2', v=10)
cyl(1.13, 1.13, .2, (0, 0, .9), IRON2, v=12)
for i in range(8): a = i * math.pi / 4; sph(.07, (math.cos(a) * 1.14, math.sin(a) * 1.14, .9), BRASS)
cyl(.75, .7, .12, (0, 0, 1.52), IRON2, v=10)
for i in range(6):
    a = i * math.pi / 3; x, y = math.cos(a), math.sin(a)
    cyl(.05, .05, 1.45, (x * .43, y * .43, 2.2), 'team2', rot=(-y * .42, x * .42, 0))
tor(.5, .045, (0, 0, 2.0), 'team2'); tor(.3, .04, (0, 0, 2.5), 'team2')
cyl(.2, .2, .1, (0, 0, 1.62), IRON2); cyl(.17, .17, .42, (0, 0, 1.9), LAMP)
cyl(.26, .05, .18, (0, 0, 2.2), IRON2)
cyl(.2, .1, .2, (0, 0, 2.95), IRON2)
tor(.2, .05, (0, 0, 3.22), IRON2, rot=(R(90), 0, 0))
for a, z in ((.3, .5), (1.4, .42), (2.6, .55), (4.0, .46), (5.2, .5)):
    for i in range(3): sph(.07, (math.cos(a + i * .14) * 1.02, math.sin(a + i * .14) * 1.02, z + (i % 2) * .1), 'c_e6dcc4')
done('buoy_teal')

# ---- Rust banking buoy: red-and-white hull, lattice tower, caged lamp and a flag
cyl(1.2, .95, .5, (0, 0, .25), 'team', v=10)
cyl(.95, .85, .3, (0, 0, .65), 'c_f0ece0', v=10)
cyl(.85, .7, .35, (0, 0, .97), 'team', v=10)
cyl(.7, .66, .1, (0, 0, 1.2), IRON2, v=10)
for i in range(4):
    a = i * math.pi / 2 + .78; x, y = math.cos(a), math.sin(a)
    cyl(.05, .05, 1.5, (x * .42, y * .42, 1.95), 'team', rot=(-y * .28, x * .28, 0))
    box((.04, .62, .04), (math.cos(a + .78) * .36, math.sin(a + .78) * .36, 1.75), 'team', rot=(R(40), 0, a + .78 + R(90)))
    box((.04, .62, .04), (math.cos(a + .78) * .36, math.sin(a + .78) * .36, 1.75), 'team', rot=(R(-40), 0, a + .78 + R(90)))
cyl(.34, .34, .08, (0, 0, 2.68), IRON2)
cyl(.2, .2, .36, (0, 0, 2.9), LAMP)
for i in range(4): a = i * math.pi / 2; box((.03, .03, .38), (math.cos(a) * .22, math.sin(a) * .22, 2.9), IRON2)
cyl(.32, .06, .22, (0, 0, 3.2), 'team')
cyl(.025, .025, .8, (0, 0, 3.7), IRON2)
box((.5, .03, .3), (.26, 0, 3.92), 'team')
for a in (.4, 2.2, 3.9, 5.3): cyl(.2, .02, .7, (math.cos(a) * 1.16, math.sin(a) * 1.16, .25), WEED, rot=(R(180), 0, 0), v=5)
done('buoy_rust')

# ---- dock dressing (reference/tides-and-dock.webp)
cyl(.34, .3, 5.8, (0, 0, -1.1), 'c_4a3a30')                       # piling: rope at the head, iron band, barnacles and weed below
cyl(.36, .36, .12, (0, 0, 1.84), 'c_6b5544')
for z in (1.1, 1.26, 1.42): tor(.37, .085, (0, 0, z), ROPE)
cyl(.35, .35, .14, (0, 0, .3), IRON2)
for a, z in ((.2, -.6), (1.9, -1.3), (3.4, -.9), (4.8, -1.8), (2.6, -2.4), (.9, -2.9)):
    for i in range(3): sph(.075, (math.cos(a + i * .3) * .34, math.sin(a + i * .3) * .34, z + (i % 2) * .13), 'c_e6dcc4')
for a, z in ((1.1, -1.9), (3.0, -2.6), (5.3, -2.2), (4.1, -3.1)): cyl(.12, .01, 1.1, (math.cos(a) * .36, math.sin(a) * .36, z), WEED, rot=(R(180), 0, 0), v=5)
done('piling')
cyl(.42, .5, .5, (0, 0, .25), WOOD, v=10); cyl(.5, .42, .5, (0, 0, .75), WOOD, v=10)
for z in (.12, .5, .88): cyl(.5 if z == .5 else .45, .5 if z == .5 else .45, .07, (0, 0, z), 'c_2c2c34', v=10)
done('barrel')
box((.14, 1.3, .14), (0, -.6, 0), DARKWOOD)                         # street lamp on a wall bracket
box((.12, .12, .9), (0, -.1, -.4), DARKWOOD, rot=(R(45), 0, 0))
cyl(.02, .02, .3, (0, -1.15, -.2), INK)
lantern(0, -1.15, -1.02, .95)
done('lamp')
sph(.5, (0, 0, .5), 'c_3f7f86')                                      # glass float in a rope net
for rot in ((0, 0, 0), (R(90), 0, 0), (0, R(90), 0), (R(90), 0, R(45)), (R(90), 0, R(-45))): tor(.51, .035, (0, 0, .5), ROPE, rot=rot)
done('float')
for i in range(3): tor(.42 - i * .04, .09, (0, 0, .09 + i * .15), ROPE)   # rope coil
done('coil')
box((.9, .4, .12), (0, 0, .06), IRON2); cyl(.14, .18, .4, (0, 0, .3), IRON2)   # mooring cleat
box((1.1, .2, .16), (0, 0, .55), IRON2)
for s in (-1, 1): sph(.13, (s * .55, 0, .55), IRON2)
done('cleat')
box((1.3, 1.3, .3), (0, 0, .15), DARKWOOD)                            # timber crane with a cargo net
box((.42, .42, 6.2), (0, 0, 3.1), WOOD)
box((.32, 5.6, .32), (0, -2.3, 6.0), WOOD, rot=(R(8), 0, 0))
box((.22, .22, 3.4), (0, -1.1, 4.7), WOOD, rot=(R(48), 0, 0))
box((.22, .22, 2.0), (0, .7, 5.3), WOOD, rot=(R(-50), 0, 0))
for z in (1.2, 4.4): cyl(.3, .3, .12, (0, 0, z), IRON2, v=4, rot=(0, 0, R(45)))
cyl(.03, .03, 2.0, (0, -4.9, 5.35), ROPE)
cyl(.5, .1, .7, (0, -4.9, 4.2), ROPE, v=6)
sph(.75, (0, -4.9, 3.5), 'c_6b7a5a', scale=(1, 1, .8))
for rot in ((0, 0, 0), (R(90), 0, 0), (0, R(90), 0)): tor(.76, .04, (0, -4.9, 3.5), ROPE, rot=rot, scale=(1, 1, .8) if rot == (0, 0, 0) else (1, 1, 1))
done('crane')

# ---- seabed rocks: weed, barnacles and anemones
import random
random.seed(4)
def rock(name, r, sx, sy, sz, weed, anem):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=2, radius=r, location=(0, 0, r * sz * .45))
    o = bpy.context.object; o.scale = (sx, sy, sz)
    for v in o.data.vertices: v.co *= 1 + random.uniform(-.16, .16)
    fin('c_3e3d4a')
    for i in range(weed):
        a = random.uniform(0, 6.28); cyl(.2, .01, r * sz * .9, (math.cos(a) * r * sx * .62, math.sin(a) * r * sy * .62, r * sz * .5), WEED, rot=(R(180) + math.sin(a) * .5, -math.cos(a) * .5, 0), v=5)
    for i in range(5):
        a = random.uniform(0, 6.28); d = random.uniform(.2, .75)
        for k in range(3): sph(.08, (math.cos(a) * r * sx * d + k * .13, math.sin(a) * r * sy * d, r * sz * (.95 - d * .55) + (k % 2) * .08), 'c_e6dcc4')
    for i in range(anem):
        a = random.uniform(0, 6.28); x, y, z = math.cos(a) * r * sx * .4, math.sin(a) * r * sy * .4, r * sz * .82
        cyl(.1, .16, .2, (x, y, z), 'c_7a4a8a', v=6)
        for k in range(6): b = k * math.pi / 3; cyl(.035, .01, .24, (x + math.cos(b) * .15, y + math.sin(b) * .15, z + .16), 'c_b07ac0', rot=(-math.sin(b) * .7, math.cos(b) * .7, 0), v=4)
    done(name)
rock('rock1', 1.0, 1.3, 1.0, .75, 3, 0)
rock('rock2', .8, 1.0, 1.2, 1.0, 5, 2)
rock('rock3', .65, 1.2, 1.0, .7, 0, 4)

# ---- the lighthouse on its headland, seen over the roofs
cyl(36, 9, 24, (0, 0, 12), 'c_2f3f5c', v=7)
cyl(3.4, 2.4, 20, (0, 0, 34), 'c_cfc8b8', v=10)
cyl(3.0, 2.85, 3, (0, 0, 33), 'c_7a3a30', v=10)
cyl(3.3, 3.3, .5, (0, 0, 44.2), DARKWOOD, v=10)
cyl(1.8, 1.8, 2.6, (0, 0, 45.8), 'glow_ffe9a0', v=8)
cyl(2.3, .1, 2, (0, 0, 48.1), 'c_2c3040', v=8)
done('lighthouse')

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
