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

from mathutils import Vector
P = []
# Character proportions: long legs, and a head a third bigger than the body would suggest.
# While a character is being built, anything placed in the head zone is scaled up about the neck,
# and everything above the hips is lifted to make room for the longer legs.
RIG = {'on': False, 'lift': 0.0, 'head': 1.3}
LIFT = .42
def fin(m, smooth=True):
    o = bpy.context.object; o.data.materials.append(M(m))
    if RIG['on']:
        x, y, z = o.location
        if 1.565 < z < 2.3 and x * x + y * y < .25:
            k = RIG['head']; o.location = (x * k, y * k, 1.5 + (z - 1.5) * k); o.scale = [c * k for c in o.scale]
        o.location.z += RIG['lift']
    for p in o.data.polygons: p.use_smooth = smooth
    P.append(o); return o
def box(size, loc, m, rot=(0, 0, 0), r=None):
    """A box with rounded edges. r is the rounding radius (default: soft, scaled to the smallest side)."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object; o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if r is None: r = min(min(size) * .3, .1)
    if r > .004:
        md = o.modifiers.new('round', 'BEVEL'); md.width = r; md.segments = 2
        bpy.ops.object.modifier_apply(modifier='round')
    return fin(m)
def cyl(r1, r2, h, loc, m, rot=(0, 0, 0), v=12):
    bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r1, radius2=r2, depth=h, location=loc, rotation=rot); return fin(m)
def sph(r, loc, m, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=14, ring_count=8, radius=r, location=loc)
    bpy.context.object.scale = scale; return fin(m)
def tor(R_, r, loc, m, rot=(0, 0, 0), scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_torus_add(major_radius=R_, minor_radius=r, major_segments=14, minor_segments=6, location=loc, rotation=rot)
    bpy.context.object.scale = scale; return fin(m)
def limb(p0, p1, r0, r1, m, v=10):
    """A tapered tube from p0 to p1: arms, legs, anything that should not be a box."""
    a, b = Vector(p0), Vector(p1); d = b - a
    bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r0, radius2=r1, depth=d.length, location=(a + b) / 2,
                                    rotation=Vector((0, 0, 1)).rotation_difference(d).to_euler())
    return fin(m)
def done(name, k=1.0):
    bpy.ops.object.select_all(action='DESELECT')
    for o in P: o.select_set(True)
    bpy.context.view_layer.objects.active = P[0]
    bpy.ops.object.join(); o = bpy.context.object; o.name = name; o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)   # bake the first part's own scale before sizing the whole figure
    o.scale = (k, k, k)
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    o.data.use_auto_smooth = True; o.data.auto_smooth_angle = math.radians(48)   # curved surfaces shade smooth, real corners stay crisp
    bpy.context.scene.cursor.location = (0, 0, 0); bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
    P.clear(); RIG['on'] = False; RIG['lift'] = 0.0

INK, WOOD, DARKWOOD, STEEL, SKIN = 'c_1c1c22', 'c_6b4a34', 'c_2c2630', 'c_8c8f90', 'skin_e2b48a'
STRAW, STRAW2, ROPE, LEATHER, BRASS, STONE = 'c_d9b877', 'c_9c7a45', 'c_c9a36a', 'c_5a4030', 'c_d9a520', 'c_74747c'
LAMP = 'glow_ffb648'
IRON, IRON2, RUST, WEED = 'c_33363f', 'c_4a5568', 'c_7a4a36', 'c_6f7a34'
R = math.radians

def hat(r, z):          # the woven conical hat every crew wears
    r = r / 1.12                # the head zone is scaled up, so keep the brim from swallowing the face
    cyl(r, .03, r * .55, (0, 0, z + r * .275), STRAW, v=28)
    cyl(r, r * .96, .04, (0, 0, z), STRAW2, v=28)
    tor(r * .98, .022, (0, 0, z + .01), STRAW2)
    tor(r * .52, .02, (0, 0, z + r * .265), STRAW2)
CUR = {'skin': 'skin_e2b48a'}
def tone(hexname, k):       # a lighter or darker shade of a c_RRGGBB colour, for cheeks and noses
    h = hexname.split('_')[1]; c = [min(255, int(int(h[i:i + 2], 16) * k)) for i in (0, 2, 4)]
    return hexname.split('_')[0] + '_%02x%02x%02x' % tuple(c)
def face(z, y, w, brow='c_2c2420', style='open', nose=1.0):
    """The sculpted part of a face: jaw, cheeks and nose. Eyes, brows, mouth and lines are drawn on in the game (FACES in game.src.html)."""
    skin = CUR['skin'].replace('skin_', 'face_')      # face_ parts take no outline, so features do not ring themselves in black
    sph(.17, (0, -.08, z - .1), skin, scale=(1.05, 1, .95))                              # full jaw
    sph(.04 * nose, (0, y + .012, z - .06), tone(skin, .9), scale=(.85, 1.1, 1.2))        # nose, with a bridge
    limb((0, y + .03, z + .02), (0, y - .0, z - .05), .022 * nose, .036 * nose, tone(skin, .9), v=6)
def hair_frame(col, z=1.86, long=False):      # what shows under the hat: a fringe and locks at the temples
    for x in (-.15, -.05, .05, .15): sph(.075, (x, -.2 + abs(x) * .25, z - .03), col, scale=(1, .7, .8))
    for s in (-1, 1): sph(.1, (s * .215, -.08, z - (.2 if long else .14)), col, scale=(.6, 1, 1.9 if long else 1.3))

def lantern(x, y, z, k):      # caged storm lantern, base at z
    cyl(.2 * k, .25 * k, .09 * k, (x, y, z + .045 * k), IRON, v=12)
    cyl(.17 * k, .17 * k, .36 * k, (x, y, z + .27 * k), 'glow_ffb030', v=12)
    for i in range(4):
        a = i * math.pi / 2 + .78; cyl(.02 * k, .02 * k, .38 * k, (x + math.cos(a) * .2 * k, y + math.sin(a) * .2 * k, z + .27 * k), IRON, v=6)
    tor(.2 * k, .022 * k, (x, y, z + .27 * k), IRON)
    cyl(.26 * k, .12 * k, .11 * k, (x, y, z + .5 * k), IRON, v=12)
    cyl(.12 * k, .1 * k, .09 * k, (x, y, z + .6 * k), 'c_4a4a55', v=12)
    cyl(.15 * k, .02 * k, .07 * k, (x, y, z + .68 * k), IRON, v=12)
    tor(.13 * k, .022 * k, (x, y, z + .8 * k), IRON, rot=(R(90), 0, 0))
def harpoon_gun(x, y, z):
    box((.11, .36, .2), (x, y + .34, z - .04), WOOD, r=.045)
    box((.15, .46, .2), (x, y, z), 'c_b8862a', r=.05)
    box((.05, .1, .14), (x, y + .05, z - .15), IRON, r=.02)
    cyl(.055, .055, .62, (x, y - .52, z + .03), STEEL, rot=(R(90), 0, 0))
    for i in range(4): tor(.072, .026, (x, y - .34 - i * .07, z + .03), ROPE, rot=(R(90), 0, 0))
    for yy in (-.24, -.66): tor(.075, .02, (x, y + yy, z + .03), BRASS, rot=(R(90), 0, 0))
    o = cyl(.1, 0, .26, (x, y - .93, z + .03), 'c_aeb2ba', rot=(R(90), 0, 0), v=4); o.scale = (.4, 1, 1)

# ================================================================= the starting cast (reference/teal-crew-*.webp, rust-crew-*.webp)
# One rig, many silhouettes: build, coat length, headgear and one piece of signature gear per character.
# Every hero carries the harpoon gun in the +X hand; signature gear goes in the free hand or on the back.
CREAM, GLASS, IRONHAT = 'c_e8dcc4', 'c_3f7f86', 'c_6a6e78'

def skirt(r_bot, r_top, h, zc, m, folds=7, amp=.075, amp_top=0.0, v=42, y=0):
    """A coat skirt whose hem ripples, so the cel shading reads as hanging folds."""
    o = cyl(r_bot, r_top, h, (0, y, zc), m, v=v)
    for vert in o.data.vertices:
        a = math.atan2(vert.co.y, vert.co.x); k = 1 + (amp if vert.co.z < 0 else amp_top) * math.sin(folds * a + 1.3)
        vert.co.x *= k; vert.co.y *= k
    return o

def person(w=1.0, hem=.6, waist=.36, chest=.42, coat=.42, legs='c_2a2a30', legw=.3, aw=.2, cuff=True, bare=False,
           glove=None, wraps=False, raise_arm=False, collar=.16, gun=True, hair='c_2c2420', skin='skin_e2b48a', long_hair=False, folds=7):
    """A rounded body in a coat. Returns the shoulder x so gear can be placed against it."""
    CUR['skin'] = skin
    RIG['on'] = True; RIG['lift'] = 0.0
    lr = legw * .5 * w
    for s in (-1, 1):
        x = s * .2 * w
        box((.27 * w, .44, .2), (x, -.07, .1), LEATHER, r=.09)                       # boot: rounded foot and shaft
        limb((x, 0, .1), (x, 0, .42), .15 * w, .16 * w, LEATHER)
        tor(.16 * w, .03, (x, 0, .42), 'c_7a5a40')
        limb((x, 0, .38), (x, 0, .7), lr * .86, lr * .98, legs)                       # shin, knee, thigh
        sph(lr * 1.0, (x, -.02, .7), legs)
        limb((x, 0, .7), (x, 0, .9 + LIFT), lr * .98, lr * 1.12, legs)
        if wraps: limb((x, 0, .3), (x, 0, .52), lr * 1.02, lr * 1.06, CREAM)
    RIG['lift'] = LIFT
    h = 1.05 - coat                                                                   # coat skirt with hanging folds and a turned hem
    skirt(hem * w, waist * w, h, (1.05 + coat) / 2, 'team', folds=folds)
    band = min(.1, h * .3); rb_ = hem * w - (hem - waist) * w * band / h
    skirt(hem * w + .014, rb_ + .014, band, coat + band / 2, 'team2', folds=folds, amp_top=.075 * (1 - band / h))
    cyl(waist * w, chest * w, .5, (0, 0, 1.3), 'team', v=24)                          # torso and rounded shoulders
    sph(1, (0, 0, 1.52), 'team', scale=(chest * w + aw * .45, chest * w * .86, .2))
    for i in range(3): sph(.04, (0, -(waist + (chest - waist) * (.15 + i * .27)) * w - .005, 1.15 + i * .135), BRASS)   # buttons
    cyl(waist * w + .03, waist * w + .03, .1, (0, 0, 1.05), LEATHER, v=24)
    box((.17, .07, .15), (0, -waist * w - .04, 1.05), BRASS, r=.02)
    c = chest * w                                                                     # open, flared collar over a pale shirt
    hc = .1 + collar * .3; cr = min(c * .8, .4)                                       # tilted back, so it is low under the chin and high behind the head
    cyl(cr * .7, cr, hc, (0, .03, 1.44 + hc / 2), 'team', rot=(R(-16), 0, 0), v=20)
    tor(cr, .03, (0, .03 + hc * .14, 1.44 + hc), 'team2', rot=(R(-16), 0, 0))
    box((.16, .06, .16), (0, -c * .62, 1.47), CREAM, rot=(0, R(45), 0), r=.02)
    for s in (-1, 1): box((.17, .05, .2), (s * .14, -c * .68, 1.46), 'team2', rot=(R(-14), s * R(30), s * R(-10)), r=.02)
    cyl(.1, .1, .16, (0, 0, 1.56), skin)
    sph(.25, (0, -.03, 1.72), skin, scale=(.95, 1, 1.07))
    for s in (-1, 1): sph(.06, (s * .235, -.02, 1.71), skin, scale=(.5, 1, 1.3))      # ears
    if hair: sph(.255, (0, .035, 1.76), hair, scale=(.98, 1, 1.02)); hair_frame(hair, long=long_hair)
    sx = chest * w + aw / 2
    ra, rb = aw * .64, aw * .52
    hand = glove or skin
    hr = .2 if glove else .16
    def arm(sh, el, ha):
        sph(ra * 1.12, sh, 'team')
        limb(sh, el, ra, rb * 1.05, 'team')
        sph(rb * 1.06, el, skin if bare else 'team')
        limb(el, ha, rb * 1.02, rb * .9, skin if bare else 'team')
        if bare: tor(rb * 1.08, .035, [(a + b) / 2 for a, b in zip(sh, el)], 'team2', rot=Vector((0, 0, 1)).rotation_difference(Vector(el) - Vector(sh)).to_euler())
        if cuff:                                                                        # deep turned-back cuff
            q = [a + (b - a) * .62 for a, b in zip(el, ha)]
            limb(q, ha, rb * 1.3, rb * 1.6, 'team2')
            tor(rb * 1.6, .025, ha, 'team2', rot=Vector((0, 0, 1)).rotation_difference(Vector(ha) - Vector(el)).to_euler())
        sph(hr, ha, hand, scale=(1, 1, 1.12))
    sh = (-chest * w - aw * .3, 0, 1.5)
    if raise_arm: arm(sh, (-sx - .14, -.1, 1.66), (-sx - .2, -.26, 1.96))
    else: arm(sh, (-sx - .07, .03, 1.2), (-sx - .09, -.04, .84))
    arm((chest * w + aw * .3, 0, 1.5), (sx + .02, -.26, 1.3), (sx - .04, -.76, 1.33))
    if gun: harpoon_gun(sx - .04, -.93, 1.3)
    return sx

def braid(x=0, n=5, ribbon=None, out=0.0):
    for i in range(n): sph(.1 - i * .008, (x + out * i * .06, .25 + i * .05, 1.62 - i * .16), INK)
    if ribbon:
        z = 1.62 - n * .16
        box((.3, .05, .09), (x + out * n * .06 + .14, .5, z + .06), ribbon, rot=(0, R(22), R(18)))
        box((.26, .05, .08), (x + out * n * .06 + .1, .5, z - .08), ribbon, rot=(0, R(-12), R(-10)))
def beard(col, length=.4, wide=.22, mo=.16):
    sph(wide, (0, -.17, 1.6), col, scale=(1.05, .75, .7))
    sph(wide * .9, (0, -.2, 1.6 - length * .45), col, scale=(1, .7, length / wide * .55))
    cyl(wide * .55, .03, length * .5, (0, -.21, 1.6 - length * .8), col, rot=(R(180), 0, 0), v=12)
    moustache(col, mo)
def moustache(col, size=.16, curl=False):
    for s in (-1, 1):
        sph(size * .62, (s * size * .55, -.285, 1.635), col, scale=(1.5, .6, .62))
        sph(size * .4, (s * size * 1.25, -.26, 1.62 + (.05 if curl else -.02)), col, scale=(1.3, .6, .6))
        if curl: tor(size * .3, size * .12, (s * size * 1.7, -.25, 1.68), col, rot=(R(90), 0, 0))
def braid_front(ribbon):      # Mainsail: the braid and its ribbon come forward over the shoulder, readable from the front
    for i, (x, y, z) in enumerate(((-.2, .16, 1.62), (-.31, .04, 1.55), (-.36, -.12, 1.46), (-.35, -.24, 1.32), (-.33, -.3, 1.17), (-.31, -.32, 1.03))):
        sph(.1 - i * .006, (x, y, z), INK)
    tor(.085, .025, (-.355, -.18, 1.39), BRASS, rot=(R(60), 0, 0))
    box((.5, .05, .12), (-.66, -.2, 1.5), ribbon, rot=(0, R(-24), R(-12)), r=.02)
    box((.44, .05, .1), (-.6, -.24, 1.32), ribbon, rot=(0, R(14), R(-20)), r=.02)
    box((.2, .06, .12), (-.4, -.22, 1.43), ribbon, r=.03)
def pouch(x, y, z, s=1.0): box((.2 * s, .13 * s, .22 * s), (x, y, z), 'c_7a5a40', r=.04 * s); box((.21 * s, .14 * s, .09 * s), (x, y - .01, z + .09 * s), LEATHER, r=.03 * s); sph(.022 * s, (x, y - .08 * s, z + .05 * s), BRASS)
def strap(chestw, flip=1): box((.09, .04, .95), (0, -chestw - .02, 1.33), LEATHER, rot=(0, R(38 * flip), 0)); box((.09, .04, .95), (0, chestw + .02, 1.33), LEATHER, rot=(0, R(-38 * flip), 0))
def coil(loc, big, rot, n=3, step=(0, .1, 0)):
    for i in range(n): tor(big, big * .22, (loc[0] + step[0] * i, loc[1] + step[1] * i, loc[2] + step[2] * i), ROPE, rot=rot)
def scarf(col, tails=2):
    cyl(.3, .26, .16, (0, 0, 1.56), col)
    for i in range(tails): box((.42, .05, .11), (.3 + i * .05, .3, 1.5 - i * .12), col, rot=(0, R(18 - i * 22), R(28 + i * 10)))
def goggles(y, z):
    for s in (-1, 1): cyl(.085, .085, .07, (s * .1, y, z), BRASS, rot=(R(90), 0, 0)); cyl(.06, .06, .08, (s * .1, y - .01, z), 'c_22262b', rot=(R(90), 0, 0))
    box((.42, .03, .05), (0, y + .06, z), LEATHER)

# ---- Wickie: the crew unit — the same rig at two-thirds size, round, bearded, a rope coil for a backpack and a lamp staff
sx = person(w=1.25, hem=.5, waist=.42, chest=.46, coat=.6, legw=.3, aw=.26, gun=False, hair='c_e8e4da', skin='skin_e8ae8c')
face(1.74, -.28, .11, 'c_f0ece0', 'happy', 1.5)
for s in (-1, 1): sph(.12, (s * .15, -.19, 1.67), 'face_ee9f86', scale=(1, .75, .9))      # the open, rosy cheeks above the beard
sph(.3, (0, -.16, 1.5), 'c_f0ece0', scale=(1.1, .7, .62)); sph(.24, (0, -.2, 1.3), 'c_f0ece0', scale=(1, .65, .8)); cyl(.16, .03, .22, (0, -.21, 1.08), 'c_f0ece0', rot=(R(180), 0, 0))
moustache('c_f0ece0', .2); hat(.68, 1.93)      # hat sits high so the cheeks and beard stay open
coil((0, .52, 1.25), .4, (R(90), 0, 0), n=3, step=(0, .12, 0))
cyl(.03, .03, 1.8, (sx - .04, -.76, 1.2), DARKWOOD); sph(.1, (sx - .04, -.76, 2.14), LAMP)
done('wickie', .68)

# ================================================================= the anatomical rig (reference/target-*.webp)
# Adult proportions (about 7.5 heads), a sculpted head, articulated hands, and cloth that folds.
# Ink (brows, lips, lines, scars) is painted over the head in the game; see FACES in game.src.html.
from mathutils import Matrix
HC = 2.25            # height of the centre of the head
# The head is a hand-placed surface, not a deformed ball. Each row of HEAD_PROFILE is one height on the head:
# (height above the head centre, how far the face comes forward on the centreline, half-width at the ears, depth behind).
# Read down the second column for the side-view profile and down the third for the front-view outline.
HEAD_PROFILE = (
    (.186, .012, .012, .012), (.172, .066, .07, .075), (.14, .112, .106, .122), (.09, .134, .121, .145),   # crown, forehead
    (.05, .149, .124, .15),                                                                                # brow
    (.014, .136, .121, .148),                                                                              # eye line
    (-.03, .14, .123, .136),                                                                               # cheekbone: the widest point
    (-.07, .141, .111, .11), (-.1, .146, .101, .085),                                                      # nose base, mouth
    (-.128, .137, .091, .068),                                                                             # jaw angle
    (-.158, .138, .056, .048), (-.182, .1, .034, .03), (-.194, .03, .014, .012))                            # chin, under the chin
def head(skin, fem=True, brow=1.0):
    import numpy as np
    hx = skin.split('_')[1]
    K = np.array(HEAD_PROFILE)[::-1]
    zs = np.linspace(-.194, .186, 96); sm = np.array([1, 2, 3, 2, 1]) / 9
    F, S_, B = [np.convolve(np.pad(np.interp(zs, K[:, 0], K[:, c]), 2, mode='edge'), sm, mode='valid') for c in (1, 2, 3)]
    if not fem: S_ = S_ * (1 + .13 * np.clip((-zs - .05) / .07, 0, 1))                # a heavier jaw
    NT = 132; g = lambda a, b, sa, sb: math.exp(-(a / sa) ** 2 - (b / sb) ** 2)
    verts, faces = [], []
    for zi, z in enumerate(zs):
        for i in range(NT):
            ph = 2 * math.pi * i / NT; c, sn = math.cos(ph), math.sin(ph)
            x = S_[zi] * math.copysign(abs(sn) ** .82, sn)                             # squared-off section: a flat front with cheek planes
            y = -F[zi] * c ** .72 if c > 0 else B[zi] * (-c) ** .8
            if c > 0:
                f = c ** .5; ax = abs(x)
                # nose: a straight narrow bridge to a small tip, cut back sharply underneath, with wings
                t = (.036 - z) / .094
                if 0 < t < 1.2:
                    ridge = (.007 + .026 * t ** 1.3) if t <= 1 else .033 * max(0, 1 - (t - 1) / .2) ** .7   # a soft underside, so no ink pools there
                    y -= ridge * math.exp(-(x / (.0085 + .0075 * min(t, 1))) ** 2)
                y -= .007 * g(ax - .017, z + .054, .008, .009)
                y += .024 * f * g(ax - .062, z - .012, .03, .019)                      # eye sockets
                y -= .013 * f * g(ax - .061, z - .012, .021, .0105)                    # the eyeball under closed lids
                arc = .0265 - 2.6 * (ax - .061) ** 2                                   # upper lid: a crease that catches the shadow
                if abs(ax - .061) < .03: y -= .0055 * f * math.exp(-((z - arc) / .0035) ** 2)
                y -= .007 * brow * f * g(ax - .058, z - .047, .04, .009)               # brow ridge
                y -= .009 * f * g(ax - .087, z + .028, .026, .017)                     # cheekbone shelf
                y += .02 * f * g(ax - .066, z + .088, .026, .03)                      # the plane below it falls away to the jaw
                y -= .009 * g(x, z + .095, .03, .0075)                                 # upper lip
                y -= .011 * g(x, z + .114, .026, .009)                                 # lower lip
                y += .004 * g(x, z + .1045, .036, .005)                               # the line between them
                y += .005 * g(x, z + .132, .03, .008)                                  # dip above the chin
                y -= .006 * g(x, z + .158, .032, .014)                                 # chin
            verts.append((x, y, z + HC))
    for zi in range(len(zs) - 1):
        for i in range(NT):
            a = zi * NT + i; b = zi * NT + (i + 1) % NT; faces.append((a, b, b + NT, a + NT))
    top, bot = len(verts), len(verts) + 1
    verts += [(0, 0, HC + .188), (0, -.01, HC - .197)]
    for i in range(NT):
        faces.append(((len(zs) - 1) * NT + i, (len(zs) - 1) * NT + (i + 1) % NT, top)); faces.append(((i + 1) % NT, i, bot))
    me = bpy.data.meshes.new('head'); me.from_pydata(verts, [], faces); me.update()
    o = bpy.data.objects.new('head', me); bpy.context.collection.objects.link(o)
    bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
    bpy.ops.object.mode_set(mode='EDIT'); bpy.ops.mesh.select_all(action='SELECT'); bpy.ops.mesh.normals_make_consistent(inside=False); bpy.ops.object.mode_set(mode='OBJECT')
    fin('head_' + hx)
    for s in (-1, 1): sph(.03, (s * .122, .015, HC - .008), 'skin_' + hx, scale=(.4, .8, 1.25))   # ears
    limb((0, .012, 1.97), (0, .0, HC - .12), .062, .052, 'skin_' + hx)                        # neck

def lock(start, length, r, amp=.02, ph=0.0, out=(0, 0), m='c_1c1820', n=7):
    """A wavy lock of hair hanging from start."""
    prev = None
    for i in range(n + 1):
        t = i / n; w = math.sin(t * 5.5 + ph) * amp * t
        q = (start[0] + out[0] * t + w * (1 if start[0] >= 0 else -1), start[1] + out[1] * t + w * .6, start[2] - length * t)
        rr = r * (1 - .6 * t ** 2)
        sph(rr, q, m)
        if prev: limb(prev[0], q, prev[1], rr, m, v=7)
        prev = (q, rr)

def hand(wrist, fwd, side, mat, curl=1.0, s=1.0):
    """An articulated hand: palm, four two-jointed fingers and a thumb. fwd points down the fingers; side points to the thumb."""
    w = Vector(wrist); f = Vector(fwd).normalized(); sd = (Vector(side) - f * Vector(side).dot(f)).normalized(); n = f.cross(sd)
    rot = Matrix((sd, f, n)).transposed().to_euler()
    box((.082 * s, .092 * s, .034 * s), w + f * .045 * s, mat, rot=rot, r=.014 * s)
    limb(w - f * .075 * s, w + f * .005 * s, .052 * s, .043 * s, mat, v=12)                  # gauntlet cuff, strap and stud
    tor(.05 * s, .009 * s, w - f * .04 * s, 'c_4a3a30', rot=Vector((0, 0, 1)).rotation_difference(f).to_euler()); sph(.008 * s, w - f * .04 * s + n * .05 * s, BRASS)
    for i in range(4): sph(.012 * s, w + f * .09 * s + sd * ((1.5 - i) * .0195 * s) + n * .012 * s, 'c_4a4650', scale=(1, 1, .6))   # knuckle plates
    for i in range(4):
        b = w + f * .088 * s + sd * ((1.5 - i) * .0195 * s); L = (1, 1.1, 1.04, .86)[i]
        m1 = b + (f * .04 - n * .01 * curl) * s * L; m2 = m1 + (f * (.032 - .012 * curl) - n * .022 * curl) * s * L
        limb(b, m1, .0115 * s, .0105 * s, mat, v=7); sph(.0108 * s, m1, mat); limb(m1, m2, .0102 * s, .0085 * s, mat, v=7); sph(.0085 * s, m2, mat)
    b = w + f * .022 * s + sd * .04 * s
    m1 = b + (sd * .03 + f * .03 - n * .006 * curl) * s; m2 = m1 + (f * .032 - n * .012 * curl - sd * .008 * curl) * s
    limb(b, m1, .013 * s, .011 * s, mat, v=7); sph(.0112 * s, m1, mat); limb(m1, m2, .0105 * s, .009 * s, mat, v=7); sph(.009 * s, m2, mat)

def sleeve(sh, el, wr, r, m, cuff='team2', cuff_at=.5):
    """An arm in a sleeve: bunched cloth at the elbow and a rolled cuff partway down the forearm."""
    sph(r * 1.2, sh, m); limb(sh, el, r * 1.1, r * .92, m); sph(r * .96, el, m)
    q = [a + (b - a) * cuff_at for a, b in zip(el, wr)]
    limb(el, q, r * .92, r * .86, m)
    d = Vector(el) - Vector(sh); rot = Vector((0, 0, 1)).rotation_difference(d).to_euler()
    for k_ in (.72, .86): tor(r * .98, r * .16, [a + (b - a) * k_ for a, b in zip(sh, el)], m, rot=rot)       # folds above the elbow
    q2 = [a + (b - a) * (cuff_at + .2) for a, b in zip(el, wr)]
    limb(q, q2, r * 1.08, r * 1.12, cuff)                                                                     # the rolled cuff
    return q2

def split_skirt(r_bot, r_top, h, zc, m, folds=9, amp=.1, amp_top=0.0, gap=.3, v=44, flare=.42, flare_top=0.0):
    """A coat skirt open down the front (it parts wider toward the hem), with thickness so the lining shows."""
    import bmesh
    bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r_bot, radius2=r_top, depth=h, location=(0, 0, zc), end_fill_type='NOTHING')
    o = bpy.context.object; bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if abs(math.atan2(f.calc_center_median().x, -f.calc_center_median().y)) < gap * .5], context='FACES')
    for vert in bm.verts:
        a = math.atan2(vert.co.y, vert.co.x); low = vert.co.z < 0
        k = 1 + (amp if low else amp_top) * math.sin(folds * a + 1.3); vert.co.x *= k; vert.co.y *= k
        af = math.atan2(vert.co.x, -vert.co.y)                     # angle away from straight ahead
        fl = flare if low else flare_top
        if fl and abs(af) < 1.5:                                   # the front edges swing apart toward the hem
            r_ = math.hypot(vert.co.x, vert.co.y); af += math.copysign(fl * (1 - abs(af) / 1.5), af)
            vert.co.x, vert.co.y = r_ * math.sin(af), -r_ * math.cos(af)
    bm.to_mesh(o.data); bm.free()
    md = o.modifiers.new('thick', 'SOLIDIFY'); md.thickness = .016; md.offset = 0
    bpy.ops.object.modifier_apply(modifier='thick')
    return fin(m)

def adult(skin, sw=.25, hw=.19, fem=True, legs='c_33302e', coat_hem=.5, hem_r=.36, glove='c_2a2c34', brow=1.0, bulk=1.0):
    """The body: boots, trousers, a belted long coat, arms and hands. The gun is held at the hip in the +X hand."""
    RIG['on'] = False
    for s in (-1, 1):
        fx, kx, hx = s * (hw + .07), s * (hw + .04), s * hw * .55
        box((.115 * bulk, .29, .095), (fx, -.06, .048), LEATHER, r=.04)                       # boot
        limb((fx, .01, .07), (fx, 0, .46), .062 * bulk, .074 * bulk, LEATHER)
        tor(.078 * bulk, .016, (fx, 0, .46), 'c_7a5a40')
        for z in (.2, .34): tor(.07 * bulk, .011, (fx, 0, z), 'c_3a2c22'); box((.03, .012, .03), (fx + s * .02, -.07 * bulk, z), BRASS, r=.004)
        sph(.1 * bulk, (fx, 0, .56), legs, scale=(1, 1, .8))                                   # trousers bloused into the boot
        limb((fx, 0, .52), (kx, -.01, .72), .09 * bulk, .086 * bulk, legs)
        limb((kx, -.01, .72), (hx + s * .06, 0, 1.26), .105 * bulk, .135 * bulk, legs)        # baggy trousers
        sph(.11 * bulk, (kx, -.015, .74), legs)
    sph(1, (0, 0, 1.27), legs, scale=(hw + .07, .13 * bulk, .13))
    split_skirt(hem_r, .165 * bulk, 1.5 - coat_hem, (1.5 + coat_hem) / 2, 'team')              # coat skirt, open at the front over the trousers
    split_skirt(hem_r + .014, hem_r - .02, .1, coat_hem + .05, 'team2', amp_top=.092, flare=.42, flare_top=.42 * (1 - .1 / (1.5 - coat_hem)))   # pale hem band, following the skirt
    P[-1].rotation_euler = (0, 0, 0)
    o = cyl(.16 * bulk, sw * .82, .36, (0, 0, 1.67), 'team', v=24); o.scale = (1, .7, 1)       # torso
    sph(1, (0, .005, 1.88), 'team', scale=(sw + .035, .128 * bulk, .12))
    if fem:
        for s in (-1, 1): sph(.062, (s * .075, -.075, 1.79), 'team', scale=(1.05, .8, 1))
    o = cyl(.17 * bulk, .17 * bulk, .075, (0, 0, 1.5), LEATHER, v=24); o.scale = (1, .74, 1)   # belt and buckle
    box((.085, .03, .07), (0, -.128 * bulk, 1.5), BRASS, r=.01); box((.05, .034, .04), (0, -.13 * bulk, 1.5), 'c_8a6a20', r=.006)
    for i in range(3): sph(.014, (.035, -(.118 + i * .012) * bulk, 1.6 + i * .09), BRASS)      # buttons down the placket
    box((.012, .012, .36), (.0, -.13 * bulk, 1.68), 'team2', rot=(R(-8), 0, 0), r=.004)
    o = cyl(.085, .135, .15, (0, .03, 2.03), 'team', rot=(R(-14), 0, 0), v=20)                 # tall standing collar, open at the throat
    tor(.135, .014, (0, .048, 2.1), 'team2', rot=(R(-14), 0, 0))
    for s in (-1, 1): box((.075, .016, .1), (s * .07, -.1, 1.99), 'team', rot=(R(-20), s * R(30), s * R(-16)), r=.006)
    box((.07, .02, .07), (0, -.1, 1.95), 'c_e8dcc4', rot=(0, R(45), 0), r=.006)
    return sw

# ---------------- TEAL ----------------
# Breakwater: the biggest body on the roster — heavy coat, long white beard, a huge rope coil standing on one shoulder
sx = person(w=1.3, hem=.62, waist=.46, chest=.52, coat=.4, legw=.3, aw=.3, hair='c_e8e4da', skin='skin_dba07c')
face(1.74, -.28, .1, 'c_f0ece0', 'stern', 1.25); beard('c_f0ece0', .62, .32, .2); hat(.7, 1.86); strap(.68)
coil((-.62, .0, 1.72), .52, (0, R(72), 0), n=4, step=(.09, 0, .03))
pouch(-.4, -.62, .95, 1.2); pouch(.42, -.62, .95)
done('breakwater', 1.06)

# Mainsail (pilot for the anatomical rig): tall and athletic, a long coat, a wide hat on a cord, braid over the shoulder
SK = 'skin_b9794f'
sw = adult(SK, sw=.24, hw=.18, fem=True, legs='c_2e2a2c')
head(SK, fem=True)
HAIR = 'c_1c1820'
sph(1, (0, .005, HC + .11), HAIR, scale=(.136, .16, .1))                                    # hair: cap, loose locks, a mass at the back
sph(1, (0, .1, HC - .1), HAIR, scale=(.125, .09, .2))
for s in (-1, 1):
    limb((s * .125, -.02, HC + .1), (s * .143, -.015, HC - .06), .026, .022, HAIR); limb((s * .143, -.015, HC - .06), (s * .125, .0, HC - .2), .022, .01, HAIR)
    tor(.022, .006, (s * .128, .0, HC - .06), BRASS, rot=(0, R(90), 0))                       # earrings
for sd in (-1, 1):                                                              # loose waves framing the face and falling to the collar
    lock((sd * .118, -.07, HC + .12), .24, .024, .014, 0.5, (sd * .035, .03), n=10)
    lock((sd * .133, -.02, HC + .09), .32, .03, .016, 1.7, (sd * .02, .03), n=10)
    lock((sd * .125, .06, HC + .07), .36, .034, .016, 3.0, (sd * .01, .03), n=10)
pts = ((0, .13, 2.14), (.0, .17, 2.02), (.01, .185, 1.9), (.015, .185, 1.78), (.02, .18, 1.66), (.02, .17, 1.55))   # the braid, down the back
for i, q in enumerate(pts):
    sph(.05 - i * .004, q, HAIR)
    if i: sph(.047 - i * .004, [(a + b) / 2 for a, b in zip(q, pts[i - 1])], HAIR)
for q in (pts[1], pts[4]):
    for dz in (-.012, .012): tor(.046, .011, (q[0], q[1], q[2] + dz), BRASS)
for i, (dx, dz, ry, ln) in enumerate(((-.16, -.08, 38, .36), (-.2, -.2, 62, .4), (-.1, -.26, 80, .3))):          # red ribbon streamers
    box((ln, .012, .05), (pts[2][0] + dx, .2 + i * .012, pts[2][2] + dz), 'c_a8281c', rot=(0, R(-ry), 0), r=.005)
sph(.03, (pts[2][0] - .03, .2, pts[2][2]), 'c_a8281c')
n0 = len(P); hat(.47, HC + .14)
for o in P[n0:]:                                                              # brim raised at the front so the eyes show
    d = o.location - Vector((0, 0, HC + .1)); a_ = R(-10)
    o.location = Vector((0, 0, HC + .1)) + Vector((d.x, d.y * math.cos(a_) - d.z * math.sin(a_), d.y * math.sin(a_) + d.z * math.cos(a_))); o.rotation_euler = (a_, 0, 0)
for s in (-1, 1): limb((s * .2, .0, HC + .12), (s * .03, -.11, 1.93), .005, .005, 'c_3a3038', v=5)   # the hat cord
tor(.215, .022, (0, 0, 1.74), LEATHER, rot=(R(90), R(42), 0), scale=(1, 1.25, 1))               # cross strap, satchel, spyglass tube on the back
box((.17, .075, .17), (-.25, -.06, 1.3), 'c_7a5a40', r=.03); box((.18, .08, .08), (-.25, -.065, 1.37), LEATHER, r=.025); sph(.014, (-.25, -.108, 1.33), BRASS)
cyl(.035, .03, .34, (.12, .16, 2.0), 'c_5a4030', rot=(0, R(38), 0)); tor(.036, .008, (.2, .16, 2.11), BRASS, rot=(0, R(38), 0))
GL = 'c_2a2c34'
# free arm: relaxed at the side, gold bracers under a rolled cuff
q = sleeve((-sw - .03, 0, 1.94), (-sw - .085, .025, 1.6), (-sw - .1, -.03, 1.3), .058, 'team')
limb(q, (-sw - .1, -.03, 1.3), .045, .04, 'skin_b9794f')
for z in (1.4, 1.37, 1.34): tor(.046, .011, (-sw - .098, -.022, z), BRASS)
limb((-sw - .1, -.03, 1.32), (-sw - .1, -.032, 1.27), .043, .04, GL)
hand((-sw - .1, -.034, 1.27), (0, -.12, -1), (0, -1, 0), GL, curl=1.2, s=1.12)
# gun arm: forearm level at the hip, hand wrapped round the grip
q = sleeve((sw + .03, 0, 1.94), (sw + .075, .05, 1.6), (sw + .02, -.24, 1.53), .058, 'team')
limb(q, (sw + .02, -.24, 1.53), .045, .04, GL)
hand((sw + .02, -.24, 1.53), (0, -1, -.25), (-1, 0, .3), GL, curl=2.6, s=1.12)
n0 = len(P); harpoon_gun(sw + .01, -.38, 1.62)
for o in P[n0:]:                                  # the gun, at adult scale, shrunk about the grip
    o.location = Vector((sw + .02, -.3, 1.56)) + (o.location - Vector((sw + .02, -.3, 1.56))) * .56; o.scale = [c * .56 for c in o.scale]
done('mainsail', 1.05)

# Drift: small and quick — short tunic, baggy trousers, shin wraps, red neck scarf, gloves, a knife in the free hand
sx = person(w=.9, hem=.5, waist=.36, chest=.4, coat=.74, legs='c_3a3a40', legw=.36, aw=.18, cuff=False, glove='c_3a3038', wraps=True, skin='skin_e6b98f')
face(1.72, -.28, .09, style='stern'); hat(.6, 1.86); scarf('c_b8431c'); braid(0, 3)
box((.05, .34, .09), (-sx - .09, -.3, .82), STEEL, rot=(R(-12), 0, 0)); box((.07, .12, .1), (-sx - .09, -.08, .84), WOOD)
pouch(.3, -.4, .95); pouch(-.3, -.4, .95)
done('drift', .95)

# Rivet: broad shipwright — bare arms, big gloves, leather apron, goggles on the hat, a great wrench across the back
sx = person(w=1.18, hem=.56, waist=.44, chest=.52, coat=.5, aw=.26, cuff=False, bare=True, glove='c_5a4030', skin='skin_c98a62', hair='c_3a2c24')
face(1.72, -.28, .1, 'c_3a2c24', 'stern', 1.15); beard('c_3a2c24', .2, .24); hat(.6, 1.86); goggles(-.5, 1.93)
box((.62, .05, .8), (0, -.56, .98), 'c_4a3a30'); strap(.62); strap(.62, -1)
cyl(.06, .06, 1.5, (.1, .58, 1.3), STEEL, rot=(0, R(38), 0))
tor(.2, .07, (.62, .58, 1.95), STEEL, rot=(R(90), 0, 0)); box((.2, .1, .2), (.78, .58, 2.1), STEEL) 
pouch(-.52, -.5, .95); pouch(.52, -.5, .95)
done('rivet', 1.02)

# Bell: the smallest Teal — twin braids out to the sides and a brass bell held high (never a single ribbon braid: that is Mainsail)
sx = person(w=.82, hem=.52, waist=.3, chest=.36, coat=.3, aw=.16, raise_arm=True, skin='skin_efc4a0', long_hair=True)
face(1.72, -.28, .09); hat(.6, 1.86)
for s in (-1, 1):
    for i in range(4): sph(.09, (s * (.24 + i * .05), .12, 1.56 - i * .15), INK)
cyl(.26, .09, .3, (-sx - .2, -.28, 2.2), BRASS, rot=(R(180), 0, 0), v=10)
cyl(.28, .26, .05, (-sx - .2, -.28, 2.33), 'c_f0c040', v=10)
sph(.07, (-sx - .2, -.28, 2.38), 'c_b8862a'); cyl(.03, .03, .16, (-sx - .2, -.28, 2.04), BRASS)
box((.34, .16, .3), (.2, .36, 1.0), 'c_7a5a40'); strap(.33)
done('bell', .88)

# Kelp: a walking kelp bundle — weed draped off both shoulders, a wicker basket on the back, sickle in the free hand
sx = person(w=.95, hem=.56, waist=.36, chest=.42, coat=.42, aw=.19, hair='c_1c1c22', long_hair=True)
face(1.72, -.28, .09); hat(.6, 1.86); braid(.12, 5)
for i in range(11):
    a = R(-200 + i * 22); cyl(.11, .01, .85 + (i % 3) * .14, (math.cos(a) * .52, -math.sin(a) * .4 + .06, 1.12 - (i % 3) * .06), WEED, rot=(R(180), 0, 0), v=5)
cyl(.34, .26, .5, (0, .5, 1.25), 'c_b08a50', v=9); tor(.34, .04, (0, .5, 1.5), 'c_8a6a3a')
cyl(.035, .035, .3, (-sx - .09, -.14, .82), WOOD, rot=(R(90), 0, 0)); tor(.16, .03, (-sx - .09, -.44, .9), STEEL, rot=(0, R(90), 0))
done('kelp', 1.0)

# Skiff: short and square — bedroll and pack on the back, and an oar taller than the hat
sx = person(w=1.2, hem=.56, waist=.44, chest=.5, coat=.5, legw=.3, aw=.26, hair='c_1c1c22', skin='skin_e0a882')
face(1.72, -.28, .1, nose=1.15); hat(.62, 1.86); strap(.64)
box((.7, .34, .6), (0, .56, 1.3), 'c_7a5a40'); cyl(.2, .2, .86, (0, .56, 1.78), 'c_b89a6a', rot=(0, R(90), 0), v=9)
for x in (-.25, .25): cyl(.215, .215, .07, (x, .56, 1.78), LEATHER, rot=(0, R(90), 0), v=9)
cyl(.05, .05, 2.0, (-.5, .8, 1.5), WOOD); box((.3, .07, .8), (-.5, .8, 2.7), 'c_8a6a48'); box((.2, .08, .1), (-.5, .8, .5), WOOD)
pouch(.46, -.5, .95, 1.2)
done('skiff', .86)

# Brine: the medic — no straw hat: a white headscarf with knot tails and a bun, white apron with a cross, bottle held up
sx = person(w=.95, hem=.56, waist=.36, chest=.42, coat=.38, aw=.19, raise_arm=True, hair=None)
face(1.72, -.28, .09); hair_frame('c_1c1c22', 1.84)
sph(.275, (0, .0, 1.78), CREAM, scale=(1, 1, .8)); box((.5, .05, .09), (0, -.25, 1.83), CREAM)
sph(.14, (0, .26, 1.84), INK)
for s in (-1, 1): box((.3, .05, .1), (s * .2, .3, 1.66), CREAM, rot=(0, s * R(35), 0))
box((.08, .03, .08), (0, -.285, 1.83), 'team'); box((.03, .03, .16), (0, -.287, 1.83), 'team')
box((.44, .05, .86), (0, -.47, .86), CREAM); box((.3, .05, .3), (0, -.44, 1.38), CREAM)
box((.16, .03, .05), (0, -.47, 1.4), 'team'); box((.05, .03, .16), (0, -.47, 1.4), 'team')
cyl(.07, .07, .16, (-sx - .2, -.3, 2.1), 'c_cfe6ea', v=8); cyl(.035, .035, .07, (-sx - .2, -.3, 2.21), 'c_9c7a45', v=8)
box((.36, .16, .3), (.44, .1, .92), 'c_7a5a40'); box((.12, .03, .04), (.44, .01, .92), CREAM); box((.04, .03, .12), (.44, .01, .92), CREAM)
done('brine', .98)

# Glimmer: Teal's Lantern-Bearer — tall double-breasted coat, a rope sash, the lantern carried low at the side
sx = person(w=1.12, hem=.6, waist=.42, chest=.5, coat=.24, aw=.24, collar=.26, gun=False, hair='c_1c1c22', skin='skin_d9a276')
face(1.72, -.28, .1, style='stern'); hat(.62, 1.86)
for s in (-1, 1):
    for z in (1.2, 1.36, 1.52): sph(.045, (s * .14, -.5, z), BRASS)
tor(.56, .09, (0, 0, 1.36), ROPE, rot=(R(90), R(40), 0), scale=(1, 1.1, 1))
tor(.56, .09, (.05, 0, 1.3), ROPE, rot=(R(90), R(48), 0), scale=(1, 1.1, 1))
lantern(-sx - .1, -.06, .0, 1.0)
pouch(.4, -.52, .95, 1.2)
done('glimmer', 1.08)

# ---------------- RUST ----------------
# Netter: lean, twin ribboned braids, baggy trousers, a net bundle with floats slung at the hip
sx = person(w=.9, hem=.54, waist=.34, chest=.4, coat=.5, legs='c_4a3a34', legw=.36, aw=.18, long_hair=True, skin='skin_e6b48c')
face(1.72, -.28, .09); hat(.62, 1.86); strap(.36)
for s in (-1, 1):
    for i in range(5): sph(.09, (s * (.2 + i * .07), .2 + i * .03, 1.58 - i * .15), INK)
    box((.22, .05, .08), (s * .58, .34, .84), 'team2', rot=(0, s * R(30), 0))
sph(.4, (-sx - .1, .2, .62), 'c_4f7a70', scale=(1, 1.1, .8))
for rot in ((0, 0, 0), (R(90), 0, 0), (0, R(90), 0), (R(90), 0, R(45))): tor(.41, .04, (-sx - .1, .2, .62), ROPE, rot=rot, scale=(1, 1.1, .8) if rot == (0, 0, 0) else (1, 1, 1))
for a in (0, 1.6, 3.2): sph(.08, (-sx - .1 + math.cos(a) * .4, .2 + math.sin(a) * .4, .32), 'c_e8703f')
done('netter', .98)

# Cinder: the widest Rust — no straw hat: leather cap and goggles, black beard, cowl, forge apron, huge gloves, shovel on the back
sx = person(w=1.36, hem=.6, waist=.48, chest=.54, coat=.5, legs='c_4a3a34', legw=.32, aw=.3, cuff=False, glove='c_5a4030', hair=None)
face(1.72, -.28, .1, 'c_22201e', 'stern', 1.2); beard('c_22201e', .34, .3, .2)
sph(.275, (0, .02, 1.79), 'c_4a3a30', scale=(1, 1, .75)); goggles(-.24, 1.9)
cyl(.52, .34, .26, (0, 0, 1.56), 'team2'); cyl(.34, .5, .1, (0, 0, 1.44), 'team2')
box((.7, .06, .86), (0, -.66, .98), 'c_3a3a42'); box((.5, .06, .3), (0, -.7, 1.4), 'c_3a3a42')
for s in (-1, 1): box((.36, .38, .32), (s * (sx + .06) - (0 if s < 0 else .02), -.02 if s < 0 else -.72, .92 if s < 0 else 1.33), 'c_5a4030')
cyl(.05, .05, 1.5, (.15, .72, 1.4), WOOD, rot=(0, R(-24), 0)); box((.4, .06, .5), (.56, .72, .6), 'c_55555e', rot=(0, R(-24), 0)); box((.26, .07, .08), (-.16, .72, 2.1), WOOD, rot=(0, R(-24), 0))
done('cinder', 1.04)

# Gaff: tall, straight and plain — long coat, big square cuffs, upturned collar, a gaff hook standing high over the shoulder
sx = person(w=.88, hem=.6, waist=.32, chest=.4, coat=.22, aw=.18, collar=.28, folds=9)
for s in (-1, 1): box((.34, .36, .24), (s * (sx + .07) - (0 if s < 0 else .11), -.02 if s < 0 else -.62, .98 if s < 0 else 1.33), 'team2')
face(1.72, -.28, .09); hat(.5, 1.86); strap(.36, -1)
cyl(.045, .045, 2.3, (.2, .46, 1.5), DARKWOOD, rot=(0, R(-10), 0))
tor(.2, .05, (-.2, .46, 2.66), STEEL, rot=(R(90), 0, 0)); cyl(.06, 0, .22, (-.4, .46, 2.52), STEEL, rot=(R(180), 0, 0), v=4)
for z in (.9, 1.1): tor(.06, .03, (.31 - z * .17, .46, z), ROPE)
pouch(-.3, -.38, .95)
done('gaff', 1.1)

# Knuckle: armoured bruiser — iron hat, riveted pauldrons, knee plates, gauntlets, rope and hook over the shoulder
sx = person(w=1.3, hem=.56, waist=.48, chest=.54, coat=.56, legs='c_4a3a34', legw=.32, aw=.3, cuff=False, glove='c_55555e', skin='skin_dba582')
face(1.72, -.28, .1, style='stern', nose=1.15)
cyl(.52, .05, .26, (0, 0, 1.98), IRONHAT, v=10); cyl(.52, .5, .05, (0, 0, 1.85), 'c_4a4e58', v=10); sph(.05, (0, 0, 2.12), BRASS)
cyl(.34, .3, .14, (0, 0, 1.56), 'team2')
for s in (-1, 1):
    sph(.36, (s * (sx + .02), 0, 1.58), IRONHAT, scale=(1.1, 1.15, .7)); box((.5, .56, .1), (s * (sx + .04), 0, 1.42), 'c_4a4e58')
    for y in (-.22, .22): sph(.05, (s * (sx + .2), y, 1.5), BRASS)
    sph(.2, (s * .26, -.2, .5), IRONHAT, scale=(1, .6, 1.1))
tor(.6, .1, (0, 0, 1.36), ROPE, rot=(R(90), R(-42), 0), scale=(1, 1.15, 1))
tor(.2, .06, (-.5, .5, .9), STEEL, rot=(R(90), 0, 0))
pouch(.5, -.56, .95, 1.2); pouch(-.5, -.56, .95, 1.2)
done('knuckle', 1.04)

# Soot: small and ragged — face mask, torn scarf tails streaming, shin wraps, brass canisters on the belt
sx = person(w=.88, hem=.5, waist=.36, chest=.4, coat=.66, legs='c_4a3a34', legw=.34, aw=.18, cuff=False, glove='c_3a3038', wraps=True)
face(1.75, -.28, .09)
sph(.268, (0, -.045, 1.63), 'c_2a2a30', scale=(1, 1, .5)); hat(.6, 1.86)
cyl(.32, .27, .18, (0, 0, 1.56), 'team2')
for i in range(4): box((.5 + (i % 2) * .16, .05, .12), (.38 + i * .04, .28 + i * .05, 1.58 - i * .15), 'team2', rot=(0, R(20 - i * 16), R(30 + i * 8)))
for x in (-.34, -.14, .14, .34): cyl(.07, .07, .2, (x, -.42, .9), BRASS, v=8); cyl(.04, .04, .06, (x, -.42, 1.02), 'c_b8862a', v=8)
for s in (-1, 1): sph(.11, (s * .46, .1, .88), 'c_3a3038')
done('soot', .92)

# Ember: Rust's Lantern-Bearer — a wide cape with the crew mark on the back, braid, the lantern carried low
sx = person(w=.95, hem=.5, waist=.36, chest=.42, coat=.5, legs='c_4a3a34', legw=.34, aw=.19, gun=False, long_hair=True)
face(1.72, -.28, .09); hat(.64, 1.86); braid(0, 5, 'team2')
skirt(.86, .34, 1.05, 1.08, 'team', folds=8, amp=.08, y=.04); skirt(.875, .82, .09, .6, 'team2', folds=8, amp=.08, amp_top=.07, y=.04)
cyl(.36, .3, .16, (0, 0, 1.6), 'team2'); sph(.06, (.12, -.33, 1.56), BRASS)
tor(.2, .045, (0, .76, 1.05), CREAM, rot=(R(78), 0, 0)); box((.05, .04, .3), (0, .78, 1.05), CREAM); box((.26, .04, .05), (0, .79, .98), CREAM)
lantern(-.8, -.3, .3, 1.0); sph(.11, (-.8, -.3, 1.14), SKIN)
done('ember', 1.0)

# Tiller: bare forearms with wraps, and a tiller oar planted beside her that tops the hat
sx = person(w=.98, hem=.54, waist=.38, chest=.44, coat=.5, legs='c_4a3a34', legw=.34, aw=.2, cuff=False, bare=True, long_hair=True, skin='skin_e0aa80')
face(1.72, -.28, .09); hat(.62, 1.86); braid(0, 5); strap(.4); strap(.4, -1)
box((.24, .26, .2), (-sx - .07, -.02, 1.02), CREAM); box((.24, .2, .24), (sx - .03, -.56, 1.33), CREAM)
RIG['lift'] = 0.0      # the oar stands on the ground
cyl(.06, .06, 1.9, (-sx - .28, -.2, 1.75), WOOD); box((.36, .08, .95), (-sx - .28, -.2, .48), 'c_8a6a48'); box((.22, .1, .1), (-sx - .28, -.2, 2.72), WOOD)
RIG['lift'] = LIFT
pouch(.36, -.44, .95); pouch(-.3, -.44, .95)
done('tiller', 1.0)

# Barnacle: short, round diver — brass helmet with a grille, white beard out of the collar, tank frame with rope on top, glass floats
sx = person(w=1.22, hem=.56, waist=.46, chest=.52, coat=.56, legs='c_4a3a34', legw=.32, aw=.27, cuff=True, glove='c_5a4030', hair=None)
sph(.4, (0, -.02, 1.8), BRASS, scale=(1, 1, .95)); cyl(.44, .44, .1, (0, 0, 1.52), 'c_b8862a', v=10)
tor(.2, .03, (0, -.4, 1.82), 'c_b8862a', rot=(R(90), 0, 0))
for x in (-.1, 0, .1): box((.025, .05, .36), (x, -.44, 1.82), BRASS)
for z in (1.72, 1.92): box((.36, .05, .025), (0, -.44, z), BRASS)
for s in (-1, 1): cyl(.1, .1, .08, (s * .38, -.02, 1.84), 'c_22262b', rot=(0, R(90), 0), v=8)
cyl(.08, .08, .12, (0, 0, 2.22), 'c_b8862a', v=8)
CUR['skin'] = 'skin_dba07c'; face(1.76, -.3, .09, 'c_f0ece0', 'stern', 1.2)
sph(.3, (0, -.3, 1.5), 'c_f0ece0', scale=(1, .6, .6)); cyl(.24, .03, .5, (0, -.36, 1.28), 'c_f0ece0', rot=(R(180), 0, 0), v=12)
for s in (-1, 1): sph(.11, (s * .1, -.4, 1.6), 'c_f0ece0', scale=(1.5, .6, .6))
box((.7, .3, .8), (0, .6, 1.25), 'c_6b4a34'); box((.74, .32, .08), (0, .6, 1.25), IRON2)
coil((0, .6, 1.72), .34, (0, 0, 0), n=3, step=(0, 0, .12))
for s in (-1, 1):
    sph(.2, (s * .72, .34, .7), GLASS)
    for rot in ((0, 0, 0), (R(90), 0, 0), (0, R(90), 0)): tor(.205, .025, (s * .72, .34, .7), ROPE, rot=rot)
done('barnacle', .84)

# Copper: flat cap, goggles and a moustache, with a brass horn rig rising off the back over one shoulder
sx = person(w=.92, hem=.52, waist=.34, chest=.4, coat=.34, legs='c_4a3a34', aw=.18, cuff=False, bare=True, glove='c_5a4030')
face(1.72, -.28, .09, 'c_3a2c24'); moustache('c_3a2c24', .15, curl=True)
cyl(.3, .26, .1, (0, -.02, 1.93), 'team2', v=9); box((.3, .2, .04), (0, -.3, 1.9), 'team2'); goggles(-.27, 1.97)
for x in (-.16, .16): cyl(.13, .13, .6, (x, .46, 1.25), BRASS, v=8); sph(.13, (x, .46, 1.56), BRASS)
cyl(.07, .07, .8, (.3, .46, 1.9), BRASS, v=8)
cyl(.09, .09, .5, (.3, .26, 2.3), BRASS, rot=(R(90), 0, 0), v=8)
cyl(.5, .1, .7, (.3, -.2, 2.36), BRASS, rot=(R(-84), 0, 0), v=12); cyl(.42, .08, .6, (.3, -.29, 2.36), 'c_3a2a12', rot=(R(-84), 0, 0), v=12)
cyl(.04, .04, .5, (-sx - .09, -.2, .78), STEEL, rot=(R(70), 0, 0)); tor(.09, .035, (-sx - .09, -.46, .87), STEEL, rot=(0, R(90), 0))
strap(.36); strap(.36, -1)
done('copper', 1.02)

# Undertow: long coat with a pale wave on the back, ribboned braid, a heavy cleaver hanging from the free hand
sx = person(w=1.0, hem=.62, waist=.38, chest=.44, coat=.22, legs='c_4a3a34', aw=.2, long_hair=True, folds=9)
face(1.72, -.28, .09); hat(.62, 1.86); braid(0, 5, 'team2'); strap(.4)
cyl(.32, .27, .16, (0, 0, 1.56), 'team2')
for x, z, r in ((-.2, 1.2, .085), (-.03, 1.25, .11), (.16, 1.19, .08)): tor(r, .028, (x, -.415 + abs(x) * .1, z), CREAM, rot=(R(88), 0, 0))    # the wave, on the chest
box((.46, .04, .045), (0, -.4, 1.1), CREAM, r=.015)
box((.07, .2, .1), (-sx - .09, -.06, .78), WOOD); box((.05, .2, .62), (-sx - .09, -.1, .4), 'c_9a9ea6'); box((.06, .22, .12), (-sx - .09, -.1, .12), 'c_6a6e78')
done('undertow', 1.02)

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
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=1, radius=r, location=(0, 0, r * sz * .45))
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
bpy.ops.export_scene.gltf(filepath=os.path.join(out, 'models.glb'), export_format='GLB', export_apply=True, export_yup=True, export_texcoords=False)
print('wrote models.glb')
