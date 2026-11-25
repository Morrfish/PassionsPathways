# Cuts an artist's labeled pose sheets (4 poses per row) into one packed sprite atlas for Morris Mayhem.
# Works with ChatGPT's sheets: drops the title banner, row labels on the left, the yellow name tags
# under each pose, and the near-invisible colored fringe pixels.
#
# usage: python3 -I tools/slice_sprites.py <character> <art dir> <out dir>
# Output: <out>/<character>-atlas.webp and <out>/<character>-frames.json (paste into src/js/sprites.js).
import os, sys, json, numpy as np
from PIL import Image
from scipy import ndimage as nd

CHARACTERS = {
    'jeffery': {
        'scale': 0.62,
        'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['onetwo', 'catch', 'boot', 'reel'],
            'specials.png': ['fish', 'buck', 'stand', 'cover'],
        },
        # bits that become their own projectiles: name, sheet, crop box (x0, y0, x1, y1)
        'props': [('bobber', 'attacks.png', None)],
    },
    # Mandi's two outfits are two atlases; each also takes its own rows of the shared ultimate sheet.
    'mandi-witch': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['brush', 'says', 'boot', 'rules'],
            'specials.png': ['trick', 'salon', 'broom', 'whirl'],
        },
        # thrown/placed things: name, sheet, a point inside the thing (sheet px); removed from the pose
        'props': [('pumpkin', 'specials.png', (990, 105)), ('dryer', 'specials.png', (1200, 540))],
    },
    'jadden': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['combo', 'header', 'sweep', 'volley'],
            'aerials.png': ['uair', 'stomp', 'round', 'back'],
            'specials.png': ['hail', 'drive', 'leap', 'ice'],
        },
        'props': [('football', 'specials.png', (990, 88))],
        'cutcols': {'aerials.png': [(695, 60, 400)]},  # up-air poses touch through their glow: x, y0, y1
    },
    'courtnee': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['click', 'upper', 'battery', 'reboot'],
            'aerials.png': ['acombo', 'upload', 'crash', 'round'],
            'specials.png': ['hameha', 'rush', 'takeoff', 'saiyan'],
            'defense.png': ['def', None, 'bair', None],
            'ultimate.png': ['asm', 'ult', 'ret', 'pers'],
            'effects.png': {'rows': ['fx', None, 'tech', 'aura'], 'cols': [0, 320, 630, 970, 9999]},
        },
        'props': [],
    },
    'courtnee-super': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'smove.png': ['idle', 'run', 'jump', 'hurt'],
            'sattacks.png': ['click', 'upper', 'battery', 'reboot'],
            'saerials.png': ['acombo', 'upload', 'crash', 'round'],
            'sspecials.png': ['hameha', 'rush', 'takeoff', 'down'],
            'defense.png': [None, 'def', None, 'bair'],
            'effects.png': {'rows': [None, 'fx', None, 'aura'], 'cols': [0, 320, 630, 970, 9999]},
        },
        'props': [],
    },
    'megan': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['hit', 'chapter', 'beat', 'ret'],
            'aerials.png': ['page', 'note', 'drop', 'fan'],
            'specials.png': ['twist', 'pounce', 'encore', 'nap'],
            'krillin.png': {'rows': ['krun', 'kpounce', 'kstate', 'prop'], 'cols': [165, 415, 695, 975, 9999]},
            'defense.png': {'rows': ['def', 'bair'], 'cols': [240, 600, 990, 1380, 9999]},
            'ultimate.png': {'rows': ['ult', 'pers'], 'cols': [200, 540, 880, 1390, 9999]},
        },
        'props': [],
        'cutcols': {'ultimate.png': [(870, 70, 420)]},
        'cutrows': {'ultimate.png': [72]},  # glows reach up into the title banner
        'mainonly': {'specials.png': ['pounce']},  # the baked cat is drawn separately as Krillin
    },
    'siren': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['pop', 'rain', 'sweep', 'toss'],
            'aerials.png': ['doodle', 'sky', 'boots', 'spin'],
            'specials.png': ['sketch', 'blitz', 'note', 'mac'],
            'props.png': {'rows': ['drag', 'bprop', 'aprop', 'mprop'], 'cols': [165, 420, 700, 1000, 9999]},
            'defense.png': {'rows': ['def', 'bair'], 'cols': [220, 520, 920, 1400, 9999]},
            'ultimate.png': {'rows': ['ult', 'pers'], 'cols': [200, 470, 860, 1395, 9999]},
        },
        'props': [],
        'cutcols': {'ultimate.png': [(1395, 70, 420), (860, 70, 420)], 'specials.png': [(415, 70, 330), (695, 70, 330), (975, 70, 330)]},
        'cutrows': {'ultimate.png': [72], 'specials.png': [68]},
        # these two sheets have no name tags under the poses: row bands (y0, y1) given by hand
        'rowbands': {'attacks.png': [(60, 325), (325, 600), (600, 872), (872, 1199)],
                     'aerials.png': [(60, 325), (325, 600), (600, 872), (872, 1199)]},
        'mainonly': {'specials.png': ['sketch']},  # the dragon is drawn separately when it springs out
    },
    'mandi-mermaid': {
        'scale': 0.62, 'cols': [165, 415, 695, 975, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['shell', 'tide', 'fin', 'dive'],
            'specials.png': ['bubble', 'wave', 'surface', 'whirl'],
        },
        'props': [('bubbleball', 'specials.png', (968, 128))],
    },
    # Codee: no name tags under poses (labels on the left), so rows are given by hand. Shared sheets
    # (defense, transformation, ultimate) give each form its own rows.
    'codee': {
        'scale': 0.62, 'cols': [215, 470, 780, 1080, 9999],
        'sheets': {
            'codee-land-movement.png': ['idle', 'run', 'jump', 'hurt'],
            'codee-land-attacks.png': ['whack', 'rake', 'sod', 'yard'],
            'codee-land-aerials.png': ['hedge', 'branch', 'bootp', 'yspin'],
            'codee-land-specials.png': ['mulch', 'mow', 'leaf', 'mud'],
            'codee-defense.png': ['def', None, 'bair', None],
            'codee-transformation.png': ['mess', 'cup', None, 'ovl'],
            'codee-ultimate.png': ['ult', None, 'pers', None],
            'codee-props.png': {'rows': ['tool', 'ctool', 'fx', 'door'], 'cols': [20, 380, 730, 1080, 9999]},
        },
        'props': [],
        'cutrows': {'codee-land-specials.png': [846], 'codee-props.png': [1041]},  # leaf-blower boots touch the mud row; labels touch the door art
        'rowbands': {s: [(100, 362), (362, 610), (610, 846), (846, 1086)] for s in (
            'codee-land-movement.png', 'codee-land-attacks.png', 'codee-land-aerials.png', 'codee-land-specials.png',
            'codee-defense.png', 'codee-ultimate.png')} | {
            'codee-transformation.png': [(100, 395), (395, 649), (649, 919), (919, 1086)],
            'codee-props.png': [(95, 322), (363, 588), (628, 776), (818, 1043)]},
    },
    'codee-clean': {
        'scale': 0.62, 'cols': [215, 470, 780, 1080, 9999],
        'sheets': {
            'codee-clean-movement.png': ['idle', 'run', 'jump', 'hurt'],
            'codee-clean-attacks.png': ['sweep', 'duster', 'mop', 'trash'],
            'codee-clean-aerials.png': ['dbust', 'hdust', 'squeak', 'polish'],
            'codee-clean-specials.png': ['suds', 'patrol', 'vac', 'wet'],
            'codee-defense.png': [None, 'def', None, 'bair'],
            'codee-transformation.png': [None, None, 'back', None],
            'codee-ultimate.png': [None, 'ult', None, 'pers'],
            'codee-props.png': {'rows': ['tool', 'ctool', 'fx', 'door'], 'cols': [20, 380, 730, 1080, 9999]},  # foam/water patch live here too
        },
        'props': [],
        'cutrows': {'codee-props.png': [1041]},
        'rowbands': {s: [(100, 362), (362, 610), (610, 846), (846, 1086)] for s in (
            'codee-clean-movement.png', 'codee-clean-attacks.png', 'codee-clean-aerials.png', 'codee-clean-specials.png',
            'codee-defense.png', 'codee-ultimate.png')} | {
            'codee-transformation.png': [(100, 395), (395, 649), (649, 919), (919, 1086)],
            'codee-props.png': [(95, 322), (363, 588), (628, 776), (818, 1043)]},
    },
    # Haylie: labels on the left, no tags under the poses (except the ultimate sheet). The bear glows reach into
    # neighbouring cells, so the ultimate sheet gets column cuts; the thrown loaf is cut out as its own picture.
    'haylie': {
        'scale': 0.62, 'cols': [175, 390, 640, 900, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['arm', 'upgo', 'step', 'grab'],
            'aerials.png': ['reflex', 'reach', 'sky', 'feet'],
            'specials.png': ['bread', 'coming', 'gotyou', 'babies'],
            'ultimate.png': {'rows': ['ult', 'pers'], 'cols': [240, 540, 870, 1290, 9999]},
        },
        'props': [('loaf', 'specials.png', (915, 172))],
        'mainonly': {'specials.png': ['bread']},
        'cutrows': {'move.png': [705], 'aerials.png': [106, 114], 'ultimate.png': [470, 836]},  # touching poses / title / name tags
        'cutcols': {'ultimate.png': [(540, 60, 470), (870, 60, 470), (1290, 60, 470)]},
        'rowbands': {'move.png': [(105, 427), (427, 707), (707, 983), (983, 1300)],
                     'attacks.png': [(105, 431), (431, 737), (737, 986), (986, 1300)],
                     'aerials.png': [(105, 412), (412, 706), (706, 980), (980, 1300)],
                     'specials.png': [(105, 426), (426, 680), (680, 1004), (1004, 1300)],
                     'ultimate.png': [(60, 470), (470, 890)]},
    },
    # Sara: labels on the left, no tags under the poses; her tattoo effects come as separate pictures (extras),
    # so the baked-in rose / snakes / spider are dropped from the specials poses (mainonly).
    'sara': {
        'scale': 0.62, 'cols': [185, 390, 650, 900, 9999],
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': {'rows': ['edge', 'reaper', 'sweep', 'restraint'], 'cols': [185, 360, 620, 1000, 9999]},
            'aerials.png': {'rows': ['halo', 'lunge', 'reach', 'wdrop'], 'cols': [185, 380, 620, 960, 9999]},
            'specials.png': {'rows': ['roseshot', 'fang', 'lifeline', 'widow'], 'cols': [160, 315, 545, 890, 9999]},
            'ultimate.png': {'rows': ['ult', 'pers'], 'cols': [240, 480, 785, 1140, 9999]},
        },
        'props': [],
        'mainonly': {'specials.png': ['roseshot', 'fang', 'widow']},
        'cutcols': {'move.png': [(182, 990, 1312)]},  # her hand touches the HURT label
        'rowbands': {'move.png': [(72, 400), (400, 700), (700, 990), (990, 1312)],
                     'attacks.png': [(72, 400), (400, 760), (760, 1000), (1000, 1312)],
                     'aerials.png': [(72, 343), (343, 625), (625, 950), (950, 1312)],
                     'specials.png': [(112, 420), (420, 720), (720, 1010), (1010, 1312)],
                     'ultimate.png': [(72, 498), (546, 975)]},
        'extras': {'fxrose': 'fx-rose-shot.png', 'fxfang': 'fx-twin-fang.png', 'fxweb': 'fx-widow-web.png', 'fxlife': 'fx-lifeline.png',
                   'fxsignal': 'fx-dispatch-signal.png', 'fxpulse': 'fx-command-pulse.png', 'fxreaper': 'fx-reaper-rise.png', 'fxdagger': 'fx-rose-dagger.png'},
    },
    # Jorie, Jaxston, Evea: name boxes at the left of each row, found automatically
    'jorie': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['bonk', 'roadkick', 'whip', 'sweep'],
            'aerials.png': ['orbit', 'volley', 'skywhip', 'stomp'],
            'specials.png': ['drink', 'pedal', 'hop', 'tent'],
            'ultimate.png': ['ult', 'pers'],
            'rage-actions.png': ['cup', None, None, None],  # the transformation plays in his normal atlas
        },
        'extras': {'fxshock': 'fx-rage-shockwave.png', 'fxaura': 'fx-rage-aura.png', 'fxmilk': 'fx-milk-meter-icon.png',
                   'fxjug': 'fx-chocolate-milk-jug.png', 'fxdecoy': 'fx-cardboard-decoy.png', 'fxburst': 'fx-cardboard-burst.png',
                   'fxtent': 'fx-blue-tent.png', 'fxbike': 'fx-blue-bike.png'},
    },
    'jorie-rage': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'rage-move.png': ['idle', 'run', 'jump', 'hurt'],
            'rage-actions.png': ['xform', 'smash', 'clap', 'back'],
        },
        'extras': {'fxshock': 'fx-rage-shockwave.png', 'fxaura': 'fx-rage-aura.png'},
    },
    'jaxston': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['leftfoot', 'round', 'spin', 'csweep'],
            'aerials.png': ['airspin', 'skyvolley', 'bicycle', 'meteor'],
            'specials.png': ['launch', 'cleat', 'tornado', 'clutter'],
            'ultimate.png': ['ult', 'pers'],
        },
        'extras': {'fxball': 'fx-soccerball.png', 'fxcone': 'fx-training-cone.png', 'fxarc': 'fx-kick-arc.png', 'fximpact': 'fx-impact-burst.png',
                   'fxfire0': 'fx-fireball-01.png', 'fxfire1': 'fx-fireball-02.png', 'fxfire2': 'fx-fireball-03.png', 'fxfire3': 'fx-fireball-04.png'},
    },
    # Jaxston facing left: drawn as-is (not mirrored) so he still kicks with his LEFT foot
    'jaxston-left': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['leftfoot', 'round', 'spin', 'csweep'],
            'aerials.png': ['airspin', 'skyvolley', 'bicycle', 'meteor'],
            'specials.png': ['launch', 'cleat', 'tornado', 'clutter'],
            'ultimate.png': ['ult', 'pers'],
        },
        'erasetags': ('ultimate.png',),
    },
    # Cole Harrington: the black Marvel tee atlas has every shared pose; each printed-shirt form (Thor, Cap, Iron Man)
    # has its own movement poses and falls back to this atlas for the rest (see 'base' in build_sprites_js.py)
    'cole': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['combo', 'herokick', 'rising', 'lowsweep'],
            'aerials.png': ['airspin', 'webkick', 'skypalm', 'meteor'],
            'shared-powers.png': ['webswing', 'portal', 'stomp', 'snare'],
            'mode-specials.png': ['hammer', 'shield', 'ion', 'bump'],
            'ultimate.png': ['ult', 'pers'],
        },
        'props': [('fxhammer', 'effects-props.png', (200, 200))],
        'extras': {'fxshield': 'fx-shield.png', 'fxion': 'fx-ion-beam.png', 'fxshock': 'fx-ground-shockwave.png', 'fxburst': 'fx-comic-burst.png',
                   'fxstars': 'fx-star-fade.png', 'fxweb': 'fx-web-strand.png', 'fxcomic': 'fx-comic-book.png'},
    },
    'cole-thor': {'scale': 0.62, 'auto': True, 'sheets': {'thor-move.png': ['idle', 'run', 'jump', 'hurt']},
                  'props': [('fxhammer', 'effects-props.png', (200, 200))]},
    'cole-cap': {'scale': 0.62, 'auto': True, 'sheets': {'cap-move.png': ['idle', 'run', 'jump', 'hurt']}, 'extras': {'fxshield': 'fx-shield.png'}},
    'cole-iron': {'scale': 0.62, 'auto': True, 'sheets': {'iron-move.png': ['idle', 'run', 'jump', 'hurt']}, 'extras': {'fxion': 'fx-ion-beam.png'}},
    # Jacqi Sue Morris: the SUV and sound wave come from her prop sheet
    'jacqi': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['swat', 'bump', 'whistle', 'csweep'],
            'aerials.png': ['sspin', 'poke', 'skycheer', 'cdrop'],
            'specials.png': ['pride', 'suv', 'lift', 'snacks'],
            'ultimate.png': ['ult', 'pers'],
        },
        'props': [('fxwave', 'effects-props.png', (460, 620)), ('fxsuv', 'effects-props.png', (960, 640))],
        'rowbands': {'specials.png': [(70, 330), (330, 482), (482, 710), (710, 887)]},
        'cutrows': {'specials.png': [482]},  # the speeding SUV touches the Number One Lift pose under it
        'extras': {'fxsnack': 'fx-orange-snack.png', 'fxfinger': 'fx-foam-finger.png', 'fxmega': 'fx-megaphone.png', 'fxpennant': 'fx-pennant.png'},
    },
    # Sabir Rollerson: normal form (with the cosplay build-up standing poses) and the temporary anime form
    'sabir': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['panel', 'rkick', 'glift', 'bag'],
            'specials.png': ['toss', 'chord', 'hop', 'call'],
            'aerials.png': ['tote', 'arhythm', 'strum', 'pdrop'],
            'cosplay.png': ['build', 'buildx', 'cup'],
            'ultimate.png': ['ult', None, 'pers'],
            'flyby-caster.png': ['fly', None],  # Five-Star Flyby (replaces the guitar ultimate)
            'flyby-girls.png': ['girl0', 'girl1', 'girl2', 'girl3', 'girl4'],  # gold, pink, blue, green, purple
        },
        'alpha': {'flyby-girls.png': {'minalpha': 30, 'solid': 60, 'clearleft': 118}},  # the last pose in each row is a fading ghost
        'props': [('fxheart', 'pickups.png', (180, 770)), ('fxwave', 'pickups.png', (780, 770)), ('fxsleep', 'pickups.png', (470, 770))],
        'extras': {'fxcp0': 'fx-cp01.png', 'fxcp1': 'fx-cp02.png', 'fxcp2': 'fx-cp03.png', 'fxcp3': 'fx-cp04.png', 'fxcp4': 'fx-cp05.png'},
    },
    'sabir-anime': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'anime-move.png': ['idle', 'run', 'jump', 'hurt'],
            'anime-attacks.png': ['lpalm', 'ribkick', 'sreach', 'twirl'],
            'anime-specials.png': ['letter', 'ribdash', 'skyhigh', 'guard'],
            'anime-aerials.png': ['htwirl', 'flyrib', 'scatch', 'meteor'],
            'ultimate.png': [None, 'back', None],
            'flyby-caster.png': [None, 'fly'],
        },
        'props': [('fxheart', 'pickups.png', (180, 770))],
    },
    # Siren's Creativity dragon (sheets with a caption under each pose): her dragon form's atlas
    'siren-dragon': {
        'scale': 1.0, 'bodies': True,  # full size: the dragon is drawn almost twice as tall as a person
        'sheets': {
            'siren-creativity-dragon-movement-draft.png': ['idle', 'run', 'jump', 'hurt'],
            'siren-creativity-dragon-attacks-draft.png': ['tail', 'wing', 'horn', 'stomp'],
            'siren-creativity-dragon-specials-draft.png': ['prism', 'barrage', 'soar', 'shield'],
            'siren-creativity-transform-exhaustion-draft.png': [None, 'back', None],
        },
        'keep_fx': {('barrage', 1): 'fxcubes'},
    },
    # Patty's ultimate facing left, with the SALE / EVERYTHING MUST GO! signs readable (drawn as-is, not mirrored)
    'patty-ult-left': {
        'scale': 0.62, 'bodies': True, 'leftcut': 10, 'cols': [0, 390, 890, 1295, 9999],
        'sheets': {'patty-normal-ultimate-left-text-safe-v2-draft.png': ['ult', None]},
    },
    # Jeff's six Opening Day animals (one atlas for all of them)
    'jeff-animals': {
        'scale': 0.62, 'bodies': True, 'minbody': 4000,
        'sheets': {
            'jeff-summon-buck-draft.png': ['buckidle', 'buckrun', 'buckleap', 'buckatk'],
            'jeff-summon-rabbit-draft.png': ['rabbitidle', 'rabbitrun', 'rabbitleap', 'rabbitatk'],
            'jeff-summon-squirrel-draft.png': ['squirrelidle', 'squirrelrun', 'squirrelleap', 'squirrelatk'],
            'jeff-summon-turkey-draft.png': ['turkeyidle', 'turkeyrun', 'turkeyflap', 'turkeyatk'],
            'jeff-summon-duck-draft.png': ['duckwalk', 'duckfly', 'duckdive', 'duckatk'],
            'jeff-summon-bass-draft.png': ['bassswim', 'bassleap', 'bassdash', 'basshover'],
        },
    },
    'evea': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'move.png': ['idle', 'run', 'jump', 'hurt'],
            'attacks.png': ['tap', 'twirl', 'scoot', 'horn'],
            'aerials.png': ['circle', 'rvolley', 'skysp', 'shoe'],
            'specials.png': ['startoss', 'express', 'rrise', 'hoof'],
            'ultimate.png': ['ult', 'pers'],
            'spirit-link.png': ['cup', None, None, None],  # Spirit Awakens plays in her normal atlas
        },
        'toplabels': ('spirit-link.png',), 'cells': ('spirit-link.png',),
        'extras': {'fxuni': 'fx-unicorn.png', 'fxstar': 'fx-rainbow-star.png', 'fxportal': 'fx-rainbow-portal.png', 'fxhoof': 'fx-hoof-trap.png'},
    },
    'evea-spirit': {
        'scale': 0.62, 'auto': True,
        'sheets': {
            'spirit-link.png': ['link', 'idle', 'run', 'back'],  # trance idle, spirit glide, spirit fades
            'spirit-specials.png': ['pulse', 'haunt', 'slift', 'grandma'],
            'spirit-air-hurt.png': ['jump', 'hurt'],
        },
        'toplabels': ('spirit-link.png',),
        'cells': ('spirit-link.png', 'spirit-specials.png', 'spirit-air-hurt.png'),
        'extras': {'fxwave': 'fx-spirit-wave.png', 'fxshield': 'fx-spirit-shield.png', 'fxorb': 'fx-spirit-orb.png', 'fxsaura': 'fx-spirit-aura.png'},
    },
}

