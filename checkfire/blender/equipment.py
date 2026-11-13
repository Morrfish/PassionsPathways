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
def grip(B, y=0.0, h=0.17, ang=-14, w=0.055):
    box((w, 0.07, h), (0, y - 0.02, -h / 2 + 0.01), B, rot=(R(ang), 0, 0))
    for k in range(3):
        box((w + 0.006, 0.012, 0.012), (0, y - 0.045, -0.04 - k * 0.04), B, bevel=0.004, rot=(R(ang), 0, 0))

def guard(Dk, y=0.06, r=0.035):
    tube([(0, y - 0.02, -0.005), (0, y + 0.03, -0.05), (0, y + 0.08, -0.03), (0, y + 0.085, -0.005)], 0.008, Dk, sides=8)
    box((0.012, 0.012, 0.035), (0, y + 0.03, -0.02), ORANGE, bevel=0.004)          # trigger

def skeleton_stock(B, y0, L=0.22, h=0.13, w=0.05):
    """Open triangular toy stock behind y0 (pointing -Y)."""
    tube([(0, y0 + 0.05, 0.03), (0, y0 - L, 0.04)], 0.018, B, sides=10)
    tube([(0, y0 + 0.05, -0.03), (0, y0 - L, -0.07)], 0.018, B, sides=10)
    box((w, 0.06, 0.09), (0, y0 + 0.02, 0.0), B)                                     # mount block
    box((w, 0.045, h + 0.03), (0, y0 - L, -0.015), B)                                # butt plate

def ridges(Dk, y, z, n=3, w=0.062, step=0.03):
    for k in range(n):
        box((w, 0.012, 0.03), (0, y + k * step, z), Dk, bevel=0.004, rot=(R(-20), 0, 0))

def muzzle_tip(m, y, r, length=0.04):
    cyl(r, length, (0, y, 0.02), m, verts=20, rot=(R(90), 0, 0))
    cyl(r * 0.6, length + 0.01, (0, y + 0.003, 0.02), NAVY, verts=16, rot=(R(90), 0, 0), bevel=0)

# ---- the 14 blasters --------------------------------------------------------------------
def carbine(B, Dk):
    box((0.07, 0.42, 0.085), (0, 0.12, 0.03), B)                                    # receiver
    box((0.072, 0.18, 0.06), (0, 0.24, 0.01), Dk)                                   # fore-grip with ridges
    ridges(B, 0.19, 0.012, 3)
    cyl(0.026, 0.12, (0, 0.38, 0.03), B, verts=16, rot=(R(90), 0, 0))              # barrel
    muzzle_tip(B, 0.45, 0.03)
    tube([(0, -0.02, 0.075), (0, -0.02, 0.12), (0, 0.16, 0.12), (0, 0.16, 0.075)], 0.014, B, sides=8)   # carry handle
    grip(B); guard(Dk)
    return dict(stock=lambda B, Dk: skeleton_stock(B, -0.08),
                mag=lambda B, Dk: box((0.05, 0.07, 0.08), (0, 0.1, -0.04), Dk),
                sockets=dict(muzzle=(0, 0.48, 0.03), scope=(0, 0.06, 0.13), clip=(0, 0.1, -0.02), stock=(0, -0.08, 0.0)))

def nailer(B, Dk):
    box((0.08, 0.3, 0.1), (0, 0.06, 0.035), B)
    box((0.082, 0.14, 0.03), (0, 0.06, 0.09), Dk)
    cyl(0.034, 0.06, (0, 0.24, 0.035), B, verts=16, rot=(R(90), 0, 0))
    muzzle_tip(B, 0.28, 0.036)
    cyl(0.07, 0.08, (0, 0.12, -0.05), B, verts=20, rot=(0, R(90), 0))             # drum
    for k in range(3):
        cyl(0.073, 0.012, (-0.025 + k * 0.025, 0.12, -0.05), Dk, verts=20, rot=(0, R(90), 0), bevel=0)
    grip(B, y=-0.03, h=0.16); guard(Dk, y=0.03)
    return dict(sockets=dict(muzzle=(0, 0.3, 0.035), scope=(0, 0.06, 0.1), clip=(0, 0.12, -0.05), stock=(0, -0.09, 0.02)))

