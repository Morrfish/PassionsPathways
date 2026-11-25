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
    'codee-clean': dict(jab='sweep', side='trash', down='mop', up='duster', nair='polish', fair='dbust', uair='hdust', dair='squeak',
                        neutral='suds', sideSpecial='patrol', upSpecial='vac', downSpecial='wet',
                        airRow='dbust', upRow='duster', uairRow='hdust', riseLate='vac3', defRow='def'),
}
# ultimate key poses (tools/slice_ultimates.py): drawn at the same scale as the fighter's own atlas
ULTS = {'patty-ult': 'patty', 'jeffery-ult': 'jeffery', 'jadden-ult': 'jadden', 'mandi-witch-ult': 'mandi-witch', 'mandi-mermaid-ult': 'mandi-mermaid'}
# The ultimate/personality sheets were drawn at a different size than each fighter's main sheet.
# Size every pose from those sheets so the standing taunt pose is as tall as the standing idle pose.
PERS_FRAMES = ('ult', 'asm', 'ret', 'pers', 'ent', 'taunt', 'win', 'lose')
def sheet_factor(base_fr, pers_fr):
    return round(base_fr['idle0'][3] / pers_fr['taunt'][3], 3)
# poses that are meant to be bigger than the fighter (Courtnee's mech towers over him)
BIGGER = {'courtnee': {'asm2': 1.3, 'asm3': 1.7, 'ult0': 1.7, 'ult1': 1.7, 'ult2': 1.7, 'ult3': 1.7, 'ret0': 1.6, 'ret1': 1.25}}
# whole move groups drawn at a different scale on their source sheet (found with a size audit: standing poses vs idle)
GROUP_SCALE = {
    'siren': {'def': 0.75, 'bair': 0.8, 'mac': 1.3, 'note': 1.16, 'blitz': 1.1},
    'megan': {'def': 0.8, 'bair': 0.8, 'ret': 1.6, 'nap': 1.25, 'pers2': 0.78, 'pers3': 0.78, 'win': 0.78, 'lose': 0.78},
    'mandi-witch': {'whirl': 1.3, 'salon': 1.15},
    'courtnee': {'saiyan': 1.2},
    'haylie': {'ult1': 1.15, 'ult2': 1.3, 'ult3': 1.3},
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
ALIASES = {w: {'ent': 'pers0', 'taunt': 'pers1', 'win': 'pers2', 'lose': 'pers3'} for w in ('courtnee', 'megan', 'siren', 'codee', 'codee-clean', 'haylie', 'sara')}
for who, moves in MOVES.items():
    fr = json.load(open(os.path.join(src_dir, f'{who}-frames.json')))
    for a, b in ALIASES.get(who, {}).items(): fr[a] = fr[b]
    body = ',\n'.join(f"    '{k}': [{', '.join(str(v) for v in val)}]" for k, val in fr.items())
    fs = {}
    if 'taunt' in fr:
        f0 = sheet_factor(fr, fr)
        fs = {k: f0 for k in fr if k.startswith(PERS_FRAMES)}
    for k, m in BIGGER.get(who, {}).items(): fs[k] = round(fs.get(k, 1) * m, 3)
    for pre, m in GROUP_SCALE.get(who, {}).items():
        for k in fr:
            if re.fullmatch(pre + r'(\d+)?', k): fs[k] = round(fs.get(k, 1) * m, 3)
    parts.append(f"""
MM.SPRITES['{who}'] = {{
  src: 'img/{who}-atlas.webp',
  standH: {fr['idle0'][3]},
  fscale: {json.dumps(fs)},
  frames: {{
{body}
  }},
  moves: {json.dumps(moves)},
}};
""")
for who, base in ULTS.items():
    fr = json.load(open(os.path.join(src_dir, f'{who}-frames.json')))
    bfr = json.load(open(os.path.join(src_dir, f'{base}-frames.json')))
    std = bfr['idle0'][3]
    f0 = sheet_factor(bfr, fr)
    fs = {k: f0 for k in fr}
    for pre, m in GROUP_SCALE.get(who, {}).items():
        for k in fr:
            if re.fullmatch(pre + r'(\d+)?', k): fs[k] = round(fs[k] * m, 3)
    body = ',\n'.join(f"    '{k}': [{', '.join(str(v) for v in val)}]" for k, val in fr.items())
    parts.append(f"""
MM.SPRITES['{who}'] = {{ src: 'img/{who}-atlas.webp', standH: {std}, fscale: {json.dumps(fs)}, frames: {{
{body}
}} }};
""")
open(out, 'w').write(''.join(parts))
print('wrote', out)
