# Wild Tag: builds the low-poly animal models and exports them as .glb files for the game.
# Run:  blender -b --factory-startup --python animal-tag/blender/build_models.py
#
# Conventions the game relies on (see loadModels / glbRig in js/models.js):
#   - Blender Z is up and the animal faces -Y (it becomes +Z in the game).
#   - Feet stand on Z = 0. The game scales each model by the animal's "size".
#   - Material names: Body (gets the pattern + main color), Accent (second color),
#     Wing (lighter main color), Dark, EyeWhite, Horn (fixed colors).
#   - Moving parts are separate objects with their origin at the joint:
#     Head, ArmL/ArmR, LegFL/LegFR/LegBL/LegBR (or LegL/LegR), WingL/WingR, Tail.
#   - Empties for wearables: Hat and Face (children of Head), Neck and Back.
#     Head carries custom properties headR (head size) and eyeX (eye spacing).
import bpy, bmesh, math, os, sys
from mathutils import Vector

OUT = os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'models')


def reset():
    bpy.ops.wm.read_factory_settings(use_empty=True)


def hexcol(h):
    h = h.lstrip('#')
    return tuple(int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)) + (1.0,)


def mat(name, color, rough=0.85):
    m = bpy.data.materials.get(name)
    if m:
        return m
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = hexcol(color)
    b.inputs['Roughness'].default_value = rough
    m.diffuse_color = hexcol(color)
    return m


def _finish(o, name, material, scale=None, rot=None):
    o.name = name
    if scale:
        o.scale = scale
    if rot:
        o.rotation_euler = rot
    o.data.materials.append(material)
    return o


def blob(name, loc, scale, material, segs=9, rings=6, rot=None):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=segs, ring_count=rings, radius=1, location=loc)
    return _finish(bpy.context.object, name, material, scale, rot)


def cone(name, loc, r, depth, material, rot=None, verts=6, r2=0.0, scale=None):
    bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r, radius2=r2, depth=depth, location=loc)
    return _finish(bpy.context.object, name, material, scale, rot)


def point_cone(name, base, tip, r, material, verts=6):
    """A cone from base to tip (used for horns, claws, spikes)."""
    base, tip = Vector(base), Vector(tip)
    d = tip - base
    o = cone(name, (base + tip) / 2, r, d.length, material, verts=verts)
    o.rotation_mode = 'QUATERNION'
    o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
    return o


def stick(name, a, b, r, material, verts=6):
    """A thick stretched blob between two points (wing bones, tail pieces)."""
    a, b = Vector(a), Vector(b)
    d = b - a
    o = blob(name, (a + b) / 2, (r, r, d.length / 2), material, segs=verts, rings=4)
    o.rotation_mode = 'QUATERNION'
    o.rotation_quaternion = Vector((0, 0, 1)).rotation_difference(d.normalized())
    return o


def join(objs, name, pivot):
    """Join parts into one object whose origin sits at the joint (pivot)."""
    bpy.ops.object.select_all(action='DESELECT')
    for o in objs:
        o.select_set(True)
    bpy.context.view_layer.objects.active = objs[0]
    if len(objs) > 1:
        bpy.ops.object.join()
    o = bpy.context.object
    o.name = name
    o.data.name = name
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    bpy.context.scene.cursor.location = pivot
    bpy.ops.object.origin_set(type='ORIGIN_CURSOR')
    for p in o.data.polygons:
        p.use_smooth = False
    return o


def empty(name, loc, parent=None):
    e = bpy.data.objects.new(name, None)
    e.empty_display_size = 0.1
    e.location = loc
    bpy.context.scene.collection.objects.link(e)
    if parent:
        parent_keep(e, parent)
    return e


def parent_keep(child, parent):
    bpy.context.view_layer.update()
    mw = child.matrix_world.copy()
    child.parent = parent
    child.matrix_world = mw


def mirror_x(fn):
    """Call fn(side) for side = +1 (L, the animal's left = +X) and -1 (R)."""
    return [fn(s) for s in (1, -1)]


def eyes(cx, y, z, r, white, dark, spread):
    parts = []
    for s in (1, -1):
        x = cx + s * spread
        parts.append(blob('eyeW', (x, y, z), (r, r * 0.7, r * 1.08), white, segs=12, rings=8))
        parts.append(blob('eyeP', (x, y - r * 0.55, z), (r * 0.66, r * 0.4, r * 0.7), dark, segs=12, rings=8))
        parts.append(blob('eyeH', (x - s * r * 0.22, y - r * 0.85, z + r * 0.28), (r * 0.2, r * 0.12, r * 0.2), white, segs=8, rings=5))
    return parts