def crossbow(B, Dk):
    box((0.06, 0.48, 0.06), (0, 0.12, 0.03), B)                                     # tiller
    box((0.062, 0.12, 0.03), (0, 0.04, 0.07), Dk)
    for s in (-1, 1):                                                               # curved bow arms
        tube([(0, 0.3, 0.035), (s * 0.12, 0.33, 0.04), (s * 0.22, 0.27, 0.04), (s * 0.27, 0.18, 0.04)], lambda t: 0.024 - 0.01 * t, B, sides=10)
        uvs(0.02, (s * 0.27, 0.18, 0.04), Dk)
    tube([(-0.27, 0.18, 0.045), (0, 0.06, 0.05), (0.27, 0.18, 0.045)], 0.004, WHITE, sides=6)   # string
    cyl(0.012, 0.36, (0, 0.24, 0.07), WHITE, verts=8, rot=(R(90), 0, 0))           # loaded dart
    cyl(0.045, 0.03, (0, 0.43, 0.07), ORANGE, verts=16, rot=(R(90), 0, 0), r2=0.02)  # suction cup
    grip(B); guard(Dk)
    return dict(stock=lambda B, Dk: skeleton_stock(B, -0.12, L=0.2),
                sockets=dict(muzzle=(0, 0.46, 0.07), scope=(0, 0.02, 0.1), clip=(0, 0.12, -0.01), stock=(0, -0.12, 0.0)))

def scatter(B, Dk):
    box((0.1, 0.32, 0.11), (0, 0.1, 0.04), B)
    box((0.11, 0.16, 0.09), (0, 0.2, 0.035), Dk)                                    # pump grip
    for k in range(3):
        box((0.112, 0.02, 0.06), (0, 0.16 + k * 0.035, 0.035), B, bevel=0.006, rot=(R(-25), 0, 0))
    cyl(0.055, 0.05, (0, 0.28, 0.04), B, verts=20, rot=(R(90), 0, 0))
    muzzle_tip(B, 0.31, 0.055)
    grip(B, h=0.16, w=0.06); guard(Dk)
    return dict(mag=lambda B, Dk: box((0.06, 0.06, 0.05), (0, 0.06, -0.03), Dk),
                sockets=dict(muzzle=(0, 0.33, 0.04), scope=(0, 0.06, 0.1), clip=(0, 0.06, -0.02), stock=(0, -0.07, 0.02)))

def coach(B, Dk):
    box((0.15, 0.3, 0.1), (0, 0.1, 0.035), B)
    box((0.155, 0.12, 0.05), (0, 0.05, 0.085), Dk)
    for x in (-0.038, 0.038):                                                       # twin openings, side by side
        cyl(0.036, 0.1, (x, 0.28, 0.03), B, verts=18, rot=(R(90), 0, 0))
        cyl(0.04, 0.04, (x, 0.34, 0.03), ORANGE, verts=18, rot=(R(90), 0, 0))
        cyl(0.025, 0.045, (x, 0.342, 0.03), NAVY, verts=14, rot=(R(90), 0, 0), bevel=0)
    grip(B, w=0.06); guard(Dk)
    return dict(stock=lambda B, Dk: skeleton_stock(B, -0.06, L=0.2, w=0.06),
                sockets=dict(muzzle=(0, 0.36, 0.03), scope=(0, 0.06, 0.1), clip=(0, 0.08, -0.02), stock=(0, -0.06, 0.0)))

def raylance(B, Dk):
    box((0.06, 0.34, 0.07), (0, 0.06, 0.025), B)
    cyl(0.017, 0.4, (0, 0.42, 0.03), B, verts=12, rot=(R(90), 0, 0))              # long thin barrel
    cyl(0.024, 0.04, (0, 0.62, 0.03), B, verts=14, rot=(R(90), 0, 0))
    cyl(0.04, 0.2, (0, 0.08, 0.14), B, verts=20, rot=(R(90), 0, 0))               # oversized scope
    cyl(0.055, 0.05, (0, 0.2, 0.14), B, verts=20, rot=(R(90), 0, 0))
    cyl(0.044, 0.02, (0, 0.226, 0.14), LENS, verts=20, rot=(R(90), 0, 0), bevel=0)
    box((0.03, 0.06, 0.06), (0, 0.06, 0.085), Dk)
    grip(B); guard(Dk)
    return dict(stock=lambda B, Dk: (box((0.055, 0.2, 0.06), (0, -0.18, 0.02), B), box((0.06, 0.05, 0.14), (0, -0.28, -0.01), B)),
                mag=lambda B, Dk: box((0.04, 0.05, 0.06), (0, 0.1, -0.03), Dk),
                sockets=dict(muzzle=(0, 0.64, 0.03), scope=None, clip=(0, 0.1, -0.02), stock=(0, -0.1, 0.0)))

