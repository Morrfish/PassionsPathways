# Wild Tag: turns a Meshy model (animal-tag/reference/meshy/<id>.glb) into a game model.
# Run:  blender -b --factory-startup --python animal-tag/blender/prepare_meshy.py -- gorilla dragon
#
# For each animal it:
#   1. reduces the mesh to ~16k triangles, stands it on the ground facing forward, scales it,
#   2. keeps only the color texture (1024 px),
#   3. adds a skeleton (Body, Head, legs, arms, wings, tail) and paints which part moves with which bone,
#   4. adds wearable points (Hat, Face on the head; Neck, Back on the body),
#   5. writes a color mask (models/<id>_mask.png): red = main color, green = accent color,
#      so the game can repaint the animal with patterns and chosen colors.
# Output: animal-tag/models/<id>.glb and <id>_mask.png
#
# Coordinates below are Blender's after scaling: Z up, the animal faces -Y, feet on Z = 0.
# To add an animal: upload its Meshy .glb, plot it (see README), then add an entry to ANIMALS.
import bpy, bmesh, sys, os, math
import numpy as np
from mathutils import Vector

HERE = os.path.dirname(os.path.abspath(__file__))
SRC = os.path.join(HERE, '..', 'reference', 'meshy')
OUT = os.path.join(HERE, '..', 'models')
TRIS = 16000
TEX = 1024