def export(name):
    os.makedirs(OUT, exist_ok=True)
    path = os.path.abspath(os.path.join(OUT, name + '.glb'))
    bpy.ops.export_scene.gltf(filepath=path, export_format='GLB', export_extras=True, export_apply=True,
                              export_yup=True, export_draco_mesh_compression_enable=False)
    print('EXPORTED', path)


# ---------------------------------------------------------------- GORILLA
def build_gorilla():
    reset()
    body, acc, dark = mat('Body', '#3d3a3e'), mat('Accent', '#c8956a'), mat('Dark', '#1c1416')
    white = mat('EyeWhite', '#ffffff', 0.4)

    # torso: big hunched back, rounder belly, flat tan chest
    torso = [
        blob('back', (0, 0.12, 1.1), (0.56, 0.46, 0.44), body),
        blob('chestBulk', (0, -0.08, 0.98), (0.5, 0.36, 0.42), body),
        blob('belly', (0, 0.05, 0.7), (0.4, 0.34, 0.3), body),
        blob('hips', (0, 0.22, 0.6), (0.36, 0.3, 0.24), body),
        blob('chest', (0, -0.33, 0.95), (0.33, 0.1, 0.3), acc, segs=8, rings=5),
        blob('pecL', (0.13, -0.38, 1.03), (0.15, 0.06, 0.11), acc, segs=7, rings=4),
        blob('pecR', (-0.13, -0.38, 1.03), (0.15, 0.06, 0.11), acc, segs=7, rings=4),
    ]
    torso_o = join(torso, 'Body', (0, 0, 0))

    # head: tall dome, tan face with muzzle, ears, big eyes
    head = [
        blob('dome', (0, -0.2, 1.56), (0.3, 0.29, 0.36), body),
        blob('crest', (0, -0.14, 1.78), (0.2, 0.2, 0.16), body),
        blob('face', (0, -0.41, 1.53), (0.24, 0.08, 0.21), acc, segs=8, rings=5),
        blob('brow', (0, -0.44, 1.64), (0.25, 0.07, 0.05), body, segs=8, rings=4),
        blob('muzzle', (0, -0.47, 1.41), (0.19, 0.12, 0.12), acc, segs=8, rings=5),
        blob('nostrilL', (0.045, -0.585, 1.45), (0.03, 0.015, 0.022), dark, segs=6, rings=4),
        blob('nostrilR', (-0.045, -0.585, 1.45), (0.03, 0.015, 0.022), dark, segs=6, rings=4),
        blob('mouth', (0, -0.585, 1.36), (0.085, 0.012, 0.012), dark, segs=8, rings=4),
    ]
    head += mirror_x(lambda s: blob('ear', (s * 0.3, -0.2, 1.56), (0.06, 0.04, 0.085), acc, segs=7, rings=5))
    head += eyes(0, -0.47, 1.56, 0.058, white, dark, 0.09)
    head_o = join(head, 'Head', (0, -0.18, 1.38))
    head_o['headR'] = 0.3
    head_o['eyeX'] = 0.09
    empty('Hat', (0, -0.2, 1.86), head_o)
    empty('Face', (0, -0.53, 1.56), head_o)
    empty('Neck', (0, -0.3, 1.27), torso_o)
    empty('Back', (0, 0.42, 1.12), torso_o)

    # arms: huge upper arms, thick forearms, fists on the ground (knuckle walking)
    def arm(s):
        parts = [
            blob('shoulder', (s * 0.52, -0.05, 1.12), (0.22, 0.22, 0.2), body),
            blob('upper', (s * 0.6, -0.1, 0.88), (0.2, 0.2, 0.3), body),
            blob('fore', (s * 0.64, -0.16, 0.5), (0.2, 0.2, 0.3), body),
            blob('fist', (s * 0.64, -0.2, 0.15), (0.17, 0.18, 0.14), body),
        ]
        for k in range(3):
            parts.append(blob('knuckle', (s * (0.58 + k * 0.06), -0.35, 0.09), (0.04, 0.05, 0.06), body, segs=6, rings=4))
        o = join(parts, 'ArmL' if s > 0 else 'ArmR', (s * 0.5, -0.05, 1.15))
        return o

    def leg(s):
        parts = [
            blob('thigh', (s * 0.22, 0.14, 0.42), (0.16, 0.17, 0.22), body),
            blob('foot', (s * 0.23, 0.0, 0.08), (0.14, 0.21, 0.08), body),
        ]
        for k in range(3):
            parts.append(blob('toe', (s * (0.17 + k * 0.06), -0.2, 0.05), (0.035, 0.045, 0.045), body, segs=6, rings=4))
        return join(parts, 'LegL' if s > 0 else 'LegR', (s * 0.2, 0.15, 0.58))

    for o in mirror_x(arm) + mirror_x(leg) + [head_o]:
        parent_keep(o, torso_o)
    export('gorilla')


