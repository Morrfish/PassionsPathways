"""Checkfire — toy blasters, attachments, gadgets, pickups, projectiles, ability props and arena interactables,
modelled from art handoff batches 1 + 2.

Run headless:  blender -b --python equipment.py -- <out_dir>
Writes equipment.glb + preview renders. Game units. Blasters: origin = top of the grip (where the hand holds),
muzzle toward +Y in Blender (= -Z in game). Each blaster W_<id> has child parts the game can swap:
  WS_<id> built-in stock (hidden when the Stock attachment is fitted), WM_<id> built-in magazine (hidden for Big Clip),
and socket empties S_<id>_muzzle / _scope / _clip / _stock. Shell materials are named Body_<id> / BodyDk_<id>
so finishes (Chrome / Gold / Diamond) can reskin them; accents keep their colours.
"""
import bpy, math, sys, os

OUT = sys.argv[sys.argv.index('--') + 1] if '--' in sys.argv else '.'
bpy.ops.wm.read_factory_settings(use_empty=True)
exec(open(os.path.join(os.path.dirname(os.path.abspath(__file__)), 'toykit.py')).read())
R = math.radians

def shade(h, k):
    r, g, b = (h >> 16) & 255, (h >> 8) & 255, h & 255
    return (int(r * k) << 16) | (int(g * k) << 8) | int(b * k)

ORANGE = mat('AccOrange', 0xf07a22, rough=0.4)
ORANGE_D = mat('AccOrangeDark', 0xd0631a, rough=0.4)
TEAL = mat('AccTeal', 0x1f9690, rough=0.4)
TEAL_D = mat('AccTealDark', 0x177470, rough=0.4)
CREAM = mat('AccCream', 0xf3e4c8, rough=0.5)
NAVY = mat('AccNavy', 0x26324f, rough=0.5)
WHITE = mat('AccWhite', 0xf7f4ee, rough=0.4)
LENS = mat('Lens', 0x3a74c8, metal=0.2, rough=0.05)
GLOW_O = mat('GlowOrange', 0xffa53a, emit=2.5)
GLOW_M = mat('GlowMagenta', 0xff4fd8, emit=3.0)
GLOW_T = mat('GlowTeal', 0x4fe3d6, emit=2.5)
STEEL = mat('Steel', 0xa9b0b8, metal=0.6, rough=0.3)
YELLOW = mat('AccYellow', 0xffc93c, rough=0.45)
GOLDTRIM = mat('AccGold', 0xffe08a, metal=0.4, rough=0.3)

WCOL = {'carbine': 0x2f6fe0, 'nailer': 0xf5c518, 'crossbow': 0x8e3fe0, 'scatter': 0xf57a17, 'coach': 0xe0262f,
        'raylance': 0x4cc3f0, 'arc': 0xf27fb6, 'mortar': 0x1fa587, 'minigun': 0x7a8a2c, 'storm': 0xf0278f,
        'twin': 0x2fd3cc, 'rail': 0x8b3fe0, 'crown': 0xf2b51c, 'handcannon': 0x26357a}

def socket(name, loc, parent):
    bpy.ops.object.empty_add(type='PLAIN_AXES', radius=0.02, location=loc)
    e = bpy.context.object
    e.name = name
    e.parent = parent
    return e

def child(obj, parent):
    obj.parent = parent
    obj.matrix_parent_inverse = parent.matrix_world.inverted()

def blaster(wid, build):
    """build(B, D) adds main-body parts and returns dict(stock=fn or None, mag=fn or None, sockets={...})."""
    B = mat('Body_' + wid, WCOL[wid], rough=0.38)
    Dk = mat('BodyDk_' + wid, shade(WCOL[wid], 0.78), rough=0.42)
    spec = build(B, Dk)
    root = finish('W_' + wid)
    if spec.get('stock'):
        spec['stock'](B, Dk); child(finish('WS_' + wid), root)
    if spec.get('mag'):
        spec['mag'](B, Dk); child(finish('WM_' + wid), root)
    for k, loc in spec['sockets'].items():
        socket('S_%s_%s' % (wid, k), loc, root)
    return root

# ---- shared blaster parts ---------------------------------------------------------------
# The reference sheets show one-colour moulded toys with a sculpted side profile, so most parts are "slabs":
# a side outline (y = along the blaster, z = up) pushed through to a thickness and rounded off.
BORE = mat('Bore', 0x161b26, rough=0.6)

def slab(pts, w, m, bevel=0.014, x=0.0, segs=2):
    """Side outline [(y, z), ...] given a thickness w across the blaster (centred on x)."""
    bm = bmesh.new()
    a = [bm.verts.new((x - w / 2, y, z)) for y, z in pts]
    b2 = [bm.verts.new((x + w / 2, y, z)) for y, z in pts]
    bm.faces.new(a)
    bm.faces.new(list(reversed(b2)))
    n = len(pts)
    for i in range(n):
        j = (i + 1) % n
        bm.faces.new((a[j], a[i], b2[i], b2[j]))
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _fin(_obj_from_bm(bm, 'slab'), m, min(bevel, w * 0.3), segs)

def ycyl(r, y0, y1, z, m, x=0.0, verts=20, r2=None, bevel=None):
    """Cylinder (or cone) lying along the blaster from y0 to y1."""
    return cyl(r, y1 - y0, (x, (y0 + y1) / 2, z), m, verts=verts, rot=(R(-90), 0, 0), r2=r2, bevel=bevel)

def muzzle(B, y, z, r, x=0.0, ring=None, length=0.05):
    """Chunky muzzle ring ending at y, with a dark opening."""
    ycyl(r, y - length, y, z, ring or B, x=x, bevel=min(0.012, r * 0.3))
    ycyl(r * 0.66, y - length * 0.5, y + 0.004, z, BORE, x=x, verts=16, bevel=0)

def grip(B, Dk=None, y=0.0, h=0.17, rake=0.045, w=0.058, x=0.0, d=0.068):
    """Raked pistol grip below the origin, with moulded grooves."""
    slab([(y - 0.04, 0.0), (y + d - 0.04, 0.0), (y + d - 0.04 - rake, -h), (y - 0.045 - rake, -h + 0.006)], w, B, bevel=0.018, x=x)
    for k in range(3):
        t = 0.3 + k * 0.2
        box((w + 0.006, d * 0.62, 0.012), (x, y - 0.006 - rake * t, -h * t), Dk or B, bevel=0.004)

def guard(B, Dk=None, y=0.06, x=0.0, drop=0.058, L=0.085):
    """Moulded trigger guard and trigger, in the blaster's own colour like the sheets."""
    tube([(x, y - 0.03, -0.004), (x, y - 0.01, -drop + 0.012), (x, y + 0.012, -drop), (x, y + L - 0.03, -drop),
          (x, y + L - 0.008, -drop + 0.02), (x, y + L - 0.004, -0.004)], 0.0095, B, sides=8)
    slab([(y + 0.012, -0.002), (y + 0.03, -0.002), (y + 0.022, -0.04), (y + 0.012, -0.036)], 0.016, Dk or B, bevel=0.004, x=x)

def frame_stock(B, y0, L=0.23, top=0.07, drop=0.1, w=0.058, z0=-0.005):
    """Solid toy stock with a triangular cut-out: top bar, butt plate and a lower bar sloping back down."""
    y1 = y0 - L
    slab([(y0 + 0.02, top), (y1, top - 0.012), (y1, top - 0.05), (y0 + 0.02, top - 0.04)], w, B)
    slab([(y1 + 0.004, top - 0.005), (y1 - 0.03, top - 0.02), (y1 - 0.034, -drop + 0.012), (y1 - 0.006, -drop), (y1 + 0.016, -drop + 0.02)], w + 0.006, B, bevel=0.016)
    slab([(y0 + 0.02, z0 + 0.03), (y0 + 0.02, z0), (y1 - 0.004, -drop + 0.004), (y1 + 0.004, -drop + 0.04)], w, B)

