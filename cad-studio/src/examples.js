// Example parts that show how features are built step by step.
const base = (name, extra) => ({ app: 'Pathway CAD', version: 1, name, material: 'pla', color: '#8fb3c9', rollback: null, nextId: 500, ...extra });

export const EXAMPLES = [
  {
    title: 'Mounting bracket',
    about: 'An L-shaped bracket: sketch on the front plane, extrude both ways, round the inside corner, add bolt holes and a pattern. Sizes come from parameters.',
    doc: base('Bracket', {
      material: 'aluminum', color: '#b9c3cc',
      params: [
        { name: 'len', expr: 60, note: 'base length' },
        { name: 'height', expr: 50, note: 'upright height' },
        { name: 'thick', expr: 5, note: 'metal thickness' },
        { name: 'width', expr: 40, note: 'bracket width' },
        { name: 'bolt', expr: 6, note: 'bolt hole size' },
      ],
      features: [
        { id: 'f1', type: 'sketch', name: 'Sketch1', plane: 'XZ', offset: 0, entities: [
          { id: 'e1', type: 'line', x1: 0, y1: 0, x2: 'len', y2: 0 },
          { id: 'e2', type: 'line', x1: 'len', y1: 0, x2: 'len', y2: 'thick' },
          { id: 'e3', type: 'line', x1: 'len', y1: 'thick', x2: 'thick', y2: 'thick' },
          { id: 'e4', type: 'line', x1: 'thick', y1: 'thick', x2: 'thick', y2: 'height' },
          { id: 'e5', type: 'line', x1: 'thick', y1: 'height', x2: 0, y2: 'height' },
          { id: 'e6', type: 'line', x1: 0, y1: 'height', x2: 0, y2: 0 },
        ] },
        { id: 'f2', type: 'extrude', name: 'Extrusion1', sketch: 'f1', distance: 'width', extent: 'distance', direction: 'both', op: 'new', taper: 0 },
        { id: 'f3', type: 'fillet', name: 'Fillet1', radius: 4, allEdges: false, edges: [[5, 0, 5]] },
        { id: 'f4', type: 'hole', name: 'Hole1', origin: [40, -10, 5], normal: [0, 0, 1], diameter: 'bolt', extent: 'through', depth: 10, style: 'counterbore', cbDiameter: 'bolt*1.8', cbDepth: 2 },
        { id: 'f5', type: 'pattern', kind: 'rect', name: 'RectangularPattern1', features: ['f4'], d1: 'Y', n1: 2, s1: 20, d2: 'X', n2: 1, s2: 10 },
        { id: 'f6', type: 'hole', name: 'Hole2', origin: [5, 0, 33], normal: [1, 0, 0], diameter: 'bolt', extent: 'through', depth: 10, style: 'simple', cbDiameter: 10, cbDepth: 3 },
      ],
    }),
  },
  {
    title: 'Wheel hub',
    about: 'A lathe-style part: a profile drawn beside a construction axis is revolved, then bolt holes are copied around in a circle.',
    doc: base('Wheel hub', {
      color: '#e0a458',
      params: [
        { name: 'bore', expr: 10, note: 'axle hole diameter' },
        { name: 'dia', expr: 80, note: 'wheel diameter' },
        { name: 'bolts', expr: 5, note: 'number of bolt holes' },
      ],
      features: [
        { id: 'f1', type: 'sketch', name: 'Sketch1', plane: 'XZ', offset: 0, entities: [
          { id: 'ax', type: 'line', x1: 0, y1: -5, x2: 0, y2: 30, construction: true },
          { id: 'r1', type: 'rect', x: 'bore/2', y: 0, w: 'dia/2 - bore/2', h: 8 },
          { id: 'r2', type: 'rect', x: 'bore/2', y: 0, w: 8, h: 25 },
        ] },
        { id: 'f2', type: 'revolve', name: 'Revolution1', sketch: 'f1', axis: 'ax', angle: 360, op: 'new' },
        { id: 'f3', type: 'hole', name: 'Hole1', origin: [27, 0, 8], normal: [0, 0, 1], diameter: 6, extent: 'through', depth: 10, style: 'simple', cbDiameter: 10, cbDepth: 3 },
        { id: 'f4', type: 'pattern', kind: 'circ', name: 'CircularPattern1', features: ['f3'], axis: 'Z', n: 'bolts', angle: 360 },
        { id: 'f5', type: 'chamfer', name: 'Chamfer1', radius: 1, allEdges: true, edges: [], suppressed: true },
      ],
    }),
  },
  {
    title: 'Key tag',
    about: 'A 3D-printable tag: a rectangle extruded 3 mm, rounded corners, a key-ring hole and a shallow slot cut into the top on an offset sketch plane.',
    doc: base('Key tag', {
      color: '#6cc3a0',
      params: [
        { name: 'W', expr: 50, note: 'length' },
        { name: 'H', expr: 25, note: 'height' },
        { name: 'T', expr: 3, note: 'thickness' },
      ],
      features: [
        { id: 'f1', type: 'sketch', name: 'Sketch1', plane: 'XY', offset: 0, entities: [
          { id: 'e1', type: 'rect', x: '-W/2', y: '-H/2', w: 'W', h: 'H' },
        ] },
        { id: 'f2', type: 'extrude', name: 'Extrusion1', sketch: 'f1', distance: 'T', extent: 'distance', direction: 'normal', op: 'new', taper: 0 },
        { id: 'f3', type: 'fillet', name: 'Fillet1', radius: 5, allEdges: false, edges: [[25, 12.5, 1.5], [-25, 12.5, 1.5], [25, -12.5, 1.5], [-25, -12.5, 1.5]] },
        { id: 'f4', type: 'hole', name: 'Hole1', origin: [-18, 0, 3], normal: [0, 0, 1], diameter: 5, extent: 'through', depth: 10, style: 'simple', cbDiameter: 9, cbDepth: 3 },
        { id: 'f5', type: 'sketch', name: 'Sketch2', plane: 'XY', offset: 'T', entities: [
          { id: 's1', type: 'slot', x1: -6, y1: 0, x2: 17, y2: 0, w: 10 },
        ] },
        { id: 'f6', type: 'extrude', name: 'Extrusion2', sketch: 'f5', distance: 1, extent: 'distance', direction: 'reverse', op: 'cut', taper: 0 },
      ],
    }),
  },
  {
    title: 'Pencil cup',
    about: 'A hexagon extruded into a tall prism, then hollowed with Shell (the top face is left open) and given a chamfered rim.',
    doc: base('Pencil cup', {
      color: '#8b9cf0',
      params: [{ name: 'size', expr: 40, note: 'corner radius of the hexagon' }, { name: 'tall', expr: 95, note: 'height' }],
      features: [
        { id: 'f1', type: 'sketch', name: 'Sketch1', plane: 'XY', offset: 0, entities: [
          { id: 'p1', type: 'polygon', cx: 0, cy: 0, r: 'size', n: 6, rot: 0 },
        ] },
        { id: 'f2', type: 'extrude', name: 'Extrusion1', sketch: 'f1', distance: 'tall', extent: 'distance', direction: 'normal', op: 'new', taper: 3 },
        { id: 'f3', type: 'shell', name: 'Shell1', thickness: 2.5, faces: [[0, 0, 95]] },
      ],
    }),
  },
];
