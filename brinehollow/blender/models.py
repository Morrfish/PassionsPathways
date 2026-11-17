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
    small = r * max(scale) < .05                       # beads, knuckles and studs do not need a full sphere
    bpy.ops.mesh.primitive_uv_sphere_add(segments=8 if small else 14, ring_count=5 if small else 8, radius=r, location=loc)
    bpy.context.object.scale = scale; return fin(m)
def tor(R_, r, loc, m, rot=(0, 0, 0), scale=(1, 1, 1)):
    small = R_ * max(scale) < .12
    bpy.ops.mesh.primitive_torus_add(major_radius=R_, minor_radius=r, major_segments=10 if small else 14, minor_segments=4 if small else 6, location=loc, rotation=rot)
    bpy.context.object.scale = scale; return fin(m)
def limb(p0, p1, r0, r1, m, v=10):
    """A tapered tube from p0 to p1: arms, legs, anything that should not be a box."""
    a, b = Vector(p0), Vector(p1); d = b - a
    bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r0, radius2=r1, depth=d.length, location=(a + b) / 2,
                                    rotation=Vector((0, 0, 1)).rotation_difference(d).to_euler())
    return fin(m)
SKIRT = {}      # front and back halves of the coat skirt, hinged at the waist so they kick out with the stride
ARMS = {}       # the free arm, hinged at the shoulder
LEGS = {}       # parts of each leg (keys -1 and 1), kept as separate objects hinged at the hip so the game can swing them
def done(name, k=1.0):
    def join(parts, nm):
        bpy.ops.object.select_all(action='DESELECT')
        for o in parts: o.select_set(True)
        bpy.context.view_layer.objects.active = parts[0]
        bpy.ops.object.join(); o = bpy.context.object; o.name = nm; o.data.name = nm
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)   # bake the first part's own scale before sizing the whole figure
        o.scale = (k, k, k)
        bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
        o.data.use_auto_smooth = True; o.data.auto_smooth_angle = math.radians(48)   # curved surfaces shade smooth, real corners stay crisp
        return o
    def hinge(o, at):           # put the object's origin at its joint
        bpy.ops.object.select_all(action='DESELECT'); o.select_set(True); bpy.context.view_layer.objects.active = o
        bpy.context.scene.cursor.location = [c * k for c in at]; bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
    def child(o, parent):
        bpy.context.view_layer.update(); o.parent = parent; o.matrix_parent_inverse = parent.matrix_world.inverted()
    legs = {sd: [o for o in LEGS.get(sd, []) if o in P] for sd in (-1, 1)}
    shins = {sd: [o for o in LEGS.get((sd, 'shin'), []) if o in P] for sd in (-1, 1)}
    arm = [o for o in ARMS.get('free', []) if o in P] + (P[ARMS['mark']:] if ARMS.get('tail') else []) if ARMS.get('swing') else []
    skirts = {q: [o for o in SKIRT.get(q, []) if o in P] for q in 'fb'}
    taken = set(legs[-1]) | set(legs[1]) | set(arm) | set(skirts['f']) | set(skirts['b'])
    body = join([o for o in P if o not in taken], name)
    hinge(body, (0, 0, 0))
    for sd in (-1, 1):
        if not legs[sd]: continue
        tag = 'L' if sd < 0 else 'R'
        thigh = join([o for o in legs[sd] if o not in shins[sd]], name + '_leg' + tag)
        hinge(thigh, (sd * LEGS.get('hip', .16), 0, 1.2)); child(thigh, body)
        if shins[sd]:
            shin = join(shins[sd], name + '_shin' + tag); hinge(shin, (sd * LEGS.get('knee', .22), -.01, .72)); child(shin, thigh)
    if arm:
        a = join(arm, name + ('_armh' if ARMS.get('tail') else '_arm')); hinge(a, ARMS['sh']); child(a, body)
    for q in 'fb':
        if skirts[q]: sk = join(skirts[q], name + '_sk' + q.upper()); hinge(sk, (0, 0, 1.5)); child(sk, body)
    bpy.context.scene.cursor.location = (0, 0, 0); ARMS.clear(); SKIRT.clear()
    P.clear(); LEGS.clear(); RIG['on'] = False; RIG['lift'] = 0.0

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
def head(skin, fem=True, brow=1.0, wide=1.0, jaw=1.0, chin=1.0, nose=1.0, cheek=1.0, fine=False):
    """wide, jaw, chin, nose and cheek reshape the shared profile so each character has their own face."""
    import numpy as np
    hx = skin.split('_')[1]
    K = np.array(HEAD_PROFILE)[::-1]
    zs = np.linspace(-.194, .186, 96 if fine else 70); sm = np.array([1, 2, 3, 2, 1]) / 9 if fine else np.array([1, 2, 1]) / 4
    F, S_, B = [np.convolve(np.pad(np.interp(zs, K[:, 0], K[:, c]), len(sm) // 2, mode='edge'), sm, mode='valid') for c in (1, 2, 3)]
    if not fem: S_ = S_ * (1 + .13 * np.clip((-zs - .05) / .07, 0, 1))                # a heavier jaw
    S_ = S_ * wide * (1 + (jaw - 1) * np.clip((-zs - .04) / .08, 0, 1))
    NT = 132 if fine else 96; g = lambda a, b, sa, sb: math.exp(-(a / sa) ** 2 - (b / sb) ** 2)
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
                    y -= nose * ridge * math.exp(-(x / (.0085 + .0075 * min(t, 1))) ** 2)
                y -= .007 * nose * g(ax - .017, z + .054, .008, .009)
                y += .024 * f * g(ax - .062, z - .012, .03, .019)                      # eye sockets
                y -= .013 * f * g(ax - .061, z - .012, .021, .0105)                    # the eyeball under closed lids
                arc = .0265 - 2.6 * (ax - .061) ** 2                                   # upper lid: a crease that catches the shadow
                if abs(ax - .061) < .03: y -= .0055 * f * math.exp(-((z - arc) / .0035) ** 2)
                y -= .007 * brow * f * g(ax - .058, z - .047, .04, .009)               # brow ridge
                y -= .009 * cheek * f * g(ax - .087, z + .028, .026, .017)                     # cheekbone shelf
                y += .02 * cheek * f * g(ax - .066, z + .088, .026, .03)                      # the plane below it falls away to the jaw
                y -= .009 * g(x, z + .095, .03, .0075)                                 # upper lip
                y -= .011 * g(x, z + .114, .026, .009)                                 # lower lip
                y += .004 * g(x, z + .1045, .036, .005)                               # the line between them
                y += .005 * g(x, z + .132, .03, .008)                                  # dip above the chin
                y -= .006 * g(x, z + .158, .032, .014)                                 # chin
            verts.append((x, y, (z if z > -.1 else -.1 + (z + .1) * chin) + HC))
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
        if prev: limb(prev[0], q, prev[1], rr, m, v=6)
        prev = (q, rr)

def hand(wrist, fwd, side, mat, curl=1.0, s=1.0, gaunt=True):
    """An articulated hand: palm, four two-jointed fingers and a thumb. fwd points down the fingers; side points to the thumb."""
    w = Vector(wrist); f = Vector(fwd).normalized(); sd = (Vector(side) - f * Vector(side).dot(f)).normalized(); n = f.cross(sd)
    rot = Matrix((sd, f, n)).transposed().to_euler()
    box((.082 * s, .092 * s, .034 * s), w + f * .045 * s, mat, rot=rot, r=.014 * s)
    if gaunt:
        limb(w - f * .075 * s, w + f * .005 * s, .052 * s, .043 * s, mat, v=12)                  # gauntlet cuff, strap and stud
        tor(.05 * s, .009 * s, w - f * .04 * s, 'c_4a3a30', rot=Vector((0, 0, 1)).rotation_difference(f).to_euler()); sph(.008 * s, w - f * .04 * s + n * .05 * s, BRASS)
        for i in range(4): sph(.012 * s, w + f * .09 * s + sd * ((1.5 - i) * .0195 * s) + n * .012 * s, 'c_4a4650', scale=(1, 1, .6))   # knuckle plates
    for i in range(4):
        b = w + f * .088 * s + sd * ((1.5 - i) * .0195 * s); L = (1, 1.1, 1.04, .86)[i]
        m1 = b + (f * .04 - n * .01 * curl) * s * L; m2 = m1 + (f * (.032 - .012 * curl) - n * .022 * curl) * s * L
        limb(b, m1, .0115 * s, .0105 * s, mat, v=5); sph(.0108 * s, m1, mat); limb(m1, m2, .0102 * s, .0085 * s, mat, v=5); sph(.0085 * s, m2, mat)
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

def split_skirt(r_bot, r_top, h, zc, m, folds=9, amp=.1, amp_top=0.0, gap=.3, v=44, flare=.42, flare_top=0.0, part=None):
    """A coat skirt open down the front (it parts wider toward the hem), with thickness so the lining shows."""
    import bmesh
    bpy.ops.mesh.primitive_cone_add(vertices=v, radius1=r_bot, radius2=r_top, depth=h, location=(0, 0, zc), end_fill_type='NOTHING')
    o = bpy.context.object; bm = bmesh.new(); bm.from_mesh(o.data)
    bmesh.ops.delete(bm, geom=[f for f in bm.faces if abs(math.atan2(f.calc_center_median().x, -f.calc_center_median().y)) < gap * .5], context='FACES')
    if part:                      # keep only the front or the back half, so each can swing with the legs
        bmesh.ops.delete(bm, geom=[f for f in bm.faces if (f.calc_center_median().y < 0) != (part == 'f')], context='FACES')
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
    LEGS.clear(); LEGS['hip'] = hw * .55 + .06; LEGS['knee'] = hw + .04
    for s in (-1, 1):
        n0 = len(P)
        fx, kx, hx = s * (hw + .07), s * (hw + .04), s * hw * .55
        box((.115 * bulk, .29, .095), (fx, -.06, .048), LEATHER, r=.04)                       # boot
        limb((fx, .01, .07), (fx, 0, .46), .062 * bulk, .074 * bulk, LEATHER)
        tor(.078 * bulk, .016, (fx, 0, .46), 'c_7a5a40')
        for z in (.2, .34): tor(.07 * bulk, .011, (fx, 0, z), 'c_3a2c22'); box((.03, .012, .03), (fx + s * .02, -.07 * bulk, z), BRASS, r=.004)
        sph(.1 * bulk, (fx, 0, .56), legs, scale=(1, 1, .8))                                   # trousers bloused into the boot
        limb((fx, 0, .52), (kx, -.01, .72), .09 * bulk, .086 * bulk, legs)
        n1 = len(P)                                                                           # everything so far hangs below the knee
        limb((kx, -.01, .72), (hx + s * .06, 0, 1.26), .105 * bulk, .135 * bulk, legs)        # baggy trousers
        sph(.11 * bulk, (kx, -.015, .74), legs)
        LEGS[s] = P[n0:]; LEGS[(s, 'shin')] = P[n0:n1]
    sph(1, (0, 0, 1.27), legs, scale=(hw + .07, .13 * bulk, .13))
    for part in 'fb':            # coat skirt, open at the front over the trousers; front and back halves hinge at the waist
        n0 = len(P)
        split_skirt(hem_r, .165 * bulk, 1.5 - coat_hem, (1.5 + coat_hem) / 2, 'team', part=part)
        split_skirt(hem_r + .014, hem_r - .02, .1, coat_hem + .05, 'team2', amp_top=.092, flare=.42, flare_top=.42 * (1 - .1 / (1.5 - coat_hem)), part=part)   # pale hem band
        SKIRT[part] = P[n0:]
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

# ---- shared pieces for the anatomical rig
GL, W_HAIR = 'c_2a2c34', 'c_e8e4da'
def hair_cap(col, back=True):
    sph(1, (0, .005, HC + .11), col, scale=(.136, .16, .1))
    if back: sph(1, (0, .1, HC - .1), col, scale=(.125, .09, .2))
def fringe(col, kind='full'):
    """What the hair does across the forehead: a full fringe, or one swept to the side."""
    xs = [i * .03 - .09 for i in range(7)]
    for i, x in enumerate(xs):
        drop = 0 if kind == 'full' else i * .013
        sph(.055 if kind == 'swept' else .05, (x, -.12 + abs(x) * .22, HC + .13 - drop * .45), col, scale=(.7, .55, 1.0 + drop * 10))
def locks(col, long=True):
    for sd in (-1, 1):
        lock((sd * .118, -.07, HC + .12), .24 if long else .14, .024, .014, 0.5, (sd * .035, .03), m=col, n=10)
        lock((sd * .133, -.02, HC + .09), .32 if long else .17, .03, .016, 1.7, (sd * .02, .03), m=col, n=10)
        if long: lock((sd * .125, .06, HC + .07), .36, .034, .016, 3.0, (sd * .01, .03), m=col, n=10)
def back_braid(col, ribbon=None, n=6):
    pts = ((0, .13, 2.14), (.0, .17, 2.02), (.01, .185, 1.9), (.015, .185, 1.78), (.02, .18, 1.66), (.02, .17, 1.55))[:n]
    for i, q in enumerate(pts):
        sph(.05 - i * .004, q, col)
        if i: sph(.047 - i * .004, [(a + b) / 2 for a, b in zip(q, pts[i - 1])], col)
    tor(.046, .011, pts[-2], BRASS)
    if ribbon:
        for i, (dx, dz, ry, ln) in enumerate(((-.16, -.08, 38, .36), (-.2, -.2, 62, .4), (-.1, -.26, 80, .3))):
            box((ln, .012, .05), (pts[2][0] + dx, .2 + i * .012, pts[2][2] + dz), ribbon, rot=(0, R(-ry), 0), r=.005)
        sph(.03, (pts[2][0] - .03, .2, pts[2][2]), ribbon)
def tilted_hat(r=.47, z=HC + .155, tilt=-16):
    n0 = len(P); hat(r, z)
    for o in P[n0:]:                                                              # brim raised at the front so the eyes show
        d = o.location - Vector((0, 0, HC + .1)); a_ = R(tilt)
        o.location = Vector((0, 0, HC + .1)) + Vector((d.x, d.y * math.cos(a_) - d.z * math.sin(a_), d.y * math.sin(a_) + d.z * math.cos(a_))); o.rotation_euler = (a_, 0, 0)
    for s in (-1, 1): limb((s * .2, .0, HC + .12), (s * .03, -.11, 1.93), .005, .005, 'c_3a3038', v=5)   # the hat cord
def beard2(col, length=.3, wide=.14, mo=1.0):
    sph(wide, (0, -.085, HC - .17), col, scale=(1.05, .8, .55))        # sits on the jaw, below the mouth
    sph(wide * .85, (0, -.105, HC - .135 - length * .5), col, scale=(1, .7, max(.5, length / wide * .6)))
    cyl(wide * .5, .02, length * .5, (0, -.11, HC - .135 - length * .95), col, rot=(R(180), 0, 0))
    for s in (-1, 1):
        sph(.045 * mo, (s * .04 * mo, -.168, HC - .088), col, scale=(1.5, .6, .6)); sph(.03 * mo, (s * .085 * mo, -.152, HC - .1), col, scale=(1.4, .6, .6))
        if mo >= 1: sph(.06, (s * .105, -.06, HC - .09), col, scale=(.6, 1, 1.4))
def gun_at(sw):
    n0 = len(P); harpoon_gun(sw + .01, -.38, 1.62)
    for o in P[n0:]:                                  # the gun, at adult scale, shrunk about the grip
        o.location = Vector((sw + .02, -.3, 1.56)) + (o.location - Vector((sw + .02, -.3, 1.56))) * .56; o.scale = [c * .56 for c in o.scale]
def arms(sw, skin, glove=GL, r=.058, gun=True, pose='down', bare=False, bracers=False, tail=True):
    """Both arms and hands. Returns the free hand's wrist and the grip position."""
    k = r / .058; hs = 1.12 * k ** .5
    def one(sh, el, wr, fwd, side, curl):
        if bare:
            sph(r * 1.25, sh, 'team'); limb(sh, [a + (b - a) * .35 for a, b in zip(sh, el)], r * 1.25, r * 1.2, 'team')
            limb(sh, el, r * 1.05, r * .9, skin); sph(r * .95, el, skin); limb(el, wr, r * .9, r * .72, skin)
        else:
            q = sleeve(sh, el, wr, r, 'team'); limb(q, wr, r * .78, r * .7, skin)
        if bracers:
            for t in (.72, .8, .88): tor(r * .8, .011, [a + (b - a) * t for a, b in zip(el, wr)], BRASS, rot=Vector((0, 0, 1)).rotation_difference(Vector(wr) - Vector(el)).to_euler())
        hand(wr, fwd, side, glove or skin, curl=curl, s=hs, gaunt=bool(glove))
    sh = (-sw - .03, 0, 1.94); n0 = len(P)
    if pose == 'raise': wr = (-sw - .15, -.2, 2.24); one(sh, (-sw - .13, -.08, 1.98), wr, (0, -.25, 1), (1, 0, 0), 2.2)
    else: wr = (-sw - .1, -.03, 1.3); one(sh, (-sw - .085, .025, 1.6), wr, (0, -.12, -1), (0, -1, 0), 1.2 if pose == 'down' else 2.4)
    ARMS.update(free=P[n0:], sh=sh, swing=pose != 'raise' and (pose == 'down' or tail))      # a raised arm stays up; a hand holding something swings less
    grip = (sw + .02, -.24, 1.53)
    one((sw + .03, 0, 1.94), (sw + .075, .05, 1.6), grip, (0, -1, -.25), (-1, 0, .3), 2.6)
    if gun: gun_at(sw)
    ARMS.update(mark=len(P), tail=pose == 'hold' and tail)      # whatever is built next is in that hand
    return wr, grip
def cross_strap(sw): tor(sw * .9, .022, (0, 0, 1.74), LEATHER, rot=(R(90), R(42), 0), scale=(1, 1.25, 1))
def satchel(x, y, z=1.3, s=1.0):
    box((.17 * s, .075 * s, .17 * s), (x, y, z), 'c_7a5a40', r=.03 * s); box((.18 * s, .08 * s, .08 * s), (x, y - .005, z + .07 * s), LEATHER, r=.025 * s); sph(.014 * s, (x, y - .045 * s, z + .03 * s), BRASS)
def apron(col, bulk=1.0, cross=None):
    box((.24 * bulk, .02, .3), (0, -.118 * bulk - .028, 1.72), col, r=.008)
    box((.32 * bulk, .02, .64), (0, -.2 * bulk - .04, 1.17), col, rot=(R(-13), 0, 0), r=.008); SKIRT['f'].append(P[-1])
    if cross:
        box((.09, .012, .03), (0, -.118 * bulk - .042, 1.74), cross, r=.004); box((.03, .012, .09), (0, -.118 * bulk - .042, 1.74), cross, r=.004)

# ---------------- TEAL ----------------
# Breakwater: the biggest body on the roster — heavy coat, long white beard, a huge rope coil standing on one shoulder
SK = 'skin_c88e6a'
sw = adult(SK, sw=.33, hw=.23, fem=False, coat_hem=.6, hem_r=.47, bulk=1.4)
head(SK, fem=False, brow=1.5, wide=1.06, nose=1.3); hair_cap(W_HAIR); locks(W_HAIR, False); beard2(W_HAIR, .38, .15); tilted_hat(.52, HC + .17, -17)
for i in range(4): tor(.25, .055, (-sw + .03 + i * .055, .03, 2.1 + i * .012), ROPE, rot=(0, R(76), 0))
cross_strap(sw); satchel(-.3, -.2, 1.36, 1.2); satchel(.3, -.2, 1.36)
arms(sw, SK, r=.076)
done('breakwater', 1.0)

# Mainsail (pilot for the anatomical rig): tall and athletic, a long coat, a wide hat on a cord, braid over the shoulder
SK = 'skin_b9794f'
sw = adult(SK, sw=.24, hw=.18, fem=True, legs='c_2e2a2c')
head(SK, fem=True, fine=True)
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
n0 = len(P)
q = sleeve((-sw - .03, 0, 1.94), (-sw - .085, .025, 1.6), (-sw - .1, -.03, 1.3), .058, 'team')
limb(q, (-sw - .1, -.03, 1.3), .045, .04, 'skin_b9794f')
for z in (1.4, 1.37, 1.34): tor(.046, .011, (-sw - .098, -.022, z), BRASS)
limb((-sw - .1, -.03, 1.32), (-sw - .1, -.032, 1.27), .043, .04, GL)
hand((-sw - .1, -.034, 1.27), (0, -.12, -1), (0, -1, 0), GL, curl=1.2, s=1.12)
ARMS.update(free=P[n0:], sh=(-sw - .03, 0, 1.94), swing=True, tail=False)
# gun arm: forearm level at the hip, hand wrapped round the grip
q = sleeve((sw + .03, 0, 1.94), (sw + .075, .05, 1.6), (sw + .02, -.24, 1.53), .058, 'team')
limb(q, (sw + .02, -.24, 1.53), .045, .04, GL)
hand((sw + .02, -.24, 1.53), (0, -1, -.25), (-1, 0, .3), GL, curl=2.6, s=1.12)
n0 = len(P); harpoon_gun(sw + .01, -.38, 1.62)
for o in P[n0:]:                                  # the gun, at adult scale, shrunk about the grip
    o.location = Vector((sw + .02, -.3, 1.56)) + (o.location - Vector((sw + .02, -.3, 1.56))) * .56; o.scale = [c * .56 for c in o.scale]
done('mainsail', 1.05)

# Drift: small and quick — short jacket, baggy trousers, shin wraps, red neck scarf, a knife in the free hand
SK = 'skin_c4906a'
sw = adult(SK, sw=.22, hw=.17, fem=True, coat_hem=1.02, hem_r=.27, legs='c_3a3a40')
for s in (-1, 1):
    for z in (.5, .56, .62): tor(.088, .022, (s * .24, 0, z), CREAM); LEGS[s].append(P[-1]); LEGS[(s, 'shin')].append(P[-1])
head(SK, fem=True, wide=.93, jaw=.84, chin=1.05, nose=.9, cheek=1.7); hair_cap('c_1c1820'); fringe('c_1c1820', 'swept'); locks('c_1c1820', False); back_braid('c_1c1820', n=4); tilted_hat(.46)
tor(.11, .045, (0, .01, 2.01), 'c_b8431c', rot=(R(-10), 0, 0))
for i in range(2): box((.3, .014, .07), (.2 + i * .04, .14, 1.95 - i * .1), 'c_b8431c', rot=(0, R(20 - i * 24), R(34)), r=.006)
cross_strap(sw); satchel(.2, -.1, 1.36, .9); satchel(-.2, -.1, 1.36, .9)
wr, grip = arms(sw, SK, pose='hold')
box((.014, .2, .034), (wr[0], wr[1] - .16, wr[2] - .1), STEEL, r=.004); box((.022, .07, .03), (wr[0], wr[1] - .04, wr[2] - .09), WOOD, r=.008)
done('drift', .9)

# Rivet: broad shipwright — bare arms, big gloves, leather apron, goggles on the hat, a great wrench across the back
SK = 'skin_c98a62'
sw = adult(SK, sw=.32, hw=.22, fem=False, coat_hem=.86, hem_r=.43, bulk=1.3)
head(SK, fem=False, brow=1.4, wide=1.05, jaw=1.1, nose=1.2); hair_cap('c_3a2c24', False); beard2('c_3a2c24', .09, .105, mo=.62); tilted_hat(.47)
for s in (-1, 1): cyl(.042, .042, .04, (s * .055, -.2, HC + .215), BRASS, rot=(R(80), 0, 0)); cyl(.03, .03, .045, (s * .055, -.205, HC + .215), 'c_22262b', rot=(R(80), 0, 0))
apron('c_4a3a30', 1.3); cross_strap(sw)
cyl(.026, .026, .9, (.05, .2, 1.85), STEEL, rot=(0, R(38), 0)); tor(.085, .03, (.36, .2, 2.24), STEEL, rot=(R(90), 0, 0)); tor(.06, .026, (-.24, .2, 1.48), STEEL, rot=(R(90), 0, 0))
satchel(-.32, -.14, 1.36); satchel(.32, -.14, 1.36)
arms(sw, SK, glove='c_5a4030', r=.076, bare=True)
done('rivet', .98)

# Bell: the smallest Teal — twin braids out to the sides and a brass bell held high (never a single ribbon braid: that is Mainsail)
SK = 'skin_d6a27a'
sw = adult(SK, sw=.215, hw=.17, fem=True, coat_hem=.5, hem_r=.33)
head(SK, fem=True, brow=.5, wide=1.1, jaw=1.06, chin=.76, nose=.66, cheek=.3); hair_cap('c_7a3a22'); fringe('c_7a3a22'); locks('c_7a3a22', False); tilted_hat(.46)
for s in (-1, 1):
    for i in range(6): sph(.042 - i * .003, (s * (.14 + i * .016), .03 - i * .012, HC - .08 - i * .07), 'c_7a3a22')
    tor(.034, .01, (s * .215, -.025, HC - .44), BRASS)
cross_strap(sw); satchel(.22, -.08)
wr, grip = arms(sw, SK, glove=None, pose='raise')
bx, by, bz = wr[0], wr[1] - .04, wr[2] + .2
cyl(.01, .01, .09, (bx, by, bz - .06), BRASS); cyl(.095, .03, .12, (bx, by, bz - .16), BRASS, rot=(R(180), 0, 0), v=14); tor(.095, .012, (bx, by, bz - .22), 'c_f0c040'); sph(.022, (bx, by, bz - .23), 'c_b8862a')
done('bell', .84)

# Kelp: a walking kelp bundle — weed draped off both shoulders, a wicker basket on the back, sickle in the free hand
SK = 'skin_c08a60'
sw = adult(SK, sw=.23, hw=.18, fem=True, coat_hem=.6, hem_r=.34)
head(SK, fem=True, brow=1.2, wide=.92, jaw=.88, chin=1.22, nose=1.3, cheek=1.2); hair_cap('c_3a2a1e'); locks('c_3a2a1e'); back_braid('c_3a2a1e', n=5); tilted_hat(.47)
for i in range(13):
    a = R(-210 + i * 20); cyl(.045, .004, .42 + (i % 3) * .08, (math.cos(a) * (sw + .04), -math.sin(a) * .15 + .02, 1.72 - (i % 3) * .03), WEED, rot=(R(180), 0, 0), v=5)
cyl(.15, .11, .26, (0, .25, 1.75), 'c_b08a50'); tor(.15, .018, (0, .25, 1.88), 'c_8a6a3a'); tor(.13, .014, (0, .25, 1.72), 'c_8a6a3a')
wr, grip = arms(sw, SK, pose='hold')
cyl(.014, .014, .14, (wr[0], wr[1] - .07, wr[2] - .09), WOOD, rot=(R(90), 0, 0)); tor(.075, .012, (wr[0], wr[1] - .2, wr[2] - .06), STEEL, rot=(0, R(90), 0))
done('kelp', .95)

# Skiff: short and square — bedroll and pack on the back, and an oar taller than the hat
SK = 'skin_c48c64'
sw = adult(SK, sw=.3, hw=.22, fem=False, coat_hem=.8, hem_r=.42, bulk=1.25)
head(SK, fem=False, brow=1.5, wide=1.1, jaw=1.14, chin=.94, nose=1.35, cheek=.8); hair_cap('c_1c1820', False); locks('c_1c1820', False); tilted_hat(.48)
cross_strap(sw)
box((.36, .17, .34), (0, .25, 1.74), 'c_7a5a40', r=.04); cyl(.1, .1, .46, (0, .25, 2.0), 'c_b89a6a', rot=(0, R(90), 0))
for x in (-.13, .13): tor(.102, .014, (x, .25, 2.0), LEATHER, rot=(0, R(90), 0))
cyl(.024, .024, 1.5, (-.22, .37, 1.75), WOOD); box((.14, .03, .42), (-.22, .37, 2.68), 'c_8a6a48', r=.012)
satchel(.28, -.14, 1.36, 1.1)
arms(sw, SK, r=.07)
done('skiff', .82)

# Brine: the medic — no straw hat: a white headscarf with knot tails and a bun, white apron with a cross, bottle held up
SK = 'skin_c99870'
sw = adult(SK, sw=.23, hw=.18, fem=True, coat_hem=.62, hem_r=.34)
head(SK, fem=True, brow=.8, wide=1.08, jaw=1.16, chin=.9, nose=.8, cheek=.5); locks('c_1c1820', False)
sph(1, (0, .012, HC + .085), CREAM, scale=(.138, .163, .125)); sph(.07, (0, .16, HC + .1), 'c_1c1820')
for s in (-1, 1): box((.17, .014, .055), (s * .1, .17, HC - .02), CREAM, rot=(0, s * R(40), 0), r=.006)
apron(CREAM, 1.0, cross='team')
for i in range(3): cyl(.018, .018, .07, (-.1 + i * .035, -.14, 1.42), 'c_cfe6ea'); sph(.014, (-.1 + i * .035, -.14, 1.46), 'c_9c7a45')
satchel(.22, -.08, 1.34)
wr, grip = arms(sw, SK, glove=None, pose='raise')
cyl(.035, .035, .08, (wr[0], wr[1] - .06, wr[2] + .13), 'c_9fd6de'); cyl(.016, .016, .04, (wr[0], wr[1] - .06, wr[2] + .19), 'c_9c7a45')
done('brine', .93)

# Glimmer: Teal's Lantern-Bearer — tall double-breasted coat, a rope sash, the lantern carried low at the side
SK = 'skin_b98558'
sw = adult(SK, sw=.29, hw=.2, fem=False, coat_hem=.45, hem_r=.4, bulk=1.15)
head(SK, fem=False, brow=1.3, wide=.97, chin=1.1, cheek=1.3); hair_cap('c_1c1820', False); locks('c_1c1820', False); tilted_hat(.48)
for i in range(3): sph(.014, (-.04, -(.136 + i * .014), 1.6 + i * .09), BRASS)
for i in range(2): tor(sw * .9, .026, (0, 0, 1.76 - i * .06), ROPE, rot=(R(90), R(-42), 0), scale=(1, 1.25, 1))
satchel(.24, -.12, 1.36)
wr, grip = arms(sw, SK, r=.066, gun=False, pose='hold')
lantern(wr[0], wr[1] - .05, wr[2] - .4, .34)
done('glimmer', 1.03)

# ---- Wickie: the crew unit — small, round and white-bearded, a rope coil for a backpack and a lamp staff
SK = 'skin_d09876'
sw = adult(SK, sw=.31, hw=.23, fem=False, coat_hem=.86, hem_r=.46, bulk=1.45)
head(SK, fem=False, brow=1.1, wide=1.08, chin=.9, nose=1.4, cheek=.7); hair_cap(W_HAIR); locks(W_HAIR, False); beard2(W_HAIR, .3, .155); tilted_hat(.55)
for i in range(3): tor(.19, .05, (0, .24 + i * .07, 1.74), ROPE, rot=(R(90), 0, 0))
cross_strap(sw); satchel(-.3, -.2, 1.36)
wr, grip = arms(sw, SK, r=.076, gun=False)
cyl(.014, .014, 1.2, (grip[0], grip[1] - .1, 1.75), DARKWOOD); sph(.05, (grip[0], grip[1] - .1, 2.38), LAMP)
done('wickie', .66)

# ---------------- RUST ----------------
RL, BLK = 'c_4a3a34', 'c_1c1820'
# Netter: lean, twin ribboned braids, a net bundle with floats slung at the hip
SK = 'skin_c69068'
sw = adult(SK, sw=.225, hw=.175, fem=True, coat_hem=.85, hem_r=.3, legs=RL)
head(SK, fem=True, wide=.97, chin=1.06, nose=.95, cheek=1.3); hair_cap('c_3a2c24'); fringe('c_3a2c24'); locks('c_3a2c24', False); tilted_hat(.48)
for s in (-1, 1):
    for i in range(8): sph(.042 - i * .002, (s * (.13 + i * .014), .05 - i * .012, HC - .08 - i * .075), 'c_3a2c24')
    tor(.034, .01, (s * .235, -.04, HC - .62), BRASS); box((.16, .012, .045), (s * .3, -.04, HC - .68), 'team2', rot=(0, s * R(50), 0), r=.005)
cross_strap(sw)
sph(.17, (-sw - .1, .08, 1.22), 'c_4f7a70', scale=(1, 1.1, .85))
for rot in ((0, 0, 0), (R(90), 0, 0), (0, R(90), 0)): tor(.172, .016, (-sw - .1, .08, 1.22), ROPE, rot=rot)
for a in (0, 1.6, 3.2, 4.6): sph(.04, (-sw - .1 + math.cos(a) * .17, .08 + math.sin(a) * .17, 1.1), 'c_e8703f')
arms(sw, SK)
done('netter', .95)

# Cinder: the widest Rust — no straw hat: leather cap and goggles, black beard, cowl, forge apron, huge gloves, shovel on the back
SK = 'skin_b07a56'
sw = adult(SK, sw=.35, hw=.24, fem=False, coat_hem=.85, hem_r=.46, bulk=1.45, legs=RL)
head(SK, fem=False, brow=1.6, wide=1.1, jaw=1.15, nose=1.3)
sph(1, (0, .012, HC + .1), 'c_4a3a30', scale=(.14, .165, .115)); tor(.135, .014, (0, .0, HC + .09), 'c_2c2630', rot=(R(-8), 0, 0))
for s in (-1, 1): cyl(.045, .045, .04, (s * .058, -.135, HC + .135), BRASS, rot=(R(70), 0, 0)); cyl(.032, .032, .045, (s * .058, -.14, HC + .135), 'c_22262b', rot=(R(70), 0, 0))
beard2('c_22201e', .2, .135, mo=.8)
tor(.17, .04, (0, .03, 1.99), 'team2', scale=(1.2, 1, 1.2))
apron('c_3a3a42', 1.45)
cyl(.024, .024, 1.05, (.06, .25, 1.86), WOOD, rot=(0, R(-24), 0)); box((.2, .03, .26), (.31, .25, 1.3), 'c_55555e', rot=(0, R(-24), 0), r=.01); box((.12, .03, .035), (-.16, .25, 2.35), WOOD, rot=(0, R(-24), 0), r=.01)
arms(sw, SK, glove='c_5a4030', r=.082)
done('cinder', 1.0)

# Gaff: tall, straight and plain — long coat, big square cuffs, upturned collar, a gaff hook standing high over the shoulder
SK = 'skin_c08860'
sw = adult(SK, sw=.26, hw=.18, fem=False, coat_hem=.42, hem_r=.36, bulk=1.05, legs=RL)
head(SK, fem=False, brow=1.6, wide=.93, jaw=.95, chin=1.22, nose=1.4, cheek=2.0); hair_cap(BLK, False); locks(BLK, False); tilted_hat(.4)
cyl(.1, .16, .2, (0, .04, 2.06), 'team2', rot=(R(-16), 0, 0))
cyl(.02, .02, 1.75, (.1, .22, 1.95), DARKWOOD, rot=(0, R(-10), 0)); tor(.09, .022, (-.14, .22, 2.8), STEEL, rot=(R(90), 0, 0)); cyl(.03, 0, .1, (-.23, .22, 2.74), STEEL, rot=(R(180), 0, 0), v=4)
cross_strap(sw); satchel(-.24, -.1, 1.36)
wr, grip = arms(sw, SK)
box((.17, .17, .13), (wr[0], wr[1], wr[2] + .13), 'team2', r=.02); ARMS['free'].append(P[-1]); box((.17, .15, .17), (grip[0], grip[1] + .13, grip[2]), 'team2', r=.02)
done('gaff', 1.1)

# Knuckle: armoured bruiser — iron hat, riveted pauldrons, knee plates, gauntlets, rope over the shoulder
SK = 'skin_c4906a'
sw = adult(SK, sw=.34, hw=.23, fem=False, coat_hem=.9, hem_r=.44, bulk=1.4, legs=RL)
head(SK, fem=False, brow=1.9, wide=1.12, jaw=1.26, chin=.9, nose=1.5, cheek=1.2); hair_cap(BLK, False)
cyl(.4, .04, .2, (0, 0, HC + .25), IRONHAT, v=18); cyl(.4, .39, .03, (0, 0, HC + .15), 'c_4a4e58', v=18); sph(.03, (0, 0, HC + .36), BRASS)
for s in (-1, 1):
    sph(.17, (s * (sw + .04), 0, 1.98), IRONHAT, scale=(1.1, 1.15, .7)); tor(.17, .02, (s * (sw + .04), 0, 1.92), 'c_4a4e58', scale=(1.1, 1.15, 1))
    for y in (-.1, .1): sph(.022, (s * (sw + .14), y, 1.97), BRASS)
    sph(.11, (s * .27, -.1, .74), IRONHAT, scale=(1, .5, 1.15)); LEGS[s].append(P[-1])
tor(sw * .92, .04, (0, 0, 1.74), ROPE, rot=(R(90), R(-42), 0), scale=(1, 1.25, 1))
satchel(.3, -.2, 1.36, 1.2); satchel(-.3, -.2, 1.36, 1.2)
arms(sw, SK, glove='c_55555e', r=.08)
done('knuckle', 1.0)

# Soot: small and ragged — face mask, torn scarf tails streaming, shin wraps, brass canisters on the belt
SK = 'skin_c99870'
sw = adult(SK, sw=.215, hw=.17, fem=True, coat_hem=.95, hem_r=.28, legs=RL)
for s in (-1, 1):
    for z in (.5, .56, .62): tor(.088, .022, (s * .24, 0, z), CREAM); LEGS[s].append(P[-1]); LEGS[(s, 'shin')].append(P[-1])
head(SK, fem=True, wide=.95, chin=.95, cheek=1.2); hair_cap(BLK); fringe(BLK); locks(BLK, False); tilted_hat(.46)
sph(1, (0, -.005, HC - .105), 'c_2a2a30', scale=(.12, .16, .095))
tor(.11, .05, (0, .01, 2.01), 'team2', rot=(R(-10), 0, 0))
for i in range(4): box((.3 + (i % 2) * .1, .014, .06), (.2 + i * .03, .14 + i * .02, 1.97 - i * .08), 'team2', rot=(0, R(22 - i * 15), R(32 + i * 6)), r=.006)
for x in (-.12, -.04, .04, .12): cyl(.028, .028, .09, (x, -.145, 1.42), BRASS); sph(.02, (x, -.145, 1.48), 'c_b8862a')
arms(sw, SK, glove='c_3a3038')
done('soot', .88)

# Ember: Rust's Lantern-Bearer — a wide cape with the crew mark on the back, braid, the lantern carried low
SK = 'skin_b98558'
sw = adult(SK, sw=.235, hw=.18, fem=True, coat_hem=.8, hem_r=.3, legs=RL)
head(SK, fem=True, brow=.6, wide=1.06, jaw=1.0, chin=.86, nose=.8, cheek=.5); hair_cap('c_7a3a22'); locks('c_7a3a22'); back_braid('c_7a3a22', ribbon='team2'); tilted_hat(.5)
split_skirt(.52, .2, .95, 1.5, 'team', folds=8, amp=.08, gap=2.5, flare=0)            # the cape hangs from the shoulders, open at the front
split_skirt(.535, .5, .1, 1.075, 'team2', folds=8, amp=.08, amp_top=.074, gap=2.5, flare=0)
tor(.19, .04, (0, .03, 1.97), 'team2', scale=(1.2, 1, 1)); sph(.025, (.08, -.14, 1.96), BRASS)
tor(.1, .02, (0, .43, 1.42), CREAM, rot=(R(72), 0, 0)); box((.02, .02, .16), (0, .435, 1.42), CREAM, rot=(R(-18), 0, 0), r=.006)
wr, grip = arms(sw, SK, gun=False, pose='hold')
lantern(wr[0], wr[1] - .05, wr[2] - .4, .34)
done('ember', .97)

# Tiller: bare forearms with wraps, and a tiller oar planted beside her that tops the hat
SK = 'skin_a8744c'
sw = adult(SK, sw=.24, hw=.18, fem=True, coat_hem=.85, hem_r=.31, legs=RL)
head(SK, fem=True, brow=1.2, wide=1.06, jaw=1.14, chin=.95, nose=1.15, cheek=.7); hair_cap(BLK); locks(BLK, False); back_braid(BLK, n=5); tilted_hat(.48)
tor(.132, .022, (0, .01, HC + .085), 'c_a8281c', rot=(R(-6), 0, 0), scale=(1, 1.18, 1.6)); box((.12, .012, .04), (.13, .12, HC + .02), 'c_a8281c', rot=(0, R(60), R(30)), r=.005)
cross_strap(sw); tor(sw * .9, .022, (0, 0, 1.74), LEATHER, rot=(R(90), R(-42), 0), scale=(1, 1.25, 1))
satchel(.2, -.1, 1.36)
wr, grip = arms(sw, SK, glove=None, bare=True, pose='hold', tail=False)
for q in (wr, grip):
    for i in range(3): tor(.047, .014, (q[0], q[1] + (i * .03 if q is grip else 0), q[2] + (0 if q is grip else .05 + i * .03)), CREAM, rot=(R(90) if q is grip else 0, 0, 0))
ox, oy = wr[0] - .005, wr[1] - .075
cyl(.024, .024, 2.5, (ox, oy, 1.4), WOOD); box((.17, .03, .5), (ox, oy, .3), 'c_8a6a48', r=.012); box((.12, .04, .05), (ox, oy, 2.66), WOOD, r=.012)
done('tiller', .97)

# Barnacle: short, round diver — brass helmet with a grille, white beard out of the collar, tank frame with rope on top, glass floats
SK = 'skin_c88e6a'
sw = adult(SK, sw=.32, hw=.23, fem=False, coat_hem=.9, hem_r=.45, bulk=1.45, legs=RL)
head(SK, fem=False, brow=1.3, wide=1.08, nose=1.3); beard2(W_HAIR, .26, .13)
sph(1, (0, .115, HC + .03), BRASS, scale=(.185, .185, .225))                            # helmet, set back so the face shows through the port
tor(.145, .024, (0, -.07, HC - .01), 'c_b8862a', rot=(R(90), 0, 0), scale=(1, 1.3, 1))
for x in (-.1, .1): cyl(.008, .008, .3, (x, -.14, HC - .01), BRASS)
cyl(.008, .008, .26, (0, -.15, HC + .135), BRASS, rot=(0, R(90), 0))
for s in (-1, 1): cyl(.05, .05, .04, (s * .185, .115, HC + .03), 'c_22262b', rot=(0, R(90), 0))
cyl(.04, .04, .06, (0, .115, HC + .27), 'c_b8862a'); cyl(.21, .21, .06, (0, .03, 2.03), 'c_b8862a', v=18)
box((.34, .16, .4), (0, .27, 1.72), 'c_6b4a34', r=.03); tor(.2, .02, (0, .27, 1.72), IRON2, rot=(R(90), 0, 0), scale=(1, 1.1, 1))
for i in range(3): tor(.15, .04, (0, .27, 1.97 + i * .06), ROPE)
for s in (-1, 1):
    sph(.1, (s * (sw + .12), .16, 1.36), GLASS)
    for rot in ((0, 0, 0), (R(90), 0, 0), (0, R(90), 0)): tor(.102, .012, (s * (sw + .12), .16, 1.36), ROPE, rot=rot)
arms(sw, SK, glove='c_5a4030', r=.08)
done('barnacle', .8)

# Copper: flat cap, goggles and a moustache, with a brass horn rig rising off the back over one shoulder
SK = 'skin_c4906a'
sw = adult(SK, sw=.25, hw=.18, fem=False, coat_hem=.7, hem_r=.33, legs=RL)
head(SK, fem=False, brow=1.2, nose=1.1, cheek=1.2); hair_cap('c_3a2c24', False); locks('c_3a2c24', False)
sph(1, (0, -.01, HC + .135), 'team2', scale=(.15, .18, .065)); box((.2, .12, .02), (0, -.2, HC + .115), 'team2', r=.008)
for s in (-1, 1):
    cyl(.042, .042, .04, (s * .055, -.16, HC + .17), BRASS, rot=(R(70), 0, 0)); cyl(.03, .03, .045, (s * .055, -.165, HC + .17), 'c_22262b', rot=(R(70), 0, 0))
    sph(.04, (s * .04, -.168, HC - .088), 'c_3a2c24', scale=(1.6, .6, .6)); sph(.026, (s * .09, -.15, HC - .08), 'c_3a2c24', scale=(1.3, .6, .8)); tor(.02, .008, (s * .115, -.14, HC - .06), 'c_3a2c24', rot=(R(90), 0, 0))
cross_strap(sw); tor(sw * .9, .022, (0, 0, 1.74), LEATHER, rot=(R(90), R(-42), 0), scale=(1, 1.25, 1))
for x in (-.08, .08): cyl(.06, .06, .3, (x, .2, 1.72), BRASS); sph(.06, (x, .2, 1.87), BRASS)
cyl(.03, .03, .2, (.11, .2, 1.95), BRASS); cyl(.03, .03, .62, (.22, .2, 2.28), BRASS, rot=(0, R(22), 0)); cyl(.035, .035, .2, (.34, .12, 2.58), BRASS, rot=(R(90), 0, 0))
cyl(.15, .035, .26, (.34, -.1, 2.6), BRASS, rot=(R(-84), 0, 0), v=16); cyl(.125, .025, .22, (.34, -.125, 2.6), 'c_3a2a12', rot=(R(-84), 0, 0), v=16)
wr, grip = arms(sw, SK, glove='c_5a4030', bare=True, pose='hold')
cyl(.016, .016, .26, (wr[0], wr[1] - .1, wr[2] - .08), STEEL, rot=(R(80), 0, 0)); tor(.04, .014, (wr[0], wr[1] - .25, wr[2] - .05), STEEL, rot=(0, R(90), 0))
done('copper', 1.0)

# Undertow: long coat with a pale wave on the chest, ribboned braid, a heavy cleaver hanging from the free hand
SK = 'skin_c08a60'
sw = adult(SK, sw=.25, hw=.185, fem=True, coat_hem=.42, hem_r=.37, legs=RL)
head(SK, fem=True, brow=1.3, wide=.94, jaw=.9, chin=1.2, nose=1.2, cheek=1.8); hair_cap(BLK); fringe(BLK, 'swept'); locks(BLK); back_braid(BLK, ribbon='team2'); tilted_hat(.49)
tor(.11, .045, (0, .01, 2.01), 'team2', rot=(R(-10), 0, 0))
wy = lambda x: -.146 + abs(x) * .12
crest = ((-.15, 1.74), (-.12, 1.765), (-.085, 1.8), (-.05, 1.83), (-.015, 1.84), (.02, 1.825), (.035, 1.795), (.015, 1.775), (-.01, 1.785))      # a cresting wave, curling over
swell = ((.03, 1.755), (.06, 1.785), (.09, 1.79), (.115, 1.765), (.13, 1.74))
for line_ in (crest, swell, ((-.15, 1.725), (.13, 1.725))):
    line_ = [(-.01 + (x + .01) * 1.25, 1.77 + (z - 1.77) * 1.5) for x, z in line_]
    for a, b in zip(line_, line_[1:]): limb((a[0], wy(a[0]), a[1]), (b[0], wy(b[0]), b[1]), .016, .016, CREAM, v=6); sph(.016, (b[0], wy(b[0]), b[1]), CREAM)
cross_strap(sw)
wr, grip = arms(sw, SK, pose='hold')
box((.03, .09, .04), (wr[0], wr[1] - .03, wr[2] - .1), WOOD, r=.01); box((.018, .1, .3), (wr[0], wr[1] - .06, wr[2] - .28), 'c_9a9ea6', r=.006); box((.022, .11, .05), (wr[0], wr[1] - .06, wr[2] - .42), 'c_6a6e78', r=.006)
done('undertow', 1.0)

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

# Slim the file: drop the stored normals (the game recomputes them; vertices stay split at hard edges, so creases survive)
import json, struct
path = os.path.join(out, 'models.glb'); raw = open(path, 'rb').read()
jl = struct.unpack('<I', raw[12:16])[0]; gl = json.loads(raw[20:20 + jl]); binb = raw[20 + jl + 8:]
used = []
for m in gl['meshes']:
    for pr in m['primitives']:
        pr['attributes'].pop('NORMAL', None)
        used += list(pr['attributes'].values()) + [pr['indices']]
amap = {a: i for i, a in enumerate(sorted(set(used)))}
newacc, newbv, buf = [], [], bytearray()
for a in sorted(amap):
    acc = dict(gl['accessors'][a]); bv = dict(gl['bufferViews'][acc['bufferView']])
    chunk = binb[bv.get('byteOffset', 0):bv.get('byteOffset', 0) + bv['byteLength']]
    while len(buf) % 4: buf.append(0)
    bv['byteOffset'] = len(buf); buf += chunk; acc['bufferView'] = len(newbv); newbv.append(bv); newacc.append(acc)
for m in gl['meshes']:
    for pr in m['primitives']:
        pr['attributes'] = {k: amap[v] for k, v in pr['attributes'].items()}; pr['indices'] = amap[pr['indices']]
while len(buf) % 4: buf.append(0)
gl['accessors'], gl['bufferViews'], gl['buffers'] = newacc, newbv, [{'byteLength': len(buf)}]
js = json.dumps(gl, separators=(',', ':')).encode(); js += b' ' * (-len(js) % 4)
open(path, 'wb').write(b'glTF' + struct.pack('<II', 2, 12 + 8 + len(js) + 8 + len(buf)) + struct.pack('<I', len(js)) + b'JSON' + js + struct.pack('<I', len(buf)) + b'BIN\0' + bytes(buf))
print('wrote models.glb', os.path.getsize(path) // 1024, 'KB')
