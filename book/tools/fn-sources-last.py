# في حواشي الأبيات: الشروح أولًا، ثم المصادر مرة واحدة في آخر الحاشية، مفصولة بـ«؛»، وصفحات المصدر الواحد مجموعة
import re, sys
from pathlib import Path

PAGES = r'(?:ج\d+ )?ص[\d–]+'
CIT = re.compile(r'^([^:«»]{2,80}?)، ((?:[^،:«»]{2,40}، )?' + PAGES + r'(?:، ' + PAGES + r')*(?:، الحاشية)?)$')

def sentences(t):
    out, cur, depth = [], '', 0
    for i, ch in enumerate(t):
        cur += ch
        if ch == '«': depth += 1
        elif ch == '»': depth = max(0, depth - 1)
        elif ch == '.' and depth == 0 and (i + 1 == len(t) or t[i + 1] == ' '):
            out.append(cur.strip()); cur = ''
    if cur.strip(): out.append(cur.strip())
    return out

def fix(note):
    sents = sentences(note)
    cits, rest = [], []
    for s in sents:
        m = CIT.match(s.rstrip('.'))
        (cits if m and ':' not in s else rest).append(m if m and ':' not in s else s)
    if not cits or not rest: return note
    if len(cits) == 1 and sents[-1].rstrip('.') == cits[0].group(0): return note
    order, pages = [], {}
    for m in cits:
        lead, loc = m.group(1).strip(), m.group(2)
        if lead not in pages: order.append(lead); pages[lead] = []
        for p in loc.split('، '):
            if p not in pages[lead]: pages[lead].append(p)
    src = '؛ '.join(f'{lead}، ' + '، '.join(pages[lead]) for lead in order)
    body = ' '.join(s if s.endswith('.') else s + '.' for s in rest)
    return f'{body} {src}.'

def notes_in(line):
    out, i = [], 0
    while (j := line.find('^[', i)) >= 0:
        depth, k = 1, j + 2
        while depth:
            depth += {'[': 1, ']': -1}.get(line[k], 0); k += 1
        out.append((j + 2, k - 1)); i = k
    return out

changed = 0
for f in sys.argv[1:]:
    p = Path(f); lines = p.read_text(encoding='utf-8').split('\n')
    for n, line in enumerate(lines):
        if not line.startswith('@ '): continue
        for a, b in reversed(notes_in(line)):
            new = fix(line[a:b])
            if new != line[a:b]:
                line = line[:a] + new + line[b:]; changed += 1
        lines[n] = line
    p.write_text('\n'.join(lines), encoding='utf-8')
print('footnotes changed:', changed)