ANIMALS = {
    'gorilla': {
        'height': 1.75,
        # bone: (joint position, rule deciding which vertices it moves)
        'bones': {
            'Head': ((0, -0.15, 1.1), lambda x, y, z: z > 1.1 and abs(x) < 0.36 and y < 0.02),
            'ArmL': ((0.45, -0.15, 1.15), lambda x, y, z: x > 0.36 and y < 0.12 and z < 1.22),
            'ArmR': ((-0.45, -0.15, 1.15), lambda x, y, z: x < -0.36 and y < 0.12 and z < 1.22),
            'LegL': ((0.2, 0.35, 0.6), lambda x, y, z: x >= 0 and y > 0.15 and z < 0.55),
            'LegR': ((-0.2, 0.35, 0.6), lambda x, y, z: x < 0 and y > 0.15 and z < 0.55),
        },
        'anchors': {'Hat': ('Head', (0, -0.15, 1.66)), 'Face': ('Head', (0, -0.5, 1.37)),
                    'Neck': ('Body', (0, -0.12, 1.08)), 'Back': ('Body', (0, 0.3, 1.2))},
        'headR': 0.33, 'eyeX': 0.1,
        'body': ['#3b393a', '#413e3e', '#383638'], 'accent': ['#dbae8c', '#c99a78'],
        'keep': ['#ffffff', '#0a0a0a', '#6b4a3a'],
    },
    'dragon': {
        'height': 1.5,
        'bones': {
            'Head': ((0, -0.6, 0.95), lambda x, y, z: y < -0.62 and z > 0.72),
            'WingL': ((0.38, -0.25, 1.0), lambda x, y, z: x > 0.45 and z > 0.5),
            'WingR': ((-0.38, -0.25, 1.0), lambda x, y, z: x < -0.45 and z > 0.5),
            'Tail': ((0, 0.42, 0.5), lambda x, y, z: 0.42 < y <= 1.05),
            'Tail2': ((0, 1.05, 0.3), lambda x, y, z: y > 1.05),
            'LegFL': ((0.28, -0.5, 0.5), lambda x, y, z: x > 0.12 and z < 0.5 and -0.62 <= y < -0.2),
            'LegFR': ((-0.28, -0.5, 0.5), lambda x, y, z: x < -0.12 and z < 0.5 and -0.62 <= y < -0.2),
            'LegBL': ((0.3, 0.15, 0.5), lambda x, y, z: x > 0.12 and z < 0.5 and -0.2 <= y <= 0.42),
            'LegBR': ((-0.3, 0.15, 0.5), lambda x, y, z: x < -0.12 and z < 0.5 and -0.2 <= y <= 0.42),
        },
        'parents': {'Tail2': 'Tail'},
        'anchors': {'Hat': ('Head', (0, -0.78, 1.36)), 'Face': ('Head', (0, -1.02, 1.12)),
                    'Neck': ('Body', (0, -0.55, 0.85)), 'Back': ('Body', (0, -0.05, 1.05))},
        'headR': 0.3, 'eyeX': 0.13,
        'body': ['#247e3e', '#177136', '#2a8a45', '#107034', '#61ab66', '#8fd489', '#c5dd9f'],
        'accent': ['#fee2ad', '#f0d49a'],
        'keep': ['#ffffff', '#050505', '#303030'],
    },
    'fox': {
        'height': 1.55,
        'bones': {
            'Head': ((0, -0.25, 0.75), lambda x, y, z: z > 0.76 and y < 0.05),
            'Tail': ((0, 0.42, 0.6), lambda x, y, z: y > 0.45),
            'LegFL': ((0.12, -0.25, 0.4), lambda x, y, z: x >= 0 and z < 0.32 and y < 0.0),
            'LegFR': ((-0.12, -0.25, 0.4), lambda x, y, z: x < 0 and z < 0.32 and y < 0.0),
            'LegBL': ((0.12, 0.3, 0.4), lambda x, y, z: x >= 0 and z < 0.32 and 0.0 <= y <= 0.45),
            'LegBR': ((-0.12, 0.3, 0.4), lambda x, y, z: x < 0 and z < 0.32 and 0.0 <= y <= 0.45),
        },
        'anchors': {'Hat': ('Head', (0, -0.3, 1.28)), 'Face': ('Head', (0, -0.66, 1.08)),
                    'Neck': ('Body', (0, -0.3, 0.72)), 'Back': ('Body', (0, 0.1, 0.76))},
        'headR': 0.3, 'eyeX': 0.11,
        'body': ['#fc6e0c', '#f86b0a', '#f86e0e', '#f6924c'], 'accent': ['#fcece4', '#fcefe8'],
        'keep': ['#101111', '#0b0b0b', '#4a2914', '#ffffff'],
    },
    'frog': {
        'height': 1.3,
        'bones': {
            'Head': ((0, -0.2, 0.75), lambda x, y, z: z > 0.75),
            'LegFL': ((0.2, -0.35, 0.55), lambda x, y, z: x > 0.12 and y < -0.15 and z < 0.6),
            'LegFR': ((-0.2, -0.35, 0.55), lambda x, y, z: x < -0.12 and y < -0.15 and z < 0.6),
            'LegBL': ((0.32, 0.15, 0.35), lambda x, y, z: x > 0.25 and y >= -0.15 and z < 0.55),
            'LegBR': ((-0.32, 0.15, 0.35), lambda x, y, z: x < -0.25 and y >= -0.15 and z < 0.55),
        },
        'anchors': {'Hat': ('Head', (0, -0.15, 1.12)), 'Face': ('Head', (0, -0.42, 1.16)),
                    'Neck': ('Body', (0, -0.3, 0.7)), 'Back': ('Body', (0, 0.25, 0.75))},
        'headR': 0.42, 'eyeX': 0.22,
        'body': ['#88c721', '#88c420', '#85c51f', '#86c61f', '#7ab31e'], 'accent': ['#bde153', '#d8ee7a'],
        'keep': ['#000000', '#ffffff', '#202020'],
    },
    'griffin': {
        'height': 1.45,
        'bones': {
            'Head': ((0, -0.3, 0.85), lambda x, y, z: y < -0.2 and z > 0.85 and abs(x) < 0.4),
            'WingL': ((0.35, 0.0, 0.95), lambda x, y, z: x > 0.45 and z > 0.5),
            'WingR': ((-0.35, 0.0, 0.95), lambda x, y, z: x < -0.45 and z > 0.5),
            'Tail': ((0, 0.55, 0.55), lambda x, y, z: 0.58 < y <= 0.95),
            'Tail2': ((0, 0.95, 0.3), lambda x, y, z: y > 0.95),
            'LegFL': ((0.15, -0.3, 0.55), lambda x, y, z: x >= 0 and z < 0.5 and y < -0.05),
            'LegFR': ((-0.15, -0.3, 0.55), lambda x, y, z: x < 0 and z < 0.5 and y < -0.05),
            'LegBL': ((0.18, 0.35, 0.55), lambda x, y, z: x >= 0 and z < 0.5 and -0.05 <= y <= 0.58),
            'LegBR': ((-0.18, 0.35, 0.55), lambda x, y, z: x < 0 and z < 0.5 and -0.05 <= y <= 0.58),
        },
        'parents': {'Tail2': 'Tail'},
        'anchors': {'Hat': ('Head', (0, -0.3, 1.33)), 'Face': ('Head', (0, -0.52, 1.12)),
                    'Neck': ('Body', (0, -0.3, 0.8)), 'Back': ('Body', (0, 0.15, 0.95))},
        'headR': 0.27, 'eyeX': 0.1,
        'body': ['#cb8734', '#dd973b', '#d08e38', '#d89238', '#aa6e28'], 'accent': ['#f9e3c4', '#fbede0', '#fdf1e3', '#f4d4a2'],
        'keep': ['#f1b345', '#050505', '#6b3a1a'],
    },
    'bat': {
        'height': 1.5,
        'bones': {
            'Head': ((0, 0, 0.9), lambda x, y, z: z > 0.92 and abs(x) < 0.45),
            'WingL': ((0.3, 0.05, 0.75), lambda x, y, z: x > 0.33 and 0.25 < z < 1.0),
            'WingR': ((-0.3, 0.05, 0.75), lambda x, y, z: x < -0.33 and 0.25 < z < 1.0),
            'LegL': ((0.1, 0, 0.3), lambda x, y, z: x >= 0 and z < 0.22 and abs(x) < 0.33),
            'LegR': ((-0.1, 0, 0.3), lambda x, y, z: x < 0 and z < 0.22 and abs(x) < 0.33),
        },
        'anchors': {'Hat': ('Head', (0, -0.05, 1.3)), 'Face': ('Head', (0, -0.27, 1.12)),
                    'Neck': ('Body', (0, -0.02, 0.88)), 'Back': ('Body', (0, 0.15, 0.7))},
        'headR': 0.25, 'eyeX': 0.08,
        'body': ['#472929', '#492e2f', '#4a2b2e', '#45292a', '#553137', '#402426', '#743b53', '#774157'],
        'accent': ['#d6b7a6', '#c9a594'], 'keep': ['#000000', '#ffffff'],
    },
    'chameleon': {
        'height': 1.3,
        'bones': {
            'Head': ((0, -0.35, 0.75), lambda x, y, z: y < -0.42 and z > 0.45),
            'Tail': ((0, 0.5, 0.55), lambda x, y, z: y > 0.55),
            'LegFL': ((0.2, -0.35, 0.4), lambda x, y, z: x >= 0 and z < 0.38 and y < 0.0),
            'LegFR': ((-0.2, -0.35, 0.4), lambda x, y, z: x < 0 and z < 0.38 and y < 0.0),
            'LegBL': ((0.2, 0.3, 0.4), lambda x, y, z: x >= 0 and z < 0.38 and 0.0 <= y <= 0.55),
            'LegBR': ((-0.2, 0.3, 0.4), lambda x, y, z: x < 0 and z < 0.38 and 0.0 <= y <= 0.55),
        },
        'anchors': {'Hat': ('Head', (0, -0.6, 1.0)), 'Face': ('Head', (0, -0.82, 0.82)),
                    'Neck': ('Body', (0, -0.4, 0.55)), 'Back': ('Body', (0, 0.05, 0.95))},
        'headR': 0.3, 'eyeX': 0.2,
        'body': ['#81b724', '#70a518', '#7bb11f', '#7fb423', '#76ac1b', '#629216', '#95c439'],
        'accent': ['#e7f79d', '#d4ec80'], 'keep': ['#000000', '#ffffff'],
    },
    'cheetah': {
        'height': 1.5,
        'bones': {
            'Head': ((0, -0.5, 1.0), lambda x, y, z: z > 1.0 and y < -0.25),
            'Tail': ((0, 0.35, 0.6), lambda x, y, z: 0.38 < y <= 0.8),
            'Tail2': ((0, 0.8, 0.3), lambda x, y, z: y > 0.8),
            'LegFL': ((0.12, -0.45, 0.5), lambda x, y, z: x >= 0 and z < 0.48 and y < -0.1),
            'LegFR': ((-0.12, -0.45, 0.5), lambda x, y, z: x < 0 and z < 0.48 and y < -0.1),
            'LegBL': ((0.12, 0.25, 0.5), lambda x, y, z: x >= 0 and z < 0.48 and -0.1 <= y <= 0.38),
            'LegBR': ((-0.12, 0.25, 0.5), lambda x, y, z: x < 0 and z < 0.48 and -0.1 <= y <= 0.38),
        },
        'parents': {'Tail2': 'Tail'},
        'anchors': {'Hat': ('Head', (0, -0.55, 1.42)), 'Face': ('Head', (0, -0.8, 1.24)),
                    'Neck': ('Body', (0, -0.5, 0.92)), 'Back': ('Body', (0, 0.0, 0.9))},
        'headR': 0.27, 'eyeX': 0.1,
        'body': ['#fbc119', '#fac11d', '#f8c122', '#fbc51f', '#cc9e22'], 'accent': ['#fee8c6', '#fbe7c7', '#fdeac9', '#f8dda2'],
        'keep': ['#26120b', '#000000', '#ffffff'],
    },
    'eagle': {
        'height': 1.6,
        'bones': {
            'Head': ((0, 0, 1.15), lambda x, y, z: z > 1.18 and abs(x) < 0.35),
            'WingL': ((0.3, 0.05, 1.0), lambda x, y, z: x > 0.38 and z > 0.45),
            'WingR': ((-0.3, 0.05, 1.0), lambda x, y, z: x < -0.38 and z > 0.45),
            'Tail': ((0, 0.1, 0.45), lambda x, y, z: y > 0.15 and z < 0.55 and abs(x) < 0.38),
            'LegL': ((0.1, 0, 0.4), lambda x, y, z: x >= 0 and z < 0.25 and y < 0.1),
            'LegR': ((-0.1, 0, 0.4), lambda x, y, z: x < 0 and z < 0.25 and y < 0.1),
        },
        'anchors': {'Hat': ('Head', (0, 0, 1.55)), 'Face': ('Head', (0, -0.3, 1.4)),
                    'Neck': ('Body', (0, -0.02, 1.12)), 'Back': ('Body', (0, 0.2, 0.9))},
        'headR': 0.24, 'eyeX': 0.1,
        'body': ['#532917', '#562a18', '#5a2e1a', '#572d19', '#4e2414', '#8b6037'], 'accent': ['#f7f5f6', '#f6f3f2', '#f9f8f7'],
        'keep': ['#f9c856', '#050505'],
    },
    'elephant': {
        'height': 1.6,
        'bones': {
            'Trunk': ((0, -0.9, 0.9), lambda x, y, z: y < -0.85 and z < 0.95),
            'EarL': ((0.4, -0.45, 1.15), lambda x, y, z: x > 0.45 and z > 0.8 and y < -0.2),
            'EarR': ((-0.4, -0.45, 1.15), lambda x, y, z: x < -0.45 and z > 0.8 and y < -0.2),
            'Head': ((0, -0.45, 1.0), lambda x, y, z: y < -0.45 and z > 0.62),
            'Tail': ((0, 0.85, 0.75), lambda x, y, z: y > 0.82),
            'LegFL': ((0.25, -0.35, 0.6), lambda x, y, z: x >= 0 and z < 0.55 and -0.6 < y < 0.05),
            'LegFR': ((-0.25, -0.35, 0.6), lambda x, y, z: x < 0 and z < 0.55 and -0.6 < y < 0.05),
            'LegBL': ((0.25, 0.45, 0.6), lambda x, y, z: x >= 0 and z < 0.55 and 0.05 <= y < 0.8),
            'LegBR': ((-0.25, 0.45, 0.6), lambda x, y, z: x < 0 and z < 0.55 and 0.05 <= y < 0.8),
        },
        'parents': {'Trunk': 'Head', 'EarL': 'Head', 'EarR': 'Head'},
        'anchors': {'Hat': ('Head', (0, -0.62, 1.44)), 'Face': ('Head', (0, -0.9, 1.25)),
                    'Neck': ('Body', (0, -0.5, 0.95)), 'Back': ('Body', (0, 0.25, 1.35))},
        'headR': 0.38, 'eyeX': 0.17,
        'body': ['#6a696f', '#6b6a70', '#6c6b72', '#6f6e74', '#5c5b60'], 'accent': ['#a6a1a2', '#bdb8b8'],
        'keep': ['#000000', '#ffffff'],
    },
}