def arc(B, Dk):
    box((0.06, 0.24, 0.08), (0, 0.06, 0.03), B)
    box((0.062, 0.1, 0.03), (0, 0.1, 0.07), Dk)
    ridges(Dk, 0.1, 0.07, 3, w=0.064, step=0.022)
    cyl(0.026, 0.04, (0, 0.2, 0.03), B, verts=16, rot=(R(90), 0, 0))
    muzzle_tip(B, 0.22, 0.026)
    grip(B, y=-0.02, h=0.15); guard(Dk, y=0.03)
    return dict(sockets=dict(muzzle=(0, 0.24, 0.03), scope=(0, 0.04, 0.08), clip=(0, 0.0, -0.1), stock=(0, -0.07, 0.02)))

def mortar(B, Dk):
    cyl(0.09, 0.5, (0, 0.16, 0.05), B, verts=24, rot=(R(90), 0, 0))               # launch tube
    cyl(0.095, 0.04, (0, 0.38, 0.05), GLOW_O, verts=24, rot=(R(90), 0, 0), bevel=0) # glowing ring
    cyl(0.1, 0.05, (0, 0.42, 0.05), B, verts=24, rot=(R(90), 0, 0))
    cyl(0.07, 0.06, (0, 0.425, 0.05), NAVY, verts=20, rot=(R(90), 0, 0), bevel=0)
    for k in range(2):
        box((0.19, 0.02, 0.06), (0, 0.05 + k * 0.05, 0.05), Dk, bevel=0.006, rot=(R(-30), 0, 0))
    tube([(0, 0.02, 0.14), (0, 0.04, 0.2), (0, 0.24, 0.2), (0, 0.26, 0.14)], 0.016, B, sides=8)   # carry handle
    grip(B, y=0.0, w=0.06); guard(Dk)
    return dict(stock=lambda B, Dk: (box((0.12, 0.16, 0.1), (0, -0.16, 0.04), B), box((0.12, 0.05, 0.16), (0, -0.25, 0.02), B)),
                sockets=dict(muzzle=(0, 0.45, 0.05), scope=(0, 0.1, 0.15), clip=(0, 0.1, -0.04), stock=(0, -0.08, 0.04)))

def minigun(B, Dk):
    box((0.15, 0.32, 0.14), (0, 0.06, 0.05), B)
    box((0.155, 0.08, 0.15), (0, 0.24, 0.05), Dk)
    for k in range(2):
        box((0.156, 0.02, 0.08), (0, 0.0 + k * 0.05, 0.05), Dk, bevel=0.006, rot=(R(-30), 0, 0))
    for i in range(6):                                                              # six orange barrels
        a = i / 6 * math.tau
        cyl(0.022, 0.14, (math.cos(a) * 0.045, 0.34, 0.05 + math.sin(a) * 0.045), ORANGE, verts=12, rot=(R(90), 0, 0))
    cyl(0.07, 0.03, (0, 0.29, 0.05), Dk, verts=20, rot=(R(90), 0, 0))
    tube([(0, -0.04, 0.12), (0, -0.02, 0.2), (0, 0.18, 0.2), (0, 0.2, 0.12)], 0.018, B, sides=8)
    grip(B, w=0.06); guard(Dk)
    return dict(stock=lambda B, Dk: (box((0.1, 0.14, 0.09), (0, -0.16, 0.04), B), box((0.1, 0.05, 0.15), (0, -0.23, 0.02), B)),
                sockets=dict(muzzle=(0, 0.42, 0.05), scope=(0, 0.06, 0.13), clip=(0, 0.08, -0.03), stock=(0, -0.1, 0.03)))

def storm(B, Dk):
    box((0.065, 0.46, 0.08), (0, 0.16, 0.03), B)
    box((0.067, 0.16, 0.035), (0, 0.06, 0.08), Dk)
    box((0.03, 0.3, 0.02), (0, 0.22, 0.075), Dk)                                    # top rail line
    cyl(0.022, 0.12, (0, 0.44, 0.03), B, verts=14, rot=(R(90), 0, 0))
    muzzle_tip(B, 0.51, 0.026)
    grip(B); guard(Dk)
    return dict(stock=lambda B, Dk: skeleton_stock(B, -0.09, L=0.24),
                mag=lambda B, Dk: box((0.045, 0.06, 0.09), (0, 0.12, -0.045), Dk),
                sockets=dict(muzzle=(0, 0.54, 0.03), scope=(0, 0.04, 0.09), clip=(0, 0.12, -0.02), stock=(0, -0.09, 0.0)))

