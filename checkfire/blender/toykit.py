"""Shared Blender helpers for Checkfire's stylized-toy assets (exec'd by the asset scripts)."""
# ---------------------------------------------------------------- helpers
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

PARTS = []
def _fin(o, m, bevel=0.0, segs=1, flat=True):
    o.data.materials.append(m)
    if bevel:
        md = o.modifiers.new('bev', 'BEVEL')
        md.width = bevel
        md.segments = segs
        md.limit_method = 'ANGLE'
    for p in o.data.polygons:
        p.use_smooth = not flat
    PARTS.append(o)
    return o

def box(size, loc, m, bevel=0.0, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_cube_add(size=1, location=loc, rotation=rot)
    o = bpy.context.object
    o.scale = size
    bpy.ops.object.transform_apply(scale=True)
    return _fin(o, m, bevel)

def cyl(r, depth, loc, m, verts=8, bevel=0.0, rot=(0, 0, 0), r2=None):
    if r2 is None:
        bpy.ops.mesh.primitive_cylinder_add(vertices=verts, radius=r, depth=depth, location=loc, rotation=rot)
    else:
        bpy.ops.mesh.primitive_cone_add(vertices=verts, radius1=r, radius2=r2, depth=depth, location=loc, rotation=rot)
    return _fin(bpy.context.object, m, bevel)

def ico(r, loc, m, sub=1, scale=(1, 1, 1)):
    bpy.ops.mesh.primitive_ico_sphere_add(subdivisions=sub, radius=r, location=loc)
    o = bpy.context.object
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    return _fin(o, m)

def uvs(r, loc, m, seg=12, rings=8, scale=(1, 1, 1), smooth=True):
    bpy.ops.mesh.primitive_uv_sphere_add(segments=seg, ring_count=rings, radius=r, location=loc)
    o = bpy.context.object
    o.scale = scale
    bpy.ops.object.transform_apply(scale=True)
    return _fin(o, m, flat=not smooth)

def torus(R, r, loc, m, rot=(0, 0, 0)):
    bpy.ops.mesh.primitive_torus_add(major_radius=R, minor_radius=r, major_segments=14, minor_segments=5, location=loc, rotation=rot)
    return _fin(bpy.context.object, m)

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

def star(r, depth, loc, m, rot=(0, 0, 0), inner=0.45, bevel=0.0):
    """Flat five-point star prism, face pointing +Z before rotation."""
    import bmesh
    me = bpy.data.meshes.new('star')
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
    bm.normal_update()
    bm.to_mesh(me)
    bm.free()
    o = bpy.data.objects.new('star', me)
    bpy.context.collection.objects.link(o)
    o.location = loc
    o.rotation_euler = rot
    bpy.context.view_layer.objects.active = o
    o.select_set(True)
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.ops.object.transform_apply(location=False, rotation=True, scale=True)
    return _fin(o, m, bevel)