def hexrgb(h):
    h = h.lstrip('#')
    return [int(h[i:i + 2], 16) / 255 for i in (0, 2, 4)]


def select_only(o):
    bpy.ops.object.select_all(action='DESELECT')
    o.select_set(True)
    bpy.context.view_layer.objects.active = o


def prepare(aid):
    cfg = ANIMALS[aid]
    bpy.ops.wm.read_factory_settings(use_empty=True)
    bpy.ops.import_scene.gltf(filepath=os.path.join(SRC, aid + '.glb'))
    meshes = [o for o in bpy.data.objects if o.type == 'MESH']
    select_only(meshes[0])
    for m in meshes[1:]:
        m.select_set(True)
    if len(meshes) > 1:
        bpy.ops.object.join()
    o = bpy.context.object
    o.name = aid
    bpy.ops.object.transform_apply(location=True, rotation=True, scale=True)
    # weld the loose pieces Meshy leaves along texture seams, so the skin bends without gaps
    bm = bmesh.new()
    bm.from_mesh(o.data)
    before = len(bm.verts)
    bmesh.ops.remove_doubles(bm, verts=bm.verts, dist=0.0005)
    print('WELD', before, '->', len(bm.verts))
    bm.to_mesh(o.data)
    bm.free()

    # 1. fewer triangles, then stand it up at the right size
    tris = sum(len(p.vertices) - 2 for p in o.data.polygons)
    if tris > TRIS:
        d = o.modifiers.new('dec', 'DECIMATE')
        d.ratio = TRIS / tris
        bpy.ops.object.modifier_apply(modifier='dec')
    vs = [v.co for v in o.data.vertices]
    zmin, zmax = min(v.z for v in vs), max(v.z for v in vs)
    s = cfg['height'] / (zmax - zmin)
    feet = [v for v in vs if v.z < zmin + 0.12 * (zmax - zmin)]
    cx, cy = sum(v.x for v in feet) / len(feet), sum(v.y for v in feet) / len(feet)
    for v in o.data.vertices:
        v.co = Vector(((v.co.x - cx) * s, (v.co.y - cy) * s, (v.co.z - zmin) * s))

    # 2. one simple material with the color texture only
    old = o.data.materials[0]
    bsdf = [n for n in old.node_tree.nodes if n.type == 'BSDF_PRINCIPLED'][0]
    img = bsdf.inputs['Base Color'].links[0].from_node.image
    img.scale(TEX, TEX)
    mat = bpy.data.materials.new('Skin')
    mat.use_nodes = True
    nb = mat.node_tree.nodes['Principled BSDF']
    nb.inputs['Roughness'].default_value = 0.85
    nb.inputs['Metallic'].default_value = 0.0
    tex = mat.node_tree.nodes.new('ShaderNodeTexImage')
    tex.image = img
    mat.node_tree.links.new(tex.outputs['Color'], nb.inputs['Base Color'])
    o.data.materials.clear()
    o.data.materials.append(mat)

    # 5. color mask from the texture: nearest of the main / accent / keep colors
    px = np.array(img.pixels[:], dtype=np.float32).reshape(TEX, TEX, 4)[:, :, :3]
    refs, labels = [], []
    for k, lab in (('body', 0), ('accent', 1), ('keep', 2)):
        for h in cfg[k]:
            refs.append(hexrgb(h))
            labels.append(lab)
    refs = np.array(refs, dtype=np.float32)
    dist = ((px[:, :, None, :] - refs[None, None, :, :]) ** 2).sum(-1)
    cls = np.array(labels)[dist.argmin(-1)]
    lum = px @ np.array([0.299, 0.587, 0.114], dtype=np.float32)
    body_lum = float(lum[cls == 0].mean()) if (cls == 0).any() else 0.5
    acc_lum = float(lum[cls == 1].mean()) if (cls == 1).any() else 0.5
    mask = np.zeros((TEX, TEX, 4), dtype=np.float32)
    mask[:, :, 0] = cls == 0
    mask[:, :, 1] = cls == 1
    mask[:, :, 3] = 1
    mimg = bpy.data.images.new(aid + '_mask', TEX, TEX)
    mimg.pixels = mask.ravel()
    os.makedirs(OUT, exist_ok=True)
    mimg.filepath_raw = os.path.abspath(os.path.join(OUT, aid + '_mask.png'))
    mimg.file_format = 'PNG'
    mimg.save()
    print('MASK body %.0f%% accent %.0f%%' % ((cls == 0).mean() * 100, (cls == 1).mean() * 100))

    # 3. skeleton: every bone points backwards (+Y) so its axes line up with the model's
    arm_data = bpy.data.armatures.new(aid + '_rig')
    arm = bpy.data.objects.new('Rig', arm_data)
    bpy.context.scene.collection.objects.link(arm)
    select_only(arm)
    bpy.ops.object.mode_set(mode='EDIT')
    eb = arm_data.edit_bones
    root = eb.new('Body')
    root.head, root.tail = Vector((0, 0, cfg['height'] * 0.45)), Vector((0, 0.2, cfg['height'] * 0.45))
    for name, (pos, _) in cfg['bones'].items():
        b = eb.new(name)
        b.head = Vector(pos)
        b.tail = Vector(pos) + Vector((0, 0.15, 0))
        b.roll = 0
    for name in cfg['bones']:
        eb[name].parent = eb[cfg.get('parents', {}).get(name, 'Body')]
    bpy.ops.object.mode_set(mode='OBJECT')

    # which vertices move with which bone (first matching rule wins), then soften the seams
    names = ['Body'] + list(cfg['bones'])
    nv = len(o.data.vertices)
    W = np.zeros((nv, len(names)), dtype=np.float32)
    for v in o.data.vertices:
        x, y, z = v.co
        owner = 0
        for i, (name, (_, rule)) in enumerate(cfg['bones'].items()):
            if rule(x, y, z):
                owner = i + 1
                break
        W[v.index, owner] = 1.0
    # soften: blend each vertex with its neighbours a few times
    ed = np.array([e.vertices[:] for e in o.data.edges], dtype=np.int64)
    deg = np.bincount(ed.ravel(), minlength=nv).astype(np.float32)[:, None]
    for _ in range(3):
        acc = np.zeros_like(W)
        np.add.at(acc, ed[:, 0], W[ed[:, 1]])
        np.add.at(acc, ed[:, 1], W[ed[:, 0]])
        W = 0.5 * W + 0.5 * np.where(deg > 0, acc / np.maximum(deg, 1), W)
    W /= W.sum(1, keepdims=True)
    if W.shape[1] > 3:
        cut = np.sort(W, 1)[:, -3][:, None]
        W = np.where(W >= cut, W, 0)
        W /= W.sum(1, keepdims=True)
    for i, n in enumerate(names):
        g = o.vertex_groups.new(name=n)
        for vi in np.nonzero(W[:, i] > 0.01)[0]:
            g.add([int(vi)], float(W[vi, i]), 'REPLACE')
    o.parent = arm
    mod = o.modifiers.new('rig', 'ARMATURE')
    mod.object = arm

    # 4. wearable points, attached to bones
    for name, (bone, pos) in cfg['anchors'].items():
        e = bpy.data.objects.new(name, None)
        bpy.context.scene.collection.objects.link(e)
        e.parent = arm
        e.parent_type = 'BONE'
        e.parent_bone = bone
        bpy.context.view_layer.update()
        e.matrix_world = e.matrix_world.Translation(Vector(pos))
    arm['headR'] = cfg['headR']
    arm['eyeX'] = cfg['eyeX']
    arm['bodyLum'] = round(body_lum, 4)
    arm['accLum'] = round(acc_lum, 4)

    for p in o.data.polygons:
        p.use_smooth = True
    select_only(arm)
    bpy.ops.export_scene.gltf(filepath=os.path.abspath(os.path.join(OUT, aid + '.glb')), export_format='GLB',
                              export_extras=True, export_skins=True, export_animations=False, export_yup=True,
                              export_image_format='JPEG', export_jpeg_quality=88, export_apply=False)
    print('DONE', aid, 'tris', sum(len(p.vertices) - 2 for p in o.data.polygons), 'bodyLum', round(body_lum, 3), 'accLum', round(acc_lum, 3))


if __name__ == '__main__':
    ids = sys.argv[sys.argv.index('--') + 1:] if '--' in sys.argv else list(ANIMALS)
    for aid in ids:
        prepare(aid)