def twin(B, Dk):
    for x in (-0.055, 0.055):                                                       # two pistols side by side
        box((0.055, 0.22, 0.075), (x, 0.06, 0.03), B)
        box((0.057, 0.08, 0.03), (x, 0.1, 0.07), Dk)
        cyl(0.022, 0.05, (x, 0.19, 0.03), B, verts=14, rot=(R(90), 0, 0))
        cyl(0.014, 0.055, (x, 0.192, 0.03), NAVY, verts=10, rot=(R(90), 0, 0), bevel=0)
        box((0.045, 0.07, 0.15), (x, -0.025, -0.06), B, rot=(R(-14), 0, 0))
    box((0.07, 0.05, 0.03), (0, 0.03, 0.0), Dk)                                     # joining bracket
    guard(Dk, y=0.03)
    return dict(sockets=dict(muzzle=(0, 0.22, 0.03), scope=(0, 0.04, 0.08), clip=(0, 0.06, -0.02), stock=(0, -0.06, 0.02)))

def rail(B, Dk):
    box((0.065, 0.5, 0.08), (0, 0.18, 0.03), B)
    for k in range(5):
        box((0.067, 0.014, 0.035), (0, 0.32 + k * 0.03, 0.03), Dk, bevel=0.004, rot=(R(-25), 0, 0))
    cyl(0.024, 0.18, (0, 0.5, 0.03), B, verts=14, rot=(R(90), 0, 0))
    muzzle_tip(B, 0.6, 0.03)
    cyl(0.028, 0.18, (0, 0.06, 0.12), B, verts=16, rot=(R(90), 0, 0))             # built-in scope
    cyl(0.036, 0.04, (0, 0.16, 0.12), B, verts=16, rot=(R(90), 0, 0))
    cyl(0.03, 0.015, (0, 0.18, 0.12), LENS, verts=16, rot=(R(90), 0, 0), bevel=0)
    box((0.02, 0.05, 0.04), (0, 0.06, 0.085), Dk)
    grip(B); guard(Dk)
    return dict(stock=lambda B, Dk: skeleton_stock(B, -0.08, L=0.25),
                mag=lambda B, Dk: box((0.045, 0.06, 0.07), (0, 0.12, -0.04), Dk),
                sockets=dict(muzzle=(0, 0.62, 0.03), scope=None, clip=(0, 0.12, -0.02), stock=(0, -0.08, 0.0)))

def crown(B, Dk):
    box((0.07, 0.24, 0.085), (0, 0.06, 0.035), B)
    box((0.072, 0.1, 0.035), (0, 0.04, 0.085), Dk)
    for k, x in enumerate((-0.03, 0.0, 0.03)):                                      # crown emblem on the side
        cyl(0.01, 0.02, (0.038, 0.05 + (k - 1) * 0.022, 0.06 + (0.01 if k == 1 else 0)), GOLDTRIM, verts=6, r2=0.0, rot=(0, R(90), 0))
    box((0.006, 0.06, 0.018), (0.037, 0.05, 0.04), GOLDTRIM, bevel=0.003)
    cyl(0.03, 0.05, (0, 0.2, 0.035), B, verts=16, rot=(R(90), 0, 0))
    muzzle_tip(B, 0.225, 0.03)
    grip(B, y=-0.02, h=0.15); guard(Dk, y=0.03)
    return dict(sockets=dict(muzzle=(0, 0.25, 0.035), scope=(0, 0.04, 0.1), clip=(0, 0.0, -0.1), stock=(0, -0.07, 0.03)))

def handcannon(B, Dk):
    box((0.08, 0.2, 0.09), (0, 0.02, 0.05), B)
    cyl(0.032, 0.18, (0, 0.2, 0.06), B, verts=16, rot=(R(90), 0, 0))              # barrel
    box((0.04, 0.16, 0.025), (0, 0.18, 0.09), Dk)                                   # top rib
    muzzle_tip(B, 0.29, 0.034)
    cyl(0.065, 0.1, (0, 0.06, 0.035), Dk, verts=6, rot=(R(90), 0, 0))             # revolver cylinder
    for i in range(6):
        a = i / 6 * math.tau
        box((0.02, 0.1, 0.015), (math.cos(a) * 0.058, 0.06, 0.035 + math.sin(a) * 0.058), B, bevel=0.004, rot=(0, -a, 0))
    grip(B, y=-0.05, h=0.16, ang=-20, w=0.06); guard(Dk, y=0.01)
    return dict(sockets=dict(muzzle=(0, 0.31, 0.06), scope=(0, 0.12, 0.11), clip=(0, 0.06, -0.04), stock=(0, -0.1, 0.03)))

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
    inst('W_' + wid, (col * 1.1, 0, -row * 0.34), rz=R(-90))
preview_setup(OUT, 'equip_blasters.png', res=(1100, 1500), samples=48)
cam, aim = ortho((0.5, -6, -0.98), (0.5, 0, -0.98), 2.45)
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
print('EQUIP DONE')