# ---------------------------------------------------------------- DRAGON
def build_dragon():
    reset()
    body, acc, wing = mat('Body', '#2f9a4c'), mat('Accent', '#eedba6'), mat('Wing', '#7fd36f')
    dark, white, horn = mat('Dark', '#151515'), mat('EyeWhite', '#ffffff', 0.4), mat('Horn', '#f2e2b0', 0.6)

    torso = [
        blob('chest', (0, -0.25, 0.86), (0.37, 0.34, 0.4), body, segs=10, rings=7),
        blob('barrel', (0, 0.15, 0.78), (0.38, 0.5, 0.36), body, segs=10, rings=7),
        blob('rump', (0, 0.5, 0.74), (0.33, 0.3, 0.3), body),
        blob('neck', (0, -0.36, 1.13), (0.19, 0.19, 0.3), body, rot=(-0.35, 0, 0)),
        blob('bellyFront', (0, -0.48, 0.92), (0.24, 0.08, 0.4), acc, segs=8, rings=6),
        blob('bellyUnder', (0, 0.05, 0.5), (0.27, 0.48, 0.1), acc, segs=8, rings=5),
        blob('neckFront', (0, -0.5, 1.16), (0.13, 0.06, 0.26), acc, segs=8, rings=5, rot=(-0.35, 0, 0)),
    ]
    # belly plate lines
    for k in range(4):
        torso.append(blob('plate', (0, -0.565, 0.72 + k * 0.13), (0.2, 0.02, 0.012), mat('Plate', '#d8c08a'), segs=8, rings=3))
    # back spikes (diamonds) along the spine
    for k, (y, z, h) in enumerate([(-0.42, 1.36, 0.14), (-0.3, 1.2, 0.16), (-0.12, 1.12, 0.17), (0.1, 1.12, 0.17), (0.32, 1.06, 0.15), (0.52, 1.0, 0.13)]):
        torso.append(cone('spike', (0, y, z), 0.07, h, wing, verts=4, rot=(-0.35, 0, math.pi / 4), scale=(1, 0.6, 1)))
    torso_o = join(torso, 'Body', (0, 0, 0))

    head = [
        blob('skull', (0, -0.44, 1.46), (0.27, 0.26, 0.24), body, segs=10, rings=7),
        blob('snout', (0, -0.68, 1.38), (0.17, 0.2, 0.13), body),
        blob('jaw', (0, -0.62, 1.29), (0.15, 0.17, 0.06), acc, segs=8, rings=4),
        blob('brow', (0, -0.6, 1.58), (0.24, 0.08, 0.05), body, segs=8, rings=4),
        blob('nostrilL', (0.05, -0.865, 1.42), (0.02, 0.012, 0.015), dark, segs=6, rings=4),
        blob('nostrilR', (-0.05, -0.865, 1.42), (0.02, 0.012, 0.015), dark, segs=6, rings=4),
        blob('mouth', (0, -0.79, 1.31), (0.1, 0.012, 0.01), dark, segs=8, rings=4),
    ]
    head += eyes(0, -0.63, 1.5, 0.066, white, dark, 0.12)
    for s in (1, -1):
        # curved horns: two segments sweeping up and back
        head.append(point_cone('hornA', (s * 0.13, -0.36, 1.6), (s * 0.2, -0.3, 1.8), 0.065, horn, verts=7))
        head.append(point_cone('hornB', (s * 0.2, -0.3, 1.78), (s * 0.24, -0.14, 1.9), 0.045, horn, verts=7))
        # ear frills
        head.append(point_cone('frill1', (s * 0.22, -0.42, 1.5), (s * 0.4, -0.38, 1.56), 0.05, body, verts=4))
        head.append(point_cone('frill2', (s * 0.22, -0.38, 1.42), (s * 0.38, -0.32, 1.38), 0.045, body, verts=4))
    for k, (y, z, h) in enumerate([(-0.5, 1.72, 0.2), (-0.38, 1.7, 0.16), (-0.28, 1.62, 0.13)]):
        head.append(cone('crest', (0, y, z), 0.06, h, wing, verts=4, rot=(0.15, 0, math.pi / 4), scale=(0.5, 1, 1)))
    head_o = join(head, 'Head', (0, -0.4, 1.3))
    head_o['headR'] = 0.27
    head_o['eyeX'] = 0.12
    empty('Hat', (0, -0.44, 1.7), head_o)
    empty('Face', (0, -0.71, 1.5), head_o)
    empty('Neck', (0, -0.42, 1.0), torso_o)
    empty('Back', (0, 0.05, 1.18), torso_o)

    def foot(s, x, y, parts):
        parts.append(blob('foot', (x, y - 0.04, 0.08), (0.15, 0.18, 0.08), body))
        for k in (-1, 0, 1):
            parts.append(point_cone('claw', (x + k * 0.07, y - 0.17, 0.06), (x + k * 0.08, y - 0.3, 0.03), 0.035, horn, verts=5))

    def front_leg(s):
        x = s * 0.27
        parts = [blob('upper', (x, -0.25, 0.55), (0.15, 0.16, 0.22), body), blob('lower', (x, -0.27, 0.27), (0.13, 0.13, 0.2), body)]
        foot(s, x, -0.27, parts)
        return join(parts, 'LegFL' if s > 0 else 'LegFR', (x, -0.25, 0.68))

    def back_leg(s):
        x = s * 0.29
        parts = [blob('thigh', (x, 0.42, 0.55), (0.17, 0.25, 0.26), body), blob('shin', (x, 0.36, 0.25), (0.13, 0.13, 0.2), body)]
        foot(s, x, 0.33, parts)
        return join(parts, 'LegBL' if s > 0 else 'LegBR', (x, 0.42, 0.66))

    # tail: tapering pieces curving down then up, with spikes on top
    pts = [(0, 0.65, 0.72), (0, 0.95, 0.6), (0, 1.25, 0.5), (0, 1.55, 0.48), (0, 1.82, 0.55), (0, 2.05, 0.68)]
    rs = [0.22, 0.17, 0.13, 0.1, 0.07, 0.045]
    tail = []
    for i in range(len(pts) - 1):
        tail.append(stick('tail', pts[i], pts[i + 1], rs[i], body, verts=8))
        tail.append(stick('tailBelly', (pts[i][0], pts[i][1], pts[i][2] - rs[i] * 0.55), (pts[i + 1][0], pts[i + 1][1], pts[i + 1][2] - rs[i + 1] * 0.55), rs[i] * 0.6, acc, verts=6))
        mid = [(a + b) / 2 for a, b in zip(pts[i], pts[i + 1])]
        tail.append(cone('tspike', (0, mid[1], mid[2] + rs[i] * 0.95), 0.05 + rs[i] * 0.25, 0.1 + rs[i] * 0.4, wing, verts=4, rot=(-0.3, 0, math.pi / 4), scale=(0.6, 1, 1)))
    tail.append(point_cone('tip', pts[-1], (0, 2.25, 0.82), 0.06, wing, verts=4))
    tail_o = join(tail, 'Tail', (0, 0.6, 0.74))

    # wings: thick bone along the top edge, fingers, and a scalloped membrane
    def make_wing(s):
        root, elbow, tip = Vector((s * 0.25, 0.05, 1.08)), Vector((s * 0.62, 0.12, 1.62)), Vector((s * 1.3, 0.2, 1.18))
        bottoms = [Vector((s * 0.32, 0.08, 0.95)), Vector((s * 0.62, 0.12, 0.9)), Vector((s * 0.92, 0.16, 0.88)), Vector((s * 1.2, 0.2, 0.98))]
        parts = [stick('bone1', root, elbow, 0.055, body, 6), stick('bone2', elbow, tip, 0.045, body, 6)]
        for b in bottoms[1:]:
            parts.append(stick('finger', elbow, b, 0.03, body, 5))
        # membrane: fan from the elbow with scallops between fingers
        bm = bmesh.new()
        ring = [root] + bottoms + [tip]
        # scallop: add a raised midpoint between consecutive bottom points
        outline = [ring[0]]
        for a, b in zip(ring[:-1], ring[1:]):
            m = (a + b) / 2
            m.z += 0.12
            outline += [m, b]
        ev = bm.verts.new(elbow)
        vs = [bm.verts.new(p) for p in outline]
        for a, b in zip(vs[:-1], vs[1:]):
            bm.faces.new((ev, a, b))
        me = bpy.data.meshes.new('membrane')
        bm.to_mesh(me)
        bm.free()
        mo = bpy.data.objects.new('membrane', me)
        bpy.context.scene.collection.objects.link(mo)
        mo.data.materials.append(wing)
        sol = mo.modifiers.new('thick', 'SOLIDIFY')
        sol.thickness = 0.03
        bpy.context.view_layer.objects.active = mo
        mo.select_set(True)
        bpy.ops.object.modifier_apply(modifier='thick')
        parts.append(mo)
        return join(parts, 'WingL' if s > 0 else 'WingR', tuple(root))

    for o in mirror_x(front_leg) + mirror_x(back_leg) + mirror_x(make_wing) + [head_o, tail_o]:
        parent_keep(o, torso_o)
    export('dragon')


if __name__ == '__main__':
    which = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else ['gorilla', 'dragon']
    for w in which:
        {'gorilla': build_gorilla, 'dragon': build_dragon}[w]()
