// Character art (sprite sheets) for fighters drawn from real artwork instead of the cartoon body.
// Each frame: [x, y, width, height, anchorX, anchorY] in the atlas image; the anchor is the point
// between the feet (under the head), so poses line up when they swap.
// Rows (4 poses each) come from the artist's labeled sheets; tools/slice_patty.py rebuilds them.
window.MM = window.MM || {};
MM.SPRITES = MM.SPRITES || {};

MM.SPRITES.patty = {
  src: 'img/patty-atlas.webp',
  standH: 184, // atlas height of a standing pose
  frames: {
    idle2: [0, 0, 88, 186, 42.7, 186.0],
    idle1: [92, 0, 87, 185, 46.3, 185.4],
    idle3: [183, 0, 88, 184, 50.2, 184.1],
    idle0: [275, 0, 88, 184, 49.7, 183.5],
    run1: [367, 0, 126, 174, 88.0, 173.6],
    run2: [497, 0, 154, 159, 99.3, 159.3],
    run0: [655, 0, 136, 169, 99.8, 168.6],
    run3: [795, 0, 107, 169, 74.3, 168.6],
    jump2: [906, 0, 121, 143, 69.9, 142.6],
    jump1: [1031, 0, 108, 168, 69.1, 168.0],
    jump3: [1143, 0, 110, 163, 72.7, 163.1],
    jump0: [1257, 0, 102, 134, 79.4, 133.9],
    hurt1: [1363, 0, 130, 175, 40.2, 175.5],
    hurt0: [1497, 0, 113, 174, 53.3, 173.6],
    hurt2: [1614, 0, 167, 144, 46.6, 143.8],
    hurt3: [1785, 0, 179, 129, 50.9, 129.0],
    ring1: [0, 190, 161, 183, 78.7, 182.9],
    ring3: [165, 190, 124, 181, 51.4, 181.0],
    ring0: [293, 190, 115, 177, 68.4, 176.7],
    ring2: [412, 190, 184, 175, 84.4, 174.8],
    drop1: [600, 190, 126, 182, 81.1, 182.3],
    drop0: [730, 190, 110, 164, 74.5, 164.3],
    drop3: [844, 190, 118, 161, 75.9, 160.6],
    drop2: [966, 190, 183, 156, 99.1, 155.6],
    kick1: [1153, 190, 119, 174, 68.3, 155.6],
    kick2: [1276, 190, 198, 146, 86.7, 146.3],
    kick3: [1478, 190, 142, 155, 83.4, 155.0],
    kick0: [1624, 190, 113, 151, 82.0, 151.3],
    shove1: [1741, 190, 145, 179, 73.9, 178.6],
    shove2: [0, 377, 209, 179, 94.9, 179.2],
    shove3: [213, 377, 113, 178, 64.4, 177.9],
    shove0: [330, 377, 118, 177, 63.1, 176.7],
    toss3: [452, 377, 100, 183, 58.3, 182.9],
    toss0: [556, 377, 84, 179, 58.1, 179.2],
    toss2: [644, 377, 157, 175, 86.9, 174.8],
    toss1: [805, 377, 144, 176, 46.5, 176.1],
    cart3: [953, 377, 159, 179, 99.4, 179.2],
    cart0: [1116, 377, 192, 172, 92.0, 172.4],
    cart1: [1312, 377, 172, 171, 90.6, 171.1],
    cart2: [1488, 377, 161, 164, 71.2, 164.3],
    deliver2: [1653, 377, 147, 185, 74.4, 185.4],
    deliver1: [1804, 377, 132, 177, 95.9, 164.9],
    deliver3: [0, 566, 131, 141, 89.4, 140.7],
    deliver0: [135, 566, 115, 130, 85.7, 129.6],
    pack3: [254, 566, 100, 181, 50.5, 181.0],
    pack1: [358, 566, 151, 180, 74.3, 179.8],
    pack0: [513, 566, 99, 177, 62.1, 177.3],
    pack2: [616, 566, 118, 175, 83.0, 175.5],
    parcel: [738, 566, 39, 32, 19.2, 16.1],
    dog0: [781, 566, 60, 53, 29.8, 52.1],
    dog1: [845, 566, 58, 64, 28.8, 62.6],
    dog2: [907, 566, 42, 64, 20.8, 62.6]
  },
  // which pose rows each move uses (4 poses: windup, hit, follow-through, recover)
  moves: { jab: 'ring', side: 'shove', down: 'drop', up: 'drop', nair: 'kick', fair: 'kick', uair: 'drop', dair: 'kick',
           neutral: 'toss', sideSpecial: 'cart', upSpecial: 'deliver', downSpecial: 'pack' },
};