def slots(Dk, y, z, n=3, w=0.07, step=0.03, h=0.05, lean=24, t=0.013):
    """Slanted moulded slots ( /// ), showing on both sides."""
    for k in range(n):
        box((w, t, h), (0, y + k * step, z), Dk, bevel=0.004, rot=(R(-lean), 0, 0))

def carry_handle(B, y0, y1, z0, z1, w=0.046, t=0.028):
    slab([(y0 - 0.012, z0), (y0 + 0.012, z1), (y1 - 0.012, z1), (y1 + 0.012, z0), (y1 - t + 0.012, z0), (y1 - t - 0.008, z1 - t),
          (y0 + t + 0.008, z1 - t), (y0 + t - 0.012, z0)], w, B, bevel=0.011)

# ---- the 14 blasters --------------------------------------------------------------------
def carbine(B, Dk):
    slab([(-0.10, -0.005), (-0.10, 0.07), (-0.03, 0.086), (0.30, 0.086), (0.34, 0.07), (0.34, 0.0), (0.30, -0.026),
          (0.13, -0.026), (0.105, -0.005)], 0.074, B, bevel=0.018)                 # receiver + fore-end
    box((0.08, 0.2, 0.034), (0, 0.06, 0.045), B, bevel=0.012)                       # raised side panel
    for k in range(3):                                                              # three moulded ridges on the fore-end
        box((0.082, 0.016, 0.062), (0, 0.215 + k * 0.034, 0.03), Dk, bevel=0.006)
    carry_handle(B, -0.01, 0.21, 0.08, 0.15)
    ycyl(0.026, 0.33, 0.43, 0.034, B)                                               # barrel
    muzzle(B, 0.48, 0.034, 0.036)
    grip(B, Dk); guard(B, Dk)
    return dict(stock=lambda B, Dk: frame_stock(B, -0.10, L=0.21),
                mag=lambda B, Dk: box((0.05, 0.07, 0.06), (0, 0.17, -0.045), B, bevel=0.014),
                sockets=dict(muzzle=(0, 0.48, 0.034), scope=(0, 0.1, 0.15), clip=(0, 0.17, -0.025), stock=(0, -0.10, 0.0)))

def nailer(B, Dk):
    slab([(-0.10, 0.0), (-0.10, 0.085), (-0.07, 0.104), (0.19, 0.104), (0.215, 0.085), (0.215, -0.012), (0.04, -0.012), (0.03, 0.0)],
         0.088, B, bevel=0.022)                                                     # chunky body
    box((0.06, 0.17, 0.022), (0, 0.06, 0.108), B, bevel=0.009)                      # raised top strip
    box((0.094, 0.15, 0.03), (0, 0.06, 0.06), B, bevel=0.012)                       # side panel
    ycyl(0.038, 0.2, 0.26, 0.045, B)
    muzzle(B, 0.3, 0.045, 0.05)
    cyl(0.076, 0.094, (0, 0.13, -0.062), B, verts=24, rot=(0, R(90), 0), bevel=0.016)   # the drum
    for k in range(3):                                                              # ridges running round the drum, like the sheet
        cyl(0.08, 0.014, (-0.028 + k * 0.028, 0.13, -0.062), B, verts=24, rot=(0, R(90), 0), bevel=0.005)
    cyl(0.03, 0.104, (0, 0.13, -0.062), B, verts=14, rot=(0, R(90), 0), bevel=0.008)
    grip(B, Dk, y=-0.03, h=0.16); guard(B, Dk, y=0.02, L=0.07)
    return dict(sockets=dict(muzzle=(0, 0.3, 0.045), scope=(0, 0.06, 0.118), clip=(0, 0.13, -0.062), stock=(0, -0.10, 0.03)))

def crossbow(B, Dk):
    slab([(-0.12, -0.005), (-0.12, 0.065), (0.0, 0.072), (0.34, 0.072), (0.36, 0.055), (0.36, 0.0), (0.12, 0.0), (0.105, -0.005)],
         0.062, B, bevel=0.016)                                                     # tiller
    box((0.068, 0.2, 0.028), (0, 0.12, 0.036), B, bevel=0.01)                       # long side panel
    box((0.04, 0.16, 0.02), (0, 0.02, 0.078), B, bevel=0.008)                       # sight rail
    for s in (-1, 1):                                                               # bow arms sweeping back, ball tips
        tube([(0, 0.33, 0.04), (s * 0.1, 0.345, 0.04), (s * 0.2, 0.3, 0.04), (s * 0.265, 0.21, 0.04), (s * 0.285, 0.13, 0.04)],
             lambda t: 0.03 - 0.012 * t, B, sides=10)
        uvs(0.027, (s * 0.287, 0.125, 0.04), B)
    box((0.11, 0.07, 0.07), (0, 0.33, 0.04), B, bevel=0.02)                         # limb block
    tube([(-0.287, 0.125, 0.048), (0, 0.05, 0.082), (0.287, 0.125, 0.048)], 0.0045, WHITE, sides=6)   # white string
    uvs(0.02, (0, 0.05, 0.082), B)                                                  # nock
    ycyl(0.013, 0.05, 0.42, 0.082, WHITE, verts=10)                                 # dart shaft
    ycyl(0.022, 0.4, 0.44, 0.082, B, verts=14)
    ycyl(0.058, 0.44, 0.475, 0.082, B, verts=20, r2=0.02, bevel=0)                  # suction cup, in the bow's colour
    grip(B, Dk); guard(B, Dk)
    return dict(stock=lambda B, Dk: frame_stock(B, -0.12, L=0.2, top=0.064),
                sockets=dict(muzzle=(0, 0.46, 0.082), scope=(0, 0.02, 0.09), clip=(0, 0.16, -0.005), stock=(0, -0.12, 0.0)))

def scatter(B, Dk):
    slab([(-0.09, 0.0), (-0.09, 0.08), (-0.05, 0.1), (0.07, 0.1), (0.07, -0.012), (0.03, -0.012), (0.03, 0.0)], 0.092, B, bevel=0.02)   # rear body
    box((0.066, 0.13, 0.022), (0, -0.0, 0.104), B, bevel=0.009)                     # stepped top
    box((0.118, 0.26, 0.142), (0, 0.19, 0.042), B, bevel=0.036, segs=3)             # big rounded barrel shroud
    box((0.124, 0.17, 0.086), (0, 0.19, 0.042), B, bevel=0.022)                     # raised side panel
    slots(Dk, 0.155, 0.042, n=3, w=0.13, step=0.036, h=0.066, lean=26, t=0.016)     # the three slanted slots
    muzzle(B, 0.345, 0.042, 0.064, length=0.045)
    grip(B, Dk, h=0.16, w=0.062); guard(B, Dk)
    return dict(mag=lambda B, Dk: box((0.06, 0.06, 0.04), (0, 0.12, -0.04), B, bevel=0.012),
                sockets=dict(muzzle=(0, 0.345, 0.042), scope=(0, 0.02, 0.116), clip=(0, 0.12, -0.03), stock=(0, -0.09, 0.03)))

def coach(B, Dk):
    slab([(-0.08, -0.005), (-0.08, 0.07), (-0.02, 0.09), (0.1, 0.09), (0.1, -0.012), (0.03, -0.012), (0.03, -0.005)], 0.09, B, bevel=0.02)
    box((0.07, 0.12, 0.024), (0, 0.02, 0.095), B, bevel=0.01)                       # top hump
    box((0.168, 0.2, 0.118), (0, 0.19, 0.036), B, bevel=0.03, segs=3)               # chunky block around both openings
    box((0.174, 0.12, 0.07), (0, 0.17, 0.036), B, bevel=0.018)
    for x in (-0.042, 0.042):                                                       # twin openings, side by side, orange rings
        ycyl(0.04, 0.28, 0.32, 0.036, B, x=x)
        muzzle(B, 0.37, 0.036, 0.044, x=x, ring=ORANGE, length=0.055)
    grip(B, Dk, w=0.062); guard(B, Dk)
    return dict(stock=lambda B, Dk: frame_stock(B, -0.08, L=0.2, w=0.062),
                sockets=dict(muzzle=(0, 0.37, 0.036), scope=(0, 0.02, 0.108), clip=(0, 0.14, -0.022), stock=(0, -0.08, 0.0)))

