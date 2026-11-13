"""Shared Blender helpers for Checkfire's stylized-toy assets (exec'd by the asset scripts).

Look: beveled low-poly with soft rounded edges (multi-segment bevels + smooth shading with
auto-smooth, so flat faces stay flat and edges read as moulded plastic / carved stone).
"""
import bmesh
from mathutils import Vector

# ---------------------------------------------------------------- colour + materials
def lin(h):
    c = [((h >> 16) & 255) / 255, ((h >> 8) & 255) / 255, (h & 255) / 255]
    return tuple(x / 12.92 if x <= 0.04045 else ((x + 0.055) / 1.055) ** 2.4 for x in c)

MATS = {}
def mat(name, hexcol, metal=0.0, rough=0.75, alpha=1.0, emit=0.0):
    if name in MATS:
        return MATS[name]
    m = bpy.data.materials.new(name)
    m.use_nodes = True
    b = m.node_tree.nodes['Principled BSDF']
    b.inputs['Base Color'].default_value = (*lin(hexcol), 1)
    b.inputs['Metallic'].default_value = metal
    b.inputs['Roughness'].default_value = rough
    if alpha < 1:
        b.inputs['Alpha'].default_value = alpha
        m.blend_method = 'BLEND'
    if emit:
        b.inputs['Emission Color'].default_value = (*lin(hexcol), 1)
        b.inputs['Emission Strength'].default_value = emit
    MATS[name] = m
    return m

# ---------------------------------------------------------------- primitives
PARTS = []
def _fin(o, m, bevel=0.0, segs=2, flat=False, angle=35):
    o.data.materials.append(m)
    if bevel:
        md = o.modifiers.new('bev', 'BEVEL')
        md.width = bevel
        md.segments = segs
        md.limit_method = 'ANGLE'
        md.angle_limit = math.radians(40)
        md.harden_normals = True
    for p in o.data.polygons:
        p.use_smooth = not flat
    if not flat and hasattr(o.data, 'use_auto_smooth'):
        o.data.use_auto_smooth = True
        o.data.auto_smooth_angle = math.radians(angle)
    PARTS.append(o)
    return o

def box(size, loc, m, bevel=None, rot=(0, 0, 0), segs=2):
    """Rounded box. bevel=None picks a soft default (18% of the smallest side)."""
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    if bevel is None:
        bevel = min(size) * 0.18
    return _fin(o, m, bevel, segs)

def cyl(r, depth, loc, m, verts=16, bevel=None, rot=(0, 0, 0), r2=None, segs=2):
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc, rotation=rot)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r, radius2=r2, depth=depth, location=loc, rotation=rot)
    if bevel is None:
        bevel = min(r, depth) * 0.15 if r2 is None else 0
    return _fin(bpy.context.object, m, bevel, segs)

def ico(r, loc, m, sub=1, scale=(1, 1, 1), flat=True):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=sub, radius=r, location=loc)
    o = bpy.context.object
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    return _fin(o, m, flat=flat)

def uvs(r, loc, m, seg=16, rings=10, scale=(1, 1, 1), smooth=True, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings, radius=r, location=loc, rotation=rot)
    o = bpy.context.object
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    return _fin(o, m, flat=not smooth, angle=80)

def torus(R, r, loc, m, rot=(0, 0, 0), seg=20, mseg=8):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, major_segments=seg, minor_segments=mseg, location=loc, rotation=rot)
    return _fin(bpy.context.object, m, angle=80)

def _obj_from_bm(bm, name='mesh'):
    me = bpy.data.meshes.new(name)
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new(name, me)
    bpy.context.collection.objects.link(o)
    return o

def lathe(profile, m, loc=(0, 0, 0), steps=24, angle=60):
    """Turned shape from (radius, z) points, spun around Z — for bowls, posts, stacks, lanterns."""
    bm = bmesh.new()
    verts = [bm.verts.new((r, 0, z)) for r, z in profile]
    edges = [bm.edges.new((verts[i], verts[i + 1])) for i in range(len(verts) - 1)]
    bmesh.ops.spin(bm, geom=verts + edges, cent=(0, 0, 0), axis=(0, 0, 1), angle=math.tau, steps=steps, use_merge=True)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=1e-5)
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    o = _obj_from_bm(bm, 'lathe')
    o.location = loc
    return _fin(o, m, angle=angle)

def tube(points, r, m, sides=10, cap=True):
    """A round tube along a polyline (ropes, cords, plumes, chair frames)."""
    pts = [Vector(p) for p in points]
    bm = bmesh.new()
    rings = []
    for i, p in enumerate(pts):
        d = (pts[min(i + 1, len(pts) - 1)] - pts[max(i - 1, 0)]).normalized()
        up = Vector((0, 0, 1)) if abs(d.z) < 0.9 else Vector((1, 0, 0))
        a = d.cross(up).normalized()
        b = d.cross(a).normalized()
        rr = r(i / (len(pts) - 1)) if callable(r) else r
        rings.append([bm.verts.new(p + (a * math.cos(t) + b * math.sin(t)) * rr)
                      for t in [k / sides * math.tau for k in range(sides)]])
    for i in range(len(rings) - 1):
        for k in range(sides):
            bm.faces.new((rings[i][k], rings[i][(k + 1) % sides], rings[i + 1][(k + 1) % sides], rings[i + 1][k]))
    if cap:
        bm.faces.new(list(reversed(rings[0])))
        bm.faces.new(rings[-1])
    bmesh.ops.recalc_face_normals(bm, faces=bm.faces)
    return _fin(_obj_from_bm(bm, 'tube'), m, angle=70)