CUTROWS = {}
DEBUG = os.environ.get('SLICE_DEBUG')
ROWBANDS = {}

def tag_bands(a):
    """Rows holding the yellow name tags (several separate yellow runs across the sheet)."""
    b = a[:, 165:]
    yel = (b[..., 0] > 215) & (b[..., 1] > 170) & (b[..., 2] < 90) & (b[..., 3] > 200)
    runs = (np.diff(yel.astype(int), axis=1) == 1).sum(1)
    hits = np.where((yel.sum(1) > 250) & (runs >= 4))[0]
    bands = []
    for r in hits:
        if bands and r - bands[-1][1] <= 3: bands[-1][1] = r
        else: bands.append([r, r])
    return [b for b in bands if b[1] - b[0] > 8]

def cut_tags(a, tags):
    # thin cuts just above and below each tag strip separate poses and effects that touch their tag
    for b in tags:
        a[b[0] - 7:b[0] - 4, :, 3] = 0
        a[b[1] + 12:b[1] + 15, :, 3] = 0

def slice_sheet(path, names, cols, frames, scale, excl=(), cutcols=False, mainonly=()):
    a = np.array(Image.open(path).convert('RGBA'))
    a[..., 3][a[..., 3] < 64] = 0
    bands = tag_bands(a)
    title_end = bands[0][1] + 8 if bands and bands[0][0] < 80 else 60
    tags = [b for b in bands if b[0] > 80]
    # rows of poses sit between the title and the first tag strip, then between tag strips
    rows, top = [], title_end
    rb = ROWBANDS.get(path.rsplit('/', 1)[-1])
    a[max(0, title_end - 3):title_end + 1, :, 3] = 0  # separate the title banner from poses that touch it
    for b in tags:
        rows.append((top, b[0] - 6)); top = b[1] + 20
    if rb: rows = list(rb)
    # a thin cut just above each tag strip separates poses that touch their tag
    cut_tags(a, tags)
    for (cx_, y0_, y1_) in (cutcols or {}).get(path.rsplit('/', 1)[-1], []): a[y0_:y1_, cx_ - 2:cx_ + 2, 3] = 0
    for ry in CUTROWS.get(path.rsplit('/', 1)[-1], []): a[ry - 2:ry + 2, :, 3] = 0
    m = a[..., 3] >= 128
    lab, n = nd.label(m)
    objs = nd.find_objects(lab)
    sizes = nd.sum(m, lab, range(1, n + 1))
    grid = {}
    for i, (o, s) in enumerate(zip(objs, sizes)):
        if s < 40: continue
        y, x = o
        cy, cx = (y.start + y.stop) / 2, (x.start + x.stop) / 2
        if cx < cols[0] or y.stop < title_end + 20: continue           # row labels, title banner
        if (y.stop - y.start) < 8 and (x.stop - x.start) > 150: continue  # layout rule lines
        px = a[y, x][lab[y, x] == i + 1]
        if ((px[:, 0] > 200) & (px[:, 1] > 150) & (px[:, 2] < 110)).mean() > 0.3 and (y.stop - y.start) < 80: continue  # name tag
        r = next((k for k, (y0, y1) in enumerate(rows) if y0 <= cy < y1), None)
        c = next((k for k in range(4) if cols[k] <= cx < cols[k + 1]), None)
        if r is None or c is None or r >= len(names) or names[r] is None: continue
        if any(x.start <= px_ <= x.stop and y.start <= py_ <= y.stop for (px_, py_) in excl): continue  # a prop, cut separately
        grid.setdefault((r, c), []).append((i + 1, o, s))
    # small pieces (sparks, motion lines) belong to the nearest body in the same row, not to whichever
    # column their middle happens to fall in
    bodies = [((r, c), k) for (r, c), comps in grid.items() for k in comps if k[2] >= 3000]
    for key in list(grid):
        for k in list(grid[key]):
            if k[2] >= 3000: continue
            y, x = k[1]
            def gap(b):
                by, bx = b[1][1]
                dx = max(bx.start - x.stop, x.start - bx.stop, 0); dy = max(by.start - y.stop, y.start - by.stop, 0)
                return (dx * dx + dy * dy) ** 0.5
            same_row = [b for b in bodies if b[0][0] == key[0]]
            if not same_row: continue
            best = min(same_row, key=gap)
            if best[0] != key: grid[key].remove(k); grid[best[0]].append(k)
    for (r, c), comps in grid.items():
        if not comps: continue
        if names[r] in mainonly: comps = [max(comps, key=lambda k: k[2])]
        keep = np.isin(lab, [k[0] for k in comps])
        y0 = min(k[1][0].start for k in comps); y1 = max(k[1][0].stop for k in comps)
        x0 = min(k[1][1].start for k in comps); x1 = max(k[1][1].stop for k in comps)
        img = a[y0:y1, x0:x1].copy()
        img[..., 3] = np.where(keep[y0:y1, x0:x1], img[..., 3], 0)
        main = max(comps, key=lambda k: k[2]); my, mx = main[1]
        mm = lab[my, mx] == main[0]
        xs = np.nonzero(mm[: max(1, int(mm.shape[0] * 0.22))])[1]
        ax = mx.start + (xs.mean() if len(xs) else mm.shape[1] / 2) - x0
        ay = my.stop - y0
        add(frames, f'{names[r]}{c}', img, ax, ay, scale)
    return a, lab