def raylance(B, Dk):
    slab([(-0.10, -0.005), (-0.10, 0.06), (-0.02, 0.068), (0.2, 0.068), (0.26, 0.05), (0.26, 0.012), (0.2, -0.014), (0.12, -0.014), (0.105, -0.005)],
         0.06, B, bevel=0.015)                                                      # slim receiver
    slab([(0.0, 0.016), (0.02, 0.05), (0.17, 0.05), (0.21, 0.03), (0.19, 0.016)], 0.068, B, bevel=0.008)   # angular side panel
    slots(Dk, 0.05, 0.034, n=2, w=0.072, step=0.03, h=0.03, lean=30, t=0.01)
    ycyl(0.018, 0.25, 0.6, 0.034, B, verts=14)                                      # long thin barrel
    ycyl(0.024, 0.25, 0.31, 0.034, B, verts=14)
    ycyl(0.026, 0.59, 0.645, 0.034, B, verts=14, bevel=0.01)                        # bulb tip
    # oversized scope: small eyepiece, tube, big front lens
    ycyl(0.034, -0.1, -0.05, 0.15, B, verts=18)
    ycyl(0.03, -0.06, 0.06, 0.15, B, verts=18)
    ycyl(0.032, 0.05, 0.16, 0.15, B, verts=20, r2=0.062, bevel=0)
    ycyl(0.068, 0.15, 0.225, 0.15, B, verts=22, bevel=0.014)
    ycyl(0.054, 0.2, 0.231, 0.15, LENS, verts=22, bevel=0)
    for y in (-0.03, 0.07):
        slab([(y - 0.022, 0.066), (y - 0.014, 0.125), (y + 0.014, 0.125), (y + 0.022, 0.066)], 0.034, B, bevel=0.008)   # mounts
    grip(B, Dk); guard(B, Dk)
    def stock(B, Dk):
        slab([(-0.08, 0.06), (-0.3, 0.078), (-0.335, 0.06), (-0.335, -0.085), (-0.285, -0.09), (-0.215, -0.022), (-0.08, -0.005)], 0.058, B, bevel=0.016)
        slab([(-0.23, 0.045), (-0.305, 0.05), (-0.305, -0.045), (-0.275, -0.05)], 0.064, Dk, bevel=0.006)   # recessed panel
    return dict(stock=stock, mag=lambda B, Dk: box((0.04, 0.05, 0.05), (0, 0.16, -0.035), B, bevel=0.012),
                sockets=dict(muzzle=(0, 0.645, 0.034), scope=None, clip=(0, 0.16, -0.02), stock=(0, -0.10, 0.0)))

def pistol(B, Dk, x=0.0, w=0.062, L=0.22, top=0.092):
    """Angular toy pistol body shared by the Arc Pistol and the Twin Blasters."""
    slab([(-0.09, 0.0), (-0.1, 0.066), (-0.07, top), (L - 0.03, top), (L, top - 0.022), (L, 0.004), (L - 0.03, -0.018),
          (0.09, -0.018), (0.07, 0.0)], w, B, bevel=0.016, x=x)
    slab([(-0.04, 0.02), (-0.05, 0.062), (0.06, 0.062), (0.09, 0.04), (0.07, 0.02)], w + 0.007, B, bevel=0.007, x=x)   # layered panel

def arc(B, Dk):
    pistol(B, Dk)
    for k in range(3):                                                              # three slanted slots toward the back
        box((0.07, 0.011, 0.032), (0, 0.11 + k * 0.024, 0.062), Dk, bevel=0.004, rot=(R(-28), 0, 0))
    box((0.04, 0.16, 0.016), (0, 0.06, 0.096), B, bevel=0.006)
    muzzle(B, 0.245, 0.04, 0.034, length=0.04)
    grip(B, Dk, y=-0.02, h=0.15); guard(B, Dk, y=0.03, L=0.075)
    return dict(sockets=dict(muzzle=(0, 0.245, 0.04), scope=(0, 0.04, 0.104), clip=(0, 0.0, -0.1), stock=(0, -0.09, 0.03)))

def mortar(B, Dk):
    ycyl(0.09, -0.06, 0.34, 0.06, B, verts=28, bevel=0.012)                         # launch tube
    ycyl(0.098, -0.07, -0.02, 0.06, B, verts=28, bevel=0.012)                       # rear collar
    ycyl(0.097, 0.04, 0.1, 0.06, B, verts=28, bevel=0.01)                           # middle band
    ycyl(0.094, 0.335, 0.375, 0.06, GLOW_O, verts=28, bevel=0)                      # glowing orange band
    ycyl(0.108, 0.37, 0.455, 0.06, B, verts=28, bevel=0.016)                        # flared muzzle
    ycyl(0.082, 0.42, 0.46, 0.06, BORE, verts=24, bevel=0)
    carry_handle(B, 0.0, 0.26, 0.135, 0.225, w=0.05, t=0.03)
    slab([(-0.06, -0.012), (-0.06, 0.0), (0.2, 0.0), (0.2, -0.02), (0.16, -0.04), (0.12, -0.04), (0.1, -0.012)], 0.12, B, bevel=0.018)   # receiver under the tube
    slots(Dk, 0.14, 0.06, n=2, w=0.188, step=0.04, h=0.07, lean=26, t=0.016)
    for sx in (-1, 1):                                                              # triangle emblem on each side
        slab([(0.235, 0.03), (0.275, 0.03), (0.255, 0.068)], 0.012, Dk, bevel=0.003, x=sx * 0.09)
    grip(B, Dk, y=0.0, w=0.062); guard(B, Dk)
    def stock(B, Dk):
        slab([(-0.05, 0.0), (-0.05, 0.11), (-0.2, 0.11), (-0.2, 0.15), (-0.29, 0.15), (-0.31, 0.13), (-0.31, -0.05), (-0.25, -0.05), (-0.2, 0.0)], 0.1, B, bevel=0.022)
        box((0.108, 0.05, 0.1), (0, -0.25, 0.05), Dk, bevel=0.012)
    return dict(stock=stock,
                sockets=dict(muzzle=(0, 0.455, 0.06), scope=(0, 0.13, 0.235), clip=(0, 0.15, -0.045), stock=(0, -0.08, 0.04)))

