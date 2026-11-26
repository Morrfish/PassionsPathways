# Writes src/js/sprites.js from the <id>-frames.json files the slicers make.
# usage: python3 -I tools/build_sprites_js.py <dir with *-frames.json> src/js/sprites.js
# MOVES says which pose row each move uses. Rows have 4 poses: windup, hit, follow-through, recover.
#   airRow   row drawn like a jump kick (1 takeoff, 2 kick, 3 landing)
#   upPose   one still pose for up/up-air, or upRow to animate a whole row
#   riseLate pose after the up-special launch; counterHit pose after a successful counter
import re, json, sys, os
MOVES = {
    'patty': dict(jab='ring', side='shove', down='drop', up='raise', nair='kick', fair='kick', uair='scoop', dair='markdown',
                  neutral='toss', sideSpecial='cart', upSpecial='deliver', downSpecial='pack',
                  airRow='kick', upRow='raise', uairRow='scoop', riseLate='deliver1'),
    'jeffery': dict(jab='onetwo', side='catch', down='reel', up='reel', nair='boot', fair='boot', uair='boot', dair='boot',
                    neutral='fish', sideSpecial='buck', upSpecial='stand', downSpecial='cover', counterHit='cover2',
                    airRow='boot', upPose='reel0', riseLate='stand2'),
    'jadden': dict(jab='combo', side='combo', down='sweep', up='header', nair='round', fair='volley', uair='uair', dair='stomp',
                   neutral='hail', sideSpecial='drive', upSpecial='leap', downSpecial='ice',
                   airRow='volley', upRow='header', uairRow='uair', riseLate='leap2'),
    'courtnee': dict(jab='click', side='reboot', down='battery', up='upper', nair='round', fair='acombo', uair='upload', dair='crash',
                     neutral='hameha', sideSpecial='rush', upSpecial='takeoff', downSpecial='saiyan',
                     airRow='acombo', upRow='upper', uairRow='upload', riseLate='takeoff3'),
    'courtnee-super': dict(jab='click', side='reboot', down='battery', up='upper', nair='round', fair='acombo', uair='upload', dair='crash',
                           neutral='hameha', sideSpecial='rush', upSpecial='takeoff', downSpecial='down',
                           airRow='acombo', upRow='upper', uairRow='upload', riseLate='takeoff3'),
    'megan': dict(jab='hit', side='ret', down='beat', up='chapter', nair='fan', fair='page', uair='note', dair='drop',
                  neutral='twist', sideSpecial='pounce', upSpecial='encore', downSpecial='nap',
                  airRow='page', upRow='chapter', uairRow='note', riseLate='encore3'),
    'siren': dict(jab='pop', side='toss', down='sweep', up='rain', nair='spin', fair='doodle', uair='sky', dair='boots',
                  neutral='sketch', sideSpecial='blitz', upSpecial='note', downSpecial='mac',
                  airRow='doodle', upRow='rain', uairRow='sky', riseLate='note3'),
    'mandi-witch': dict(jab='brush', side='brush', down='rules', up='says', nair='boot', fair='boot', uair='says', dair='rules',
                        neutral='trick', sideSpecial='salon', upSpecial='broom', downSpecial='whirl',
                        airRow='boot', upRow='says', uairRow='says', riseLate='broom2'),
    'mandi-mermaid': dict(jab='shell', side='shell', down='dive', up='tide', nair='fin', fair='fin', uair='tide', dair='dive',
                          neutral='bubble', sideSpecial='wave', upSpecial='surface', downSpecial='whirl',
                          airRow='fin', upRow='tide', uairRow='tide', riseLate='surface2'),
    'codee': dict(jab='whack', side='yard', down='sod', up='rake', nair='yspin', fair='hedge', uair='branch', dair='bootp',
                  neutral='mulch', sideSpecial='mow', upSpecial='leaf', downSpecial='mud',
                  airRow='hedge', upRow='rake', uairRow='branch', riseLate='leaf3', defRow='def'),
    'haylie': dict(jab='arm', side='grab', down='step', up='upgo', nair='reflex', fair='reach', uair='sky', dair='feet',
                   neutral='bread', sideSpecial='coming', upSpecial='gotyou', downSpecial='babies', counterHit='babies2',
                   upRow='upgo', uairRow='sky', riseMid='gotyou2', riseLate='gotyou3'),  # no airRow: all 4 Long Reach poses play
    'sara': dict(jab='edge', side='restraint', down='sweep', up='reaper', nair='halo', fair='lunge', uair='reach', dair='wdrop',
                 neutral='roseshot', sideSpecial='fang', upSpecial='lifeline', downSpecial='widow',
                 upRow='reaper', uairRow='reach', riseMid='lifeline2', riseLate='lifeline3'),
    # Jorie, "The Free Roamer"; his Chocolate Milk Rage form; Jaxston (kicks only, left-footed); Evea and her Spirit Link form
    'jorie': dict(jab='bonk', side='roadkick', down='sweep', up='whip', nair='orbit', fair='volley', uair='skywhip', dair='stomp',
                  neutral='drink', sideSpecial='pedal', upSpecial='hop', downSpecial='tent', counterHit='tent2',
                  upRow='whip', uairRow='skywhip', riseMid='hop2', riseLate='hop3'),
    'jorie-rage': dict(jab='smash', side='smash', down='clap', up='clap', nair='smash', fair='smash', uair='clap', dair='smash',
                       neutral='clap', sideSpecial='smash', upSpecial='jump', downSpecial='clap',
                       upRow='clap', uairRow='clap', riseLate='jump2'),
    'jaxston': dict(jab='leftfoot', side='round', down='csweep', up='spin', nair='airspin', fair='skyvolley', uair='bicycle', dair='meteor',
                    neutral='launch', sideSpecial='cleat', upSpecial='tornado', downSpecial='clutter',
                    upRow='spin', uairRow='bicycle', riseMid='tornado2', riseLate='tornado3'),
    'jaxston-left': dict(jab='leftfoot', side='round', down='csweep', up='spin', nair='airspin', fair='skyvolley', uair='bicycle', dair='meteor',
                         neutral='launch', sideSpecial='cleat', upSpecial='tornado', downSpecial='clutter',
                         upRow='spin', uairRow='bicycle', riseMid='tornado2', riseLate='tornado3'),
    # Cole: one atlas per printed shirt; the shirt atlases fall back to the black-tee atlas for shared poses
    'cole': dict(jab='combo', side='herokick', down='stomp', up='rising', nair='airspin', fair='webkick', uair='skypalm', dair='meteor',
                 neutral='hammer', sideSpecial='portal', upSpecial='webswing', downSpecial='snare',
                 upRow='rising', uairRow='skypalm', riseMid='webswing2', riseLate='webswing3'),
    'cole-thor': dict(jab='combo', side='herokick', down='stomp', up='rising', nair='airspin', fair='webkick', uair='skypalm', dair='meteor',
                 neutral='hammer', sideSpecial='portal', upSpecial='webswing', downSpecial='snare',
                 upRow='rising', uairRow='skypalm', riseMid='webswing2', riseLate='webswing3'),
    'cole-cap': dict(jab='combo', side='herokick', down='stomp', up='rising', nair='airspin', fair='webkick', uair='skypalm', dair='meteor',
                 neutral='shield', sideSpecial='portal', upSpecial='webswing', downSpecial='snare',
                 upRow='rising', uairRow='skypalm', riseMid='webswing2', riseLate='webswing3'),
    'cole-iron': dict(jab='combo', side='herokick', down='stomp', up='rising', nair='airspin', fair='webkick', uair='skypalm', dair='meteor',
                 neutral='ion', sideSpecial='portal', upSpecial='webswing', downSpecial='snare',
                 upRow='rising', uairRow='skypalm', riseMid='webswing2', riseLate='webswing3'),
    'jacqi': dict(jab='swat', side='bump', down='csweep', up='whistle', nair='sspin', fair='poke', uair='skycheer', dair='cdrop',
                  neutral='pride', sideSpecial='suv', upSpecial='lift', downSpecial='snacks',
                  upRow='whistle', uairRow='skycheer', riseMid='lift2', riseLate='lift3'),
    # Sabir: normal form (cosplay build-up standing poses build0-5) and his temporary anime form
    'sabir': dict(jab='panel', side='rkick', down='bag', up='glift', nair='tote', fair='arhythm', uair='strum', dair='pdrop',
                  neutral='toss', sideSpecial='chord', upSpecial='hop', downSpecial='call',
                  upRow='glift', uairRow='strum', riseMid='hop2', riseLate='hop3'),
    'sabir-anime': dict(jab='lpalm', side='ribkick', down='twirl', up='sreach', nair='htwirl', fair='flyrib', uair='scatch', dair='meteor',
                        neutral='letter', sideSpecial='ribdash', upSpecial='skyhigh', downSpecial='guard', counterHit='guard2',
                        upRow='sreach', uairRow='scatch', riseMid='skyhigh2', riseLate='skyhigh3'),
    'siren-dragon': dict(jab='atk', side='atk', down='stomp', up='horn', nair='atk', fair='atk',  # atk/idle/run/jump/hurt/prism/tired: hi-res
                         uair='horn', dair='stomp',
                         neutral='prism', sideSpecial='barrage', upSpecial='soar', downSpecial='shield', counterHit='shield2',
                         upRow='horn', uairRow='horn', riseMid='soar2', riseLate='soar3'),
    'jeffery-mayhem': dict(jab='reel', side='rush', down='reel', up='boot', nair='boot', fair='boot', uair='boot', dair='boot',
                           neutral='surge', sideSpecial='rush', upSpecial='lift', downSpecial='counter', counterHit='counter2',
                           airRow='boot', upRow='boot', uairRow='boot', riseLate='lift2'),
    'patty-mayhem': dict(jab='ring', side='cut', down='price', up='kick', nair='kick', fair='kick', uair='kick', dair='price',
                         neutral='toss', sideSpecial='cart', upSpecial='deliver', downSpecial='pack',
                         airRow='kick', upRow='kick', uairRow='kick', riseLate='deliver2'),
    # the giants (unlockable; Jeff's and Patty's are also the story bosses' second phase)
    'jeff-giant': dict(jab='claw', side='antler', down='tail', up='alift', nair='rtail', fair='pounce', uair='alift', dair='pounce',
                       neutral='flock', sideSpecial='antler', upSpecial='sky', downSpecial='maw',
                       upRow='alift', uairRow='alift', riseMid='sky1', riseLate='sky2'),
    'patty-giant': dict(jab='one2', side='slam', down='pstomp', up='one2', nair='crush', fair='crush', uair='one2', dair='pstomp',
                        neutral='rain', sideSpecial='crush', upSpecial='plift', downSpecial='rest',
                        upRow='one2', uairRow='one2', riseMid='plift1', riseLate='plift3'),
    'triple-trouble': dict(jab='bite', side='bite', down='tsweep', up='leap', nair='tsweep', fair='bite', uair='leap', dair='tsweep',
                           neutral='tyap', sideSpecial='rush', upSpecial='leap', downSpecial='guard', counterHit='guard2',
                           upRow='leap', uairRow='leap', riseMid='leap1', riseLate='leap2'),
    # Kevin, Cloe and Janelle
    'kevin': dict(jab='punch', side='kick', down='towel', up='kick', nair='kick', fair='kick', uair='kick', dair='towel',
                  neutral='spiral', sideSpecial='toss', upSpecial='heli', downSpecial='towel', counterHit='towel2', dashAttack='bus',
                  airRow='kick', upRow='kick', uairRow='kick', riseMid='rally2', riseLate='rally3'),
    'kevin-fan': dict(jab='finger', side='finger', down='ftowel', up='fspiral', nair='finger', fair='finger', uair='fspiral', dair='ftowel',
                      neutral='fspiral', sideSpecial='ftowel', upSpecial='fanrise', downSpecial='curtain', counterHit='curtain2', dashAttack='bus',
                      upRow='fspiral', uairRow='fspiral', riseMid='fanrise2', riseLate='fanrise3'),
    'cloe': dict(jab='paint', side='paint', down='crayon', up='alift', nair='crayon', fair='paint', uair='alift', dair='crayon',
                 neutral='red', sideSpecial='abc', upSpecial='alift', downSpecial='shuffle',
                 upRow='alift', uairRow='alift', riseMid='alift2', riseLate='alift3'),
    'janelle': dict(jab='pencil', side='ruler', down='ruler', up='book', nair='plift', fair='pencil', uair='book', dair='ruler',
                    neutral='oeng', sideSpecial='deng', upSpecial='plift', downSpecial='book',
                    upRow='book', uairRow='book', riseMid='plift1', riseLate='plift2'),
    'evea': dict(jab='tap', side='scoot', down='twirl', up='horn', nair='circle', fair='rvolley', uair='skysp', dair='shoe',
                 neutral='startoss', sideSpecial='express', upSpecial='rrise', downSpecial='hoof',
                 upRow='horn', uairRow='skysp', riseMid='rrise2', riseLate='rrise3'),
    'evea-spirit': dict(jab='pulse', side='haunt', down='grandma', up='slift', nair='run', fair='haunt', uair='slift', dair='jump',
                        neutral='pulse', sideSpecial='haunt', upSpecial='slift', downSpecial='grandma', counterHit='grandma2',
                        upRow='slift', uairRow='slift', riseMid='slift2', riseLate='slift3'),
    'codee-clean': dict(jab='sweep', side='trash', down='mop', up='duster', nair='polish', fair='dbust', uair='hdust', dair='squeak',
                        neutral='suds', sideSpecial='patrol', upSpecial='vac', downSpecial='wet',
                        airRow='dbust', upRow='duster', uairRow='hdust', riseLate='vac3', defRow='def'),
}
# ultimate key poses (tools/slice_ultimates.py): drawn at the same scale as the fighter's own atlas
ULTS = {'kevin-ult': 'kevin', 'janelle-ult': 'janelle', 'patty-ult': 'patty', 'jeffery-ult': 'jeffery', 'jadden-ult': 'jadden', 'mandi-witch-ult': 'mandi-witch', 'mandi-mermaid-ult': 'mandi-mermaid'}
# The ultimate/personality sheets were drawn at a different size than each fighter's main sheet.
# Size every pose from those sheets so the standing taunt pose is as tall as the standing idle pose.
PERS_FRAMES = ('ult', 'asm', 'ret', 'pers', 'ent', 'taunt', 'win', 'lose')
def sheet_factor(base_fr, pers_fr):
    return round(base_fr['idle0'][3] / pers_fr['taunt'][3], 3)