def capsule(r, a, b, m, sides=12):
    """Rounded limb between points a and b."""
    a, b = Vector(a), Vector(b)
    tube([a, b], r, m, sides=sides, cap=False)
    uvs(r, a, m, seg=sides, rings=8)
    uvs(r, b, m, seg=sides, rings=8)

def star(r, depth, loc, m, rot=(0, 0, 0), inner=0.45, bevel=0.0):
    """Flat five-point star prism, face pointing +Z before rotation."""
    bm = bmesh.new()
    top, bot = [], []
    for i in range(10):
        a = math.pi / 2 + i * math.pi / 5
        rr = r if i % 2 == 0 else r * inner
        top.append(bm.verts.new((math.cos(a) * rr, math.sin(a) * rr, depth / 2)))
        bot.append(bm.verts.new((math.cos(a) * rr, math.sin(a) * rr, -depth / 2)))
    bm.faces.new(top)
    bm.faces.new(list(reversed(bot)))
    for i in range(10):
        j = (i + 1) % 10
        bm.faces.new((bot[i], bot[j], top[j], top[i]))
    o = _obj_from_bm(bm, 'star')
    o.location = loc
    o.rotation_euler = rot
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    return _fin(o, m, bevel, angle=20)

def finish(name, origin=(0, 0, 0)):
    """Apply modifiers, join the parts built since the last call into one named object (pivot at `origin`)."""
    global PARTS
    bpy.ops.object.select_all(action='DESELECT')
    for o in PARTS:
        o.select_set(True)
        bpy.context.view_layer.objects.active = o
        for md in list(o.modifiers):
            bpy.ops.object.modifier_apply(modifier=md.name)
    bpy.context.view_layer.objects.active = PARTS[0]
    bpy.ops.object.join()
    o = bpy.context.object
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)   # bake the first part's transform
    bpy.context.scene.cursor.location = origin
    bpy.ops.object.origin_set(type='ORIGIN_CURSOR')   # pivot at the asset's world origin
    o.name = name
    o.data.name = name
    PARTS = []
    return o

# ---------------------------------------------------------------- preview helpers
def preview_setup(out, name, bg=0xf6ead6, res=(1280, 720), samples=96):
    w = bpy.data.worlds.new('W'); bpy.context.scene.world = w; w.use_nodes = True
    w.node_tree.nodes['Background'].inputs[0].default_value = (*lin(bg), 1)
    w.node_tree.nodes['Background'].inputs[1].default_value = 0.85
    sc = bpy.context.scene
    sc.render.engine = 'CYCLES'; sc.cycles.device = 'CPU'; sc.cycles.samples = samples; sc.cycles.use_denoising = False
    sc.render.resolution_x, sc.render.resolution_y = res
    sc.view_settings.view_transform = 'Standard'
    sc.render.filepath = os.path.join(out, name)

def camera_at(loc, aim, lens=35):
    bpy.ops.object.empty_add(location=aim); a = bpy.context.object
    bpy.ops.object.camera_add(location=loc); c = bpy.context.object; c.data.lens = lens
    tc = c.constraints.new('TRACK_TO'); tc.target = a; tc.track_axis = 'TRACK_NEGATIVE_Z'; tc.up_axis = 'UP_Y'
    bpy.context.scene.camera = c
    return c, a

def sun(rot=(50, 10, -35), energy=3.2, col=(1.0, 0.92, 0.8)):
    bpy.ops.object.light_add(type='SUN', location=(0, 0, 10), rotation=tuple(math.radians(v) for v in rot))
    bpy.context.object.data.energy = energy; bpy.context.object.data.color = col
    bpy.context.object.data.angle = math.radians(8)

def render(path=None):
    if path:
        bpy.context.scene.render.filepath = path
    bpy.ops.render.render(write_still=True)

def place(name, loc, rz=0, s=1.0, recolor=None):
    """Instance a finished asset for preview renders only."""
    src = bpy.data.objects[name]
    o = src.copy()
    o.data = src.data.copy() if recolor else src.data
    bpy.context.collection.objects.link(o)
    o.location = loc; o.rotation_euler = (0, 0, rz); o.scale = (s, s, s); o.hide_render = False
    if recolor:
        for i, mm in enumerate(o.data.materials):
            if mm and mm.name in recolor:
                o.data.materials[i] = recolor[mm.name]
    return o

def hide_sources():
    for o in list(bpy.data.objects):
        o.hide_render = True