def minigun(B, Dk):
    ycyl(0.086, -0.06, 0.22, 0.055, B, verts=28, bevel=0.016)                       # drum-shaped body
    for y in (-0.03, 0.07, 0.17):
        ycyl(0.093, y, y + 0.04, 0.055, B, verts=28, bevel=0.01)                    # bands
    slots(Dk, 0.02, 0.055, n=2, w=0.178, step=0.1, h=0.06, lean=26, t=0.016)
    ycyl(0.096, 0.2, 0.26, 0.055, B, verts=28, bevel=0.014)                         # barrel housing
    for i in range(6):                                                              # six orange barrels
        a = i / 6 * math.tau + math.pi / 6
        ycyl(0.026, 0.24, 0.42, 0.055 + math.sin(a) * 0.05, ORANGE, x=math.cos(a) * 0.05, verts=14, bevel=0.006)
        ycyl(0.015, 0.38, 0.424, 0.055 + math.sin(a) * 0.05, BORE, x=math.cos(a) * 0.05, verts=10, bevel=0)
    ycyl(0.026, 0.24, 0.41, 0.055, ORANGE, verts=14)                                # centre spindle
    carry_handle(B, -0.02, 0.2, 0.13, 0.225, w=0.05, t=0.03)
    slab([(-0.06, -0.012), (-0.06, 0.0), (0.18, 0.0), (0.18, -0.02), (0.14, -0.04), (0.12, -0.04), (0.1, -0.012)], 0.11, B, bevel=0.018)
    grip(B, Dk, w=0.062); guard(B, Dk)
    def stock(B, Dk):
        slab([(-0.05, 0.0), (-0.05, 0.1), (-0.19, 0.1), (-0.19, 0.14), (-0.27, 0.14), (-0.29, 0.12), (-0.29, -0.05), (-0.23, -0.05), (-0.18, 0.0)], 0.09, B, bevel=0.022)
        box((0.098, 0.045, 0.09), (0, -0.235, 0.045), Dk, bevel=0.012)
    return dict(stock=stock,
                sockets=dict(muzzle=(0, 0.424, 0.055), scope=(0, 0.09, 0.235), clip=(0, 0.14, -0.045), stock=(0, -0.08, 0.03)))

def long_rifle(B, Dk, L, w=0.064):
    """Sleek receiver flowing into a long squared barrel shroud (Storm Rifle and Railgun)."""
    slab([(-0.10, -0.005), (-0.10, 0.068), (-0.02, 0.084), (0.24, 0.084), (0.28, 0.066), (L, 0.066), (L, 0.004), (0.28, 0.004),
          (0.25, -0.022), (0.13, -0.022), (0.105, -0.005)], w, B, bevel=0.016)
    slab([(0.0, 0.016), (0.02, 0.058), (0.2, 0.058), (0.24, 0.034), (0.22, 0.016)], w + 0.007, B, bevel=0.007)      # angular side panel
    box((w + 0.006, L - 0.33, 0.014), (0, (L + 0.31) / 2, 0.035), Dk, bevel=0.004)                                 # groove along the shroud

def storm(B, Dk):
    long_rifle(B, Dk, 0.5)
    slab([(0.02, 0.082), (0.04, 0.112), (0.2, 0.112), (0.225, 0.082)], 0.04, B, bevel=0.009)        # top hump
    slots(Dk, 0.08, 0.036, n=2, w=0.074, step=0.03, h=0.028, lean=30, t=0.01)
    muzzle(B, 0.555, 0.035, 0.036, length=0.06)
    grip(B, Dk); guard(B, Dk)
    return dict(stock=lambda B, Dk: frame_stock(B, -0.10, L=0.24),
                mag=lambda B, Dk: box((0.046, 0.06, 0.07), (0, 0.19, -0.05), B, bevel=0.013),
                sockets=dict(muzzle=(0, 0.555, 0.035), scope=(0, 0.11, 0.118), clip=(0, 0.19, -0.022), stock=(0, -0.10, 0.0)))

def twin(B, Dk):
    for x in (-0.056, 0.056):                                                       # two matching pistols, side by side
        pistol(B, Dk, x=x, w=0.052, L=0.2, top=0.086)
        for k in range(3):
            box((0.06, 0.01, 0.028), (x, 0.1 + k * 0.022, 0.03), Dk, bevel=0.004, rot=(R(-28), 0, 0))
        box((0.034, 0.12, 0.014), (x, 0.04, 0.09), B, bevel=0.005)
        muzzle(B, 0.225, 0.036, 0.03, x=x, length=0.04)
        grip(B, Dk, y=-0.02, h=0.15, w=0.048, x=x)
        guard(B, Dk, y=0.03, x=x, L=0.07)
    return dict(sockets=dict(muzzle=(0, 0.225, 0.036), scope=(0, 0.04, 0.096), clip=(0, 0.06, -0.02), stock=(0, -0.08, 0.03)))

def rail(B, Dk):
    long_rifle(B, Dk, 0.58, w=0.066)
    for k in range(5):                                                              # row of slanted slots near the muzzle
        box((0.074, 0.011, 0.034), (0, 0.42 + k * 0.026, 0.035), Dk, bevel=0.004, rot=(R(-28), 0, 0))
    muzzle(B, 0.635, 0.035, 0.038, length=0.06)
    # built-in scope
    ycyl(0.03, -0.04, 0.16, 0.135, B, verts=18)
    ycyl(0.037, -0.07, -0.03, 0.135, B, verts=18, bevel=0.01)
    ycyl(0.04, 0.14, 0.2, 0.135, B, verts=18, bevel=0.01)
    ycyl(0.03, 0.18, 0.205, 0.135, LENS, verts=18, bevel=0)
    box((0.03, 0.05, 0.03), (0, 0.05, 0.172), B, bevel=0.01)                        # dial
    for y in (0.0, 0.11):
        slab([(y - 0.02, 0.08), (y - 0.013, 0.112), (y + 0.013, 0.112), (y + 0.02, 0.08)], 0.03, B, bevel=0.007)
    grip(B, Dk); guard(B, Dk)
    return dict(stock=lambda B, Dk: frame_stock(B, -0.10, L=0.25),
                mag=lambda B, Dk: box((0.046, 0.06, 0.06), (0, 0.19, -0.046), B, bevel=0.013),
                sockets=dict(muzzle=(0, 0.635, 0.035), scope=None, clip=(0, 0.19, -0.022), stock=(0, -0.10, 0.0)))

def crown(B, Dk):
    slab([(-0.09, 0.0), (-0.1, 0.07), (-0.085, 0.1), (-0.05, 0.1), (-0.04, 0.09), (0.19, 0.09), (0.2, 0.1), (0.225, 0.1), (0.235, 0.08),
          (0.235, 0.0), (0.2, -0.018), (0.09, -0.018), (0.07, 0.0)], 0.07, B, bevel=0.016)          # body with raised fins front and back
    slab([(-0.05, 0.018), (-0.06, 0.07), (0.14, 0.07), (0.17, 0.045), (0.15, 0.018)], 0.078, B, bevel=0.007)
    for sx in (-1, 1):                                                              # crown emblem on both sides
        slab([(0.0, 0.03), (0.09, 0.03), (0.1, 0.062), (0.074, 0.046), (0.045, 0.066), (0.016, 0.046), (-0.01, 0.062)], 0.012, GOLDTRIM, bevel=0.003, x=sx * 0.04)
    muzzle(B, 0.265, 0.042, 0.036, length=0.045)
    grip(B, Dk, y=-0.02, h=0.15); guard(B, Dk, y=0.03, L=0.075)
    return dict(sockets=dict(muzzle=(0, 0.265, 0.042), scope=(0, 0.07, 0.1), clip=(0, 0.0, -0.1), stock=(0, -0.09, 0.03)))

def handcannon(B, Dk):
    slab([(-0.1, 0.0), (-0.11, 0.06), (-0.08, 0.105), (-0.02, 0.105), (-0.02, -0.02), (-0.05, -0.02)], 0.07, B, bevel=0.014)   # back of the frame
    box((0.062, 0.18, 0.024), (0, 0.06, 0.097), B, bevel=0.009)                     # top strap over the drum
    box((0.05, 0.16, 0.022), (0, 0.06, -0.03), B, bevel=0.008)                      # lower rail under it
    ycyl(0.064, -0.02, 0.125, 0.033, B, verts=24, bevel=0.014)                      # big drum
    for i in range(6):                                                              # flutes round the drum
        a = i / 6 * math.tau
        box((0.03, 0.11, 0.02), (math.cos(a) * 0.06, 0.052, 0.033 + math.sin(a) * 0.06), Dk, bevel=0.007, rot=(0, -a, 0))
    slab([(0.125, -0.035), (0.125, 0.105), (0.17, 0.105), (0.2, 0.09), (0.2, -0.02), (0.17, -0.035)], 0.072, B, bevel=0.016)   # front of the frame
    ycyl(0.038, 0.19, 0.31, 0.062, B, verts=18)                                     # stubby barrel
    box((0.03, 0.14, 0.022), (0, 0.24, 0.103), B, bevel=0.008)                      # top rib
    box((0.04, 0.1, 0.03), (0, 0.24, 0.02), B, bevel=0.01)                          # under-barrel lug
    muzzle(B, 0.335, 0.062, 0.044, length=0.045)
    box((0.03, 0.03, 0.05), (0, -0.085, 0.118), B, bevel=0.01, rot=(R(-25), 0, 0))  # hammer spur
    grip(B, Dk, y=-0.05, h=0.165, rake=0.06, w=0.062, d=0.075); guard(B, Dk, y=0.0, L=0.07)
    return dict(sockets=dict(muzzle=(0, 0.335, 0.062), scope=(0, 0.06, 0.112), clip=(0, 0.05, -0.04), stock=(0, -0.11, 0.03)))