# poses that are meant to be bigger than the fighter (Courtnee's mech towers over him)
BIGGER = {'courtnee': {'asm2': 1.3, 'asm3': 1.7, 'ult0': 1.7, 'ult1': 1.7, 'ult2': 1.7, 'ult3': 1.7, 'ret0': 1.6, 'ret1': 1.25}}
# whole move groups drawn at a different scale on their source sheet (found with a size audit: standing poses vs idle)
GROUP_SCALE = {
    # Siren: her toss, aerial, noodle-throw and tired poses were drawn bigger than her standing pose (head-size check)
    'siren': {'def': 0.75, 'bair': 0.8 * 0.83, 'note': 1.16, 'blitz': 1.1, 'toss': 0.87, 'doodle': 0.8, 'sky': 0.83, 'boots': 0.83,
              'spin': 0.83, 'mac': 0.9, 'tired': 0.87},
    'megan': {'def': 0.8, 'bair': 0.8, 'ret': 1.6, 'nap': 1.25, 'pers2': 0.78, 'pers3': 0.78, 'win': 0.78, 'lose': 0.78},
    'mandi-witch': {'whirl': 1.3, 'salon': 1.15},
    'cloe': {'jump': 0.89},  # her jump poses were drawn ~12% bigger (face width 25 vs 22 px)
    # the giants' transformation / personality sheets were drawn bigger than their fighting poses (head-size check):
    # entrance and losing poses come from them, so without this they shrank when the fight started
    'jeff-giant': {g: 0.72 for g in ('cup', 'back', 'ent', 'lose')},
    'patty-giant': {g: 0.68 for g in ('cup', 'back', 'ent', 'lose')},
    'triple-trouble': {g: 0.76 for g in ('ult', 'pers', 'ent', 'taunt', 'win', 'lose')},
    'courtnee': {'saiyan': 1.2},
    'haylie': {'ult1': 1.15, 'ult2': 1.3, 'ult3': 1.3},
    # Jacqi's specials sheet was drawn ~3/4 size; her dash SUV matches the ultimate's SUV
    'jacqi': {'pride': 1.35, 'lift': 1.35, 'snacks': 1.35, 'suv': 1.85},
    'sara': {'roseshot': 1.13, 'widow': 1.17, 'fang': 1.07, 'restraint': 1.12},  # she's drawn smaller inside the bear aura
    # Mandi's ultimate/victory sheets: her taunt leans, so taunt-height matching drew the whole sheet ~15% big
    'mandi-witch-ult': {p: 0.87 for p in ('ult', 'ent', 'taunt', 'win', 'lose')},
    'mandi-mermaid-ult': {p: 0.85 for p in ('ult', 'ent', 'taunt', 'win', 'lose')},
}
src_dir, out = sys.argv[1], sys.argv[2]
parts = ["""// Character art (sprite atlases) for fighters drawn from artwork instead of the cartoon body.
// GENERATED by tools/build_sprites_js.py: edit MOVES there and re-run, don't edit by hand.
// Each frame: [x, y, width, height, anchorX, anchorY] in the atlas; the anchor is between the feet.
window.MM = window.MM || {};
MM.SPRITES = MM.SPRITES || {};
"""]
# extra names for frames (Courtnee's personality poses live in his own atlas)
ALIASES = {w: {'ent': 'pers0', 'taunt': 'pers1', 'win': 'pers2', 'lose': 'pers3'} for w in ('courtnee', 'megan', 'siren', 'codee', 'codee-clean', 'haylie', 'sara', 'jorie', 'jaxston', 'jaxston-left', 'evea', 'cole', 'jacqi', 'sabir')}
ALIASES['sabir'].update({'build4': 'buildx0', 'build5': 'buildx1', 'fly3': 'fly0'})  # fly3 caught the shooting stars: he just stands  # bow, wig, blouse, skirt, shoes: one standing pose per piece
ALIASES['jeff-giant'] = {'ent': 'cup3', 'taunt': 'wild0', 'win': 'wild3', 'lose': 'back3'}
ALIASES['patty-giant'] = {'ent': 'cup3', 'taunt': 'idle3', 'win': 'emg3', 'lose': 'back3'}
ALIASES['triple-trouble'] = {'ent': 'pers0', 'taunt': 'pers1', 'win': 'pers2', 'lose': 'pers3'}
ALIASES['kevin'] = {'ent': 'cup0', 'taunt': 'rally3', 'win': 'rally3', 'lose': 'slow2'}
ALIASES['kevin-fan'] = {'ent': 'idle0', 'taunt': 'idle1', 'win': 'curtain2', 'lose': 'hurt3'}
ALIASES['cloe'] = {'ent': 'pers0', 'taunt': 'pers1', 'win': 'pers2', 'lose': 'hurt3'}
ALIASES['janelle'] = {'ent': 'idle0', 'taunt': 'book2', 'win': 'book2', 'lose': 'hurt3'}
ALIASES['siren-dragon'] = {'ent': 'idle0', 'taunt': 'idle1', 'win': 'idle0', 'lose': 'hurt3'}
ALIASES['sabir-anime'] = {'ent': 'idle0', 'taunt': 'idle3', 'win': 'idle3', 'lose': 'hurt3', 'fly3': 'fly0'}
# fighters with their own left-facing art (drawn as-is instead of mirrored: Jaxston always kicks with his LEFT foot)
LEFT = {'jaxston': 'jaxston-left'}
# atlases that only hold some poses; the rest come from this atlas (Cole's printed-shirt forms)
BASE = {'cole-thor': 'cole', 'cole-cap': 'cole', 'cole-iron': 'cole', 'kevin-fan': 'kevin'}
ALIASES['jorie-rage'] = {'ent': 'xform3', 'taunt': 'xform3', 'win': 'xform3', 'lose': 'hurt3'}
ALIASES['evea-spirit'] = {'ent': 'link2', 'taunt': 'link3', 'win': 'link3', 'lose': 'hurt3'}
# the standing pose to size the personality sheet by, when the taunt reaches up (Jorie lifts the milk jug overhead)
PERS_REF = {'jorie': 'pers0'}
# atlases whose personality/ultimate poses were drawn at the same scale as the fighting poses: don't resize them
SAME_SHEET_PERS = {'jeff-giant', 'patty-giant', 'triple-trouble', 'kevin', 'kevin-fan', 'janelle'}
# standing height comes from another pose (Evea's spirit poses have Grandma floating over her: size her by Evea alone)
STANDH_FROM = {'evea-spirit': 'link0'}
# a move group cut from another sheet: size it so its first pose is as tall as the idle pose
MATCH_IDLE = {'siren': ('mac', ('cup', 'tired3'), ('tired', 'tired3')), 'jorie': ('cup',), 'evea': ('cup',), 'sabir': ('build', 'buildx', 'fly'), 'sabir-anime': ('fly',),
              # Cloe's and Janelle's sheets were drawn smaller row by row: size each move by its standing pose
              'cloe': tuple((c, c + '3') for c in ('red', 'orange', 'yellow', 'green', 'blue', 'purple', 'release')) + (('shuffle', 'shuffle0'), ('wheel', 'wheel0')),
              'janelle': tuple((r, r + '0') for r in ('book', 'oeng', 'oread', 'omath', 'osoc', 'osci', 'deng', 'dread', 'dmath', 'dsoc', 'dsci'))}