def slice_auto(path, names, frames, scale, ncols=4, skip=(), cells=False, top=False, erasetags=False, minalpha=64, solid=128, clearleft=0):
    """Sheets with the move names in yellow boxes at the left of each row (Jorie, Jaxston, Evea):
    the boxes mark where each row starts, and the poses in a row are split at the widest gaps."""
    a = np.array(Image.open(path).convert('RGBA'))
    a[..., 3][a[..., 3] < minalpha] = 0
    if clearleft: a[:, :clearleft, 3] = 0  # name tags at the left that aren't yellow (e.g. Sabir's flyby girls)
    H, W = a.shape[:2]
    pur = (a[..., 0] > 60) & (a[..., 0] < 150) & (a[..., 1] < 60) & (a[..., 2] > 100) & (a[..., 3] > 128)
    pr = np.nonzero(pur[:160].sum(1) > 300)[0]
    title_end = int(pr.max()) + 4 if len(pr) else 0
    a[max(0, title_end - 3):title_end + 1, :, 3] = 0
    if erasetags:  # small yellow name tags that touch a pose (Jaxston's left-facing TAUNT tag sits on his hair)
        ai = a.astype(int); yl = (ai[..., 0] > 220) & (ai[..., 1] > 170) & (ai[..., 2] < 90) & (ai[..., 3] > 200)
        tl, _ = nd.label(nd.binary_dilation(yl, iterations=3))
        for o in nd.find_objects(tl):
            h_, w_ = o[0].stop - o[0].start, o[1].stop - o[1].start
            if o[0].start > title_end + 10 and w_ > 80 and h_ < 60 and w_ > 2.5 * h_:
                a[max(0, o[0].start - 5):o[0].stop + 5, max(0, o[1].start - 6):o[1].stop + 6, 3] = 0
    for ry in CUTROWS.get(path.rsplit('/', 1)[-1], []): a[ry - 2:ry + 2, :, 3] = 0  # poses that touch the row below
    op = a[..., 3] >= 128  # thin rule lines across the sheet (they can touch a pose): rows with one very long run
    run = np.zeros(W, int); best = np.zeros(H, int)
    for yy in range(H):
        r = op[yy].astype(int); d = np.diff(np.concatenate([[0], r, [0]])); st, en = np.nonzero(d == 1)[0], np.nonzero(d == -1)[0]
        best[yy] = (en - st).max() if len(st) else 0
    wide = best > 0.4 * W
    for yy in np.nonzero(wide)[0]:
        if yy > title_end and not (wide[max(0, yy - 6)] and wide[min(H - 1, yy + 6)]): a[max(0, yy - 1):yy + 2, :, 3] = 0
    m = a[..., 3] >= solid
    if cells:  # glowing poses touch each other: find them by their solid middles, then cut whole cells
        m = nd.binary_erosion(a[..., 3] >= 235, iterations=3)
        l0, _ = nd.label(a[..., 3] >= 128); bx = []
        for o in nd.find_objects(l0):
            if o is None: continue
            y, x = o
            if x.start >= 120 or y.start <= title_end + 10 or not (40 < y.stop - y.start < 190) or x.stop - x.start < 60: continue
            px = a[y, x].reshape(-1, 4); px = px[px[:, 3] > 128].astype(int)
            if ((px[:, 0] > 200) & (px[:, 1] > 165) & (px[:, 2] < 215) & (px[:, 0] - px[:, 2] > 30)).mean() > 0.4: bx.append(y.start - 26 if top else (y.start + y.stop) // 2)
        bx.sort()
        cutsy = bx[1:] if top else [(bx[k] + bx[k + 1]) // 2 for k in range(len(bx) - 1)]
        for cy_ in cutsy: m[cy_ - 2:cy_ + 2] = False
    lab, n = nd.label(m)
    objs = nd.find_objects(lab)
    sizes = nd.sum(m, lab, range(1, n + 1))
    comps, starts, labels = [], [], []
    for i, (o, s) in enumerate(zip(objs, sizes)):
        if s < 40: continue
        y, x = o
        if y.stop <= title_end + 2: continue
        if (y.stop - y.start) < 18 and (x.stop - x.start) > 200: continue  # title underline
        px = a[y, x][lab[y, x] == i + 1]
        r_, g_, b_ = px[:, 0].astype(int), px[:, 1].astype(int), px[:, 2].astype(int)
        yel = ((r_ > 200) & (g_ > 165) & (b_ < 215) & (r_ - b_ > 30)).mean()
        if (yel > 0.4 and (y.stop - y.start) < 190 and (x.stop - x.start) > 60 and s < 40000) or (yel > 0.2 and (y.stop - y.start) < 75 and (x.stop - x.start) > 90 and (x.stop - x.start) > 2.2 * (y.stop - y.start)):
            if x.start < 120 and y.start > title_end + 10: starts.append((y.start, y.stop))
            labels.append(o)
            continue
        comps.append((i + 1, o, s))
    starts.sort(key=lambda t: t[0])
    if starts and ((cells and not top) or starts[0][0] > title_end + 150):  # name boxes in the middle of their rows: split halfway between them
        mids = [(starts[k][0] + starts[k][1] + starts[k + 1][0] + starts[k + 1][1]) // 4 for k in range(len(starts) - 1)]
        edges = [title_end] + mids + [H]
    else:
        edges = [title_end] + [st[0] - 6 for st in starts[1:]] + [H]
    rows = [(edges[k], edges[k + 1]) for k in range(len(edges) - 1)]
    if len(rows) < len(names):  # no name boxes at the left: equal rows
        step = (H - title_end) / len(names)
        rows = [(round(title_end + k * step), round(title_end + (k + 1) * step)) for k in range(len(names))]
    rb = ROWBANDS.get(path.rsplit('/', 1)[-1])
    if rb: rows = list(rb)
    if DEBUG: print(path, 'title', title_end, 'rows', rows, 'comps', len(comps), 'big', sorted(int(k[2]) for k in comps if k[2] >= 2500)[-12:])
    for r, (y0r, y1r) in enumerate(rows):
        if r >= len(names) or names[r] is None: continue
        inrow = [k for k in comps if y0r <= (k[1][0].start + k[1][0].stop) / 2 < y1r]
        bodies = sorted([k for k in inrow if k[2] >= 2500], key=lambda k: (k[1][1].start + k[1][1].stop) / 2)
        if not bodies: continue
        cxs = [(k[1][1].start + k[1][1].stop) / 2 for k in bodies]
        if cells:  # poses stacked over each other (grandma over Evea): group by overlapping columns
            groups = []
            for k in sorted(bodies, key=lambda k: k[1][1].start):
                if groups and k[1][1].start < max(g[1][1].stop for g in groups[-1]) + 10: groups[-1].append(k)
                else: groups.append([k])
            while len(groups) > ncols:
                j = min(range(1, len(groups)), key=lambda j: min(k[1][1].start for k in groups[j]) - max(k[1][1].stop for k in groups[j - 1]))
                groups[j - 1] += groups.pop(j)
        else:
            gaps = sorted(range(1, len(bodies)), key=lambda j: cxs[j] - cxs[j - 1], reverse=True)[:ncols - 1]
            cuts = sorted(gaps); groups, last = [], 0
            for j in cuts + [len(bodies)]: groups.append(bodies[last:j]); last = j
        owner = {k[0]: g for g, grp in enumerate(groups) for k in grp}
        members = [list(grp) for grp in groups]
        for k in inrow:
            if k[0] in owner: continue
            y, x = k[1]
            def gap(b):
                by, bx = b[1]
                dx = max(bx.start - x.stop, x.start - bx.stop, 0); dy = max(by.start - y.stop, y.start - by.stop, 0)
                return dx * dx + dy * dy
            best = min(bodies, key=gap)
            if gap(best) < 90 ** 2: members[owner[best[0]]].append(k)
        if cells:
            members = [list(g) for g in groups]  # whole cells: loose bits come with the cell, only solid bodies count
            lab_cut = a[..., 3].copy()
            for (ly, lx) in labels: lab_cut[max(0, ly.start - 8):ly.stop + 8, max(0, lx.start - 8):lx.stop + 8] = 0
            ext = [(min(k[1][1].start for k in g), max(k[1][1].stop for k in g)) for g in members]
            xcuts = [0] + [(ext[k][1] + ext[k + 1][0]) // 2 for k in range(len(ext) - 1)] + [W]
            for c, grp in enumerate(members):
                if (names[r], c) in skip: continue
                gy0 = max(title_end + 2, min(k[1][0].start for k in grp) - 8); gy1 = min(H, max(k[1][0].stop for k in grp) + 8)
                y0r_, y1r_ = gy0, gy1
                cell = lab_cut[y0r_:y1r_, xcuts[c]:xcuts[c + 1]] >= 64
                cl, _ = nd.label(cell)  # keep only the parts joined to this pose (drops boots poking in from the row above)
                mine = np.isin(lab[y0r_:y1r_, xcuts[c]:xcuts[c + 1]], [k[0] for k in grp])
                ids = np.unique(cl[mine & (cl > 0)])
                cell = np.isin(cl, ids)
                gtop = min(k[1][0].start for k in grp) - 4 - y0r_  # solid bits above the pose belong to the row above
                if gtop > 0: cell[:gtop] &= lab_cut[y0r_:y0r_ + gtop, xcuts[c]:xcuts[c + 1]] < 200
                ys, xs = np.nonzero(cell)
                if not len(ys): continue
                y0, y1 = y0r_ + ys.min(), y0r_ + ys.max() + 1; x0, x1 = xcuts[c] + xs.min(), xcuts[c] + xs.max() + 1
                img = a[y0:y1, x0:x1].copy(); img[..., 3] = np.where(cell[y0 - y0r_:y1 - y0r_, x0 - xcuts[c]:x1 - xcuts[c]], img[..., 3], 0)
                main = max(grp, key=lambda k: k[2]); my, mx = main[1]
                bot = max(k[1][0].stop for k in grp)
                add(frames, f'{names[r]}{c}', img, (mx.start + mx.stop) / 2 - x0, min(y1, bot + 3) - y0, scale)
            continue
        for c, grp in enumerate(members):
            if (names[r], c) in skip: continue
            keep = np.isin(lab, [k[0] for k in grp])
            y0 = min(k[1][0].start for k in grp); y1 = max(k[1][0].stop for k in grp)
            x0 = min(k[1][1].start for k in grp); x1 = max(k[1][1].stop for k in grp)
            img = a[y0:y1, x0:x1].copy()
            img[..., 3] = np.where(keep[y0:y1, x0:x1], img[..., 3], 0)
            main = max(grp, key=lambda k: k[2]); my, mx = main[1]
            mm = lab[my, mx] == main[0]
            xs = np.nonzero(mm[: max(1, int(mm.shape[0] * 0.22))])[1]
            ax = mx.start + (xs.mean() if len(xs) else mm.shape[1] / 2) - x0
            ay = my.stop - y0
            add(frames, f'{names[r]}{c}', img, ax, ay, scale)

def slice_bodies(path, names, frames, scale, leftcut=230, minbody=12000, keep_fx=None, cols=None):
    """Sheets with a caption under every pose and art labels on the left (Siren's dragon, the giants):
    each pose is found by its big solid body; small pieces next to it (sparkles, beams, cubes) come along,
    captions under the body are left out. Rows come from where the bodies are."""
    a = np.array(Image.open(path).convert('RGBA'))
    a[..., 3][a[..., 3] < 64] = 0
    def boxy(o, s):  # a caption plate or the title banner: wide, short and mostly filled
        h, w = o[0].stop - o[0].start, o[1].stop - o[1].start
        return h < 70 and w > 80 and w > 2 * h and s / (h * w) > 0.45
    # caption plates: wipe each whole caption row (some plates touch the feet above them)
    m = a[..., 3] >= 128
    lab, n = nd.label(m); objs = nd.find_objects(lab); sizes = nd.sum(m, lab, range(1, n + 1))
    def platey(i, o):  # plates are pale blue or yellow (cubes and pencils are other colours)
        px = a[o][lab[o] == i].astype(int); r, g, b = px[:, 0], px[:, 1], px[:, 2]
        return (((r > 160) & (g > 200) & (b > 215)) | ((r > 215) & (g > 165) & (b < 110))).mean() > 0.35
    plates = sorted((o[0].start, o[0].stop) for i, (o, s) in enumerate(zip(objs, sizes))
                    if o[0].stop >= 120 and o[1].start > leftcut - 60 and boxy(o, s) and o[1].stop - o[1].start < 500 and platey(i + 1, o))
    for y0p, y1p in plates: a[max(0, y0p - 3):y1p + 3, leftcut - 40:, 3] = 0
    m = a[..., 3] >= 128
    lab, n = nd.label(m); objs = nd.find_objects(lab); sizes = nd.sum(m, lab, range(1, n + 1))
    def texty(i, o, s):  # caption lettering (dark, small) that isn't on a plate
        if s > 1800 or o[0].stop - o[0].start > 45: return False
        px = a[o][lab[o] == i]; return (px[:, :3].astype(int).sum(1) < 260).mean() > 0.55
    comps = [(i + 1, o, s) for i, (o, s) in enumerate(zip(objs, sizes))
             if s >= 30 and not texty(i + 1, o, s) and o[1].stop > leftcut and not boxy(o, s) and not (o[0].stop < 120 and o[1].stop - o[1].start > 200)
             and not (o[0].start < 60 and (o[1].stop - o[1].start > 250 or o[0].stop < 95))]  # fancy title banners at the top
    def cy(k): return (k[1][0].start + k[1][0].stop) / 2
    def cx(k): return (k[1][1].start + k[1][1].stop) / 2
    bodies = sorted([k for k in comps if k[2] >= minbody and (k[1][0].stop - k[1][0].start) > 70], key=cy)
    rows, cur = [], []
    for k in bodies:  # rows: bodies whose middles are close in height
        if cur and cy(k) - np.mean([cy(c) for c in cur]) > 90: rows.append(cur); cur = []
        cur.append(k)
    if cur: rows.append(cur)
    for r, rb in enumerate(rows):
        if r >= len(names) or names[r] is None: continue
        rb = sorted(rb, key=cx)
        groups = []  # bodies that overlap side to side make one pose (Siren with the dragon outline behind her)
        for k in rb:
            if groups and k[1][1].start < max(g[1][1].stop for g in groups[-1]) - 10: groups[-1].append(k)
            else: groups.append([k])
        while len(groups) > 4:
            j = min(range(1, len(groups)), key=lambda j: min(k[1][1].start for k in groups[j]) - max(k[1][1].stop for k in groups[j - 1]))
            groups[j - 1] += groups.pop(j)
        edges = [leftcut] + [(max(k[1][1].stop for k in groups[j - 1]) + min(k[1][1].start for k in groups[j])) // 2 for j in range(1, len(groups))] + [a.shape[1]]
        y0r = min(k[1][0].start for k in rb) - 60; y1r = max(k[1][0].stop for k in rb) + 4
        for c, grp in enumerate(groups):
            btop = min(k[1][0].start for k in grp); bot = max(k[1][0].stop for k in grp)
            ids = {k[0] for k in grp}
            def gapx(k, g):  # side-to-side distance from a piece to a pose
                return max(min(b[1][1].start for b in g) - k[1][1].stop, k[1][1].start - max(b[1][1].stop for b in g), 0)
            for k in comps:  # extras nearest this pose that reach into its height (not captions above or below it)
                if k[0] in ids: continue
                if cols:  # fixed column lines given for this sheet
                    if not (cols[c] <= cx(k) < cols[c + 1]): continue
                elif min(range(len(groups)), key=lambda j: gapx(k, groups[j])) != c: continue
                if k[1][0].stop > btop + 5 and k[1][0].start >= btop - 70 and k[1][0].start < bot - 12 and k[1][0].stop <= bot + 30: ids.add(k[0])
            keep = np.isin(lab, list(ids)); ys, xs = np.nonzero(keep)
            y0, y1, x0, x1 = ys.min(), ys.max() + 1, xs.min(), xs.max() + 1
            img = a[y0:y1, x0:x1].copy(); img[..., 3] = np.where(keep[y0:y1, x0:x1], img[..., 3], 0)
            main = max(grp, key=lambda k: k[2]); my, mx = main[1]
            add(frames, f'{names[r]}{c}', img, (mx.start + mx.stop) / 2 - x0, my.stop - y0, scale)
            if keep_fx and (names[r], c) in keep_fx:  # also save the loose effect pieces on their own (e.g. the cubes)
                fx = keep & ~np.isin(lab, [k[0] for k in grp]); ys, xs = np.nonzero(fx)
                if len(ys):
                    e = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1].copy(); e[..., 3] = np.where(fx[ys.min():ys.max() + 1, xs.min():xs.max() + 1], e[..., 3], 0)
                    nm = keep_fx[(names[r], c)]; add(frames, nm, e, e.shape[1] / 2, e.shape[0] / 2, scale)
    return len(rows)

def add(frames, name, img, ax, ay, scale):
    im = Image.fromarray(img)
    w, h = im.size
    im = im.resize((max(1, round(w * scale)), max(1, round(h * scale))), Image.LANCZOS)
    frames[name] = (im, ax * scale, ay * scale)

def pack(frames, out, who):
    W, PAD = 2048, 4
    x = y = rowh = 0; layout = {}
    for k, (im, ax, ay) in frames.items():
        w, h = im.size
        if x + w + PAD > W: x = 0; y += rowh + PAD; rowh = 0
        layout[k] = (x, y, w, h, round(ax, 1), round(ay, 1)); x += w + PAD; rowh = max(rowh, h)
    atlas = Image.new('RGBA', (W, y + rowh))
    for k, (x, y, w, h, ax, ay) in layout.items(): atlas.paste(frames[k][0], (x, y))
    atlas.save(f'{out}/{who}-atlas.webp', 'WEBP', quality=88, method=6)
    atlas.save(f'{out}/{who}-atlas-preview.png')
    json.dump(layout, open(f'{out}/{who}-frames.json', 'w'))
    print(who, 'atlas', W, atlas.size[1], 'frames', len(layout))

if __name__ == '__main__':
    who, art, out = sys.argv[1:4]
    cfg = CHARACTERS[who]; frames = {}
    props = cfg.get('props', [])
    CUTROWS.clear(); CUTROWS.update(cfg.get('cutrows', {})); ROWBANDS.clear(); ROWBANDS.update(cfg.get('rowbands', {}))
    for sheet, names in cfg['sheets'].items():
        excl = [pt for (_, sh, pt) in props if sh == sheet and pt]
        cols = cfg.get('cols')
        if isinstance(names, dict): cols = names.get('cols'); names = names['rows']
        if cfg.get('bodies'):
            slice_bodies(f'{art}/{sheet}', names, frames, cfg['scale'], keep_fx=cfg.get('keep_fx'), leftcut=cfg.get('leftcut', 230), cols=cfg.get('cols'), minbody=cfg.get('minbody', 12000)); continue
        if cfg.get('auto'):
            slice_auto(f'{art}/{sheet}', names, frames, cfg['scale'], skip=cfg.get('skip', ()), cells=sheet in cfg.get('cells', ()), top=sheet in cfg.get('toplabels', ()), erasetags=sheet in cfg.get('erasetags', ()), **cfg.get('alpha', {}).get(sheet, {})); continue
        slice_sheet(f'{art}/{sheet}', names, cols, frames, cfg['scale'], excl, cfg.get('cutcols'), cfg.get('mainonly', {}).get(sheet, ()))
    for name, sheet, pt in props:
        if not pt: continue
        a = np.array(Image.open(f'{art}/{sheet}').convert('RGBA')); a[..., 3][a[..., 3] < 64] = 0
        cut_tags(a, [b for b in tag_bands(a) if b[0] > 80])
        lab, n = nd.label(a[..., 3] >= 128)
        k = lab[pt[1], pt[0]]
        if not k:  # nearest blob to the point
            ys, xs = np.nonzero(lab); i = np.argmin((ys - pt[1]) ** 2 + (xs - pt[0]) ** 2); k = lab[ys[i], xs[i]]
        y, x = nd.find_objects(lab)[k - 1]
        img = a[y, x].copy(); img[..., 3] = np.where(lab[y, x] == k, img[..., 3], 0)
        add(frames, name, img, img.shape[1] / 2, img.shape[0] if name == 'dryer' else img.shape[0] / 2, cfg['scale'])
    for name, fn in cfg.get('extras', {}).items():  # separate effect pictures: trimmed, anchored in the middle
        im = Image.open(f'{art}/{fn}').convert('RGBA'); a = np.array(im); a[..., 3][a[..., 3] < 48] = 0
        ys, xs = np.nonzero(a[..., 3]); img = a[ys.min():ys.max() + 1, xs.min():xs.max() + 1]
        add(frames, name, img, img.shape[1] / 2, img.shape[0] / 2, cfg['scale'])
    if who != 'jeffery':
        pack(frames, out, who); sys.exit()
    # the red bobber from the cast pose in the attacks sheet: largest red blob in that cell
    a = np.array(Image.open(f'{art}/attacks.png').convert('RGBA')); a[..., 3][a[..., 3] < 64] = 0
    red = (a[..., 0] > 180) & (a[..., 1] < 90) & (a[..., 2] < 90) & (a[..., 3] > 128)
    red[:880] = False
    lab, n = nd.label(nd.binary_dilation(red, iterations=3))
    sizes = nd.sum(red, lab, range(1, n + 1)); o = nd.find_objects(lab)[int(np.argmax(sizes))]
    y, x = o; pad = 4
    box = a[y.start - pad:y.stop + pad, x.start - pad:x.stop + pad]
    add(frames, 'bobber', box, box.shape[1] / 2, box.shape[0] / 2, cfg['scale'])
    pack(frames, out, who)