BUILDERS = dict(carbine=carbine, nailer=nailer, crossbow=crossbow, scatter=scatter, coach=coach, raylance=raylance, arc=arc,
                mortar=mortar, minigun=minigun, storm=storm, twin=twin, rail=rail, crown=crown, handcannon=handcannon)
for wid, fn in BUILDERS.items():
    def build(B, Dk, fn=fn):
        spec = fn(B, Dk)
        spec['sockets'] = {k: v for k, v in spec['sockets'].items() if v is not None}
        return spec
    blaster(wid, build)

# ---- attachments (teal + orange, batch 2) — built at the socket origin, pointing +Y --------------
def att_scope():
    cyl(0.03, 0.16, (0, 0, 0.05), TEAL, verts=18, rot=(R(90), 0, 0))
    for y in (-0.08, 0.08):
        cyl(0.04, 0.045, (0, y, 0.05), ORANGE, verts=18, rot=(R(90), 0, 0))
    cyl(0.032, 0.012, (0, 0.104, 0.05), LENS, verts=18, rot=(R(90), 0, 0), bevel=0)
    box((0.06, 0.06, 0.05), (0, 0, 0.05), TEAL)
    cyl(0.016, 0.03, (0, 0, 0.09), ORANGE, verts=12)
    cyl(0.016, 0.03, (0.04, 0, 0.05), ORANGE, verts=12, rot=(0, R(90), 0))
    box((0.05, 0.08, 0.03), (0, 0, 0.012), TEAL_D)                                  # mount
    for y in (-0.025, 0.025):
        cyl(0.008, 0.055, (0, y, 0.012), ORANGE, verts=8, rot=(0, R(90), 0))
    return finish('A_scope')

def att_stock():
    tube([(0, 0.0, 0.0), (0, -0.2, 0.02)], 0.022, TEAL, sides=10)
    tube([(0, 0.0, -0.035), (0, -0.2, -0.1)], 0.022, TEAL, sides=10)
    box((0.06, 0.06, 0.18), (0, -0.21, -0.035), ORANGE)
    for k in range(4):
        box((0.062, 0.012, 0.014), (0, -0.245, -0.09 + k * 0.035), ORANGE_D, bevel=0.004)
    cyl(0.03, 0.04, (0, 0.0, -0.015), ORANGE, verts=14, rot=(R(90), 0, 0))
    return finish('A_stock')

def att_clip():
    for k in range(3):
        box((0.05, 0.075, 0.06), (0, 0.004 + k * 0.012, -0.03 - k * 0.055), TEAL, rot=(R(-8 * k), 0, 0))
    for x in (-0.026, 0.026):
        box((0.004, 0.05, 0.13), (x, 0.015, -0.09), TEAL_D, bevel=0.002, rot=(R(-10), 0, 0))
    box((0.06, 0.09, 0.025), (0, 0.04, -0.185), ORANGE, rot=(R(-14), 0, 0))
    box((0.04, 0.05, 0.02), (0, 0.0, 0.008), ORANGE)
    return finish('A_clip')

def att_ring():
    torus(0.04, 0.012, (0, 0, 0), GLOW_M, rot=(R(90), 0, 0), seg=24)
    return finish('A_ring')

att_scope(); att_stock(); att_clip(); att_ring()

# ---- gadgets -------------------------------------------------------------------------------
def g_grapple():
    box((0.08, 0.26, 0.09), (0, 0.04, 0.03), TEAL)
    cyl(0.06, 0.09, (0, 0.08, 0.03), ORANGE, verts=18, rot=(0, R(90), 0))          # cord drum
    for k in range(5):
        torus(0.055, 0.008, (-0.03 + k * 0.015, 0.08, 0.03), TEAL_D, rot=(0, R(90), 0), seg=16, mseg=6)
    cyl(0.03, 0.06, (0, 0.2, 0.03), ORANGE, verts=14, rot=(R(90), 0, 0))
    grip(ORANGE, y=-0.04, h=0.15); guard(TEAL_D, y=0.0)
    return finish('G_grapple')

def g_claw():
    uvs(0.035, (0, 0, 0), TEAL)
    cyl(0.02, 0.06, (0, -0.04, 0), TEAL, verts=10, rot=(R(90), 0, 0))
    for i in range(3):
        a = i / 3 * math.tau
        tube([(0, 0, 0), (math.cos(a) * 0.07, 0.03, math.sin(a) * 0.07), (math.cos(a) * 0.08, -0.03, math.sin(a) * 0.08)],
             lambda t: 0.016 - 0.008 * t, ORANGE, sides=8)
    return finish('G_claw')

def g_jetpack():
    for x in (-0.13, 0.13):
        cyl(0.11, 0.42, (x, 0, 0.0), TEAL, verts=20)
        uvs(0.11, (x, 0, 0.21), ORANGE, scale=(1, 1, 0.6))
        cyl(0.1, 0.06, (x, 0, -0.22), ORANGE, verts=20)
        cyl(0.075, 0.07, (x, 0, -0.28), ORANGE_D, verts=16, r2=0.09)
        cyl(0.055, 0.075, (x, 0, -0.285), NAVY, verts=14, bevel=0)
    box((0.14, 0.12, 0.3), (0, 0.03, 0.0), TEAL_D)
    for k in range(3):
        box((0.1, 0.02, 0.025), (0, 0.095, 0.06 - k * 0.05), ORANGE)
    for x in (-0.12, 0.12):
        tube([(x, -0.08, 0.2), (x, -0.22, 0.28), (x, -0.3, 0.1), (x, -0.22, -0.12), (x, -0.08, -0.12)], 0.02, TEAL, sides=8, cap=False)
    return finish('G_jetpack')

def g_hat():
    import bmesh as _bm
    bpy.ops.mesh.primitive_uv_sphere_add(segments=36, ring_count=14, radius=0.2, location=(0, 0, 0))
    o = bpy.context.object
    bm = _bm.new(); bm.from_mesh(o.data)
    _bm.ops.delete(bm, geom=[v for v in bm.verts if v.co.z < -0.001], context='VERTS')
    bm.to_mesh(o.data); bm.free()
    o.scale = (1, 1, 0.82); bpy.ops.object.transform_apply(scale=True)
    o.data.materials.append(TEAL); o.data.materials.append(ORANGE)
    for f in o.data.polygons:                                                      # six alternating panels
        a = math.atan2(f.center.y, f.center.x) % math.tau
        f.material_index = int(a / (math.tau / 6)) % 2
        f.use_smooth = True
    PARTS.append(o)
    lathe([(0.2, 0.0), (0.205, -0.01), (0.0, -0.01)], TEAL_D, steps=24)
    box((0.26, 0.18, 0.02), (0, 0.24, -0.005), TEAL, bevel=0.008)                  # brim (front = +Y)
    cyl(0.025, 0.08, (0, 0, 0.2), TEAL, verts=12)
    finish('G_hat')
    uvs(0.035, (0, 0, 0), TEAL)
    for s in (-1, 1):
        box((0.2, 0.06, 0.012), (s * 0.11, 0, 0), ORANGE, bevel=0.01, rot=(R(s * 12), 0, 0))
    return finish('G_hat_prop')