# Cloe's five jacket colours: ChatGPT's recoloured sheets, cut exactly like her red ones (same poses and sizes)
for _c in ('orange', 'yellow', 'green', 'blue', 'purple'):
    MOVES['cloe-' + _c] = MOVES['cloe']; ALIASES['cloe-' + _c] = ALIASES['cloe']
    GROUP_SCALE['cloe-' + _c] = GROUP_SCALE['cloe']; MATCH_IDLE['cloe-' + _c] = MATCH_IDLE['cloe']
for who, moves in MOVES.items():
    fr = json.load(open(os.path.join(src_dir, f'{who}-frames.json')))
    for a, b in ALIASES.get(who, {}).items(): fr[a] = fr[b]
    body = ',\n'.join(f"    '{k}': [{', '.join(str(v) for v in val)}]" for k, val in fr.items())
    fs = {}
    if 'taunt' in fr and who not in SAME_SHEET_PERS:
        f0 = sheet_factor(fr, fr) if who not in PERS_REF else round(fr['idle0'][3] / fr[PERS_REF[who]][3], 3)
        fs = {k: f0 for k in fr if k.startswith(PERS_FRAMES)}
    for k, m in BIGGER.get(who, {}).items(): fs[k] = round(fs.get(k, 1) * m, 3)
    std = fr[STANDH_FROM.get(who, 'idle0')][3]
    for pre in MATCH_IDLE.get(who, ()):  # a group, or (group, the pose in it that stands as tall as idle)
        pre, ref = pre if isinstance(pre, tuple) else (pre, pre + '0')
        for k in fr:
            if re.fullmatch(pre + r'\d+', k): fs[k] = round(fs.get(k, 1) * std / fr[ref][3], 3)
    for pre, m in GROUP_SCALE.get(who, {}).items():
        for k in fr:
            if re.fullmatch(pre + r'(\d+)?', k): fs[k] = round(fs.get(k, 1) * m, 3)
    extra = os.path.join(src_dir, f'{who}-fscale.json')  # per-pose sizes written by an art tool (e.g. add_dragon_hires.py)
    if os.path.exists(extra):
        for k, m in json.load(open(extra)).items():
            if k in fr: fs[k] = round(fs.get(k, 1) * m, 3)
    parts.append(f"""
MM.SPRITES['{who}'] = {{
  src: 'img/{who}-atlas.webp',{f"{chr(10)}  left: '{LEFT[who]}'," if who in LEFT else ''}{f"{chr(10)}  base: '{BASE[who]}'," if who in BASE else ''}
  standH: {std},
  fscale: {json.dumps(fs)},
  frames: {{
{body}
  }},
  moves: {json.dumps(moves)},
}};
""")
# an ultimate's own left-facing art (Patty's signs stay readable): sized so its first pose matches the ultimate's
ULT_LEFT = {'patty-ult': 'patty-ult-left'}
# ultimate sheets without a taunt pose: the standing pose to size them by
ULT_REF = {'kevin-ult': 'ult0', 'janelle-ult': 'ult3'}
ult_fs = {}
for who, base in list(ULTS.items()) + [(l, ULTS[u]) for u, l in ULT_LEFT.items()]:
    fr = json.load(open(os.path.join(src_dir, f'{who}-frames.json')))
    bfr = json.load(open(os.path.join(src_dir, f'{base}-frames.json')))
    std = bfr['idle0'][3]
    src_ult = next((u for u, l in ULT_LEFT.items() if l == who), None)
    if src_ult:
        ofr = json.load(open(os.path.join(src_dir, f'{src_ult}-frames.json')))
        f0 = round(ult_fs[src_ult]['ult0'] * ofr['ult0'][3] / fr['ult0'][3], 3)
    elif who in ULT_REF:  # no taunt on this sheet: size it by a pose that stands like idle
        f0 = round(std / fr[ULT_REF[who]][3], 3)
    else:
        f0 = sheet_factor(bfr, fr)
    fs = {k: f0 for k in fr}
    for pre, m in GROUP_SCALE.get(who, {}).items():
        for k in fr:
            if re.fullmatch(pre + r'(\d+)?', k): fs[k] = round(fs[k] * m, 3)
    ult_fs[who] = fs
    body = ',\n'.join(f"    '{k}': [{', '.join(str(v) for v in val)}]" for k, val in fr.items())
    left = f" left: '{ULT_LEFT[who]}'," if who in ULT_LEFT else ''
    parts.append(f"""
MM.SPRITES['{who}'] = {{ src: 'img/{who}-atlas.webp', standH: {std},{left} fscale: {json.dumps(fs)}, frames: {{
{body}
}} }};
""")
# atlases that aren't a fighter (e.g. Jeff's Opening Day animals): frames only
for who in ('jeff-animals', 'kcj-fx', 'fx10', 'kevin-fx'):
    fr = json.load(open(os.path.join(src_dir, f'{who}-frames.json')))
    body = ',\n'.join(f"    '{k}': [{', '.join(str(v) for v in val)}]" for k, val in fr.items())
    parts.append(f"""
MM.SPRITES['{who}'] = {{ src: 'img/{who}-atlas.webp', standH: 100, fscale: {{}}, frames: {{
{body}
}} }};
""")
open(out, 'w').write(''.join(parts))
print('wrote', out)
