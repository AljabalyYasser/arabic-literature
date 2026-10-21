# ثبت المصادر والمراجع: كل كتاب له بطاقة في src/content/sources ووردت إحالة إليه في حواشي الكتاب، بطبعته مرة واحدة
import re, sys
from pathlib import Path

ROOT = Path(__file__).parent.parent
REPO = ROOT.parent
MARKS = re.compile('[ً-ْٰـ]')
def plain(t): return MARKS.sub('', t).strip()

def card(path):
    d = {}
    for line in path.read_text(encoding='utf-8').splitlines():
        m = re.match(r'^(\w+):\s*(.*)$', line)
        if m: d[m.group(1)] = m.group(2).strip().strip('"')
    return d

def notes(text):
    out, i = [], 0
    while (j := text.find('^[', i)) >= 0:
        depth, k = 1, j + 2
        while depth:
            depth += {'[': 1, ']': -1}.get(text[k], 0); k += 1
        out.append(text[j + 2:k - 1]); i = k
    return out

def keys(c, single):
    # ما يُعرف به الكتاب في الحواشي، متبوعًا بفاصلة كما تُكتب الإحالة: عنوانه بلا ما بين القوسين، وعنوانه المختصر،
    # واسم مؤلفه المختصر إن لم يكن له في البطاقات كتاب آخر، وإلا فاسمه مع أول كلمتين من العنوان
    t = plain(re.sub(r'\s*\(.*?\)', '', c.get('title', '')))
    ks = {t}
    if t.startswith('شرح ') or len(t.split()) > 3: ks.add(' '.join(t.split()[:3]))
    first = re.split(r'[\s:،]', t)[0]
    if first not in ('شرح', 'ديوان', 'كتاب', 'شعر', 'معجم', 'تاريخ', 'جمهرة', 'الأدب'): ks.add(first)
    a = plain(c.get('short', '').split('،')[0])
    if single.get(a) == 1: ks.add(a)
    else: ks.add(a + '، ' + ' '.join(t.split()[:2]))
    return {k + '،' for k in ks if len(k) > 3}

def entry(c):
    parts = [c['author']] if c.get('author') else []
    if c.get('editor'): parts.append(('تحقيق ' if not c['editor'].startswith(('تحقيق', 'شرح', 'جمع', 'محقق', 'لجنة')) else '') + c['editor'])
    for k in ('publisher', 'edition'):
        if c.get(k): parts.append(c[k])
    title = re.sub(r'\s*\(.*?\)', '', c['title'])
    return '& ' + title + ' | ' + '، '.join(parts) + '.'

def main(files):
    text = plain(' '.join(n for f in files for n in notes(Path(f).read_text(encoding='utf-8'))))
    cards = {p.stem: card(p) for p in sorted((REPO / 'src/content/sources').glob('*.yaml'))}
    single = {}
    for c in cards.values():
        a = plain(c.get('short', '').split('،')[0]); single[a] = single.get(a, 0) + 1
    used = {k: c for k, c in cards.items() if c.get('title') and any(x in text for x in keys(c, single))}
    primary, study = [], []
    for k, c in used.items():
        if k == 'aghani': continue
        line = entry(c)
        if k == 'aghani-dk' and 'aghani' in cards:
            f = cards['aghani']
            line = line[:-1] + f"، إلا الجزأين الخامس والسابع فمن طبعة {f['publisher']}، تحقيق {f['editor']}، {f['edition']}."
        (study if c.get('kind') == 'study' else primary).append(line)
    order = lambda s: plain(re.sub(r'^& (ال)?', '', s))
    out = ['# ثبت المصادر والمراجع',
           'هذه الكتب التي أُحيل إليها في الحواشي، كلٌّ بطبعته التي نقلنا منها، ويُذكر في الحاشية بعنوانه ومؤلفه أول مرة في الفصل، ثم بعنوانه المختصر.',
           '## المصادر'] + sorted(primary, key=order) + ['## المراجع الحديثة'] + sorted(study, key=order)
    (ROOT / 'src' / 'thabt.txt').write_text('\n'.join(out) + '\n', encoding='utf-8')
    print(len(primary), 'sources,', len(study), 'studies')

if __name__ == '__main__':
    main(sys.argv[1:])