g_grapple(); g_claw(); g_jetpack(); g_hat()

# ---- pickups, projectiles, ability props ----------------------------------------------------
GREEN = mat('CoreGreen', 0x5cd63a, rough=0.3)
GREEN_D = mat('CoreGreenDark', 0x3aa828, rough=0.3)
CROSS = mat('CoreCross', 0xffffff, rough=0.4, emit=1.2)
def p_core():
    # rounded diamond (octahedron) with a big white cross on every face
    import bmesh as _bm
    bm = _bm.new()
    pts = [(0.45, 0, 0), (-0.45, 0, 0), (0, 0.45, 0), (0, -0.45, 0), (0, 0, 0.5), (0, 0, -0.5)]
    vs = [bm.verts.new(p) for p in pts]
    for f in [(0, 2, 4), (2, 1, 4), (1, 3, 4), (3, 0, 4), (2, 0, 5), (1, 2, 5), (3, 1, 5), (0, 3, 5)]:
        bm.faces.new([vs[i] for i in f])
    _bm.ops.recalc_face_normals(bm, faces=bm.faces)
    o = _obj_from_bm(bm, 'core')
    _fin(o, GREEN, bevel=0.06, segs=3)
    for a in range(4):
        ang = a * math.pi / 2 + math.pi / 4
        # each cross lies on its face: centred on the face's middle and nudged just clear of the surface
        r, zc = 0.2121 + 0.014, 0.1667 + 0.009
        for up in (1, -1):
            c = (math.cos(ang) * r, math.sin(ang) * r, up * zc)
            for (w, h) in ((0.25, 0.08), (0.08, 0.25)):
                box((w, 0.03, h), c, CROSS, bevel=0.01, rot=(R(-33 * up), 0, ang + math.pi / 2))
    torus(0.34, 0.025, (0, 0, 0), GREEN_D, seg=4, mseg=6)
    return finish('P_core')

DART = mat('DartBody', 0x3a86ff, rough=0.85)
def p_dart():
    cyl(0.05, 0.3, (0, -0.02, 0), DART, verts=14, rot=(R(90), 0, 0))
    o = lathe([(0.0, 0.0), (0.03, 0.0), (0.035, 0.02), (0.07, 0.06), (0.068, 0.07), (0.0, 0.06)], ORANGE, loc=(0, 0, 0), steps=16)
    o.rotation_euler = (R(-90), 0, 0); o.location = (0, 0.13, 0)
    return finish('P_dart')

def p_rocket():
    cyl(0.12, 0.34, (0, 0, 0), TEAL, verts=20, rot=(R(90), 0, 0))
    o = lathe([(0.0, 0.0), (0.12, 0.0), (0.11, 0.08), (0.06, 0.18), (0.0, 0.21)], ORANGE, steps=20); o.rotation_euler = (R(-90), 0, 0); o.location = (0, 0.17, 0)
    for i in range(3):
        a = i / 3 * math.tau
        box((0.015, 0.14, 0.12), (math.cos(a) * 0.15, -0.14, math.sin(a) * 0.15), ORANGE, bevel=0.006, rot=(0, -a + math.pi / 2, 0))
    cyl(0.1, 0.05, (0, -0.19, 0), NAVY, verts=16, rot=(R(90), 0, 0))
    return finish('P_rocket')

BLUE = mat('ToyBlueWall', 0x2f6fe0, rough=0.4)
RED = mat('ToyRedFoot', 0xe0262f, rough=0.4)
def x_rampart():
    box((4.0, 0.6, 1.8), (0, 0, 1.1), BLUE)
    for k in range(5):
        box((0.5, 0.62, 0.3), (-1.6 + k * 0.8, 0, 2.15), BLUE)
    for x in (-1.9, 1.9):
        box((0.7, 0.8, 0.5), (x, 0, 2.15), YELLOW)
        box((0.8, 0.9, 0.3), (x, 0, 0.15), RED)
    for k in range(4):
        box((0.12, 0.64, 1.0), (-1.2 + k * 0.8, 0, 1.1), mat('ToyBlueWallDk', 0x2559b8, rough=0.4), bevel=0.04, rot=(0, R(35), 0))
    return finish('X_rampart')

p_core(); p_dart(); p_rocket(); x_rampart()

# ---- arena interactables (game sizes) ---------------------------------------------------------
def i_jumppad():
    cyl(1.25, 0.22, (0, 0, 0.11), CREAM, verts=32)
    for i in range(8):
        a = i / 8 * math.tau
        box((0.5, 0.36, 0.26), (math.cos(a) * 1.12, math.sin(a) * 1.12, 0.12), NAVY, rot=(0, 0, a + math.pi / 2))
        uvs(0.05, (math.cos(a + 0.4) * 1.18, math.sin(a + 0.4) * 1.18, 0.24), STEEL)
    cyl(0.95, 0.05, (0, 0, 0.23), GLOW_T, verts=32, bevel=0)
    for k in range(2):
        for s in (-1, 1):
            box((0.42, 0.11, 0.03), (s * 0.15, -0.15 + k * 0.32, 0.27), WHITE, bevel=0.03, rot=(0, 0, R(-s * 40)))
    box((0.5, 0.2, 0.14), (0, -1.26, 0.1), ORANGE)
    return finish('I_jumppad')

def i_spring():
    box((1.8, 1.8, 1.2), (0, 0, 0.6), RED, bevel=0.12)
    for (x, y, r) in ((0, -0.91, (R(90), 0, 0)), (0.91, 0, (R(90), 0, R(90)))):
        star(0.42, 0.04, (x, y, 0.62), YELLOW, rot=r)
    for x in (-0.82, 0.82):
        for y in (-0.82, 0.82):
            uvs(0.06, (x, y, 1.15), GOLDTRIM)
    box((1.8, 0.14, 1.4), (0, 0.95, 1.85), RED, bevel=0.08, rot=(R(-25), 0, 0))   # open lid
    pts = [(math.cos(t * 0.9) * 0.4, math.sin(t * 0.9) * 0.4, 1.2 + t * 0.075) for t in range(15)]
    tube(pts, 0.07, STEEL, sides=10)
    uvs(0.42, (0, 0, 2.6), YELLOW)
    return finish('I_spring')

def i_tramp():
    bpy.ops.mesh.primitive_torus_add(major_radius=1.38, minor_radius=0.16, major_segments=24, minor_segments=10, location=(0, 0, 0.5))
    _fin(bpy.context.object, mat('TrampBlue', 0x2f6fe0, rough=0.45), angle=60)
    for i in range(12):
        a = i / 12 * math.tau
        box((0.06, 0.36, 0.34), (math.cos(a) * 1.38, math.sin(a) * 1.38, 0.5), mat('TrampBlueDk', 0x2559b8, rough=0.45), bevel=0.02, rot=(0, 0, a))
    cyl(1.25, 0.03, (0, 0, 0.48), DARKMAT, verts=32, bevel=0)
    for i in range(4):
        a = i / 4 * math.tau + math.pi / 4
        cyl(0.13, 0.42, (math.cos(a) * 1.15, math.sin(a) * 1.15, 0.24), CREAM, verts=12)
        cyl(0.17, 0.08, (math.cos(a) * 1.15, math.sin(a) * 1.15, 0.04), NAVY, verts=12)
    return finish('I_tramp')

