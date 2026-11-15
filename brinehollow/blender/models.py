"""Brinehollow's cast, modelled as flat-shaded low-poly shapes that ink well in the comic shader.

    blender -b --python blender/models.py -- assets

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
def done(name):
    bpy.ops.object.select_all(action='DESELECT')
    for o in P: o.select_set(True)
    bpy.context.view_layer.objects.active = P[0]
    bpy.ops.object.join(); o = bpy.context.object; o.name = name; o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.context.scene.cursor.location = (0, 0, 0); bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
    P.clear()

INK, WOOD, STEEL, SKIN, PAPER = 'c_1c1c1c', 'c_4a3424', 'c_8c8f90', 'c_e8c9a0', 'c_f4f0d8'
R = math.radians

# ---- hero: long oilskin coat, sou'wester hat, harpoon gun
for s in (-1, 1): box((.22, .32, .25), (s * .18, -.04, .125), INK)
cyl(.52, .32, 1.0, (0, 0, .75), 'team')
cyl(.37, .37, .09, (0, 0, .95), INK)
box((.1, .06, .12), (0, -.37, .95), 'c_d9a520')
cyl(.31, .22, .2, (0, 0, 1.33), 'team2')
sph(.27, (0, 0, 1.58), SKIN)
cyl(.56, .3, .12, (0, .03, 1.79), 'c_22262b', v=10)
cyl(.3, .2, .24, (0, 0, 1.94), 'c_22262b', v=10)
cyl(.31, .29, .07, (0, 0, 1.86), 'team2', v=10)
box((.15, .5, .15), (.42, -.2, 1.13), 'team', rot=(R(-12), 0, R(8)))
box((.15, .5, .15), (-.4, -.22, 1.1), 'team', rot=(R(-12), 0, R(-35)))
box((.13, .85, .2), (.28, -.6, 1.08), WOOD)
cyl(.06, .06, .6, (.28, -1.2, 1.12), STEEL, rot=(R(90), 0, 0))
cyl(.11, 0, .26, (.28, -1.6, 1.12), 'c_d9a520', rot=(R(90), 0, 0), v=4)
box((.3, .1, .34), (0, .3, 1.05), WOOD)                      # tether reel on the back
done('hero')

# ---- wickie: a lamp-headed lamplighter on stilts (so the flood never slows it)
def wickie(name, k, lantern):
    for s in (-1, 1): cyl(.05 * k, .05 * k, .72 * k, (s * .16 * k, 0, .36 * k), WOOD)
    cyl(.34 * k, .2 * k, .52 * k, (0, 0, .96 * k), 'team')
    cyl(.22 * k, .22 * k, .06 * k, (0, 0, 1.2 * k), INK)
    sph(.25 * k, (0, 0, 1.42 * k), 'glow_ffe9a0')
    cyl(.3 * k, .04 * k, .18 * k, (0, 0, 1.68 * k), 'c_22262b')
    box((.1 * k, .4 * k, .1 * k), (.3 * k, -.14 * k, 1.0 * k), 'team', rot=(R(-20), 0, 0))
    if lantern:        # the Lantern-Bearer carries the prize on a long hook
        cyl(.04, .04, 2.6, (.42, -.3, 1.9), INK)
        box((.5, .04, .04), (.2, -.3, 3.15), INK)
        box((.5, .5, .62), (-.05, -.3, 2.8), 'glow_ffd23f')
        cyl(.42, .05, .26, (-.05, -.3, 3.24), 'c_22262b', v=4, rot=(0, 0, R(45)))
        box((.56, .56, .08), (-.05, -.3, 2.46), 'c_22262b')
    else:
        cyl(.03 * k, .03 * k, 1.3 * k, (.34 * k, -.3 * k, 1.1 * k), INK)
        sph(.07 * k, (.34 * k, -.3 * k, 1.78 * k), 'glow_ffd23f')
    done(name)
wickie('wickie', 1, False)
wickie('bearer', 1.3, True)

# ---- foghorn tower
cyl(2.15, 1.5, 6, (0, 0, 3), 'c_7d8587')
for z in (1.6, 3.6): cyl(1.98 - z * .1, 1.95 - z * .1, .28, (0, 0, z), 'c_565f61')
box((.9, .2, 1.7), (0, -2.02, .85), WOOD)
cyl(1.75, 1.7, .75, (0, 0, 5.3), 'team')
cyl(2.05, 2.05, .3, (0, 0, 6.15), WOOD, v=10)
cyl(.5, .5, 1.6, (0, 0, 7.0), 'c_565f61')
cyl(1.8, .3, 3.0, (0, -1.2, 7.4), 'c_d9a520', rot=(R(90), 0, 0), v=12)
cyl(1.45, .2, 2.6, (0, -1.5, 7.4), INK, rot=(R(90), 0, 0), v=12)
cyl(1.35, 0, 1.1, (0, 0, 8.4), 'team')
done('foghorn')

# ---- reef crab
sph(1, (0, 0, .75), 'c_d9583a', scale=(1.35, 1, .55))
for s in (-1, 1):
    for i, y in enumerate((-.35, .15, .65)):
        box((.95, .13, .13), (s * 1.35, y, .5), 'c_b8432b', rot=(0, s * R(28), s * R(-15 + i * 15)))
    box((.7, .16, .16), (s * 1.05, -.75, .75), 'c_b8432b', rot=(0, 0, s * R(55)))
    sph(.44, (s * 1.3, -1.15, .85), 'c_f07a50', scale=(1, 1.3, .75))
    cyl(.05, .05, .5, (s * .35, -.75, 1.25), 'c_b8432b')
    sph(.14, (s * .35, -.75, 1.52), PAPER); sph(.07, (s * .35, -.86, 1.54), INK)
done('crab')

# ---- buoy
cyl(1.1, .85, 1.2, (0, 0, .6), 'team', v=10)
cyl(.99, .95, .26, (0, 0, .72), PAPER, v=10)
for a in range(4):
    x, y = math.cos(a * math.pi / 2 + .78) * .5, math.sin(a * math.pi / 2 + .78) * .5
    cyl(.05, .05, 1.5, (x * .6, y * .6, 1.9), INK, rot=(-y * .55, x * .55, 0))
cyl(.3, .3, .1, (0, 0, 2.62), INK)
sph(.3, (0, 0, 2.9), 'glow_ffffff')
done('buoy')

# ---- ship (the crew's base): long axis on X, the lane meets it broadside
box((44, 16, 12), (0, 0, 4), 'hull')
box((44.4, 16.4, 1.6), (0, 0, 9.4), 'team')
box((44.8, 16.8, .7), (0, 0, 10.5), 'c_22262b')
for x in range(-18, 19, 6):
    for y in (-8.2, 8.2): cyl(.9, .9, .3, (x, y, 6.5), 'glow_ffe9a0', rot=(R(90), 0, 0), v=10)
box((16, 9, 5), (-6, 0, 13.3), PAPER)
box((16.4, 9.4, .6), (-6, 0, 16), 'c_22262b')
for x in (-11, -6, -1):
    for y in (-4.6, 4.6): box((2.4, .2, 1.6), (x, y, 13.8), INK)
cyl(2.3, 2.0, 9, (9, 0, 15), 'c_22262b', v=10)
cyl(2.25, 2.2, 1.4, (9, 0, 17.4), 'team', v=10)
cyl(.3, .2, 14, (-17, 0, 17), WOOD)
box((.3, 7, .3), (-17, 0, 21), WOOD)
done('ship')

os.makedirs(out, exist_ok=True)
bpy.ops.export_scene.gltf(filepath=os.path.join(out, 'models.glb'), export_format='GLB', export_apply=True, export_yup=True)
print('wrote models.glb')