DARKMAT = mat('TrampMat', 0x23252b, rough=0.85)
def i_bumper():
    cyl(1.1, 0.16, (0, 0, 0.08), NAVY, verts=24)
    for i in range(8):
        a = i / 8 * math.tau
        uvs(0.06, (math.cos(a) * 0.95, math.sin(a) * 0.95, 0.17), CREAM)
    cyl(0.32, 0.55, (0, 0, 0.42), mat('BumperStripe', 0xe0482a, rough=0.4), verts=18)
    for k in range(3):
        torus(0.33, 0.04, (0, 0, 0.25 + k * 0.17), CREAM, seg=18, mseg=6)
    cyl(1.0, 0.18, (0, 0, 0.78), GLOW_O, verts=24, bevel=0)
    cyl(1.08, 0.22, (0, 0, 0.98), CREAM, verts=24)
    for i in range(8):
        a = i / 8 * math.tau + 0.2
        uvs(0.06, (math.cos(a) * 1.05, math.sin(a) * 1.05, 0.98), NAVY)
    cyl(0.6, 0.08, (0, 0, 1.12), ORANGE, verts=24)
    star(0.42, 0.05, (0, 0, 1.17), CREAM)
    return finish('I_bumper')

def i_coffee():
    o = lathe([(0.0, 0.0), (0.55, 0.0), (0.58, 0.05), (0.58, 1.1), (0.5, 1.1), (0.5, 0.1), (0.0, 0.1)], CREAM, steps=24); o.rotation_euler = (R(90), 0, R(20)); o.location = (-0.6, 0.0, 0.6)
    tube([(-0.6 + 0.5, 0.0, 1.05), (-0.6 + 0.85, 0.0, 1.0), (-0.6 + 0.85, 0.0, 0.55), (-0.6 + 0.5, 0.0, 0.45)], 0.07, CREAM, sides=10)
    return finish('I_coffee')

def i_cactus():
    CACT = mat('Cactus', 0x3f9a3a, rough=0.6); CACT_D = mat('CactusDk', 0x2f7d2c, rough=0.6)
    SAND = mat('Sand', 0xe2c48a, rough=1.0)
    cyl(2.2, 0.12, (0, 0, 0.06), SAND, verts=20, r2=2.0)
    capsule(0.32, (0, 0, 0.2), (0, 0, 1.8), CACT)
    capsule(0.18, (0.32, 0, 0.9), (0.62, 0, 1.0), CACT); capsule(0.18, (0.62, 0, 1.0), (0.62, 0, 1.5), CACT)
    capsule(0.16, (-0.3, 0, 1.1), (-0.58, 0, 1.15), CACT); capsule(0.16, (-0.58, 0, 1.15), (-0.58, 0, 1.45), CACT)
    uvs(0.4, (1.2, 0.7, 0.4), CACT_D, scale=(1, 1, 0.9)); uvs(0.3, (-1.1, -0.6, 0.32), CACT, scale=(1, 1, 0.9))
    for (x, y, z) in ((0, 0, 1.95), (0.62, 0, 1.62), (1.2, 0.7, 0.78)):
        for i in range(5):
            a = i / 5 * math.tau
            uvs(0.08, (x + math.cos(a) * 0.08, y + math.sin(a) * 0.08, z), ORANGE, seg=8, rings=6, scale=(1.2, 0.8, 0.4))
    for (x, y) in ((-1.5, 0.8), (1.6, -0.9), (0.6, -1.3)):
        uvs(0.14, (x, y, 0.14), mat('Pebble', 0xb9b2a6, rough=0.9), seg=8, rings=6, scale=(1, 0.8, 0.6))
    return finish('I_cactus')

def i_lavaframe():
    # 3-wide strip segment frame (6 long): cream/navy blocks around the lava channel
    for k in range(6):
        for s in (-1, 1):
            box((1.0, 0.3, 0.3), (-2.5 + k, s * 1.65, 0.15), CREAM if k % 2 else NAVY)
    return finish('I_lavaframe')

i_jumppad(); i_spring(); i_tramp(); i_bumper(); i_coffee(); i_cactus(); i_lavaframe()

# ---- export ----------------------------------------------------------------------------------

# ---- the King's melee weapons ---------------------------------------------------------------
# Pivot = the middle of the grip; the weapon points up (+Z). About 1.2 long, like the stand-in shapes they replace.
# 'MeleeGlow' / 'MeleeHalo' are recoloured in the game to the King's team colour.
BLADE = mat('MeleeBlade', 0xe3e9ef, metal=0.35, rough=0.28)
BLADE_D = mat('MeleeBladeDark', 0xb9c2cc, metal=0.35, rough=0.3)
M_GLOW = mat('MeleeGlow', 0x4fe3d6, emit=3.0)
M_HALO = mat('MeleeHalo', 0x4fe3d6, alpha=0.26, emit=1.4)
M_SPARK = mat('MeleeSpark', 0xfff07a, emit=3.2)
HEADM = mat('MeleeHammer', 0x8d97a8, metal=0.4, rough=0.35)
HEADM_D = mat('MeleeHammerDark', 0x6b7486, metal=0.4, rough=0.38)

def wrapped_grip(z0, z1, r=0.036, m=NAVY, band=GOLDTRIM, n=5):
    cyl(r, z1 - z0, (0, 0, (z0 + z1) / 2), m, verts=14, bevel=0.008)
    for k in range(n):
        torus(r + 0.004, 0.009, (0, 0, z0 + (k + 0.5) * (z1 - z0) / n), band, seg=14, mseg=6)

def m_sword():
    wrapped_grip(-0.12, 0.12)
    uvs(0.06, (0, 0, -0.165), GOLDTRIM, seg=12, rings=8)                              # pommel
    cyl(0.03, 0.03, (0, 0, -0.12), GOLDTRIM, verts=12)
    box((0.34, 0.075, 0.07), (0, 0, 0.155), GOLDTRIM, bevel=0.022)                    # crossguard
    for sx in (-1, 1):
        box((0.075, 0.09, 0.11), (sx * 0.17, 0, 0.165), GOLDTRIM, bevel=0.03)        # flared ends
    uvs(0.034, (0, -0.04, 0.155), TEAL, seg=10, rings=8, scale=(1, 0.6, 1))            # gems front and back
    uvs(0.034, (0, 0.04, 0.155), TEAL, seg=10, rings=8, scale=(1, 0.6, 1))
    box((0.15, 0.05, 0.78), (0, 0, 0.58), BLADE, bevel=0.018)                          # chunky foam blade
    box((0.05, 0.058, 0.6), (0, 0, 0.52), BLADE_D, bevel=0.008)                        # fuller
    cyl(0.104, 0.17, (0, 0, 1.052), BLADE, verts=4, r2=0.014, rot=(0, 0, R(45)))       # tip: a flattened point
    bpy.ops.object.transform_apply(rotation=True)
    bpy.context.object.scale = (1, 0.34, 1)
    bpy.ops.object.transform_apply(scale=True)
    return finish('M_sword')

def m_glowblade():
    cyl(0.042, 0.3, (0, 0, 0.0), STEEL, verts=16, bevel=0.01)                          # hilt
    for z in (-0.1, -0.05, 0.0, 0.05):
        torus(0.044, 0.008, (0, 0, z), NAVY, seg=16, mseg=6)                           # grip ribs
    cyl(0.05, 0.03, (0, 0, -0.16), NAVY, verts=16, bevel=0.008)                        # pommel cap
    cyl(0.052, 0.05, (0, 0, 0.13), GOLDTRIM, verts=16, bevel=0.01)                     # collar
    cyl(0.06, 0.03, (0, 0, 0.17), NAVY, verts=16, bevel=0.008, r2=0.046)               # emitter
    box((0.03, 0.02, 0.05), (0, -0.045, 0.06), ORANGE, bevel=0.006)                    # button
    cyl(0.012, 0.02, (0, -0.045, -0.02), GLOW_O, verts=8, rot=(R(90), 0, 0))           # light
    lathe([(0, 0.18), (0.034, 0.18), (0.036, 1.1), (0.028, 1.17), (0, 1.2)], M_GLOW, steps=14, angle=80)
    lathe([(0, 0.19), (0.062, 0.2), (0.066, 1.1), (0.05, 1.21), (0, 1.25)], M_HALO, steps=14, angle=80)
    return finish('M_glowblade')

def m_hammer():
    wrapped_grip(-0.12, 0.2, r=0.034, n=6)
    cyl(0.034, 0.56, (0, 0, 0.48), NAVY, verts=14, bevel=0.006)                        # shaft
    for z in (0.26, 0.7):
        cyl(0.042, 0.035, (0, 0, z), GOLDTRIM, verts=14, bevel=0.008)
    torus(0.04, 0.012, (0, 0, -0.16), GOLDTRIM, rot=(R(90), 0, 0), seg=14, mseg=6)     # wrist loop
    box((0.46, 0.27, 0.27), (0, 0, 0.9), HEADM, bevel=0.045, segs=3)                   # head
    for sx in (-1, 1):
        box((0.05, 0.3, 0.3), (sx * 0.2, 0, 0.9), GOLDTRIM, bevel=0.014)               # bands
        box((0.035, 0.2, 0.2), (sx * 0.24, 0, 0.9), HEADM_D, bevel=0.03)               # striking faces
    for sy in (-1, 1):                                                               # lightning bolt on both sides
        y = sy * 0.139
        for (x, z, w, h, a) in ((0.03, 0.965, 0.045, 0.1, 28), (0.0, 0.9, 0.11, 0.04, 0), (-0.03, 0.835, 0.045, 0.1, 28)):
            box((w, 0.014, h), (x, y, z), M_SPARK, bevel=0.004, rot=(0, R(a), 0), segs=1)
    cyl(0.03, 0.05, (0, 0, 1.055), GOLDTRIM, verts=12)                                 # spark post
    ico(0.062, (0, 0, 1.12), M_SPARK, sub=1)
    return finish('M_hammer')

m_sword(); m_glowblade(); m_hammer()

bpy.ops.object.select_all(action='SELECT')
bpy.ops.export_scene.gltf(filepath=os.path.join(OUT, 'equipment.glb'), export_format='GLB', use_selection=True,
                          export_apply=True, export_yup=True)

# ---- previews ---------------------------------------------------------------------------------
from mathutils import Matrix, Vector
hide_sources()
def inst(name, loc, rz=0.0, s=1.0, skip=(), recolor=None):
    src = bpy.data.objects[name]
    o = place(name, loc, rz, s, recolor=recolor)
    bpy.context.view_layer.update()
    for ch in src.children:
        if ch.type == 'MESH' and not any(ch.name.startswith(k) for k in skip):
            c = place(ch.name, (0, 0, 0), recolor=recolor)
            c.parent = None
            c.matrix_world = o.matrix_world @ (src.matrix_world.inverted() @ ch.matrix_world)
    return o
def sock(wid, k):
    return bpy.data.objects['S_%s_%s' % (wid, k)].matrix_world.translation
def ortho(loc, aim, scale):
    cam, a = camera_at(loc, aim)
    cam.data.type = 'ORTHO'; cam.data.ortho_scale = scale
    return cam, a
sun(rot=(60, 0, 20), energy=3.0)
order = list(BUILDERS)
for i, wid in enumerate(order):
    col, row = i % 2, i // 2
    inst('W_' + wid, (col * 1.25, 0, -row * 0.36), rz=R(-90))
preview_setup(OUT, 'equip_blasters.png', res=(1500, 1500), samples=48)
cam, aim = ortho((0.7, -6, -1.03), (0.7, 0, -1.03), 2.75)
render()
# attachments fitted on the Carbine + finishes + power sleeves
hide_sources()
def carbine_at(x, z, skip=(), finish=None):
    rec = None
    if finish:
        rec = {'Body_carbine': finish[0], 'BodyDk_carbine': finish[1]}
    o = inst('W_carbine', (x, 0, z), rz=R(-90), skip=skip, recolor=rec)
    return o
def fit(att, x, z, k):
    off = sock('carbine', k)
    place(att, (x + off.y, 0, z + off.z), R(-90))
carbine_at(0, 0, skip=()); fit('A_scope', 0, 0, 'scope')
carbine_at(1.1, 0, skip=('WS_',)); fit('A_stock', 1.1, 0, 'stock')
carbine_at(2.2, 0, skip=('WM_',)); fit('A_clip', 2.2, 0, 'clip')
CH = (mat('Chrome', 0xd9e1ea, metal=0.9, rough=0.12), mat('ChromeDk', 0xa9b2bd, metal=0.9, rough=0.15))
GO = (mat('GoldF', 0xffc23d, metal=0.85, rough=0.18), mat('GoldFDk', 0xd99a1e, metal=0.85, rough=0.2))
DI = (mat('Diamond', 0xd8e6ff, metal=0.1, rough=0.02, alpha=0.8, emit=0.15), mat('DiamondDk', 0xc6b8ff, metal=0.1, rough=0.02, alpha=0.8, emit=0.15))
for i, f in enumerate((None, CH, GO, DI)):
    carbine_at(i * 0.85 - 0.1, -0.45, finish=f)
for lv in range(1, 4):
    x = (lv - 1) * 1.1
    carbine_at(x, -0.9)
    m = sock('carbine', 'muzzle')
    for k in range(lv):
        place('A_ring', (x + (m.y - 0.05 - k * 0.035), 0, -0.9 + m.z), R(-90))
preview_setup(OUT, 'equip_attachments.png', res=(1500, 900), samples=48)
cam.data.ortho_scale = 3.4; cam.location = (1.15, -6, -0.45); aim.location = (1.15, 0, -0.45)
render()
# gadgets, pickups, projectiles (front row) and interactables (back row)
hide_sources()
for i, (n, sc) in enumerate((('G_grapple', 2.2), ('G_claw', 2.2), ('G_jetpack', 1.1), ('G_hat', 1.3), ('P_core', 0.8), ('P_dart', 2.2), ('P_rocket', 1.5))):
    o = place(n, (i * 0.95, 0, 0.0), R(-60), sc)
    if n == 'G_hat':
        place('G_hat_prop', (i * 0.95, 0, 0.24 * sc), 0.4, sc)
preview_setup(OUT, 'equip_gadgets.png', res=(1600, 500), samples=48)
cam.data.type = 'ORTHO'; cam.data.ortho_scale = 7.2; cam.location = (2.85, -8, 0.4); aim.location = (2.85, 0, 0.05)
render()
hide_sources()
for i, n in enumerate(('I_jumppad', 'I_spring', 'I_tramp', 'I_bumper', 'I_coffee', 'I_cactus', 'X_rampart')):
    place(n, (i * 5.0, 0, 0), R(-25))
bpy.ops.mesh.primitive_plane_add(size=120, location=(15, 0, 0))
bpy.context.object.data.materials.append(mat('Floor', 0xf3e6cf, rough=0.9))
preview_setup(OUT, 'equip_interactables.png', res=(1800, 520), samples=48)
cam.data.type = 'ORTHO'; cam.data.ortho_scale = 36; cam.location = (15, -30, 9); aim.location = (15, 0, 1.0)
render()
hide_sources()
for i, n in enumerate(('M_sword', 'M_glowblade', 'M_hammer')):
    place(n, (i * 0.75, 0, 0), R(25))
    place(n, (i * 0.75 + 2.6, 0, 0), R(110))
preview_setup(OUT, 'equip_melee.png', res=(1500, 760), samples=48)
cam.data.type = 'ORTHO'; cam.data.ortho_scale = 4.9; cam.location = (2.05, -8, 0.9); aim.location = (2.05, 0, 0.52)
render()
print('EQUIP DONE')
